import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white overflow-hidden">
      {/* HERO SECTION */}
      <section
        className="
          relative
          min-h-screen
          flex
          items-center
          px-6
          md:px-20
          overflow-hidden
        "
      >
        {/* BACKGROUND IMAGE */}
        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2070&auto=format&fit=crop"
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
          "
        />

        {/* OVERLAY */}
        <div
          className="
            absolute
            inset-0
            bg-black/60
          "
        />

        {/* CONTENT */}
        <div
          className="
            relative
            z-10
            max-w-3xl
          "
        >
          <p
            className="
              uppercase
              tracking-[0.3em]
              text-pink-300
              text-sm
              mb-6
            "
          >
            Premium Photobooth Experience
          </p>

          <h1
            className="
              text-7xl
              md:text-8xl
              font-bold
              leading-none
              mb-8
            "
          >
            FunFrame ✨
          </h1>

          <p
            className="
              text-xl
              md:text-2xl
              text-gray-200
              leading-relaxed
              mb-10
            "
          >
            Capture your memories with cinematic strips,
            creative filters, animated GIFs, and premium
            photobooth aesthetics.
          </p>

          <button
            onClick={() => navigate("/templates")}
            className="
              bg-white
              text-black
              px-10
              py-5
              rounded-full
              text-xl
              font-semibold
              hover:scale-105
              transition-all
              shadow-2xl
            "
          >
            Start Capturing
          </button>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section
        className="
          py-28
          bg-white
          overflow-hidden
        "
      >
        <div className="mb-16 text-center">
          <p
            className="
              uppercase
              tracking-[0.3em]
              text-sm
              text-pink-500
              mb-4
            "
          >
            Aesthetic Memories
          </p>

          <h2
            className="
              text-5xl
              md:text-7xl
              font-bold
              text-black
            "
          >
            Capture Every Mood
          </h2>
        </div>

        {/* ROW 1 */}
        <motion.div
          animate={{ x: [-100, 0, -100] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            flex
            gap-6
            mb-6
            w-max
          "
        >
          {[
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1974&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1974&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=1974&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1974&auto=format&fit=crop",
          ].map((img, index) => (
            <img
              key={index}
              src={img}
              className="
                w-[320px]
                h-[420px]
                object-cover
                rounded-[40px]
                shadow-2xl
              "
            />
          ))}
        </motion.div>

        {/* ROW 2 */}
        <motion.div
          animate={{ x: [0, -120, 0] }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            flex
            gap-6
            w-max
          "
        >
          {[
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=1974&auto=format&fit=crop",
          ].map((img, index) => (
            <img
              key={index}
              src={img}
              className="
                w-[280px]
                h-[380px]
                object-cover
                rounded-[40px]
                shadow-2xl
              "
            />
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Home;