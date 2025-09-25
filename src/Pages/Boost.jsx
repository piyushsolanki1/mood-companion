import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Heart,
  PlayCircle,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";

const Boost = () => {
  const [quote, setQuote] = useState({ text: "", author: "" });
  const [loading, setLoading] = useState(true);
  const [animalImage, setAnimalImage] = useState(null);
  const [animalLoading, setAnimalLoading] = useState(true);

  // Fetch a random motivational quote
  const fetchQuote = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://api.quotable.io/random");
      if (!response.ok) {
        throw new Error("Failed to fetch quote");
      }
      const data = await response.json();
      setQuote({
        text: data.content,
        author: data.author,
      });
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote({
        text: "Keep pushing forward, you're stronger than you think!",
        author: "Unknown",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch a random cute animal image
  const fetchAnimalImage = async () => {
    setAnimalLoading(true);
    try {
      const isDog = Math.random() > 0.5;
      const url = isDog
        ? "https://dog.ceo/api/breeds/image/random"
        : "https://api.thecatapi.com/v1/images/search";

      const response = await fetch(url);
      const data = await response.json();

      const imageUrl = isDog ? data.message : data[0].url;
      setAnimalImage(imageUrl);
    } catch (error) {
      console.error("Error fetching animal image:", error);
    } finally {
      setAnimalLoading(false);
    }
  };

  // Fetch quote & animal on mount and auto-refresh quotes every 60 sec
  useEffect(() => {
    fetchQuote();
    fetchAnimalImage();

    const interval = setInterval(fetchQuote, 60000); // auto refresh every 60s
    return () => clearInterval(interval);
  }, []);

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
        <Sparkles className="w-6 h-6 text-purple-500" />
        <h1 className="text-xl font-semibold text-gray-600 pl-2">
          Mood Booster
        </h1>
      </div>

      {/* Intro Card */}
      <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
        <h1 className="text-lg md:text-xl font-medium text-gray-700 mb-2">
          Feeling good? Let's make it even better! ✨
        </h1>
        <p className="text-gray-500">
          Keep the positive momentum going with these mood boosters.
        </p>
      </div>

      {/* Motivational Quote */}
      <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
        {loading ? (
          <p className="text-accent-foreground animate-pulse">Loading a motivational quote...</p>
        ) : (
          <>
            <p className="text-lg md:text-xl font-medium text-gray-700 mb-2">
              "{quote.text}"
            </p>
            <p className="text-sm text-gray-600">- {quote.author}</p>
          </>
        )}
        <button
          onClick={fetchQuote}
          disabled={loading}
          className={`mt-4 px-4 py-2 bg-purple-400 text-white rounded-lg transition text-sm md:text-base flex justify-center items-center mx-auto ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-600"
          }`}
        >
          <RefreshCw className={`inline w-4 h-4 mr-2 ${loading && "animate-spin"}`} />
          {loading ? "Refreshing..." : "New Quote"}
        </button>
      </div>

     {/* Breathing Techniques */}
<div className="bg-white shadow-lg rounded-2xl p-6 text-center">
  <h2 className="text-lg font-semibold text-gray-800 mb-4">
    Relaxation Breathing Techniques
  </h2>
  
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    {/* 4-7-8 Breathing */}
    <div className="p-4 border rounded-2xl bg-white shadow-sm">
      <h3 className="text-md font-semibold text-gray-700 mb-2 flex content-start">4-7-8 Breathing</h3>
      <ul className="text-sm text-accent-foreground space-y-1 text-left">
        <li>1. Inhale for 4 counts</li>
        <li>2. Hold for 7 counts</li>
        <li>3. Exhale for 8 counts</li>
      </ul>
      {/* <button className="className= mt-4 p-1 bg-transparent text-gray-800 border-1 rounded-lg transition text-sm md:text-base flex justify-center items-center mx-auto w-full hover:bg-gray-200">start</button> */}
    </div>

    {/* Box Breathing */}
    <div className="p-4 border rounded-2xl bg-white shadow-sm">
      <h3 className="text-md font-semibold text-gray-700 mb-2 flex content-start">Box Breathing</h3>
      <ul className="text-sm text-gray-600 space-y-1 text-left">
        <li>1. Inhale for 4 counts</li>
        <li>2. Hold for 4 counts</li>
        <li>3. Exhale for 4 counts</li>
        <li>4. Hold for 4 counts</li>
      </ul>
      {/* <button className="className= mt-4 p-1 bg-transparent text-gray-800 border-1 rounded-lg transition text-sm md:text-base flex justify-center items-center mx-auto w-full hover:bg-gray-200">start</button> */}
    </div>

    {/* Mindful Breathing */}
    <div className="p-4 border rounded-2xl bg-white shadow-sm">
      <h3 className="text-md font-semibold text-gray-700 mb-2 flex content-start">Mindful Breathing</h3>
      <ul className="text-sm text-accent-foreground space-y-1 text-left">
        <li>1. Inhale slowly for 4 counts</li>
        <li>2. Exhale slowly for 6 counts</li>
        <li>3. Repeat mindfully</li>
      </ul>
      {/* <button className="className= mt-4 p-1 bg-transparent text-gray-800 border-1 rounded-lg transition text-sm md:text-base flex justify-center items-center mx-auto w-full hover:bg-gray-200" */}
      {/* >start</button> */}
    </div>
  </div>
</div>


      {/* Quick Mood Boosters */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition shadow delay-90 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 "
            onClick={() => window.open("https://www.youtube.com/podcasts", "_blank")}
          >
            <PlayCircle className="w-8 h-8 text-yellow-500 mb-2" />
            <span className="font-semibold text-gray-600 text-sm md:text-base">
              Watch Favorite Podcasts
            </span>
          </button>

          <button
            className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition shadow bg-blue-500  delay-90 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 "
            onClick={() =>
              window.open("https://open.spotify.com/genre/relaxation-page", "_blank")
            }
          >
            <Heart className="w-8 h-8 text-red-500 mb-2" />
            <span className="font-semibold text-gray-600 text-sm md:text-base">
              Listen to Relaxing Music
            </span>
          </button>
        </div>
      </div>

      {/* Cute Animal Section */}
      <div className="bg-white shadow-lg rounded-2xl p-6 text-center space-y-4">
        <h2 className="text-lg font-semibold text-gray-700">
          🐾 Something to Make You Smile
        </h2>
        {animalLoading ? (
          <p className="text-gray-400 animate-pulse">Loading a cute animal...</p>
        ) : (
          <img
            src={animalImage}
            alt="Hey cute potato"
            className="rounded-xl max-w-xs w-full h-60 object-cover mx-auto shadow-md text-gray-600"
          />
        )}
        <h3 className="text-gray-600">
          Sometimes a cute animal is all we need to brighten our day 🌟
        </h3>
        <button
          onClick={fetchAnimalImage}
          className="px-4 py-2 bg-purple-400 text-white rounded-lg hover:bg-purple-500 transition"
        >
          Show Another
        </button>
      </div>
    </div>
  );
};

export default Boost;
