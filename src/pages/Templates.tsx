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
              whileHover={{ y: -10, scale: 1.03 }}
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
              "
            >

              {/* TEMPLATE PREVIEW */}

              <div
                className="
                  h-[320px]
                  rounded-[2rem]
                  bg-gradient-to-b
                  from-pink-950
                  to-purple-950
                  flex
                  items-center
                  justify-center
                  mb-6
                "
              >
                {template.preview}
              </div>

              {/* TEMPLATE INFO */}

              <h2 className="text-3xl font-bold mb-2">
                {template.name}
              </h2>

              <p className="text-white/50 text-lg">
                {template.desc}
              </p>

            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}