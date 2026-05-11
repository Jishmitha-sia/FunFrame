import { motion } from "framer-motion";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  useRef,
  useState,
} from "react";

import html2canvas from "html2canvas";
import gifshot from "gifshot";

export default function Preview() {
  const navigate = useNavigate();

  const location = useLocation();

  const photos =
    location.state?.photos || [];

  const template =
    location.state?.template || "classic";

  const previewRef =
    useRef<HTMLDivElement | null>(null);
  
  const [creatingGif, setCreatingGif] =
  useState(false);

const [gifUrl, setGifUrl] =
  useState<string | null>(null); 

  const downloadStrip = async () => {
  if (!previewRef.current) return;

  try {
    const canvas = await html2canvas(
      previewRef.current,
      {
        useCORS: true,
        backgroundColor: null,
        scale: 3,
      }
    );

    const image = canvas.toDataURL(
      "image/png"
    );

    const link =
      document.createElement("a");

    link.href = image;

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

    (obj: any) => {

      if (!obj.error) {

        setGifUrl(obj.image);

      }

      setCreatingGif(false);
    }
  );
};  

  const renderTemplate = () => {
    switch (template) {

      /* CLASSIC STRIP */

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
            {photos.map((photo: string, index: number) => (
              <img
                key={index}
                src={photo}
                alt=""
                className="
                  rounded-2xl
                  object-cover
                  aspect-[3/2]
                "
              />
            ))}

            <div className="text-center pt-2">

              <h2 className="text-black text-2xl font-black">
                FunFrame
              </h2>

              <p className="text-black/50">
                Cinematic Memories
              </p>

            </div>

          </div>
        );

      /* FILM ROLL */

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
            {photos.map((photo: string, index: number) => (
              <div
                key={index}
                className="
                  border-y-[18px]
                  border-black
                  bg-[#111]
                  p-2
                  rounded-xl
                "
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
              </div>
            ))}
          </div>
        );

      /* POLAROID */

      case "polaroid":
        return (
          <div
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

            <div className="text-center">

              <h2 className="text-black text-3xl font-black">
                FunFrame
              </h2>

            </div>

          </div>
        );

      /* SQUARE GRID */

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
            {photos.map((photo: string, index: number) => (
              <img
                key={index}
                src={photo}
                alt=""
                className="
                  rounded-2xl
                  object-cover
                  aspect-square
                "
              />
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 overflow-hidden">

      {/* BACKGROUND GLOWS */}

      <div className="absolute top-20 left-20 w-[350px] h-[350px] bg-pink-500/20 blur-[140px] rounded-full" />

      <div className="absolute bottom-20 right-20 w-[350px] h-[350px] bg-purple-500/20 blur-[140px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* TOP BAR */}

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

        {/* MAIN PREVIEW */}

        <div
          className="
            flex
            items-center
            justify-center
            min-h-[70vh]
          "
        >

          <motion.div
            ref={previewRef}
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
            className="
              relative
            "
          >

            {renderTemplate()}

          </motion.div>
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
      mt-20
      flex
      flex-col
      items-center
    "
  >

    <h2 className="text-4xl font-black mb-8">
      Animated GIF
    </h2>

    <img
      src={gifUrl}
      alt=""
      className="
        rounded-[2rem]
        border
        border-white/10
        w-[320px]
        shadow-2xl
      "
    />

    <a
      href={gifUrl}
      download="funframe.gif"
      className="
        mt-8
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
  );
}