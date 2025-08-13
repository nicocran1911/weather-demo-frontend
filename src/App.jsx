import { useState } from "react";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async () => {
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await fetch(`http://localhost:4000/api/weather?city=${encodeURIComponent(city || "London")}`);
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setWeather(data);
      }
    } catch {
      setError("Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-sky-300 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-6 text-sky-800">🌤 Weather Demo</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full border-gray-300 rounded-lg shadow-sm focus:border-sky-500 focus:ring-sky-500 mb-4"
        />
        <button
          onClick={getWeather}
          disabled={loading}
          className="w-full bg-sky-500 text-white rounded-lg py-2 hover:bg-sky-600 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Get Weather"}
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {weather && (
          <div className="mt-4 text-center">
            <h2 className="text-2xl font-bold">{weather.city}</h2>
            <p className="text-lg">Temperature: {weather.temperature}°C</p>
            <p className="capitalize text-gray-600">{weather.condition}</p>
          </div>
        )}
      </div>
    </div>
  );
}
