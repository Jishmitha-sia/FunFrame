import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-black flex flex-col items-center justify-center text-white px-6">
      <h1 className="text-7xl font-bold mb-6">
        FunFrame ✨
      </h1>

      <p className="text-white/60 text-xl mb-10 text-center max-w-xl">
        Create aesthetic photobooth memories
        with themed booth experiences.
      </p>

      <button
        onClick={() => navigate("/themes")}
        className="bg-pink-500 hover:bg-pink-600 transition px-8 py-4 rounded-full text-xl font-medium"
      >
        Start Experience
      </button>
    </div>
  );
};

export default Home;