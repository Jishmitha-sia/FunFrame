import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const filters = [
  "none",
  "grayscale(1)",
  "sepia(1)",
  "contrast(1.4)",
  "brightness(1.2)",
  "saturate(1.8)",
];

const filterNames = [
  "Normal",
  "B&W",
  "Vintage",
  "Contrast",
  "Bright",
  "Pop",
];

const stickers = ["✨", "💖", "🎀", "😎", "🔥", "🌸"];

const Booth = () => {
  const navigate = useNavigate();

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [selectedFilter, setSelectedFilter] = useState(0);
  const [selectedSticker, setSelectedSticker] = useState("");

  useEffect(() => {
    startCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error(error);
      alert("Camera access denied");
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-black
        text-white
        px-6
        py-10
      "
    >
      {/* TOP BAR */}
      <div
        className="
          flex
          items-center
          justify-between
          mb-10
        "
      >
        <button
          onClick={() => navigate("/templates")}
          className="
            text-gray-300
            hover:text-white
            transition-all
          "
        >
          ← Back
        </button>

        <h1
          className="
            text-2xl
            md:text-3xl
            font-bold
          "
        >
          Camera Booth
        </h1>

        <button
          onClick={() => navigate("/preview")}
          className="
            bg-white
            text-black
            px-6
            py-3
            rounded-full
            font-semibold
            hover:scale-105
            transition-all
          "
        >
          Preview →
        </button>
      </div>

      {/* MAIN GRID */}
      <div
        className="
          grid
          lg:grid-cols-[1fr_350px]
          gap-8
        "
      >
        {/* CAMERA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            relative
            rounded-[40px]
            overflow-hidden
            border
            border-white/10
            bg-white/5
            backdrop-blur-xl
          "
        >
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{
              filter: filters[selectedFilter],
            }}
            className="
              w-full
              h-[75vh]
              object-cover
            "
          />

          {/* STICKER */}
          {selectedSticker && (
            <div
              className="
                absolute
                top-10
                right-10
                text-7xl
              "
            >
              {selectedSticker}
            </div>
          )}

          {/* CAPTURE BUTTON */}
          <div
            className="
              absolute
              bottom-8
              left-1/2
              -translate-x-1/2
            "
          >
            <button
              className="
                w-24
                h-24
                rounded-full
                bg-white
                border-[10px]
                border-pink-400
                hover:scale-110
                transition-all
              "
            />
          </div>
        </motion.div>

        {/* SIDEBAR */}
        <div
          className="
            bg-white/5
            border
            border-white/10
            rounded-[40px]
            p-6
            backdrop-blur-xl
            h-fit
          "
        >
          {/* FILTERS */}
          <div className="mb-10">
            <h2
              className="
                text-2xl
                font-bold
                mb-6
              "
            >
              Filters
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {filterNames.map((filter, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedFilter(index)}
                  className={`
                    rounded-2xl
                    py-4
                    px-4
                    transition-all
                    border

                    ${
                      selectedFilter === index
                        ? "bg-white text-black border-white"
                        : "bg-white/5 border-white/10 hover:bg-white/10"
                    }
                  `}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* STICKERS */}
          <div>
            <h2
              className="
                text-2xl
                font-bold
                mb-6
              "
            >
              Stickers
            </h2>

            <div className="grid grid-cols-3 gap-4">
              {stickers.map((sticker, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSticker(sticker)}
                  className="
                    h-20
                    rounded-2xl
                    bg-white/5
                    border
                    border-white/10
                    text-4xl
                    hover:bg-white/10
                    transition-all
                  "
                >
                  {sticker}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booth;