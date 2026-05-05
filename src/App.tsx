import { useState } from "react";
import Home from "./pages/Home";
import Booth from "./pages/Booth";

function App() {
  const [started, setStarted] = useState(false);

  return started ? (
    <Booth />
  ) : (
    <Home onStart={() => setStarted(true)} />
  );
}

export default App;