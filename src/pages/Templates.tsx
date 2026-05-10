import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const templates = [
  {
    name: "Classic Strip",
    size: "4 Photos • Vertical",
    path: "/booth",
    preview: (
      <div className="flex flex-col gap-2">
        <div className="h-20 rounded-xl bg-white/90"></div>
        <div className="h-20 rounded-xl bg-white/80"></div>
        <div className="h-20 rounded-xl bg-white/70"></div>
        <div className="h-20 rounded-xl bg-white/60"></div>
      </div>
    ),
  },

  {
    name: "Polaroid",
    size: "Single Photo",
    path: "/booth",
    preview: (
      <div
        className="
          bg-white
          rounded-2xl
          p-3
          w-full
        "
      >
        <div className="h-56 bg-gray-200 rounded-xl"></div>

        <div className="h-8"></div>
      </div>
    ),
  },

  {
    name: "Film Roll",
    size: "3 Photos • Cinematic",
    path: "/booth",
    preview: (
      <div
        className="
          flex
          flex-col
          gap-2
          border-4
          border-white
          p-2
        "
      >
        <div className="h-24 bg-white/90"></div>
        <div className="h-24 bg-white/70"></div>
        <div className="h-24 bg-white/50"></div>
      </div>
    ),
  },

  {
    name: "Square Grid",
    size: "2x2 Layout",
    path: "/booth",
    preview: (
      <div className="grid grid-cols-2 gap-2">
        <div className="h-28 bg-white/90 rounded-xl"></div>
        <div className="h-28 bg-white/80 rounded-xl"></div>
        <div className="h-28 bg-white/70 rounded-xl"></div>
        <div className="h-28 bg-white/60 rounded-xl"></div>
      </div>
    ),
  },
];

const Templates = () => {
  const navigate = useNavigate();

  return (
    <div
      className="
        min-h-screen
        bg-black
        text-white
        px-6
        md:px-16
        py-12
      "
    >
      {/* TOP BAR */}
      <div
        className="
          flex
          items-center
          justify-between
          mb-16
        "
      >
        <button
          onClick={() => navigate("/")}
          className="
            text-lg
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
            font-semibold
          "
        >
          Choose Template
        </h1>

        <div></div>
      </div>

      {/* HEADING */}
      <div className="mb-16">
        <p
          className="
            uppercase
            tracking-[0.3em]
            text-pink-400
            text-sm
            mb-4
          "
        >
          Premium Layouts
        </p>

        <h2
          className="
            text-5xl
            md:text-7xl
            font-bold
            leading-tight
          "
        >
          Pick Your
          <br />
          Photobooth Style
        </h2>
      </div>

      {/* TEMPLATE GRID */}
      <div
        className="
          grid
          md:grid-cols-2
          xl:grid-cols-4
          gap-8
        "
      >
        {templates.map((template, index) => (
          <motion.div
            key={index}
            whileHover={{
              y: -10,
              scale: 1.02,
            }}
            transition={{
              duration: 0.3,
            }}
            onClick={() => navigate(template.path)}
            className="
              bg-white/5
              border
              border-white/10
              rounded-[40px]
              p-6
              cursor-pointer
              hover:border-pink-500/40
              hover:bg-white/10
              transition-all
              backdrop-blur-xl
            "
          >
            {/* PREVIEW */}
            <div
              className="
                bg-gradient-to-b
                from-pink-500/20
                to-purple-500/20
                rounded-[30px]
                p-6
                mb-6
                min-h-[420px]
                flex
                items-center
                justify-center
              "
            >
              {template.preview}
            </div>

            {/* INFO */}
            <h3
              className="
                text-3xl
                font-bold
                mb-3
              "
            >
              {template.name}
            </h3>

            <p
              className="
                text-gray-400
                text-lg
              "
            >
              {template.size}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Templates;