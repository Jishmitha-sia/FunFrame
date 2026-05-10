import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const templates = [
  {
    name: "Classic Strip",
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
    name: "Polaroid",
    desc: "Single Photo",
    preview: (
      <div className="bg-white p-4 rounded-2xl">
        <div className="w-44 h-44 rounded-xl bg-gray-300"></div>
      </div>
    ),
  },
  {
    name: "Film Roll",
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
    name: "Square Grid",
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
        <button
          onClick={() => navigate("/")}
          className="mb-10 text-white/80 hover:text-pink-400 transition"
        >
          ← Back
        </button>

        <div className="text-center mb-16">
          <p className="uppercase tracking-[0.35em] text-pink-400 text-sm mb-4">
            Premium Layouts
          </p>

          <h1 className="text-6xl font-black leading-tight">
            Pick Your
            <br />
            Photobooth Style
          </h1>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {templates.map((template, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ duration: 0.25 }}
              onClick={() => navigate("/booth")}
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
              "
            >
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