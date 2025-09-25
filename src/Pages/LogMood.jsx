import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Save, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const moods = [
  { value: 1, emoji: "😢", label: "Very Sad" },
  { value: 2, emoji: "😞", label: "Sad" },
  { value: 3, emoji: "😐", label: "Neutral" },
  { value: 4, emoji: "😊", label: "Happy" },
  { value: 5, emoji: "😄", label: "Very Happy" },
];

const prompts = {
  1: "What's been weighing on your heart today?",
  2: "Share what's bringing you down. You're not alone.",
  3: "How's your day going? Any small moments worth noting?",
  4: "What's bringing joy to your day?",
  5: "What's making you feel so amazing today?",
};

const LogMood = () => {
  const [selectedMood, setSelectedMood] = useState(null); // Start with nothing selected
  const [note, setNote] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const navigate = useNavigate();

  // Save mood to localStorage
  const handleSave = async () => {
    if (!selectedMood) {
      alert("Please select a mood before saving!");
      return;
    }

    setIsSaving(true);

    const newEntry = {
      id: Date.now(),
      mood: moods.find((m) => m.value === selectedMood)?.emoji,
      label: moods.find((m) => m.value === selectedMood)?.label,
      note,
      date: new Date().toISOString(),
    };

    // Fetch existing data
    const existingData = JSON.parse(localStorage.getItem("moodHistory")) || [];

    // Add new entry
    const updatedData = [...existingData, newEntry];
    localStorage.setItem("moodHistory", JSON.stringify(updatedData));

    // Simulate a small delay for animation
    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsSaving(false);

    // Redirect to History page
    navigate("/history");
  };

  const selectedMoodObj = moods.find((mood) => mood.value === selectedMood);

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-3xl mx-auto space-y-6 min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center text-accent-foreground">
        <button
          className="pr-4 rounded-2xl bg-transparent hover:bg-gray-200 p-1"
          onClick={() => navigate(-1)} // Go back
          aria-label="Go Back"
        >
          <ArrowLeft />
        </button>
        <Sparkles className="w-6 h-6 text-purple-500" />
        <h1 className="text-xl font-semibold text-gray-600 pl-2">
          Log Your Mood
        </h1>
      </div>

      {/* Mood Selection */}
      <motion.div
        className="bg-white shadow-md rounded-2xl p-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-lg font-medium text-gray-700 mb-4">
          How are you feeling today?
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4">
          {moods.map((mood) => (
            <motion.button
              key={mood.value}
              onClick={() => setSelectedMood(mood.value)}
              className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-full contain-content transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 ${
                selectedMood === mood.value
                  ? "bg-purple-100 border-2 border-purple-400"
                  : "bg-gray-100 hover:bg-gray-300"
              }`}
              whileTap={{ scale: 0.9 }}
            >
              <span className="text-2xl sm:text-3xl">{mood.emoji}</span>
            </motion.button>
          ))}
        </div>

        {/* Mood Label */}
        <div className="mt-2 text-sm text-gray-700 font-semibold ">
          {selectedMoodObj?.label}
        </div>
      </motion.div>

      {/* Show this only when mood is selected */}
      <AnimatePresence>
        {selectedMood && (
          <>
            {/* Prompt + Textarea */}
            <motion.div
              className="bg-white shadow-md rounded-2xl p-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-center mb-4 ">
                <span className="text-5xl transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
                  {selectedMoodObj.emoji}
                </span>
              </div>
              <h2 className="text-center text-gray-600 text-lg font-medium mb-4">
                {prompts[selectedMood]}
              </h2>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Write about your day..."
                className="text-accent-foreground w-full p-3 border-2 rounded-xl focus:ring-2 focus:ring-purple-400 resize-none min-h-[120px]"
              />
            </motion.div>

            {/* Save Button */}
            <motion.div
              className="bg-white shadow-2xl rounded-2xl p-6 text-center transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`w-full flex justify-center items-center gap-2 py-3 text-white rounded-xl transition ${
                  isSaving
                    ? "bg-purple-400 cursor-not-allowed"
                    : "bg-purple-500 hover:bg-purple-600"
                }`}
              >
                {isSaving ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Save className="w-5 h-5 " />
                  </motion.div>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Mood
                  </>
                )}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LogMood;
