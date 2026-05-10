import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Camera,
  Sparkles,
  Download,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

const features = [
  {
    icon: <Camera size={42} />,
    title: "Live Filters",
    desc: "Apply cinematic real-time filters while capturing memories.",
  },
  {
    icon: <Sparkles size={42} />,
    title: "Premium Templates",
    desc: "Create aesthetic strips, polaroids, film rolls and modern layouts.",
  },
  {
    icon: <Download size={42} />,
    title: "Instant Downloads",
    desc: "Export high-quality photos, GIFs and share instantly.",
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop",
];

const faqs = [
  {
    q: "What is FunFrame all about?",
    a: "FunFrame is a premium cinematic photobooth platform designed for aesthetic memories, GIFs, strips and social captures.",
  },
  {
    q: "How can I select a template?",
    a: "Choose your favorite template from classic strips, polaroids, film rolls and modern cinematic layouts.",
  },
  {
    q: "Can I download my photos?",
    a: "Yes. You can instantly download photo strips, aesthetic captures and animated GIF exports.",
  },
  {
    q: "Are there any strip size options?",
    a: "Absolutely. FunFrame supports multiple strip layouts including 4x1, 3x1, polaroids and square grids.",
  },
  {
    q: "What filters are available?",
    a: "Enjoy cinematic filters, vintage aesthetics, black & white effects, neon moods and more.",
  },
];

export default function Home() {
  const navigate = useNavigate();

  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  return (
    <div className="bg-black text-white overflow-hidden">

{/* PREMIUM NAVBAR */}

<div className="fixed top-0 left-0 w-full z-50 px-6 pt-6">

  <motion.nav
    initial={{
      opacity: 0,
      y: -30,
    }}
    animate={{
      opacity: 1,
      y: 0,
    }}
    transition={{
      duration: 0.8,
    }}
    className="
      max-w-7xl
      mx-auto
      bg-[#111111]/90
      backdrop-blur-2xl
      border
      border-white/10
      rounded-full
      px-6
      py-4
      shadow-[0_20px_80px_rgba(0,0,0,0.5)]
    "
  >

    <div className="flex items-center justify-between">

      {/* LEFT */}

      <div
        className="
          flex
          items-center
          gap-4
          cursor-pointer
        "
        onClick={() => navigate("/")}
      >

        <div
          className="
            w-12
            h-12
            rounded-full
            overflow-hidden
          "
        >

          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=300&auto=format&fit=crop"
            alt=""
            className="
              w-full
              h-full
              object-cover
            "
          />

        </div>

        <h1
          className="
            text-4xl
            font-black
            bg-gradient-to-r
            from-pink-400
            via-fuchsia-400
            to-violet-400
            bg-clip-text
            text-transparent
          "
        >
          FunFrame
        </h1>

      </div>

      {/* CENTER LINKS */}

      <div
        className="
          hidden
          md:flex
          items-center
          gap-10
        "
      >

        <button
          onClick={() => navigate("/templates")}
          className="
            text-white/80
            hover:text-white
            transition
            text-xl
            font-semibold
          "
        >
          Templates
        </button>

        <button
          onClick={() => navigate("/booth")}
          className="
            text-white/80
            hover:text-white
            transition
            text-xl
            font-semibold
          "
        >
          Capture
        </button>

        <button
          onClick={() => navigate("/preview")}
          className="
            text-white/80
            hover:text-white
            transition
            text-xl
            font-semibold
          "
        >
          Preview
        </button>

      </div>

      {/* RIGHT BUTTON */}

      <motion.button
        whileHover={{
          scale: 1.05,
        }}
        whileTap={{
          scale: 0.95,
        }}
        onClick={() => navigate("/templates")}
        className="
          bg-white
          text-black
          px-8
          py-4
          rounded-full
          text-xl
          font-black
        "
      >
        Start Capturing
      </motion.button>

    </div>

  </motion.nav>

</div>

      {/* HERO */}

      <section className="relative min-h-screen flex items-center overflow-hidden">

        <div className="absolute inset-0">

          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2070&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/70" />

          <div className="absolute inset-0 bg-gradient-to-r from-pink-900/30 via-black/40 to-purple-900/30" />

        </div>

        {/* GLOWS */}

        <div className="absolute top-40 left-20 w-[500px] h-[500px] bg-pink-500/20 blur-[160px] rounded-full" />

        <div className="absolute bottom-20 right-20 w-[400px] h-[400px] bg-purple-500/20 blur-[160px] rounded-full" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >

            <p className="uppercase tracking-[0.45em] text-pink-400 text-sm mb-8">
              Premium Photobooth Experience
            </p>

            <h1 className="text-7xl md:text-8xl font-black leading-[0.95] mb-8">
              Capture
              <br />
              Viral
              <br />
              Memories
            </h1>

            <p className="text-white/70 text-2xl leading-relaxed max-w-2xl mb-12">
              Create cinematic photo strips, animated GIFs,
              aesthetic edits, premium filters and unforgettable
              memories with the next-generation photobooth studio.
            </p>

            <div className="flex flex-wrap gap-6">

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/templates")}
                className="
                  bg-white
                  text-black
                  px-10
                  py-5
                  rounded-full
                  text-xl
                  font-black
                "
              >
                Launch Booth
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/preview")}
                className="
                  border
                  border-white/15
                  bg-white/5
                  backdrop-blur-xl
                  px-10
                  py-5
                  rounded-full
                  text-xl
                  font-bold
                "
              >
                View Preview
              </motion.button>

            </div>

          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative h-[750px] hidden lg:block"
          >

            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="
                absolute
                top-0
                right-24
                w-[330px]
                h-[460px]
                rounded-[3rem]
                overflow-hidden
                border
                border-white/10
                shadow-[0_0_80px_rgba(236,72,153,0.25)]
              "
            >

              <img
                src={galleryImages[0]}
                alt=""
                className="w-full h-full object-cover"
              />

            </motion.div>

            <motion.div
              animate={{ rotate: [-8, -4, -8] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="
                absolute
                bottom-10
                left-10
                bg-white
                p-5
                rounded-[2rem]
                rotate-[-8deg]
                shadow-2xl
              "
            >

              <img
                src={galleryImages[1]}
                alt=""
                className="w-[260px] h-[320px] object-cover rounded-2xl"
              />

              <p className="text-black text-center mt-4 font-bold text-xl">
                FunFrame Studio
              </p>

            </motion.div>

          </motion.div>

        </div>

      </section>

      {/* SCROLL GALLERY */}

      <section className="relative py-36 bg-[#050505] overflow-hidden">

        <div className="text-center mb-24 px-6">

          <p className="uppercase tracking-[0.4em] text-pink-400 text-sm mb-6">
            Viral Gallery
          </p>

          <h2 className="text-5xl md:text-7xl font-black leading-tight">
            Scroll Through
            <br />
            Aesthetic Moments
          </h2>

        </div>

        <motion.div
          animate={{ x: [0, -300] }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 20,
            ease: "linear",
          }}
          className="flex gap-8 mb-8 w-max px-6"
        >

          {[...galleryImages, ...galleryImages].map((img, index) => (

            <motion.div
              whileHover={{ y: -12 }}
              key={index}
              className="
                min-w-[340px]
                h-[460px]
                rounded-[2.5rem]
                overflow-hidden
                border
                border-white/10
              "
            >

              <img
                src={img}
                alt=""
                className="w-full h-full object-cover"
              />

            </motion.div>

          ))}

        </motion.div>

        <motion.div
          animate={{ x: [-300, 0] }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 22,
            ease: "linear",
          }}
          className="flex gap-8 w-max px-6"
        >

          {[...galleryImages]
            .reverse()
            .concat([...galleryImages].reverse())
            .map((img, index) => (

              <motion.div
                whileHover={{ y: -12 }}
                key={index}
                className="
                  min-w-[400px]
                  h-[300px]
                  rounded-[2.5rem]
                  overflow-hidden
                  border
                  border-white/10
                "
              >

                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover"
                />

              </motion.div>

            ))}

        </motion.div>

      </section>

      {/* BLOCK 4 INSPIRED CTA */}

      <section className="relative py-40 overflow-hidden">

        <div className="absolute inset-0">

          <img
            src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2070&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/70" />

        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6">

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="
              bg-white/10
              backdrop-blur-2xl
              border
              border-white/10
              rounded-[3rem]
              p-16
              text-center
            "
          >

            <p className="uppercase tracking-[0.4em] text-pink-400 text-sm mb-6">
              Capture Together
            </p>

            <h2 className="text-5xl md:text-7xl font-black leading-tight mb-8">
              Turn Every
              <br />
              Moment Viral
            </h2>

            <p className="text-white/70 text-xl leading-relaxed max-w-3xl mx-auto mb-12">
              Premium cinematic booths designed for creators,
              parties, events and unforgettable social moments.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/templates")}
              className="
                bg-white
                text-black
                px-10
                py-5
                rounded-full
                text-xl
                font-black
              "
            >
              Start Capturing
            </motion.button>

          </motion.div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="relative py-32 px-6 bg-black">

        <div className="max-w-7xl mx-auto">

          <div className="grid md:grid-cols-3 gap-8">

            {features.map((feature, index) => (

              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="
                  bg-[#090909]
                  border
                  border-white/10
                  rounded-[2.5rem]
                  p-10
                  hover:border-pink-500/40
                  transition
                "
              >

                <div className="mb-8 text-pink-400">
                  {feature.icon}
                </div>

                <h3 className="text-3xl font-black mb-4">
                  {feature.title}
                </h3>

                <p className="text-white/60 text-lg leading-relaxed">
                  {feature.desc}
                </p>

              </motion.div>

            ))}

          </div>

        </div>

      </section>

      {/* FAQ */}

      <section className="relative py-32 px-6 bg-[#050505] overflow-hidden">

        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-pink-500/10 blur-[140px] rounded-full" />

        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/10 blur-[140px] rounded-full" />

        <div className="max-w-5xl mx-auto relative z-10">

          <div className="text-center mb-20">

            <p className="uppercase tracking-[0.4em] text-pink-400 text-sm mb-6">
              FAQ
            </p>

            <h2 className="text-5xl md:text-7xl font-black leading-tight">
              Frequently Asked
              <br />
              Questions
            </h2>

          </div>

          <div className="space-y-5">

            {faqs.map((faq, index) => {

              const isOpen = openFAQ === index;

              return (

                <motion.div
                  key={index}
                  layout
                  className="
                    bg-white/5
                    border
                    border-white/10
                    rounded-[2rem]
                    backdrop-blur-xl
                    overflow-hidden
                  "
                >

                  <button
                    onClick={() =>
                      setOpenFAQ(isOpen ? null : index)
                    }
                    className="
                      w-full
                      flex
                      items-center
                      justify-between
                      text-left
                      p-8
                    "
                  >

                    <h3 className="text-2xl font-bold">
                      {faq.q}
                    </h3>

                    <motion.div
                      animate={{
                        rotate: isOpen ? 180 : 0,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                    >

                      <ChevronDown size={30} />

                    </motion.div>

                  </button>

                  {isOpen && (

                    <motion.div
                      initial={{
                        opacity: 0,
                        height: 0,
                      }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                      }}
                      transition={{
                        duration: 0.35,
                      }}
                      className="px-8 pb-8"
                    >

                      <p className="text-white/65 text-lg leading-relaxed">
                        {faq.a}
                      </p>

                    </motion.div>

                  )}

                </motion.div>

              );

            })}

          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="border-t border-white/10 py-14 px-6 bg-[#050505]">

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8 items-center">

          <div>

            <h2
              className="
                text-5xl
                font-black
                bg-gradient-to-r
                from-pink-400
                to-purple-500
                bg-clip-text
                text-transparent
                mb-4
              "
            >
              FunFrame
            </h2>

            <p className="text-white/50">
              Premium cinematic photobooth experience.
            </p>

          </div>

          <div className="flex gap-8 text-white/60 text-lg">

            <button className="hover:text-pink-400 transition">
              Instagram
            </button>

            <button className="hover:text-pink-400 transition">
              TikTok
            </button>

            <button className="hover:text-pink-400 transition">
              YouTube
            </button>

          </div>

        </div>

      </footer>

    </div>
  );
}