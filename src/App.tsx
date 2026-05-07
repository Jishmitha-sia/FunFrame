import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Booth from "./pages/Booth";
import Themes from "./pages/Themes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/themes"
          element={<Themes />}
        />

        <Route
          path="/booth"
          element={<Booth />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;