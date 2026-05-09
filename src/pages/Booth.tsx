import { useRef, useState } from "react";

import Camera from "../components/Camera";
import type { CameraHandle } from "../components/Camera";

import PhotoPreview from "../components/PhotoPreview";
import StripPreview from "../components/StripPreview";

import { generatePhotoStrip } from "../utils/generateStrip";

import { themeConfig } from "../config/themes";
import type { BoothTheme } from "../types/theme";

const Booth = () => {
  const cameraRef = useRef<CameraHandle>(null);

  const [countdown, setCountdown] =
    useState<number | null>(null);

  const [photos, setPhotos] =
    useState<string[]>([]);

  const [isCapturing, setIsCapturing] =
    useState(false);

  const [showPreview, setShowPreview] =
    useState(false);

  const [stripUrl, setStripUrl] =
    useState("");

  const [selectedTheme] =
    useState<BoothTheme>("aesthetic");

  const [flash, setFlash] =
    useState(false);

  const currentTheme =
    themeConfig[selectedTheme];

  const capturePhoto = () => {
    const photo =
      cameraRef.current?.capture();

    if (photo) {
      setPhotos((prev) => [
        ...prev,
        photo,
      ]);

      // FLASH EFFECT
      setFlash(true);

      setTimeout(() => {
        setFlash(false);
      }, 120);
    }
  };

  const startCapture = async () => {
    if (isCapturing) return;

    setPhotos([]);
    setIsCapturing(true);

    for (let i = 0; i < 4; i++) {
      let count = 3;

      setCountdown(count);

      await new Promise<void>(
        (resolve) => {
          const interval =
            setInterval(() => {
              count--;

              if (count === 0) {
                clearInterval(
                  interval
                );

                capturePhoto();

                setCountdown(null);

                resolve();
              } else {
                setCountdown(count);
              }
            }, 1000);
        }
      );

      await new Promise((r) =>
        setTimeout(r, 500)
      );
    }

    setIsCapturing(false);
    setShowPreview(true);
  };

  const generateStrip = async () => {
    const url =
      await generatePhotoStrip(
        photos,
        selectedTheme
      );

    setStripUrl(url);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {/* CAMERA */}
      <Camera ref={cameraRef} />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px]" />

      {/* FLASH EFFECT */}
      {flash && (
        <div className="absolute inset-0 bg-white z-50 animate-pulse" />
      )}

      {/* THEME BADGE */}
      <div
        className={`
          absolute top-8 left-8 z-20
          px-8 py-4
          rounded-full
          shadow-2xl
          border
          text-2xl
          font-bold
          tracking-wide
          backdrop-blur-md
          ${currentTheme.badge}
        `}
      >
        {currentTheme.name.toUpperCase()}
      </div>

      {/* LIVE PREVIEW */}
      {photos.length > 0 && (
        <div className="absolute top-8 right-8 z-20">
          <img
            src={photos[photos.length - 1]}
            className="
              w-24 h-24
              object-cover
              rounded-3xl
              border-4 border-white
              shadow-2xl
            "
          />
        </div>
      )}

      {/* COUNTDOWN */}
      {countdown && (
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <h1
            className="
              text-white
              text-[180px]
              font-extrabold
              drop-shadow-[0_0_40px_rgba(255,255,255,0.9)]
              animate-pulse
              select-none
            "
          >
            {countdown}
          </h1>
        </div>
      )}

      {/* BUTTON */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20">
        <button
          onClick={startCapture}
          disabled={isCapturing}
          className={`
            px-14 py-6
            rounded-full
            text-3xl
            font-bold
            transition-all
            duration-300
            shadow-2xl
            active:scale-95
            hover:scale-105
            ${currentTheme.button}
          `}
        >
          {isCapturing
            ? "Capturing..."
            : "Start Booth"}
        </button>
      </div>

      {/* PHOTO PREVIEW */}
      {showPreview && !stripUrl && (
        <PhotoPreview
          photos={photos}
          onClose={() =>
            setShowPreview(false)
          }
          onRetake={() => {
            setPhotos([]);
            setShowPreview(false);
          }}
          onGenerate={generateStrip}
        />
      )}

      {/* STRIP PREVIEW */}
      {stripUrl && (
        <StripPreview
          stripUrl={stripUrl}
          onClose={() => {
            setStripUrl("");
            setShowPreview(false);
          }}
        />
      )}
    </div>
  );
};

export default Booth;