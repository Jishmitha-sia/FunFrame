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
  "B&W",
  "Vintage",
  "Contrast",
  "Bright",
  "Pop",
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

  const [selectedFilter, setSelectedFilter] =
    useState("Normal");

  const [photos, setPhotos] = useState<string[]>(
    []
  );

  const [countdown, setCountdown] =
    useState<number | null>(null);

  const [flash, setFlash] = useState(false);

  const [stickersLayer, setStickersLayer] =
    useState<StickerType[]>([]);

  useEffect(() => {
    startCamera();
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
      case "B&W":
        return "grayscale";

      case "Vintage":
        return "sepia";

      case "Contrast":
        return "contrast-150";

      case "Bright":
        return "brightness-125";

      case "Pop":
        return "saturate-200";

      default:
        return "";
    }
  };

  const getCanvasFilter = () => {
    switch (selectedFilter) {
      case "B&W":
        return "grayscale(1)";

      case "Vintage":
        return "sepia(1)";

      case "Contrast":
        return "contrast(1.5)";

      case "Bright":
        return "brightness(1.2)";

      case "Pop":
        return "saturate(2)";

      default:
        return "none";
    }
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

    setPhotos((prev) => [...prev, image]);

    setFlash(true);

    setTimeout(() => {
      setFlash(false);
    }, 150);
  };

  const startCountdownCapture = () => {
    let current = 3;

    setCountdown(current);

    const interval = setInterval(() => {
      current--;

      if (current > 0) {
        setCountdown(current);
      } else {
        clearInterval(interval);

        setCountdown(null);

        takePhoto();
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

            <canvas
              ref={canvasRef}
              className="hidden"
            />

            {/* FLASH */}

            <AnimatePresence>
              {flash && (
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  className="
                    absolute
                    inset-0
                    bg-white
                    z-40
                  "
                />
              )}
            </AnimatePresence>

            {/* COUNTDOWN */}

            {countdown && (
              <div
                className="
                  absolute
                  inset-0
                  z-50
                  flex
                  items-center
                  justify-center
                  text-[180px]
                  font-black
                  text-white
                  backdrop-blur-sm
                "
              >
                {countdown}
              </div>
            )}

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
              onClick={startCountdownCapture}
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
                    rounded-2xl
                    py-5
                    text-lg
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

              <h2 className="text-4xl font-black">
                Captured Shots
              </h2>

              <button
                onClick={() => setPhotos([])}
                className="
                  border
                  border-red-500
                  text-red-400
                  px-6
                  py-3
                  rounded-full
                  hover:bg-red-500
                  hover:text-white
                  transition
                "
              >
                Clear All
              </button>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

              {photos.map((photo, index) => (
                <motion.img
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  src={photo}
                  alt=""
                  className="
                    rounded-[2rem]
                    border
                    border-white/10
                    shadow-2xl
                  "
                />
              ))}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}