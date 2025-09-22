import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function UserDashboard() {
  const { token } = useContext(AuthContext);
  const [vitals, setVitals] = useState([]);
  const [heartRate, setHeartRate] = useState("");

  useEffect(() => {
    if (!token) return;
    fetch("/api/vitals", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then(setVitals);
  }, [token]);

  const addVital = async () => {
    const res = await fetch("/api/vitals", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ heartRate }),
    });
    const data = await res.json();
    setVitals([...vitals, data.entry]);
    setHeartRate("");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>
      <div className="mb-4">
        <input type="number" placeholder="Heart Rate" value={heartRate} onChange={(e) => setHeartRate(e.target.value)} className="border p-2 mr-2"/>
        <button onClick={addVital} className="bg-blue-600 text-white px-3 py-2">Add</button>
      </div>
      <ul className="space-y-2">
        {vitals.map((v) => (
          <li key={v.id} className="border p-2 rounded">❤️ {v.heartRate} bpm @ {new Date(v.timestamp).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
}
