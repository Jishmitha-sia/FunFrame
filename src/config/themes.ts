import type { BoothTheme } from "../types/theme";

export const themeConfig: Record<
  BoothTheme,
  {
    background: string;
    button: string;
    text: string;
    overlay: string;
  }
> = {
  aesthetic: {
    background: "bg-pink-50",
    button: "bg-pink-500 hover:bg-pink-600",
    text: "text-pink-500",
    overlay: "bg-black/40",
  },

  retro: {
    background: "bg-[#f5e6cc]",
    button: "bg-yellow-700 hover:bg-yellow-800",
    text: "text-yellow-900",
    overlay: "bg-black/30",
  },

  neon: {
    background: "bg-black",
    button: "bg-fuchsia-500 hover:bg-fuchsia-600",
    text: "text-fuchsia-400",
    overlay: "bg-black/60",
  },
};