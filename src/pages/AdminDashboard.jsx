import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function AdminDashboard() {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [vitals, setVitals] = useState([]);

  useEffect(() => {
    if (!token) return;
    fetch("/api/users", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then(setUsers);
    fetch("/api/vitals", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then(setVitals);
  }, [token]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <h3 className="font-semibold mt-4">Users</h3>
      <ul className="list-disc ml-6">
        {users.map((u) => (
          <li key={u.id}>{u.email} ({u.role})</li>
        ))}
      </ul>
      <h3 className="font-semibold mt-4">All Vitals</h3>
      <ul className="space-y-2">
        {vitals.map((v) => (
          <li key={v.id} className="border p-2 rounded">
            User {v.userId}: ❤️ {v.heartRate} bpm @ {new Date(v.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
