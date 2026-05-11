import { motion, AnimatePresence } from "framer-motion";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  useEffect,
  useRef,
  useState,
} from "react";

const stickers = ["✨", "💖", "🎀", "😎", "🔥", "🌸"];

const filters = [
  "Normal",
  "Noir",
  "Dreamy",
  "Cyberpunk",
  "Warm",
  "VHS",
  "Pop",
  "Cool",
];

const posePrompts = [
  "Peace sign",
  "Look away",
  "Big laugh",
  "Album cover",
  "Serious model face",
  "Over the shoulder",
  "Best friend energy",
  "Main character stare",
];

const hostLines = [
  "Ready for the next one?",
  "Hold that pose.",
  "This one is going on the strip.",
  "Give the camera some drama.",
  "Perfect. Stay with me.",
  "One more iconic moment.",
];

type StickerType = {
  id: number;
  emoji: string;
  size: number;
  x: number;
  y: number;
};

export default function Booth() {
  const navigate = useNavigate();

  const location = useLocation();

  const template =
    location.state?.template || "classic";

  const maxPhotos =
    location.state?.maxPhotos || 4;

  const videoRef =
    useRef<HTMLVideoElement | null>(null);

  const canvasRef =
    useRef<HTMLCanvasElement | null>(null);

  const audioContextRef =
    useRef<AudioContext | null>(null);

  const countdownTimerRef =
    useRef<number | null>(null);

  const retakeIndexRef =
    useRef<number | null>(null);

  const [selectedFilter, setSelectedFilter] =
    useState("Normal");

  const [photos, setPhotos] = useState<string[]>(
    []
  );

  const [countdown, setCountdown] =
    useState<number | null>(null);

  const [activePrompt, setActivePrompt] =
    useState(posePrompts[0]);

  const [hostLine, setHostLine] =
    useState(hostLines[0]);

  const [flash, setFlash] = useState(false);

  const [isCapturing, setIsCapturing] =
    useState(false);

  const [retakeIndex, setRetakeIndex] =
  useState<number | null>(null);

  const [stickersLayer, setStickersLayer] =
    useState<StickerType[]>([]);

  useEffect(() => {
    startCamera();

    return () => {
      if (countdownTimerRef.current) {
        window.clearInterval(countdownTimerRef.current);
      }

      if (videoRef.current?.srcObject) {
        const tracks = (
          videoRef.current.srcObject as MediaStream
        ).getTracks();

        tracks.forEach((track) => track.stop());
      }

      void audioContextRef.current?.close();
    };
  }, []);

  useEffect(() => {
    if (photos.length >= maxPhotos) {
      navigate("/preview", {
        state: {
          photos,
          template,
        },
      });
    }
  }, [photos]);

  const startCamera = async () => {
    try {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
          },
          audio: false,
        });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addSticker = (emoji: string) => {
    setStickersLayer((prev) => [
      ...prev,
      {
        id: Date.now(),
        emoji,
        size: 90,
        x: 100,
        y: 100,
      },
    ]);
  };

  const removeSticker = (id: number) => {
    setStickersLayer((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const resizeSticker = (
    id: number,
    direction: "inc" | "dec"
  ) => {
    setStickersLayer((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        return {
          ...item,

          size:
            direction === "inc"
              ? item.size + 10
              : Math.max(40, item.size - 10),
        };
      })
    );
  };

const getFilterClass = () => {
  switch (selectedFilter) {

    case "Noir":
      return `
        grayscale
        contrast-125
        brightness-90
      `;

    case "Dreamy":
      return `
        brightness-110
        saturate-125
        blur-[1px]
      `;

    case "Cyberpunk":
      return `
        contrast-125
        saturate-[1.8]
        hue-rotate-[230deg]
      `;

    case "Warm":
      return `
        sepia
        brightness-110
        saturate-150
      `;

    case "VHS":
      return `
        contrast-125
        saturate-75
        brightness-90
      `;

    case "Pop":
      return `
        saturate-[2]
        contrast-110
      `;

    case "Cool":
      return `
        brightness-95
        hue-rotate-[180deg]
      `;

    default:
      return "";
  }
};

const getCanvasFilter = () => {
  switch (selectedFilter) {

    case "Noir":
      return `
        grayscale(1)
        contrast(1.25)
        brightness(0.9)
      `;

    case "Dreamy":
      return `
        brightness(1.1)
        saturate(1.3)
      `;

    case "Cyberpunk":
      return `
        contrast(1.3)
        saturate(1.8)
        hue-rotate(230deg)
      `;

    case "Warm":
      return `
        sepia(0.5)
        brightness(1.1)
        saturate(1.5)
      `;

    case "VHS":
      return `
        contrast(1.2)
        saturate(0.7)
        brightness(0.9)
      `;

    case "Pop":
      return `
        saturate(2)
        contrast(1.1)
      `;

    case "Cool":
      return `
        brightness(0.95)
        hue-rotate(180deg)
      `;

    default:
      return "none";
  }
};

  const capturedCount =
    Math.min(photos.length, maxPhotos);

  const progressPercent =
    maxPhotos > 0
      ? (capturedCount / maxPhotos) * 100
      : 0;

  const chooseCaptureDirection = (
    targetRetakeIndex: number | null
  ) => {
    const shotIndex =
      targetRetakeIndex ?? photos.length;

    setActivePrompt(
      posePrompts[shotIndex % posePrompts.length]
    );

    setHostLine(
      hostLines[
        (shotIndex + photos.length) %
          hostLines.length
      ]
    );
  };

  const primeShutterSound = () => {
    if (audioContextRef.current) {
      void audioContextRef.current.resume();

      return;
    }

    const AudioContextClass =
      window.AudioContext ||
      (
        window as typeof window & {
          webkitAudioContext?: typeof AudioContext;
        }
      ).webkitAudioContext;

    if (!AudioContextClass) return;

    const context = new AudioContextClass();

    audioContextRef.current = context;

    void context.resume();
  };

  const playShutterSound = () => {
    const context = audioContextRef.current;

    if (!context) return;

    const now = context.currentTime;

    const noiseBuffer =
      context.createBuffer(
        1,
        Math.floor(context.sampleRate * 0.09),
        context.sampleRate
      );

    const data = noiseBuffer.getChannelData(0);

    for (let i = 0; i < data.length; i += 1) {
      data[i] =
        (Math.random() * 2 - 1) *
        Math.pow(1 - i / data.length, 2);
    }

    const shutterNoise =
      context.createBufferSource();

    const snapFilter =
      context.createBiquadFilter();

    const snapGain =
      context.createGain();

    shutterNoise.buffer = noiseBuffer;
    snapFilter.type = "bandpass";
    snapFilter.frequency.setValueAtTime(1800, now);
    snapFilter.Q.setValueAtTime(1.6, now);
    snapGain.gain.setValueAtTime(0.0001, now);
    snapGain.gain.exponentialRampToValueAtTime(0.65, now + 0.01);
    snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    shutterNoise
      .connect(snapFilter)
      .connect(snapGain)
      .connect(context.destination);

    shutterNoise.start(now);
    shutterNoise.stop(now + 0.1);

    const click = context.createOscillator();
    const clickGain = context.createGain();

    click.type = "triangle";
    click.frequency.setValueAtTime(95, now + 0.015);
    click.frequency.exponentialRampToValueAtTime(45, now + 0.08);
    clickGain.gain.setValueAtTime(0.0001, now + 0.015);
    clickGain.gain.exponentialRampToValueAtTime(0.28, now + 0.025);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);

    click
      .connect(clickGain)
      .connect(context.destination);

    click.start(now + 0.015);
    click.stop(now + 0.12);
  };

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current)
      return;

    const video = videoRef.current;

    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;

    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.filter = getCanvasFilter();

    ctx.save();

    ctx.scale(-1, 1);

    ctx.drawImage(
      video,
      -canvas.width,
      0,
      canvas.width,
      canvas.height
    );

    ctx.restore();

    const image =
      canvas.toDataURL("image/png");

    const activeRetakeIndex =
      retakeIndexRef.current;

    if (activeRetakeIndex !== null) {

  setPhotos((prev) => {
    const updated = [...prev];

    updated[activeRetakeIndex] = image;

    return updated;
  });

  retakeIndexRef.current = null;

  setRetakeIndex(null);

} else {

  setPhotos((prev) => [
    ...prev,
    image,
  ]);

    }

    playShutterSound();

    setFlash(true);

    setTimeout(() => {
      setFlash(false);
    }, 420);
  };

  const startCountdownCapture = (
    targetRetakeIndex: number | null = null
  ) => {
    if (isCapturing) return;

    chooseCaptureDirection(targetRetakeIndex);

    retakeIndexRef.current =
      targetRetakeIndex;

    setRetakeIndex(targetRetakeIndex);

    primeShutterSound();

    setIsCapturing(true);

    let current = 3;

    setCountdown(current);

    countdownTimerRef.current = window.setInterval(() => {
      current--;

      if (current > 0) {
        setCountdown(current);
      } else {
        if (countdownTimerRef.current) {
          window.clearInterval(countdownTimerRef.current);
        }

        countdownTimerRef.current = null;

        setCountdown(null);

        takePhoto();

        setIsCapturing(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* TOP BAR */}

        <div className="flex items-center justify-between mb-10">

          <button
            onClick={() =>
              navigate("/templates")
            }
            className="
              text-white/70
              hover:text-pink-400
              transition
              text-lg
            "
          >
            ← Back
          </button>

          <div className="text-center">

            <h1
              className="
                text-6xl
                font-black
                tracking-tight
                bg-gradient-to-r
                from-pink-400
                via-fuchsia-400
                to-purple-400
                bg-clip-text
                text-transparent
              "
            >
              FunFrame Studio
            </h1>

            <p className="text-white/40 mt-2">
              {photos.length} / {maxPhotos} Captured
            </p>

            <div
              className="
                mt-4
                w-72
                max-w-[70vw]
                h-2.5
                rounded-full
                bg-white/10
                overflow-hidden
                border
                border-white/10
              "
              aria-label={`${capturedCount} of ${maxPhotos} photos captured`}
            >
              <motion.div
                className="
                  h-full
                  rounded-full
                  bg-gradient-to-r
                  from-pink-400
                  via-fuchsia-400
                  to-violet-400
                  shadow-[0_0_24px_rgba(236,72,153,0.65)]
                "
                initial={false}
                animate={{
                  width: `${progressPercent}%`,
                }}
                transition={{
                  duration: 0.45,
                  ease: "easeOut",
                }}
              />
            </div>

          </div>

          <button
            onClick={() =>
              navigate("/preview", {
                state: {
                  photos,
                  template,
                },
              })
            }
            className="
              bg-white
              text-black
              px-8
              py-4
              rounded-full
              text-lg
              font-bold
              hover:scale-105
              transition
            "
          >
            Preview →
          </button>

        </div>

        {/* MAIN GRID */}

        <div className="grid lg:grid-cols-[1fr_320px] gap-8">

          {/* CAMERA */}

          <div
            className="
              relative
              bg-[#0d0d0d]
              rounded-[2.5rem]
              overflow-hidden
              border
              border-white/10
              aspect-video
              shadow-2xl
            "
          > 

<video
  ref={videoRef}
  autoPlay
  muted
  playsInline
  className={`
    w-full
    h-full
    object-cover
    scale-x-[-1]
    ${getFilterClass()}
  `}
/>

{selectedFilter === "Dreamy" && (
  <div className="absolute inset-0 bg-pink-400/10 pointer-events-none" />
)}

{selectedFilter === "Cyberpunk" && (
  <div className="absolute inset-0 bg-fuchsia-500/10 pointer-events-none" />
)}

{selectedFilter === "Warm" && (
  <div className="absolute inset-0 bg-orange-400/10 pointer-events-none" />
)}

<canvas
  ref={canvasRef}
  className="hidden"
/>

            {/* BOOTH HOST */}

            <div
              className="
                absolute
                top-6
                left-6
                z-30
                max-w-[320px]
                rounded-[1.75rem]
                border
                border-white/10
                bg-black/45
                px-6
                py-5
                backdrop-blur-2xl
                shadow-[0_20px_70px_rgba(0,0,0,0.35)]
              "
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${hostLine}-${activePrompt}`}
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -12,
                  }}
                  transition={{
                    duration: 0.28,
                  }}
                >
                  <p
                    className="
                      text-xs
                      uppercase
                      tracking-[0.32em]
                      text-pink-300
                      mb-2
                    "
                  >
                    Booth Director
                  </p>

                  <p className="text-xl font-black">
                    {hostLine}
                  </p>

                  <p className="text-white/65 mt-1">
                    Pose: {activePrompt}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* FLASH */}

            <AnimatePresence>
              {flash && (
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.9, 1.08, 1.18],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.42,
                    ease: "easeOut",
                  }}
                  className="
                    absolute
                    inset-[-18%]
                    bg-white
                    z-40
                    pointer-events-none
                    shadow-[0_0_120px_rgba(255,255,255,0.9)]
                  "
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(255,255,255,1) 0%, rgba(255,236,250,0.92) 24%, rgba(236,72,153,0.28) 54%, rgba(255,255,255,0) 78%)",
                  }}
                />
              )}
            </AnimatePresence>

            {/* COUNTDOWN */}

            <AnimatePresence mode="wait">
              {countdown && (
                <motion.div
                  key={countdown}
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.18,
                  }}
                  className="
                    absolute
                    inset-0
                    z-50
                    flex
                    items-center
                    justify-center
                    backdrop-blur-sm
                    bg-black/20
                    pointer-events-none
                  "
                >
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 18,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -18,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="
                      absolute
                      top-[12%]
                      left-1/2
                      w-[min(520px,86vw)]
                      -translate-x-1/2
                      text-center
                    "
                  >
                    <p
                      className="
                        text-sm
                        uppercase
                        tracking-[0.35em]
                        text-pink-200
                        mb-3
                      "
                    >
                      {hostLine}
                    </p>

                    <p
                      className="
                        rounded-full
                        border
                        border-white/15
                        bg-white/10
                        px-6
                        py-3
                        text-2xl
                        font-black
                        shadow-[0_0_40px_rgba(236,72,153,0.35)]
                      "
                    >
                      {activePrompt}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{
                      scale: 0.25,
                      rotate: -8,
                      opacity: 0,
                    }}
                    animate={{
                      scale: [0.25, 1.18, 0.95, 1],
                      rotate: [
                        -8,
                        3,
                        0,
                        0,
                      ],
                      opacity: 1,
                    }}
                    exit={{
                      scale: 1.35,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.72,
                      ease: "easeOut",
                    }}
                    className="
                      relative
                      text-[clamp(7rem,18vw,15rem)]
                      leading-none
                      font-black
                      text-white
                      drop-shadow-[0_0_40px_rgba(236,72,153,0.85)]
                    "
                  >
                    <motion.span
                      className="
                        absolute
                        inset-0
                        rounded-full
                        bg-pink-400/20
                        blur-3xl
                      "
                      animate={{
                        scale: [0.7, 1.35],
                        opacity: [0.7, 0],
                      }}
                      transition={{
                        duration: 0.85,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />

                    <span className="relative">
                      {countdown}
                    </span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* STICKERS */}

            {stickersLayer.map((sticker) => (
              <motion.div
                key={sticker.id}
                drag
                dragMomentum={false}
                initial={{
                  x: sticker.x,
                  y: sticker.y,
                }}
                className="
                  absolute
                  top-0
                  left-0
                  z-50
                  cursor-grab
                  active:cursor-grabbing
                  select-none
                "
              >

                <div
                  style={{
                    fontSize: `${sticker.size}px`,
                  }}
                >
                  {sticker.emoji}
                </div>

                <div className="flex gap-2 mt-2">

                  <button
                    onClick={() =>
                      resizeSticker(
                        sticker.id,
                        "inc"
                      )
                    }
                    className="
                      bg-black/70
                      px-2
                      rounded-lg
                    "
                  >
                    +
                  </button>

                  <button
                    onClick={() =>
                      resizeSticker(
                        sticker.id,
                        "dec"
                      )
                    }
                    className="
                      bg-black/70
                      px-2
                      rounded-lg
                    "
                  >
                    -
                  </button>

                  <button
                    onClick={() =>
                      removeSticker(
                        sticker.id
                      )
                    }
                    className="
                      bg-red-500
                      px-2
                      rounded-lg
                    "
                  >
                    ×
                  </button>

                </div>

              </motion.div>
            ))}

            {/* CAPTURE BUTTON */}

            <button
              onClick={() => startCountdownCapture()}
              disabled={isCapturing}
              aria-label={
                retakeIndex !== null
                  ? `Retake shot ${retakeIndex + 1}`
                  : "Capture photo"
              }
              className="
                absolute
                bottom-10
                left-1/2
                -translate-x-1/2
                w-28
                h-28
                rounded-full
                bg-white
                border-[12px]
                border-pink-500
                hover:scale-110
                transition
                z-50
                shadow-[0_0_40px_rgba(255,255,255,0.3)]
                disabled:cursor-not-allowed
                disabled:scale-95
                disabled:opacity-70
              "
            />

          </div>

          {/* SIDEBAR */}

          <div
            className="
              bg-[#090909]
              border
              border-white/10
              rounded-[2.5rem]
              p-6
              backdrop-blur-xl
            "
          >

            {/* FILTERS */}

            <h2 className="text-4xl font-black mb-8">
              Filters
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-12">

              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() =>
                    setSelectedFilter(filter)
                  }
                  className={`
                    rounded-[1.5rem]
                    py-6
                    text-lg
                    backdrop-blur-xl
                    font-semibold
                    transition
                    border

                    ${
                      selectedFilter === filter
                        ? "bg-white text-black border-white"
                        : "bg-[#121212] border-white/10 hover:border-pink-400"
                    }
                  `}
                >
                  {filter}
                </button>
              ))}

            </div>

            {/* STICKERS */}

            <h2 className="text-4xl font-black mb-8">
              Stickers
            </h2>

            <div className="grid grid-cols-3 gap-4">

              {stickers.map((sticker) => (
                <button
                  key={sticker}
                  onClick={() =>
                    addSticker(sticker)
                  }
                  className="
                    h-24
                    rounded-2xl
                    bg-[#121212]
                    border
                    border-white/10
                    text-5xl
                    hover:border-pink-400
                    hover:scale-105
                    transition
                  "
                >
                  {sticker}
                </button>
              ))}

            </div>

          </div>

        </div>

{/* CAPTURED PHOTOS */}

{photos.length > 0 && (

  <div className="mt-14">

    <div className="flex items-center justify-between mb-8">

      <div>

        <h2 className="text-5xl font-black">
          Captured Shots
        </h2>

        <p className="text-white/40 mt-2">
          Tap any photo to manage your strip
        </p>

      </div>

      <button
        onClick={() => setPhotos([])}
        className="
          border
          border-red-500/60
          text-red-400
          px-6
          py-3
          rounded-full
          hover:bg-red-500
          hover:text-white
          transition
          font-semibold
        "
      >
        Clear All
      </button>

    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

      {photos.map((photo, index) => (

        <motion.div
          key={index}
          initial={{
            opacity: 0,
            y: 50,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          whileHover={{
            y: -10,
          }}
          transition={{
            duration: 0.35,
          }}
          className="
            relative
            group
          "
        >

          {/* IMAGE */}

          <div
            className="
              overflow-hidden
              rounded-[2rem]
              border
              border-white/10
              bg-[#0d0d0d]
              shadow-[0_20px_80px_rgba(0,0,0,0.45)]
            "
          >

            <img
              src={photo}
              alt=""
              className="
                w-full
                aspect-[3/4]
                object-cover
                transition
                duration-500
                group-hover:scale-105
              "
            />

          </div>

          {/* INDEX */}

          <div
            className="
              absolute
              top-4
              left-4
              bg-black/70
              backdrop-blur-xl
              px-4
              py-2
              rounded-full
              text-sm
              font-bold
              border
              border-white/10
            "
          >
            Shot {index + 1}
          </div>

          {/* ACTIONS */}

          <div
            className="
              absolute
              inset-x-0
              bottom-4
              flex
              justify-center
              gap-3
              opacity-0
              group-hover:opacity-100
              transition
            "
          >

            {/* RETAKE */}

            <button
onClick={() => {
  startCountdownCapture(index);
}}
              className="
                bg-white
                text-black
                px-5
                py-2.5
                rounded-full
                font-bold
                hover:scale-105
                transition
                shadow-xl
              "
            >
              Retake
            </button>

            {/* DELETE */}

            <button
              onClick={() => {
                const updated = [...photos];

                updated.splice(index, 1);

                setPhotos(updated);
              }}
              className="
                bg-red-500
                text-white
                px-5
                py-2.5
                rounded-full
                font-bold
                hover:scale-105
                transition
                shadow-xl
              "
            >
              Delete
            </button>

          </div>

        </motion.div>
      ))}

    </div>

  </div>
)}
      </div>
    </div>
  );
}
