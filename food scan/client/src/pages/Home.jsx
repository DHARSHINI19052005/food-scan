import React, { useState, useEffect } from "react";

export default function Home() {
  const [gas, setGas] = useState(430);
  const [tds, setTDS] = useState(300);
  const [temp, setTemp] = useState(27.5);
  const [ph, setPH] = useState(6.8);
  const [red, setRed] = useState(120);
  const [green, setGreen] = useState(220);
  const [blue, setBlue] = useState(85);

 useEffect(() => {
  const interval = setInterval(() => {
    const newGas = Math.floor(Math.random() * 600);
    const newTDS = Math.floor(Math.random() * 600);
    const newTemp = (Math.random() * 10 + 25).toFixed(1);
    const newPH = (Math.random() * 4 + 4.5).toFixed(2);
    const newRed = Math.floor(Math.random() * 256);
    const newGreen = Math.floor(Math.random() * 256);
    const newBlue = Math.floor(Math.random() * 256);

    setGas(newGas);
    setTDS(newTDS);
    setTemp(newTemp);
    setPH(newPH);
    setRed(newRed);
    setGreen(newGreen);
    setBlue(newBlue);

    const reading = {
      timestamp: new Date().toLocaleString(),
      gas: newGas,
      tds: newTDS,
      temp: newTemp,
      ph: newPH,
      red: newRed,
      green: newGreen,
      blue: newBlue,
    };

    const existingHistory = JSON.parse(localStorage.getItem("history")) || [];
    const updatedHistory = [...existingHistory, reading];
    if (updatedHistory.length > 50) updatedHistory.shift();

    localStorage.setItem("history", JSON.stringify(updatedHistory));
  }, 4000);

  return () => clearInterval(interval);
}, []);


  const font = "Times New Roman, serif";

  const cardStyle = {
    fontFamily: font,
    backgroundColor: "#ede7f6",         // Soft lavender inside card
    border: "2px solid #b39ddb",        // Purple border
    borderRadius: "15px",
    padding: "20px",
    width: "100%",
    maxWidth: "400px",
    margin: "20px auto",
    boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
    backdropFilter: "blur(5px)",
  };

  const labelStyle = {
    fontWeight: "bold",
    fontSize: "20px",
    color: "#4a148c",
    marginBottom: "5px",
  };

  const valueBox = {
    backgroundColor: "#d1c4e9",         // Slightly deeper lavender
    padding: "12px 20px",
    borderRadius: "10px",
    fontWeight: "bold",
    fontSize: "22px",
    textAlign: "center",
    marginBottom: "10px",
    border: "2px solid #b39ddb",
    color: "#311b92"
  };

  const rangeText = {
    fontSize: "16px",
    fontWeight: "normal",
    marginBottom: "5px",
    color: "#6a1b9a",
  };

  const badge = (status) => ({
    padding: "6px 14px",
    borderRadius: "20px",
    fontWeight: "bold",
    fontSize: "15px",
    color: "#fff",
    backgroundColor: status === "Good" ? "#388e3c" : "#e53935",
    display: "inline-block",
  });

  const sectionHeader = {
    fontFamily: font,
    fontSize: "30px",
    fontWeight: "bold",
    textAlign: "center",
    margin: "30px 0 10px",
    color: "#4b0082",
  };

  const containerStyle = {
    fontFamily: font,
    backgroundColor: "#f3e5f5", // 🌸 Soft lavender page background
    minHeight: "100vh",
    padding: "20px",
  };

  const statusChecks = {
    gas: { value: gas, min: 0, max: 350 },
    tds: { value: tds, min: 0, max: 300 },
    temp: { value: temp, min: 20, max: 35 },
    ph: { value: ph, min: 6.5, max: 8.5 },
    red: { value: red, min: 100, max: 255 },
    green: { value: green, min: 100, max: 255 },
    blue: { value: blue, min: 100, max: 255 },
  };

  const getStatus = (sensor) => {
    const { value, min, max } = statusChecks[sensor];
    return value >= min && value <= max ? "Good" : "Bad";
  };

  return (
    <div style={containerStyle}>
      <h1 style={sectionHeader}>🧪 FoodScan Sensor Dashboard</h1>

      {/* SENSOR CARDS */}
      {[
        { key: "gas", label: "🌫️ Gas Sensor", value: gas, unit: "ppm", range: "≤ 350 ppm" },
        { key: "tds", label: "💧 TDS Sensor", value: tds, unit: "ppm", range: "≤ 300 ppm" },
        { key: "temp", label: "🌡️ Temperature", value: temp, unit: "°C", range: "20°C – 35°C" },
        { key: "ph", label: "🧪 pH Sensor", value: ph, unit: "", range: "6.5 – 8.5" },
        { key: "red", label: "🔴 Red Value", value: red, unit: "", range: "≥ 100" },
        { key: "green", label: "🟢 Green Value", value: green, unit: "", range: "≥ 100" },
        { key: "blue", label: "🔵 Blue Value", value: blue, unit: "", range: "≥ 100" },
      ].map((sensor) => (
        <div key={sensor.key} style={cardStyle}>
          <div style={labelStyle}>{sensor.label}</div>
          <div style={valueBox}>{sensor.value} {sensor.unit}</div>
          <div style={rangeText}>Safe Range: {sensor.range}</div>
          <span style={badge(getStatus(sensor.key))}>{getStatus(sensor.key)}</span>
        </div>
      ))}
    </div>
  );
}
