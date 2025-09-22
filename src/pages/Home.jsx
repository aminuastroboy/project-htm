import React from "react";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className="text-center p-10">
      <h1 className="text-3xl font-bold mb-4">Welcome to HeartTrack</h1>
      <p className="text-lg mb-6">Monitor and manage your heart health effectively.</p>
      <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded">Get Started</Link>
    </div>
  );
}
