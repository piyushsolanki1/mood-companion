import React, { useState, useEffect } from 'react';
import { ArrowLeft, Settings2, User, Check } from 'lucide-react';

const Settings = () => {
  const [displayName, setDisplayName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Load saved display name from localStorage
  useEffect(() => {
    const savedName = localStorage.getItem("displayName");
    if (savedName) {
      setDisplayName(savedName);
    }
  }, []);

  // Save profile changes
  const handleSave = () => {
    if (!displayName.trim()) {
      alert("Display name cannot be empty!");
      return;
    }

    setIsSaving(true);
    setSuccessMessage("");

    // Simulate saving delay
    setTimeout(() => {
      localStorage.setItem("displayName", displayName);
      setIsSaving(false);
      setSuccessMessage("Profile updated successfully!");

      // Hide success message after 2 seconds
      setTimeout(() => setSuccessMessage(""), 2000);
    }, 1000);
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
        <Settings2 className="w-6 h-6 text-purple-500" />
        <h1 className="text-xl font-semibold text-gray-600 pl-2">Settings</h1>
      </div>

      {/* Profile Section */}
      <div className="bg-white shadow-xl rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4 border-b pb-2">
          <User className="text-gray-500" />
          <h1 className="text-gray-700 font-medium">Profile</h1>
        </div>

        {/* Display Name Input */}
        <div className="text-gray-800">
          <label className="block text-sm mb-2">Display Name</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your name"
              className="text-gray-800 w-full p-2 border-2 border-gray-300 rounded-xl 
              focus:ring-2 focus:ring-purple-400 transition duration-300 ease-in-out"
            />
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-white transition duration-300 ease-in-out
                ${
                  isSaving
                    ? "bg-purple-400 cursor-not-allowed"
                    : "bg-purple-500 hover:bg-purple-600"
                }`}
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mt-3 flex items-center gap-2 text-green-600 text-sm font-medium">
            <Check className="w-4 h-4" />
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
