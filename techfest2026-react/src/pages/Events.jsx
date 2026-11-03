import { useEffect, useState } from "react";
import EventList from "../components/EventList";

function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/events"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to load events"
          );
        }

        if (!Array.isArray(data)) {
          throw new Error("Invalid events response from server");
        }

        setEvents(data);
      } catch (err) {
        console.error("Events API error:", err);
        setError(
          "Could not connect to the backend. Check that the server is running on port 5000."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const nameMatches = (event.name || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const categoryMatches =
      category === "All" || event.category === category;

    return nameMatches && categoryMatches;
  });

  return (
    <div className="page">
      <h1>Events</h1>

      <input
        type="text"
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Technical">Technical</option>
        <option value="Workshop">Workshop</option>
        <option value="Cultural">Cultural</option>
        <option value="Sports">Sports</option>
      </select>

      {loading && <p>Loading events...</p>}

      {!loading && error && (
        <p role="alert">{error}</p>
      )}

      {!loading && !error && filteredEvents.length === 0 && (
        <p>No events found.</p>
      )}

      {!loading && !error && filteredEvents.length > 0 && (
        <EventList events={filteredEvents} />
      )}
    </div>
  );
}

export default Events;