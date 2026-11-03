function EventList({ events }) {
  return (
    <div className="event-list">
      {events.map((event) => (
        <div className="event-card" key={event._id}>
          <h2>{event.name}</h2>

          <p>
            <strong>Category:</strong> {event.category}
          </p>

          <p>
            <strong>Registration Fee:</strong> ₹{event.fee}
          </p>

          <p>
            <strong>Available Seats:</strong> {event.seats}
          </p>

          <p>
            <strong>Date:</strong>{" "}
            {event.date
              ? new Date(event.date).toLocaleDateString("en-IN")
              : "Date not available"}
          </p>
        </div>
      ))}
    </div>
  );
}

export default EventList;