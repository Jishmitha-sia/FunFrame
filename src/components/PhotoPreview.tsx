type Props = {
  photos: string[];
  onClose: () => void;
  onRetake: () => void;
  onGenerate: () => void;
  onGenerateGif: () => void;
};

const PhotoPreview = ({
  photos,
  onClose,
  onRetake,
  onGenerate,
  onGenerateGif,
}: Props) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-6">
      <div
        className="
          bg-white
          rounded-[40px]
          p-8
          w-[720px]
          max-h-[90vh]
          overflow-y-auto
          shadow-2xl
        "
      >
        <h1 className="text-5xl font-bold text-center mb-8">
          Your Photos 📸
        </h1>

        <div className="grid grid-cols-2 gap-4">
          {photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              className="
                w-full
                aspect-[3/4]
                object-cover
                rounded-3xl
              "
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8">
          <button
            onClick={onRetake}
            className="
              py-4
              rounded-2xl
              bg-black
              text-white
              text-xl
              font-bold
              hover:scale-105
              transition-all
            "
          >
            Retake
          </button>

          <button
            onClick={onGenerate}
            className="
              py-4
              rounded-2xl
              bg-pink-500
              text-white
              text-xl
              font-bold
              hover:scale-105
              transition-all
            "
          >
            Strip
          </button>

          <button
            onClick={onGenerateGif}
            className="
              py-4
              rounded-2xl
              bg-purple-600
              text-white
              text-xl
              font-bold
              hover:scale-105
              transition-all
            "
          >
            GIF
          </button>
        </div>

        <button
          onClick={onClose}
          className="
            mt-6
            w-full
            text-gray-500
            text-lg
          "
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PhotoPreview;