import type { BoothTheme } from "../types/theme";

export const themeConfig: Record<
  BoothTheme,
  {
    name: string;
    badge: string;
    button: string;
  }
> = {
  aesthetic: {
    name: "Aesthetic Booth",

    badge:
      "bg-pink-200/80 text-pink-900 border-pink-300",

    button:
      "bg-pink-500 hover:bg-pink-600 text-white",
  },

  retro: {
    name: "Retro Booth",

    badge:
      "bg-yellow-200/80 text-yellow-900 border-yellow-400",

    button:
      "bg-yellow-700 hover:bg-yellow-800 text-white",
  },

  neon: {
    name: "Neon Booth",

    badge:
      "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500",

    button:
      "bg-fuchsia-500 hover:bg-fuchsia-600 text-white",
  },
};