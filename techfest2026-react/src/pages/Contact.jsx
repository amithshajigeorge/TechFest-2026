import { useState } from "react";

function Contact() {
  const [feedback, setFeedback] = useState("");
  const [author, setAuthor] = useState("");
  const [isVulnerableMode, setIsVulnerableMode] = useState(false);
  const [feedbacks, setFeedbacks] = useState([
    {
      author: "Priya S.",
      comment: "Excited for Hackathon 2026! When is the schedule coming out?",
      timestamp: "10:30 AM"
    },
    {
      author: "Rahul M.",
      comment: "Great portal design and smooth navigation.",
      timestamp: "11:15 AM"
    }
  ]);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    const newEntry = {
      author: author.trim() || "Anonymous Participant",
      comment: feedback,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setFeedbacks([newEntry, ...feedbacks]);
    setFeedback("");
    setAuthor("");

    // If in vulnerable mode and contains a script tag, execute it directly for demonstration
    if (isVulnerableMode && /<script[\s\S]*?>[\s\S]*?<\/script>/gi.test(newEntry.comment)) {
      const scriptContent = newEntry.comment
        .replace(/<script[\s\S]*?>/gi, "")
        .replace(/<\/script>/gi, "");
      try {
        // Simulates unescaped browser DOM script execution
        Function(scriptContent)();
      } catch (err) {
        console.error("Injected script error:", err);
      }
    }
  };

  return (
    <div className="page">
      <h1>Contact Us</h1>
      <p>Have questions about TechFest 2026? Reach out to the organizing team.</p>

      <div style={{
        background: "rgba(99, 102, 241, 0.08)",
        border: "1px solid rgba(99, 102, 241, 0.2)",
        borderRadius: "8px",
        padding: "16px 20px",
        marginBottom: "32px"
      }}>
        <p style={{ margin: "4px 0" }}><strong>Email:</strong> techfest2026@mbcet.ac.in</p>
        <p style={{ margin: "4px 0" }}><strong>Phone:</strong> +91 98765 43210</p>
        <p style={{ margin: "4px 0" }}><strong>Venue:</strong> MBCET Campus, Thiruvananthapuram</p>
      </div>

      <h2>Participant Feedback & Inquiries</h2>
      <p>Leave a comment or question below for the event coordinators.</p>

      {/* Security Demonstration Toggle (Lab Step 4) */}
      <div style={{
        padding: "12px 16px",
        marginBottom: "20px",
        borderRadius: "8px",
        border: "1px solid #e2e8f0",
        background: isVulnerableMode ? "#fef2f2" : "#f0fdf4",
        fontSize: "0.9rem"
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
          <span>
            <strong>Lab Step 4 Security Mode: </strong>
            <span style={{ color: isVulnerableMode ? "#dc2626" : "#16a34a", fontWeight: "bold" }}>
              {isVulnerableMode ? "Vulnerable (Unescaped HTML)" : "Protected (Safe Text + Helmet CSP)"}
            </span>
          </span>
          <button
            type="button"
            onClick={() => setIsVulnerableMode(!isVulnerableMode)}
            style={{
              padding: "6px 12px",
              fontSize: "0.85rem",
              cursor: "pointer",
              borderRadius: "4px",
              border: "1px solid #cbd5e1"
            }}
          >
            Switch to {isVulnerableMode ? "Protected Mode" : "Vulnerable Mode"}
          </button>
        </div>
        <p style={{ margin: "8px 0 0 0", fontSize: "0.82rem", color: "#64748b" }}>
          {isVulnerableMode
            ? "⚠️ Vulnerable Mode: user input is parsed without escaping. Typing <script>alert('hi')</script> or <img src=x onerror=alert('hi')> executes immediately."
            : "🛡️ Protected Mode: user input is treated as safe text by React JSX, preventing Cross-Site Scripting (XSS)."}
        </p>
      </div>

      <form onSubmit={handleFeedbackSubmit} style={{ marginBottom: "30px" }}>
        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="fb-author">Your Name</label>
          <input
            id="fb-author"
            type="text"
            placeholder="Enter your name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="fb-comment">Feedback Message</label>
          <textarea
            id="fb-comment"
            rows="3"
            placeholder="Type your feedback (Try typing: <script>alert('hi')</script>)"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #cbd5e1",
              fontFamily: "inherit",
              fontSize: "0.95rem"
            }}
          />
        </div>

        <button type="submit">Submit Feedback</button>
      </form>

      <h3>Recent Feedback</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {feedbacks.map((fb, idx) => (
          <div
            key={idx}
            style={{
              padding: "14px 18px",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              background: "rgba(255, 255, 255, 0.04)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "0.85rem", color: "#64748b" }}>
              <strong>{fb.author}</strong>
              <span>{fb.timestamp}</span>
            </div>

            {isVulnerableMode ? (
              // Insecure rendering (Demonstrates vulnerability)
              <div
                dangerouslySetInnerHTML={{ __html: fb.comment }}
                style={{ wordBreak: "break-word" }}
              />
            ) : (
              // Secure rendering (OWASP Protected: React auto-escapes string content)
              <p style={{ margin: 0, wordBreak: "break-word" }}>{fb.comment}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contact;
