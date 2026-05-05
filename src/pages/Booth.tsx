import Camera from "../components/Camera";

const Booth = () => {
  return (
    <div className="h-screen bg-black relative">
      <Camera />

      <div className="absolute bottom-10 w-full flex justify-center">
        <button className="bg-white text-black px-6 py-3 rounded-full">
          Capture
        </button>
      </div>
    </div>
  );
};

export default Booth;