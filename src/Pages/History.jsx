import React, { useEffect, useState } from "react";
import { Calendar, ArrowLeft, Filter, Trash2 } from "lucide-react";

const History = () => {
  const [filter, setFilter] = useState("all");
  const [moodHistory, setMoodHistory] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load mood data from localStorage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("moodHistory")) || [];
    setMoodHistory(storedData);
  }, []);

  // Filtering logic
  const filteredHistory = moodHistory.filter((entry) => {
    const today = new Date();
    const entryDate = new Date(entry.date);

    if (filter === "week") {
      const oneWeekAgo = new Date(today);
      oneWeekAgo.setDate(today.getDate() - 7);
      return entryDate >= oneWeekAgo;
    }

    if (filter === "month") {
      return (
        entryDate.getMonth() === today.getMonth() &&
        entryDate.getFullYear() === today.getFullYear()
      );
    }

    return true;
  });

  // Calculate average mood
  const moodValueMap = { "😢": 1, "😞": 2, "😐": 3, "😊": 4, "😄": 5 };
  const totalValue = filteredHistory.reduce(
    (sum, entry) => sum + (moodValueMap[entry.mood] || 0),
    0
  );
  const averageMoodValue =
    filteredHistory.length > 0
      ? (totalValue / filteredHistory.length).toFixed(1)
      : 0;

  const getAverageMoodEmoji = () => {
    if (averageMoodValue <= 1.5) return "😢";
    if (averageMoodValue <= 2.5) return "😞";
    if (averageMoodValue <= 3.5) return "😐";
    if (averageMoodValue <= 4.5) return "😊";
    return "😄";
  };

  // Delete a mood entry
  const handleDelete = (id) => {
    setIsDeleting(true);

    // Simulate delete delay
    setTimeout(() => {
      const updatedHistory = moodHistory.filter((entry) => entry.id !== id);
      setMoodHistory(updatedHistory);
      localStorage.setItem("moodHistory", JSON.stringify(updatedHistory));
      setIsDeleting(false);
    }, 400);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center text-gray-600">
        <button
          className="pr-4"
          onClick={() => window.history.back()}
          aria-label="Go Back"
        >
          <ArrowLeft />
        </button>
        <Calendar className="w-6 h-6 text-purple-500" />
        <h1 className="text-xl font-semibold text-gray-600 pl-2">
          Mood History
        </h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-600">
        {/* Filter */}
        <div className="bg-white shadow-xl rounded-xl p-4">
          <div className="flex items-center gap-2 pb-3 border-b">
            <Filter className="text-gray-500 w-5 h-5" />
            <h1 className="text-sm font-semibold">Time Filter</h1>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3">
            {["week", "month", "all"].map((option) => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={`text-xs border rounded-lg py-1 px-2 ${
                  filter === option
                    ? "bg-purple-100 border-purple-400"
                    : "hover:bg-gray-100"
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Average Mood */}
        <div className="bg-white shadow-xl rounded-xl p-4 flex flex-col items-center justify-center">
          <h1 className="text-sm font-semibold mb-1">Average Mood</h1>
          <span className="text-2xl">{getAverageMoodEmoji()}</span>
          <p className="text-xs text-gray-500 mt-1">{averageMoodValue} / 5</p>
        </div>

        {/* Total Entries */}
        <div className="bg-white shadow-xl rounded-xl p-4 flex flex-col items-center justify-center">
          <h1 className="text-sm font-semibold mb-1">Total Entries</h1>
          <span className="text-xl font-bold">{filteredHistory.length}</span>
        </div>
      </div>

      {/* Mood History List */}
      <div className="bg-white shadow-xl rounded-xl p-4">
        <h2 className="text-gray-600 font-semibold mb-3 text-lg">Mood Entries</h2>
        {filteredHistory.length > 0 ? (
          <ul className="space-y-3">
            {filteredHistory.map((entry) => (
              <li
                key={entry.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{entry.mood}</span>
                  <div>
                    <p className="font-medium text-gray-700">{entry.label}</p>
                    {entry.note && (
                      <p className="text-xs text-gray-500">{entry.note}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">
                    {new Date(entry.date).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    disabled={isDeleting}
                    className={`flex items-center justify-center gap-1 px-2 py-1 rounded-lg text-xs transition ${
                      isDeleting
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 text-center py-4">No entries found.</p>
        )}
      </div>
    </div>
  );
};

export default History;
