import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "./Pages/Home";
import LogMood from "./Pages/LogMood";
import History from "./Pages/History";
import Boost from "./Pages/Boost";
import Settings from "./Pages/Settings";
import Navigation from "./Components/Navigation";
import PageWrapper from "./Pages/PageWrapper";
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/log" element={<PageWrapper><LogMood /></PageWrapper>} />
        <Route path="/history" element={<PageWrapper><History /></PageWrapper>} />
        <Route path="/boost" element={<PageWrapper><Boost /></PageWrapper>} />
        <Route path="/settings" element={<PageWrapper><Settings /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white pb-16">
        <AnimatedRoutes />
        <Navigation />
      </div>
    </Router>
  );
}
