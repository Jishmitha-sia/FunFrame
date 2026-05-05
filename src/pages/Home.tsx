type Props = {
  onStart: () => void;
};

const Home = ({ onStart }: Props) => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-5xl font-bold mb-6">FunFrame 🎞️</h1>

      <p className="mb-8 text-gray-400">
        Capture your moments in style
      </p>

      <button
        onClick={onStart}
        className="px-6 py-3 bg-white text-black rounded-xl hover:scale-105 transition"
      >
        Start Booth
      </button>
    </div>
  );
};

export default Home;