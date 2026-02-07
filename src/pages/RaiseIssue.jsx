import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveComplaint } from "../utils/complaints";

const MAX_MEDIA_MB = 5;

const RaiseIssue = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    town: "",
    category: "Roads",
    latitude: "",
    longitude: "",
  });
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [mediaName, setMediaName] = useState("");
  const [mediaError, setMediaError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setMediaName("");
      setMediaError("");
      return;
    }

    const maxBytes = MAX_MEDIA_MB * 1024 * 1024;
    if (file.size > maxBytes) {
      setMediaName("");
      setMediaError(`File too large. Max ${MAX_MEDIA_MB} MB.`);
      return;
    }

    setMediaError("");
    setMediaName(file.name);
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported in this browser.");
      return;
    }

    setLocationError("");
    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        setForm((prev) => ({
          ...prev,
          latitude: String(lat),
          longitude: String(lon),
        }));

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
          );
          const data = await response.json();
          const label = data?.display_name || `${lat.toFixed(5)}, ${lon.toFixed(5)}`;
          setForm((prev) => ({ ...prev, location: label }));
        } catch (error) {
          setForm((prev) => ({
            ...prev,
            location: `${lat.toFixed(5)}, ${lon.toFixed(5)}`,
          }));
        } finally {
          setIsLocating(false);
        }
      },
      () => {
        setIsLocating(false);
        setLocationError("Unable to fetch current location.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  useEffect(() => {
    let isActive = true;

    const fetchSuggestions = async () => {
      const query = form.location.trim();
      if (query.length < 3) {
        setSuggestions([]);
        return;
      }

      setIsSearching(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            query
          )}&limit=5&addressdetails=1`
        );
        const data = await response.json();
        if (isActive) {
          setSuggestions(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        if (isActive) {
          setSuggestions([]);
        }
      } finally {
        if (isActive) {
          setIsSearching(false);
        }
      }
    };

    const timer = setTimeout(fetchSuggestions, 350);

    return () => {
      isActive = false;
      clearTimeout(timer);
    };
  }, [form.location]);

  const handlePickLocation = (place) => {
    setForm((prev) => ({
      ...prev,
      location: place.display_name,
      latitude: place.lat,
      longitude: place.lon,
    }));
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mediaError) {
      return;
    }

    const lat = parseFloat(form.latitude);
    const lng = parseFloat(form.longitude);
    const coords =
      Number.isFinite(lat) && Number.isFinite(lng) ? [lat, lng] : null;

    saveComplaint({
      id: Date.now(),
      title: form.title,
      description: form.description,
      location: form.location,
      locationText: form.location,
      town: form.town,
      category: form.category,
      coords,
      mediaName,
      date: new Date().toISOString().slice(0, 10),
      status: "Pending",
    });
    navigate("/my-complaints");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-lg max-w-xl w-full"
      >
        <h2 className="text-3xl font-semibold mb-8 text-[#0A2540]">
          Raise a Civic Issue
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Issue Title"
          required
          onChange={handleChange}
          className="w-full mb-4 p-4 rounded-xl border"
        />

        <textarea
          name="description"
          placeholder="Describe the issue"
          required
          onChange={handleChange}
          className="w-full mb-4 p-4 rounded-xl border h-32"
        />

        <div className="relative mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              name="location"
              placeholder="Location"
              required
              onChange={handleChange}
              value={form.location}
              className="w-full p-4 rounded-xl border"
              autoComplete="off"
            />
            <button
              type="button"
              onClick={handleUseMyLocation}
              className="px-5 py-3 rounded-xl border text-sm font-medium hover:bg-gray-50"
              disabled={isLocating}
            >
              {isLocating ? "Locating..." : "Use My Location"}
            </button>
          </div>
          {locationError && (
            <p className="mt-2 text-sm text-red-600">{locationError}</p>
          )}
          {(isSearching || suggestions.length > 0) && (
            <div className="absolute z-10 mt-2 w-full rounded-xl border bg-white shadow-lg max-h-64 overflow-auto">
              {isSearching && (
                <div className="px-4 py-3 text-sm text-gray-500">
                  Searching...
                </div>
              )}
              {!isSearching && suggestions.length === 0 && (
                <div className="px-4 py-3 text-sm text-gray-500">
                  No results found
                </div>
              )}
              {!isSearching &&
                suggestions.map((place) => (
                  <button
                    key={place.place_id}
                    type="button"
                    onClick={() => handlePickLocation(place)}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50"
                  >
                    {place.display_name}
                  </button>
                ))}
            </div>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Media
          </label>
          <div className="relative">
            <input
              type="file"
              id="media-upload"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="hidden"
              required
            />
            <label
              htmlFor="media-upload"
              className="flex items-center justify-between w-full p-4 rounded-xl border border-gray-300 bg-white cursor-pointer hover:bg-gray-50 transition"
            >
              <span className={mediaName ? "text-gray-700" : "text-gray-400"}>
                {mediaName || "Choose file..."}
              </span>
              <span className="px-4 py-2 bg-[#2EC4B6] text-white rounded-lg text-sm font-medium">
                Browse
              </span>
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-2">Max {MAX_MEDIA_MB} MB</p>
          {mediaError && (
            <p className="text-sm text-red-600 mt-2">{mediaError}</p>
          )}
        </div>

        <select
          name="category"
          onChange={handleChange}
          className="w-full mb-6 p-4 rounded-xl border"
        >
          <option value="Roads">Roads</option>
          <option value="Lighting">Lighting</option>
          <option value="Sanitation">Sanitation</option>
          <option value="Water">Water</option>
          <option value="Other">Other</option>
        </select>

        <select
          name="town"
          onChange={handleChange}
          value={form.town}
          required
          className="w-full mb-6 p-4 rounded-xl border"
        >
          <option value="">Select Your Town</option>
          <option value="Downtown">Downtown</option>
          <option value="Uptown">Uptown</option>
          <option value="Midtown">Midtown</option>
          <option value="Suburbs">Suburbs</option>
          <option value="East Side">East Side</option>
          <option value="West Side">West Side</option>
        </select>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            name="latitude"
            placeholder="Latitude (optional)"
            onChange={handleChange}
            className="w-full p-4 rounded-xl border"
          />
          <input
            type="text"
            name="longitude"
            placeholder="Longitude (optional)"
            onChange={handleChange}
            className="w-full p-4 rounded-xl border"
          />
        </div>

        <button className="w-full bg-[#2EC4B6] text-[#0A2540] py-4 rounded-full text-lg font-medium">
          Submit Complaint
        </button>
      </form>
    </div>
  );
};

export default RaiseIssue;
