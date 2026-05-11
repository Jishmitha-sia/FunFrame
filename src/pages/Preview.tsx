import { motion } from "framer-motion";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  useMemo,
  useState,
} from "react";

import gifshot from "gifshot";

const accentOptions = [
  {
    name: "Pink",
    value: "#ec4899",
  },
  {
    name: "Violet",
    value: "#8b5cf6",
  },
  {
    name: "Gold",
    value: "#f59e0b",
  },
  {
    name: "Mint",
    value: "#10b981",
  },
];

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });

const roundRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) => {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius,
    y + height
  );
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
};

const drawCoverImage = (
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) => {
  const sourceRatio = image.width / image.height;
  const targetRatio = width / height;
  let sourceWidth = image.width;
  let sourceHeight = image.height;
  let sourceX = 0;
  let sourceY = 0;

  if (sourceRatio > targetRatio) {
    sourceWidth = image.height * targetRatio;
    sourceX = (image.width - sourceWidth) / 2;
  } else {
    sourceHeight = image.width / targetRatio;
    sourceY = (image.height - sourceHeight) / 2;
  }

  ctx.save();
  roundRect(ctx, x, y, width, height, radius);
  ctx.clip();
  ctx.drawImage(
    image,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    x,
    y,
    width,
    height
  );
  ctx.restore();
};

