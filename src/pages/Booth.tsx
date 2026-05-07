import { useRef, useState } from "react";
import Camera from "../components/Camera";
import type { CameraHandle } from "../components/Camera";

const Booth = () => {
  const cameraRef = useRef<CameraHandle>(null);

  const [countdown, setCountdown] = useState<number | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);

  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const runCountdown = async () => {
    for (let i = 3; i > 0; i--) {
      setCountdown(i);
      await wait(1000);
    }

    setCountdown(null);
  };

  const startPhotobooth = async () => {
    if (isCapturing) return;

    setPhotos([]);
    setIsCapturing(true);

    for (let i = 0; i < 4; i++) {
      await runCountdown();

      const photo = cameraRef.current?.capture();

      if (photo) {
        setPhotos((prev) => [...prev, photo]);
      }

      await wait(500);
    }

    setIsCapturing(false);
  };

  return (
    <div className="h-screen bg-black relative overflow-hidden">
      <Camera ref={cameraRef} />

      {/* Countdown */}
      {countdown !== null && (
        <div className="absolute inset-0 flex items-center justify-center text-white text-8xl font-bold">
          {countdown}
        </div>
      )}

      {/* Capture Button */}
      <div className="absolute bottom-10 w-full flex justify-center">
        <button
          onClick={startPhotobooth}
          disabled={isCapturing}
          className="bg-white text-black px-8 py-4 rounded-full text-lg disabled:opacity-50"
        >
          {isCapturing ? "Capturing..." : "Start Booth"}
        </button>
      </div>

      {/* Preview Photos */}
      <div className="absolute top-4 left-4 flex gap-2">
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            className="w-20 h-20 object-cover border-2 border-white"
          />
        ))}
      </div>
    </div>
  );
};

export default Booth;