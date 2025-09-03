import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import LogMood from "./Pages/LogMood";
import History from "./Pages/History";
import Boost from "./Pages/Boost";
import Settings from "./Pages/Settings";
import Navigation from "./Components/Navigation";

function App() {
  return (
    <div className="min-h-screen bg-white pb-16">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/log" element={<LogMood />} />
        <Route path="/history" element={<History />} />
        <Route path="/boost" element={<Boost />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <Navigation />
    </div>
  );
}

export default App;
