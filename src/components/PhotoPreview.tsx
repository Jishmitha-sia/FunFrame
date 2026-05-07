type Props = {
  photos: string[];
  onRetake: () => void;
};

const PhotoPreview = ({ photos, onRetake }: Props) => {
  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-20 flex items-center justify-center">
      <div className="bg-white rounded-3xl p-6 w-[90%] max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Your Photos 📸
        </h2>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              className="rounded-xl"
            />
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onRetake}
            className="flex-1 bg-black text-white py-3 rounded-xl"
          >
            Retake
          </button>

          <button
            className="flex-1 bg-pink-500 text-white py-3 rounded-xl"
          >
            Generate Strip
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoPreview;