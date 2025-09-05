import React, { useState, useEffect } from "react";
import { Sparkles, Calendar, Sparkle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Settings from "./Settings";


const Home = () => {
  const [mood, setMood] = useState("😐 Neutral");
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("Hey Fella"); 

  useEffect(() => {
    const savedName = localStorage.getItem("displayName");
    if (savedName) {
      setDisplayName(savedName);
    }
  }, []);

  // Same moods as LogMood for consistency
  const moods = [
    { value: 1, emoji: "😢", label: "Very Sad", color: "bg-red-100 hover:bg-red-200 text-red-600" },
    { value: 2, emoji: "😞", label: "Sad", color: "bg-orange-100 hover:bg-orange-200 text-orange-600" },
    { value: 3, emoji: "😐", label: "Neutral", color: "bg-gray-100 hover:bg-gray-200 text-gray-600" },
    { value: 4, emoji: "😊", label: "Happy", color: "bg-green-100 hover:bg-green-200 text-green-600" },
    { value: 5, emoji: "😄", label: "Very Happy", color: "bg-purple-100 hover:bg-purple-200 text-purple-600" },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 max-w-4xl mx-auto">
      {/* Greeting */}
      <div className="bg-white shadow-xl rounded-2xl p-4 space-y-2">
        <h1 className="text-xl md:text-2xl font-bold text-gray-600 flex items-center gap-2">
          <span className="text-2xl">👋</span>{displayName} 
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          How are you feeling today?
        </p>
      </div>

      {/* Quick Mood Check */}
      <div className="bg-white shadow-xl rounded-2xl p-5 space-y-5">
        <h2 className="font-semibold text-lg text-center text-gray-600">
          Quick Mood Check
        </h2>

        {/* Mood Buttons */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {moods.map((m) => (
            <button
              key={m.value}
              onClick={() => setMood(`${m.emoji} ${m.label}`)}
              className={`p-4 rounded-full transition text-2xl ${m.color}`}
            >
              {m.emoji}
            </button>
          ))}
        </div>

        {/* Add Details Button */}
        <div className="flex justify-center mt-2">
          <button
            className="rounded-lg px-5 py-2 bg-transparent text-gray-600 hover:bg-gray-100 transition text-sm md:text-base border border-gray-300"
            onClick={() => navigate("/log")}
          >
            Add Details & Note
          </button>
        </div>
      </div>

      {/* Today’s Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white shadow-xl rounded-2xl p-5 space-y-2 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100">
          <h4 className="text-gray-600 font-semibold">Current Mood</h4>
          <p className="text-gray-600 text-sm md:text-base">{mood}</p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-5 space-y-2 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100">
          <h4 className="text-gray-600 font-semibold">Average Mood</h4>
          <p className="text-gray-600 text-sm md:text-base">😐 Neutral</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow-xl rounded-xl p-4">
        <h4 className="text-gray-500 font-semibold mb-6">Quick Actions</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            className="flex flex-col items-center justify-center bg-transparent p-3 rounded-xl hover:bg-gray-100 transition border border-gray-300"
            onClick={() => navigate("/history")}
          >
            <Calendar className="w-6 h-6 mb-2 text-blue-600" />
            <p className="font-semibold text-gray-600 text-sm md:text-base">
              View History
            </p>
          </button>

          <button
            className="flex flex-col items-center justify-center bg-transparent p-3 rounded-xl hover:bg-gray-100 transition border border-gray-300"
            onClick={() => navigate("/boost")}
          >
            <Sparkle className="w-6 h-6 mb-2 text-purple-600" />
            <p className="font-semibold text-gray-600 text-sm md:text-base">
              Mood Booster
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
