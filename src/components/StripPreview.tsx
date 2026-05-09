type Props = {
  stripUrl: string;
  onClose: () => void;
};

const StripPreview = ({
  stripUrl,
  onClose,
}: Props) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
      <div
        className="
          bg-white
          rounded-[40px]
          p-8
          w-[500px]
          max-h-[90vh]
          overflow-y-auto
          shadow-2xl
        "
      >
        <div className="flex justify-center">
          <img
            src={stripUrl}
            className="
              w-[320px]
              rounded-3xl
              shadow-xl
            "
          />
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={onClose}
            className="
              flex-1
              py-4
              rounded-2xl
              bg-black
              text-white
              text-2xl
              font-bold
              hover:scale-105
              transition-all
            "
          >
            Close
          </button>

          <a
            href={stripUrl}
            download="photobooth-strip.png"
            className="
              flex-1
              py-4
              rounded-2xl
              bg-pink-500
              text-white
              text-2xl
              font-bold
              text-center
              hover:scale-105
              transition-all
            "
          >
            Download
          </a>
        </div>
      </div>
    </div>
  );
};

export default StripPreview;