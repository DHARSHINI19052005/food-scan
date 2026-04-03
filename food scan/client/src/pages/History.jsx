import { useEffect, useState } from "react";
import { getScans } from "../services/api";

export default function History() {
  const [scans, setScans] = useState([]);

  useEffect(() => {
    getScans().then((res) => setScans(res.data));
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl mb-4">Scan History</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2">Time</th>
            <th className="border px-2">TDS</th>
            <th className="border px-2">Gas</th>
            <th className="border px-2">R</th>
            <th className="border px-2">G</th>
            <th className="border px-2">B</th>
          </tr>
        </thead>
        <tbody>
          {scans.map((s, i) => (
            <tr key={i}>
              <td className="border px-2">{new Date(s.timestamp).toLocaleString()}</td>
              <td className="border px-2">{s.tds}</td>
              <td className="border px-2">{s.gas}</td>
              <td className="border px-2">{s.color.r}</td>
              <td className="border px-2">{s.color.g}</td>
              <td className="border px-2">{s.color.b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}