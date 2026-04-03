import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#d1c4e9", // Indigo
    fontFamily: "Times New Roman, serif",
  };

  const logoStyle = {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#4a148c", // Dark purple
    textDecoration: "none",
    fontFamily: "Times New Roman, serif",
  };

  const linkContainer = {
    display: "flex",
    gap: "25px",
  };

  const linkStyle = {
    color: "#4a148c", // ✅ purple color
    textDecoration: "none",
    fontSize: "18px",
    transition: "color 0.3s ease-in-out",
    fontFamily: "Times New Roman, serif",
  };

  const hoverStyle = {
    color: "#ffffff", // ✅ white color on 
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={logoStyle}>
        FoodScan
      </Link>
      <div style={linkContainer}>
        <HoverLink to="/" label="Home" baseStyle={linkStyle} hoverColor={hoverStyle.color} />
        <HoverLink to="/history" label="History" baseStyle={linkStyle} hoverColor={hoverStyle.color} />
      </div>
    </nav>
  );
}

// Separate Hoverable Link Component
function HoverLink({ to, label, baseStyle, hoverColor }) {
  const [hover, setHover] = React.useState(false);

  return (
    <Link
      to={to}
      style={{
        ...baseStyle,
        color: hover ? hoverColor : baseStyle.color,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {label}
    </Link>
  );
}
