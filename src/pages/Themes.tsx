import { useNavigate } from "react-router-dom";
import type { BoothTheme } from "../types/theme";

const themes: {
  id: BoothTheme;
  title: string;
  description: string;
  emoji: string;
  bg: string;
}[] = [
  {
    id: "aesthetic",
    title: "Aesthetic Booth",
    description: "Soft pastel dreamy vibes",
    emoji: "✨",
    bg: "from-pink-200 to-rose-100",
  },
  {
    id: "retro",
    title: "Retro Booth",
    description: "Vintage film memories",
    emoji: "📷",
    bg: "from-yellow-200 to-orange-100",
  },
  {
    id: "neon",
    title: "Neon Booth",
    description: "Cyberpunk glow energy",
    emoji: "🌌",
    bg: "from-fuchsia-500 to-indigo-500",
  },
];

const Themes = () => {
  const navigate = useNavigate();

  const selectTheme = (theme: BoothTheme) => {
    localStorage.setItem("booth-theme", theme);

    navigate("/booth");
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      {/* Header */}
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-3">
          Choose Your Booth ✨
        </h1>

        <p className="text-white/60 mb-10 text-lg">
          Pick your vibe before entering FunFrame
        </p>

        {/* Theme cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => selectTheme(theme.id)}
              className={`bg-gradient-to-br ${theme.bg} rounded-3xl p-8 text-left shadow-2xl hover:scale-105 transition duration-300`}
            >
              <div className="text-5xl mb-5">
                {theme.emoji}
              </div>

              <h2 className="text-3xl font-bold text-black mb-2">
                {theme.title}
              </h2>

              <p className="text-black/70 text-lg">
                {theme.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Themes;