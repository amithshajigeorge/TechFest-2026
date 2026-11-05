function Gallery() {
  const images = [
    {
      src: "https://picsum.photos/seed/techfest1/600/400",
      alt: "TechFest Hackathon participants collaborating on code"
    },
    {
      src: "https://picsum.photos/seed/techfest2/600/400",
      alt: "Robotics arena obstacle course demonstration"
    },
    {
      src: "https://picsum.photos/seed/techfest3/600/400",
      alt: "TechFest cultural night performance stage"
    },
    {
      src: "https://picsum.photos/seed/techfest4/600/400",
      alt: "Special guest lecture session on AI in the main auditorium"
    },
    {
      src: "https://picsum.photos/seed/techfest5/600/400",
      alt: "Coding contest award presentation ceremony"
    },
    {
      src: "https://picsum.photos/seed/techfest6/600/400",
      alt: "Outdoor project expo and engineering project exhibition"
    }
  ];

  return (
    <div className="page">
      <h1>Gallery</h1>
      <p>Highlights and memorable moments from TechFest editions.</p>

      <div className="gallery-grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "20px",
        marginTop: "24px"
      }}>
        {images.map((img, index) => (
          <div
            key={index}
            style={{
              overflow: "hidden",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              background: "#1e293b"
            }}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              decoding="async"
              width="600"
              height="400"
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                display: "block",
                transition: "transform 0.3s ease"
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
