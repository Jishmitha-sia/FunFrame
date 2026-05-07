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

  const [photos, setPhotos] = useState<string[]>([]);

  const [isCapturing, setIsCapturing] =
    useState(false);

  const [showPreview, setShowPreview] =
    useState(false);

  const [strip, setStrip] =
    useState<string | null>(null);

  // Selected theme
  const selectedTheme =
    (localStorage.getItem(
      "booth-theme"
    ) as BoothTheme) || "aesthetic";

  const theme = themeConfig[selectedTheme];

  const wait = (ms: number) =>
    new Promise((resolve) =>
      setTimeout(resolve, ms)
    );

  // Countdown
  const runCountdown = async () => {
    for (let i = 3; i > 0; i--) {
      setCountdown(i);

      await wait(1000);
    }

    setCountdown(null);
  };

  // Start photobooth
  const startPhotobooth = async () => {
    if (isCapturing) return;

    setPhotos([]);

    setShowPreview(false);

    setStrip(null);

    setIsCapturing(true);

    for (let i = 0; i < 4; i++) {
      await runCountdown();

      const photo =
        cameraRef.current?.capture();

      if (photo) {
        setPhotos((prev) => [
          ...prev,
          photo,
        ]);
      }

      await wait(500);
    }

    setIsCapturing(false);

    setShowPreview(true);
  };

  // Generate strip
  const handleGenerateStrip =
    async () => {
      const generatedStrip =
        await generatePhotoStrip(
          photos,
          selectedTheme
        );

      setStrip(generatedStrip);
    };

  return (
    <div
      className={`h-screen relative overflow-hidden ${theme.background}`}
    >
      {/* Camera */}
      <Camera ref={cameraRef} />

      {/* Dark overlay */}
      <div
        className={`absolute inset-0 ${theme.overlay}`}
      />

      {/* Theme Badge */}
      <div className="absolute top-5 left-5 z-20">
        <div
          className={`px-5 py-3 rounded-full bg-white/90 backdrop-blur-md text-sm font-bold shadow-lg ${theme.text}`}
        >
          {selectedTheme.toUpperCase()} BOOTH
        </div>
      </div>

      {/* Countdown */}
      {countdown !== null && (
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <div className="text-white text-9xl font-bold drop-shadow-2xl">
            {countdown}
          </div>
        </div>
      )}

      {/* Start Button */}
      {!showPreview && (
        <div className="absolute bottom-10 w-full flex justify-center z-20">
          <button
            onClick={startPhotobooth}
            disabled={isCapturing}
            className={`${theme.button} text-white px-10 py-5 rounded-full text-xl font-semibold transition-all duration-300 shadow-2xl disabled:opacity-50`}
          >
            {isCapturing
              ? "Capturing..."
              : "Start Booth"}
          </button>
        </div>
      )}

      {/* Small Preview Photos */}
      <div className="absolute top-5 right-5 flex gap-2 z-20">
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            className="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-lg"
          />
        ))}
      </div>

      {/* Photo Preview Modal */}
      {showPreview && (
        <PhotoPreview
          photos={photos}
          onRetake={() => {
            setPhotos([]);
            setShowPreview(false);
          }}
          onGenerate={handleGenerateStrip}
        />
      )}

      {/* Strip Preview */}
      {strip && (
        <StripPreview
          strip={strip}
          onClose={() => setStrip(null)}
        />
      )}
    </div>
  );
};

export default Booth;