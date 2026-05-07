type Props = {
  strip: string;
  onClose: () => void;
};

const StripPreview = ({
  strip,
  onClose,
}: Props) => {
  const downloadStrip = () => {
    const link = document.createElement("a");

    link.href = strip;
    link.download = "funframe-strip.png";

    link.click();
  };

  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-30 flex items-center justify-center p-4">
      <div className="bg-[#fff7fb] rounded-3xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="p-5 border-b border-pink-100">
          <h2 className="text-3xl font-bold text-center text-pink-500">
            Your Aesthetic Strip ✨
          </h2>
        </div>

        {/* Scrollable strip */}
        <div className="flex-1 overflow-y-auto p-4 flex justify-center">
          <img
            src={strip}
            className="rounded-3xl shadow-lg w-full max-w-[320px]"
          />
        </div>

        {/* Buttons */}
        <div className="p-4 flex gap-3 border-t border-pink-100 bg-white">
          <button
            onClick={onClose}
            className="flex-1 bg-black text-white py-3 rounded-2xl font-medium"
          >
            Close
          </button>

          <button
            onClick={downloadStrip}
            className="flex-1 bg-pink-500 hover:bg-pink-600 transition text-white py-3 rounded-2xl font-medium"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default StripPreview;