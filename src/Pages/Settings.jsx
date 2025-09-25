import React, { useState, useEffect } from 'react';
import { ArrowLeft, Settings2, User, Check, Palette, Moon } from 'lucide-react';

const Settings = () => {
  const [displayName, setDisplayName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [darkMode, setDarkMode] = useState(false); 

  // Load saved data
  useEffect(() => {
    const savedName = localStorage.getItem("displayName");
    const savedTheme = localStorage.getItem("theme");

    if (savedName) setDisplayName(savedName);
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Save profile
  const handleSave = () => {
    if (!displayName.trim()) {
      alert("Display name cannot be empty!");
      return;
    }

    setIsSaving(true);
    setSuccessMessage("");

    setTimeout(() => {
      localStorage.setItem("displayName", displayName);
      setIsSaving(false);
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(""), 2000);
    }, 1000);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Delete all mood data
  const handleClearData = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete all mood history? This action cannot be undone."
    );

    if (confirmDelete) {
      localStorage.removeItem("moodHistory");
      alert("All mood data has been deleted!");
      window.location.reload(); // refresh UI
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center text-gray-600">
        <button
          className="pr-4 rounded-2xl bg-transparent hover:bg-gray-200 p-1"
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
        <div className="flex p-1">
          <User className='text-gray-500'/>
          <h1 className='text-gray-600 pl-3'>Profile</h1>
        </div>
        
        <div className='text-gray-800'>
          <h1 className='text-sm p-2'>Display Name</h1>
          <div className='flex gap-2'>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="text-gray-800 w-full p-2 border-2 border-gray-400 rounded-xl focus:ring-2 focus:ring-purple-400 transition duration-300"
            />
            <button
              onClick={handleSave}
              className={`border rounded-lg p-2 text-white transition duration-300 bg-purple-500 hover:bg-purple-600`}
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

      {/* Dark Mode Toggle */}
      <div className="bg-white shadow-xl rounded-2xl p-5">
        <div className='flex text-gray-600 pb-6'>
          <Palette />
          <h1 className='pl-2'>Appearance</h1>
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center text-gray-600'>
            <Moon className='mr-2' />
            <h1 className='font-medium'>Dark Mode</h1>
          </div>

          <button
            onClick={toggleDarkMode}
            className={`w-12 h-6 flex items-center rounded-full transition ${
              darkMode ? "bg-purple-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-6 h-6 bg-white rounded-full shadow-md transform transition ${
                darkMode ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>
        <h2 className='text-sm text-gray-500 pl-7'>
          {darkMode ? "Dark Theme Enabled" : "Light Theme Enabled"}
        </h2>
      </div>

      {/* Data & Privacy */}
      <div className="bg-white shadow-xl rounded-2xl p-5">
        <div className='text-gray-600 pb-6'>
          <h1>Data & Privacy</h1>
        </div>
        <div className='text-gray-600'>
          <button className='border rounded-xl p-2 w-full my-2 hover:bg-gray-200'>
            Export my Data
          </button>
          <button className='border rounded-xl p-2 w-full my-2 hover:bg-gray-200'>
            Privacy Policy
          </button>
          <button
            className='border rounded-xl p-2 w-full my-2 hover:bg-gray-200'
            onClick={handleClearData}
          >
            Delete All Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
