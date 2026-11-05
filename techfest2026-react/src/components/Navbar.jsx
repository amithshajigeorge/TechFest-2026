import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { API_BASE_URL } from "../config/api";

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  const token = sessionStorage.getItem("token");

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // Ignore network errors on logout
    }
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <h2>TechFest 2026</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        <Link to="/register">Register</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/contact">Contact</Link>

        {!token && <Link to="/signup">Signup</Link>}
        {!token && <Link to="/login">Login</Link>}

        {token && (
          <button onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>

      <button onClick={toggleTheme}>
        {theme === "light" ? "Switch to Dark" : "Switch to Light"}
      </button>
    </nav>
  );
}

export default Navbar;
