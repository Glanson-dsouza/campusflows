const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const mongoose = require("mongoose");
const {
  User,
  Resource,
  Booking,
  Event,
  LibraryBook,
  IotDevice
} = require("./models");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/campusflows";

app.use(cors());
app.use(express.json());

function toClientUser(user) {
  if (!user) return null;
  const item = user.toObject ? user.toObject() : user;
  delete item.password;
  delete item.__v;
  return item;
}

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    database: mongoose.connection.name || "not-connected",
    state: mongoose.connection.readyState
  });
});

app.post("/api/auth/register", async (req, res, next) => {
  try {
    const { role, userId, password, name, department, section } = req.body;
    const trimmedUserId = String(userId || "").trim();

    if (!["student", "faculty"].includes(role)) {
      return res.status(400).json({ message: "Role must be student or faculty." });
    }

    if (!trimmedUserId || !password || !name || !department) {
      return res.status(400).json({ message: "Missing required registration fields." });
    }

    if (role === "student" && !section) {
      return res.status(400).json({ message: "Section is required for student registration." });
    }

    const existing = await User.findOne({
      $or: [
        { userId: trimmedUserId },
        { usn: trimmedUserId },
        { essn: trimmedUserId }
      ]
    });

    if (existing) {
      return res.status(409).json({ message: "This USN, ESSN, or user ID is already registered." });
    }

    const user = await User.create({
      userId: trimmedUserId,
      password,
      name,
      role,
      department,
      homeView: "dashboard",
      ...(role === "student" ? { usn: trimmedUserId, section } : { essn: trimmedUserId })
    });

    res.status(201).json(toClientUser(user));
  } catch (error) {
    next(error);
  }
});

app.post("/api/auth/login", async (req, res, next) => {
  try {
    const { userId, password } = req.body;
    const normalizedUserId = String(userId || "").trim();
    const user = await User.findOne({
      $or: [
        { userId: normalizedUserId },
        { usn: normalizedUserId },
        { essn: normalizedUserId }
      ]
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    user.sessionToken = crypto.randomUUID();
    await user.save();

    res.json({ user: toClientUser(user), token: user.sessionToken });
  } catch (error) {
    next(error);
  }
});

app.get("/api/users", async (req, res, next) => {
  try {
    const users = await User.find().sort({ role: 1, name: 1 });
    res.json(users.map(toClientUser));
  } catch (error) {
    next(error);
  }
});

app.get("/api/resources", async (req, res, next) => {
  try {
    res.json(await Resource.find().sort({ resourceId: 1 }));
  } catch (error) {
    next(error);
  }
});

app.get("/api/bookings", async (req, res, next) => {
  try {
    res.json(await Booking.find().sort({ createdAt: -1 }));
  } catch (error) {
    next(error);
  }
});

app.get("/api/events", async (req, res, next) => {
  try {
    res.json(await Event.find().sort({ date: 1, start: 1 }));
  } catch (error) {
    next(error);
  }
});

app.get("/api/library-books", async (req, res, next) => {
  try {
    res.json(await LibraryBook.find().sort({ title: 1 }));
  } catch (error) {
    next(error);
  }
});

app.get("/api/iot-devices", async (req, res, next) => {
  try {
    res.json(await IotDevice.find().sort({ name: 1 }));
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "Server error", error: error.message });
});

async function start() {
  await mongoose.connect(MONGO_URI);
  console.log(`MongoDB connected: ${MONGO_URI}`);
  app.listen(PORT, () => {
    console.log(`Campusflows backend running on http://localhost:${PORT}`);
  });
}

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
