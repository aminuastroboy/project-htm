const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = [
  { id: 1, email: "admin@hearttrack.com", password: "admin123", role: "admin" },
];
let vitals = [];
let nextUserId = 2;

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Missing token" });
  try {
    const decoded = Buffer.from(authHeader.split(" ")[1], "base64").toString();
    const [id, role] = decoded.split(":");
    req.user = { id: parseInt(id, 10), role };
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

app.get("/", (req, res) => res.json({ status: "HeartTrack API running" }));

app.post("/auth/register", (req, res) => {
  const { email, password, role } = req.body;
  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ error: "User already exists" });
  }
  const newUser = { id: nextUserId++, email, password, role: role || "patient" };
  users.push(newUser);
  res.json({ success: true, user: { id: newUser.id, email: newUser.email, role: newUser.role } });
});

app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  const token = Buffer.from(`${user.id}:${user.role}`).toString("base64");
  res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
});

app.get("/users", authMiddleware, (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Forbidden" });
  res.json(users.map(u => ({ id: u.id, email: u.email, role: u.role })));
});

app.get("/vitals", authMiddleware, (req, res) => {
  if (req.user.role === "admin") return res.json(vitals);
  const ownVitals = vitals.filter((v) => v.userId === req.user.id);
  res.json(ownVitals);
});

app.post("/vitals", authMiddleware, (req, res) => {
  const entry = { id: vitals.length + 1, userId: req.user.id, ...req.body, timestamp: new Date().toISOString() };
  vitals.push(entry);
  res.json({ success: true, entry });
});

module.exports = (req, res) => app(req, res);
