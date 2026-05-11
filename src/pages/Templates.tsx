import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const templates = [
  {
    id: "classic",
    name: "Classic Strip",
    photos: 4,
    desc: "4 Photos • Vertical",

    preview: (
      <div className="flex flex-col gap-2">
        <div className="w-28 h-16 rounded-xl bg-white/20"></div>
        <div className="w-28 h-16 rounded-xl bg-white/20"></div>
        <div className="w-28 h-16 rounded-xl bg-white/20"></div>
        <div className="w-28 h-16 rounded-xl bg-white/20"></div>
      </div>
    ),
  },

  {
    id: "polaroid",
    name: "Polaroid",
    photos: 1,
    desc: "Single Photo",

    preview: (
      <div className="bg-white p-4 rounded-2xl">
        <div className="w-44 h-44 rounded-xl bg-gray-300"></div>
      </div>
    ),
  },

  {
    id: "filmroll",
    name: "Film Roll",
    photos: 3,
    desc: "3 Photos • Cinematic",

    preview: (
      <div className="flex flex-col gap-3">
        <div className="w-24 h-16 rounded-xl bg-black border border-white/20"></div>

        <div className="w-24 h-16 rounded-xl bg-black border border-white/20"></div>

        <div className="w-24 h-16 rounded-xl bg-black border border-white/20"></div>
      </div>
    ),
  },

  {
    id: "square",
    name: "Square Grid",
    photos: 4,
    desc: "2x2 Layout",

    preview: (
      <div className="grid grid-cols-2 gap-2">
        <div className="w-20 h-20 rounded-xl bg-white/20"></div>
        <div className="w-20 h-20 rounded-xl bg-white/20"></div>
        <div className="w-20 h-20 rounded-xl bg-white/20"></div>
        <div className="w-20 h-20 rounded-xl bg-white/20"></div>
      </div>
    ),
  },
];

export default function Templates() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white px-6 py-14">
      <div className="max-w-7xl mx-auto">

        {/* BACK BUTTON */}

        <button
          onClick={() => navigate("/")}
          className="
            mb-10
            text-white/80
            hover:text-pink-400
            transition
            text-lg
          "
        >
          ← Back
        </button>

        {/* HEADING */}

        <div className="text-center mb-16">

          <p
            className="
              uppercase
              tracking-[0.35em]
              text-pink-400
              text-sm
              mb-4
            "
          >
            Premium Layouts
          </p>

          <h1
            className="
              text-6xl
              md:text-7xl
              font-black
              leading-tight
            "
          >
            Pick Your
            <br />
            Photobooth Style
          </h1>

        </div>

        {/* TEMPLATE GRID */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {templates.map((template) => (

            <motion.div
              key={template.id}
              whileHover={{
                y: -12,
                scale: 1.025,
              }}
              whileTap={{
                scale: 0.98,
              }}
              transition={{ duration: 0.25 }}

              onClick={() =>
                navigate("/booth", {
                  state: {
                    template: template.id,
                    maxPhotos: template.photos,
                  },
                })
              }

              className="
                bg-[#090909]
                border
                border-white/10
                rounded-[2rem]
                p-6
                cursor-pointer
                hover:border-pink-500/50
                transition
                shadow-2xl
                overflow-hidden
                group
              "
            >

              {/* TEMPLATE PREVIEW */}

              <div
                className="
                  relative
                  h-[320px]
                  rounded-[2rem]
                  bg-gradient-to-b
                  from-pink-950
                  to-purple-950
                  flex
                  items-center
                  justify-center
                  mb-6
                  overflow-hidden
                "
              >
                <motion.div
                  className="
                    absolute
                    inset-y-0
                    left-[-70%]
                    w-1/2
                    bg-white/15
                    blur-2xl
                    rotate-12
                  "
                  animate={{
                    x: ["0%", "360%"],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative z-10"
                >
                  {template.preview}
                </motion.div>

                <div
                  className="
                    absolute
                    bottom-5
                    left-1/2
                    -translate-x-1/2
                    rounded-full
                    bg-white
                    px-5
                    py-2
                    text-sm
                    font-black
                    text-black
                    opacity-0
                    translate-y-3
                    transition
                    group-hover:opacity-100
                    group-hover:translate-y-0
                  "
                >
                  Start This Style
                </div>
              </div>

              {/* TEMPLATE INFO */}

              <h2 className="text-3xl font-bold mb-2">
                {template.name}
              </h2>

              <p className="text-white/50 text-lg">
                {template.desc}
              </p>

              <div
                className="
                  mt-5
                  h-1
                  w-0
                  rounded-full
                  bg-gradient-to-r
                  from-pink-400
                  to-fuchsia-400
                  transition-all
                  duration-300
                  group-hover:w-full
                "
              />

            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
