import {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";

export type CameraHandle = {
  capture: () => string | null;
};

const Camera = forwardRef<CameraHandle>((props, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Camera error:", error);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (
          videoRef.current.srcObject as MediaStream
        ).getTracks();

        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const capture = () => {
    if (!videoRef.current) return null;

    const canvas = document.createElement("canvas");
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    if (!ctx) return null;

    // remove mirror effect while saving
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL("image/png");
  };

  useImperativeHandle(ref, () => ({
    capture,
  }));

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      className="w-full h-full object-cover scale-x-[-1]"
    />
  );
});

export default Camera;