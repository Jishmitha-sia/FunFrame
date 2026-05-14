# FunFrame — Cinematic Photobooth Studio

A premium, browser-based photobooth web app built with **React**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**. Capture photos with live filters, choose from beautiful templates, generate animated GIFs, and download high-quality photo strips — all in the browser, no backend required.

---

## Features

### Live Camera Booth
- Real-time webcam feed with **8 cinematic filters**: Normal, Noir, Dreamy, Cyberpunk, Warm, VHS, Pop, Cool
- **3-second countdown** with animated overlay before each shot
- **Shutter sound** synthesized via the Web Audio API (no audio files needed)
- **Flash effect** on capture for an authentic photobooth feel
- **Pose prompts** and "Booth Director" lines to guide your shots
- **Draggable emoji stickers** (✨ 💖 🎀 😎 🔥 🌸) that can be resized and removed
- **Retake** any individual photo without restarting the session
- Progress bar showing how many shots have been taken

### Template Styles
| Template | Photos | Layout |
|---|---|---|
| Classic Strip | 4 | Vertical strip |
| Polaroid | 1 | Single framed photo |
| Film Roll | 3 | Cinematic dark strip |
| Square Grid | 4 | 2×2 grid |

### Preview & Personalization
- Live preview of your chosen template with your captured photos
- Customize **event title**, **tagline**, and **footer note**
- Choose an **accent color** (Pink, Violet, Gold, Mint) applied to the strip
- **Download as PNG** — high-resolution canvas-rendered strip
- **Create & download an animated GIF** from your photos (via gifshot)
- **QR code** auto-generated from your event info for easy sharing
- **Share or copy** link via the Web Share API (falls back to clipboard)

### Landing Page
- Cinematic hero section with animated floating photo cards and 3D mouse-tracking tilt
- Auto-scrolling gallery of sample images
- Feature highlights, FAQ accordion, and contact form section
- Smooth Framer Motion animations throughout

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |
| [Framer Motion](https://www.framer.com/motion/) | Animations & gestures |
| [React Router v7](https://reactrouter.com/) | Client-side routing |
| [gifshot](https://github.com/yahoo/gifshot) | Animated GIF generation |
| [html2canvas](https://html2canvas.hertzen.com/) | Canvas rendering |
| [lucide-react](https://lucide.dev/) | Icons |
| [react-icons](https://react-icons.github.io/react-icons/) | Social media icons |
| Web Audio API | Synthesized shutter sound |
| MediaDevices API | Webcam access |

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone git@github.com:Jishmitha-sia/FunFrame.git
cd FunFrame

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

> **Note:** The app requires camera access. Make sure to allow webcam permissions when prompted by the browser.

### Build for Production

```bash
npm run build
```

The production-ready files will be output to the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## Project Structure

```
src/
├── pages/
│   ├── Home.tsx          # Landing page with hero, gallery, features & FAQ
│   ├── Templates.tsx     # Template selection page
│   ├── Booth.tsx         # Live camera booth with filters & stickers
│   └── Preview.tsx       # Photo strip preview, download & sharing
├── components/
│   ├── Camera.tsx        # Camera component
│   ├── PhotoPreview.tsx  # Individual photo preview
│   └── StripPreview.tsx  # Strip layout preview
├── hooks/                # Custom React hooks
├── store/                # State management
├── utils/
│   ├── generateGif.ts    # GIF generation utilities
│   └── generateStrip.ts  # Photo strip canvas utilities
├── types/
│   ├── theme.ts          # Theme type definitions
│   ├── gif.d.ts          # gif.js type declarations
│   └── gifshot.d.ts      # gifshot type declarations
├── App.tsx               # Root component with routing
└── main.tsx              # Application entry point
```

---

## App Flow

```
/ (Home)  →  /templates (Pick a style)  →  /booth (Capture photos)  →  /preview (Download & share)
```

1. **Home** — Learn about FunFrame and click "Launch Booth" or "Start Capturing"
2. **Templates** — Choose from Classic Strip, Polaroid, Film Roll, or Square Grid
3. **Booth** — Take photos with live filters, stickers, and pose prompts; auto-advances when all shots are taken
4. **Preview** — Personalize your strip, download as PNG, generate a GIF, or share via QR code

---

## Available Filters

| Filter | Effect |
|---|---|
| Normal | No filter |
| Noir | Grayscale + high contrast |
| Dreamy | Bright, soft, slightly blurred |
| Cyberpunk | High contrast + hue-rotated neon |
| Warm | Sepia + warm tones |
| VHS | Desaturated + low brightness |
| Pop | Hyper-saturated + contrast |
| Cool | Blue-shifted hue rotation |

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## Browser Compatibility

Recommended browsers: **Chrome**, **Edge**, **Firefox**, **Safari** (latest versions).

---

## License

This project is private. All rights reserved.
