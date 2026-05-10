import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

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
};

export default function Booth() {
  const navigate = useNavigate();

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [selectedFilter, setSelectedFilter] = useState("Normal");

  const [stickerItems, setStickerItems] = useState<StickerType[]>([]);

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
    } catch (err) {
      console.log(err);
    }
  };

  const addSticker = (emoji: string) => {
    setStickerItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        emoji,
        size: 90,
      },
    ]);
  };

  const removeSticker = (id: number) => {
    setStickerItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const increaseSize = (id: number) => {
    setStickerItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, size: item.size + 10 }
          : item
      )
    );
  };

  const decreaseSize = (id: number) => {
    setStickerItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, size: Math.max(40, item.size - 10) }
          : item
      )
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

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <button
            onClick={() => navigate("/templates")}
            className="text-white/80 hover:text-pink-400 transition"
          >
            ← Back
          </button>

          <h1
            className="
              text-5xl
              font-black
              tracking-tight
              bg-gradient-to-r
              from-pink-400
              to-purple-400
              bg-clip-text
              text-transparent
            "
          >
            FunFrame Studio
          </h1>

          <button
            onClick={() => navigate("/preview")}
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

        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          <div
            className="
              relative
              bg-[#111]
              rounded-[2.5rem]
              overflow-hidden
              aspect-video
              border
              border-white/10
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
                ${getFilterClass()}
              `}
            />

            {stickerItems.map((sticker) => (
              <motion.div
                key={sticker.id}
                drag
                dragMomentum={false}
                className="
                  absolute
                  top-20
                  left-20
                  z-50
                  cursor-grab
                  active:cursor-grabbing
                  select-none
                  flex
                  flex-col
                  items-center
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
                      increaseSize(sticker.id)
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
                      decreaseSize(sticker.id)
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
                      removeSticker(sticker.id)
                    }
                    className="
                      bg-red-500
                      px-2
                      rounded-lg
                    "
                  >
                    x
                  </button>
                </div>
              </motion.div>
            ))}

            <button
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
              "
            ></button>
          </div>

          <div
            className="
              bg-[#090909]
              border
              border-white/10
              rounded-[2.5rem]
              p-6
            "
          >
            <h2 className="text-4xl font-black mb-8">
              Filters
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-12">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
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

            <h2 className="text-4xl font-black mb-8">
              Stickers
            </h2>

            <div className="grid grid-cols-3 gap-4">
              {stickers.map((sticker) => (
                <button
                  key={sticker}
                  onClick={() => addSticker(sticker)}
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
      </div>
    </div>
  );
}