export default function Preview() {
  const navigate = useNavigate();

  const location = useLocation();

  const photos: string[] =
    location.state?.photos || [];

  const template =
    location.state?.template || "classic";

  const [creatingGif, setCreatingGif] =
    useState(false);

  const [gifUrl, setGifUrl] =
    useState<string | null>(null);

  const [eventTitle, setEventTitle] =
    useState("FunFrame");

  const [tagline, setTagline] =
    useState("Cinematic Memories");

  const [footerNote, setFooterNote] =
    useState("Made in the booth");

  const [accentColor, setAccentColor] =
    useState(accentOptions[0].value);

  const [copied, setCopied] =
    useState(false);

  const shareText = useMemo(() => {
    const url =
      typeof window !== "undefined"
        ? window.location.href
        : "FunFrame Preview";

    return `${eventTitle} - ${tagline} | ${photos.length} shots | ${url}`;
  }, [eventTitle, tagline, photos.length]);

  const qrUrl = useMemo(
    () =>
      `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=12&data=${encodeURIComponent(
        shareText
      )}`,
    [shareText]
  );

  const drawFooter = (
    ctx: CanvasRenderingContext2D,
    x: number,
    titleY: number,
    color: string
  ) => {
    ctx.textAlign = "center";
    ctx.fillStyle = color;
    ctx.font = "900 42px Outfit, Arial";
    ctx.fillText(eventTitle || "FunFrame", x, titleY);

    ctx.fillStyle = "rgba(0,0,0,0.55)";
    ctx.font = "600 25px Outfit, Arial";
    ctx.fillText(tagline || "Cinematic Memories", x, titleY + 44);

    ctx.fillStyle = accentColor;
    ctx.font = "800 22px Outfit, Arial";
    ctx.fillText(footerNote || "Made in the booth", x, titleY + 84);
  };

  const createStripCanvas = async () => {
    const loadedPhotos =
      await Promise.all(photos.map(loadImage));

    const canvas =
      document.createElement("canvas");

    const ctx = canvas.getContext("2d");

    if (!ctx) return null;

    if (template === "polaroid") {
      canvas.width = 900;
      canvas.height = 1080;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (loadedPhotos[0]) {
        drawCoverImage(ctx, loadedPhotos[0], 80, 80, 740, 740, 38);
      }

      drawFooter(ctx, 450, 900, "#000000");

      return canvas;
    }

    if (template === "filmroll") {
      canvas.width = 900;
      canvas.height = 360 + loadedPhotos.length * 420;

      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      loadedPhotos.forEach((photo, index) => {
        const y = 90 + index * 420;

        ctx.fillStyle = "#000000";
        roundRect(ctx, 90, y - 38, 720, 356, 34);
        ctx.fill();

        ctx.fillStyle = "#151515";
        roundRect(ctx, 120, y, 660, 280, 24);
        ctx.fill();

        drawCoverImage(ctx, photo, 140, y + 20, 620, 240, 20);

        ctx.fillStyle = accentColor;
        ctx.fillRect(120, y - 30, 660, 6);
        ctx.fillRect(120, y + 304, 660, 6);
      });

      ctx.fillStyle = accentColor;
      ctx.font = "900 46px Outfit, Arial";
      ctx.textAlign = "center";
      ctx.fillText(eventTitle || "FunFrame", 450, canvas.height - 170);

      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.font = "600 26px Outfit, Arial";
      ctx.fillText(tagline || "Cinematic Memories", 450, canvas.height - 120);

      ctx.fillStyle = accentColor;
      ctx.font = "800 22px Outfit, Arial";
      ctx.fillText(footerNote || "Made in the booth", 450, canvas.height - 78);

      return canvas;
    }

    if (template === "square") {
      canvas.width = 1000;
      canvas.height = 1240;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      loadedPhotos.slice(0, 4).forEach((photo, index) => {
        const x = index % 2 === 0 ? 80 : 520;
        const y = index < 2 ? 80 : 520;

        drawCoverImage(ctx, photo, x, y, 400, 400, 34);
      });

      drawFooter(ctx, 500, 1030, "#000000");

      return canvas;
    }

    canvas.width = 840;
    canvas.height = 310 + loadedPhotos.length * 300;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    loadedPhotos.forEach((photo, index) => {
      const y = 70 + index * 300;

      ctx.fillStyle = "rgba(0,0,0,0.08)";
      roundRect(ctx, 58, y - 10, 724, 250, 34);
      ctx.fill();

      drawCoverImage(ctx, photo, 70, y, 700, 230, 28);
    });

    drawFooter(ctx, 420, canvas.height - 180, "#000000");

    return canvas;
  };

  const downloadStrip = async () => {
    try {
      const canvas = await createStripCanvas();

      if (!canvas) return;

      const link =
        document.createElement("a");

      link.href = canvas.toDataURL("image/png");

      link.download =
        `funframe-${Date.now()}.png`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.log(err);
      alert("Download failed");
    }
  };

  const createGif = async () => {
    if (!photos.length) return;

    setCreatingGif(true);

    gifshot.createGIF(
      {
        images: photos,
        gifWidth: 500,
        gifHeight: 700,
        interval: 0.7,
      },

      (obj: {
        error?: boolean;
        image?: string;
      }) => {
        if (!obj.error && obj.image) {
          setGifUrl(obj.image);
        }

        setCreatingGif(false);
      }
    );
  };

  const sharePreview = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: eventTitle,
          text: shareText,
        });

        return;
      }

      await navigator.clipboard.writeText(shareText);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1600);
    } catch (err) {
      console.log(err);
      alert("Sharing failed");
    }
  };

  const renderTemplateFooter = (
    dark = false
  ) => (
    <div className="text-center pt-2">
      <h2
        className={`
          text-2xl
          font-black
          ${dark ? "text-white" : "text-black"}
        `}
        style={{
          color: dark ? accentColor : "#000",
        }}
      >
        {eventTitle}
      </h2>

      <p
        className={
          dark ? "text-white/55" : "text-black/50"
        }
      >
        {tagline}
      </p>

      <p
        className="mt-2 text-sm font-semibold"
        style={{
          color: accentColor,
        }}
      >
        {footerNote}
      </p>
    </div>
  );

  const renderTemplate = () => {
    switch (template) {
      case "classic":
        return (
          <div
            className="
              bg-white
              p-6
              rounded-[2.5rem]
              flex
              flex-col
              gap-5
              w-[320px]
            "
          >
            {photos.map((photo, index) => (
              <motion.img
                key={index}
                src={photo}
                alt=""
                whileHover={{
                  scale: 1.03,
                  rotate: index % 2 === 0 ? -1 : 1,
                }}
                className="
                  rounded-2xl
                  object-cover
                  aspect-[3/2]
                "
              />
            ))}

            {renderTemplateFooter()}
          </div>
        );

      case "filmroll":
        return (
          <div
            className="
              bg-black
              border
              border-white/10
              p-6
              rounded-[2.5rem]
              flex
              flex-col
              gap-5
              w-[340px]
            "
          >
            {photos.map((photo, index) => (
              <motion.div
                key={index}
                whileHover={{
                  x: index % 2 === 0 ? -6 : 6,
                }}
                className="
                  border-y-[18px]
                  border-black
                  bg-[#111]
                  p-2
                  rounded-xl
                "
                style={{
                  boxShadow: `0 0 0 1px ${accentColor}22`,
                }}
              >
                <img
                  src={photo}
                  alt=""
                  className="
                    rounded-lg
                    object-cover
                    aspect-video
                  "
                />
              </motion.div>
            ))}

            {renderTemplateFooter(true)}
          </div>
        );

      case "polaroid":
        return (
          <motion.div
            whileHover={{
              rotate: -1,
              y: -8,
            }}
            className="
              bg-white
              p-5
              rounded-[2.5rem]
              shadow-2xl
              rotate-[-2deg]
              w-[400px]
            "
          >
            <img
              src={photos[0]}
              alt=""
              className="
                rounded-2xl
                object-cover
                aspect-square
                mb-6
              "
            />

            {renderTemplateFooter()}
          </motion.div>
        );

      case "square":
        return (
          <div
            className="
              bg-white
              p-6
              rounded-[2.5rem]
              grid
              grid-cols-2
              gap-4
              w-[500px]
            "
          >
            {photos.map((photo, index) => (
              <motion.img
                key={index}
                src={photo}
                alt=""
                whileHover={{
                  scale: 1.04,
                  zIndex: 2,
                }}
                className="
                  rounded-2xl
                  object-cover
                  aspect-square
                "
              />
            ))}

            <div className="col-span-2">
              {renderTemplateFooter()}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 overflow-hidden">
      <div className="absolute top-20 left-20 w-[350px] h-[350px] bg-pink-500/20 blur-[140px] rounded-full" />

      <div className="absolute bottom-20 right-20 w-[350px] h-[350px] bg-purple-500/20 blur-[140px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-14">
          <button
            onClick={() => navigate("/booth")}
            className="
              text-white/70
              hover:text-pink-400
              transition
              text-lg
            "
          >
            Back
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
              Preview Studio
            </h1>

            <p className="text-white/40 mt-2">
              Your cinematic photostrip
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={createGif}
              className="
                bg-white/10
                border
                border-white/10
                hover:border-pink-400
                px-7
                py-4
                rounded-full
                font-bold
                text-lg
                transition
              "
            >
              {creatingGif
                ? "Creating..."
                : "Create GIF"}
            </button>

            <button
              onClick={downloadStrip}
              className="
                bg-gradient-to-r
                from-pink-500
                to-fuchsia-500
                hover:from-pink-400
                hover:to-fuchsia-400
                px-8
                py-4
                rounded-full
                font-bold
                text-lg
                transition
                shadow-[0_10px_40px_rgba(236,72,153,0.35)]
              "
            >
              Download PNG
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
          <div
            className="
              flex
              items-center
              justify-center
              min-h-[70vh]
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 80,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
              }}
              whileHover={{
                scale: 1.015,
              }}
              className="relative"
            >
              {renderTemplate()}
            </motion.div>
          </div>

          <div
            className="
              space-y-6
            "
          >
            <div
              className="
                bg-[#090909]
                border
                border-white/10
                rounded-[2rem]
                p-6
              "
            >
              <h2 className="text-3xl font-black mb-5">
                Personalize
              </h2>

              <div className="space-y-4">
                <input
                  value={eventTitle}
                  onChange={(event) =>
                    setEventTitle(event.target.value)
                  }
                  className="
                    w-full
                    rounded-full
                    border
                    border-white/10
                    bg-white/5
                    px-5
                    py-4
                    outline-none
                    focus:border-pink-400
                  "
                  placeholder="Event title"
                />

                <input
                  value={tagline}
                  onChange={(event) =>
                    setTagline(event.target.value)
                  }
                  className="
                    w-full
                    rounded-full
                    border
                    border-white/10
                    bg-white/5
                    px-5
                    py-4
                    outline-none
                    focus:border-pink-400
                  "
                  placeholder="Tagline"
                />

                <input
                  value={footerNote}
                  onChange={(event) =>
                    setFooterNote(event.target.value)
                  }
                  className="
                    w-full
                    rounded-full
                    border
                    border-white/10
                    bg-white/5
                    px-5
                    py-4
                    outline-none
                    focus:border-pink-400
                  "
                  placeholder="Footer note"
                />

                <div className="flex gap-3">
                  {accentOptions.map((accent) => (
                    <motion.button
                      key={accent.value}
                      whileHover={{
                        scale: 1.12,
                      }}
                      whileTap={{
                        scale: 0.92,
                      }}
                      onClick={() =>
                        setAccentColor(accent.value)
                      }
                      className="
                        h-11
                        w-11
                        rounded-full
                        border-2
                        transition
                      "
                      style={{
                        backgroundColor:
                          accent.value,
                        borderColor:
                          accentColor === accent.value
                            ? "#fff"
                            : "rgba(255,255,255,0.15)",
                      }}
                      aria-label={`Use ${accent.name} accent`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div
              className="
                bg-[#090909]
                border
                border-white/10
                rounded-[2rem]
                p-6
              "
            >
              <h2 className="text-3xl font-black mb-5">
                QR Share
              </h2>

              <motion.div
                whileHover={{
                  rotate: 1.5,
                  scale: 1.02,
                }}
                className="
                  rounded-[1.5rem]
                  bg-white
                  p-4
                  mb-5
                "
              >
                <img
                  src={qrUrl}
                  alt="QR code for this preview"
                  className="w-full"
                />
              </motion.div>

              <button
                onClick={sharePreview}
                className="
                  w-full
                  rounded-full
                  bg-white
                  px-6
                  py-4
                  font-black
                  text-black
                  transition
                  hover:scale-[1.02]
                "
              >
                {copied ? "Copied" : "Share or Copy"}
              </button>
            </div>

            {gifUrl && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="
                  bg-[#090909]
                  border
                  border-white/10
                  rounded-[2rem]
                  p-6
                "
              >
                <h2 className="text-3xl font-black mb-5">
                  Animated GIF
                </h2>

                <img
                  src={gifUrl}
                  alt=""
                  className="
                    rounded-[2rem]
                    border
                    border-white/10
                    w-full
                    shadow-2xl
                  "
                />

                <a
                  href={gifUrl}
                  download="funframe.gif"
                  className="
                    mt-6
                    inline-flex
                    bg-gradient-to-r
                    from-pink-500
                    to-fuchsia-500
                    hover:from-pink-400
                    hover:to-fuchsia-400
                    px-8
                    py-4
                    rounded-full
                    font-bold
                    text-lg
                    transition
                  "
                >
                  Download GIF
                </a>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
