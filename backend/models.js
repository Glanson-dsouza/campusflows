const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  userId: String,
  name: String,
  role: String,
  department: String,
  pickupDate: String,
  pickupTime: String,
  returnDate: String,
  returnTime: String,
  registeredAt: String
}, { _id: false });

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ["student", "faculty", "admin"], required: true },
  usn: { type: String, trim: true },
  essn: { type: String, trim: true },
  section: { type: String, trim: true },
  department: { type: String, required: true },
  homeView: { type: String, default: "dashboard" },
  sessionToken: String
}, { timestamps: true });

const resourceSchema = new mongoose.Schema({
  resourceId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  capacity: { type: Number, required: true },
  availability: { type: String, default: "Available" },
  location: { type: String, required: true },
  floor: { type: String, default: "second" },
  department: { type: String, default: "Common" },
  features: [String]
}, { timestamps: true });

const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true },
  resourceId: { type: String, required: true },
  requester: { type: String, required: true },
  requesterId: String,
  requesterRole: String,
  purpose: { type: String, required: true },
  date: { type: String, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  createdAt: { type: Number, default: Date.now }
});

const eventSchema = new mongoose.Schema({
  eventId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  venueResourceId: String,
  venueName: String,
  date: { type: String, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
  organizer: { type: String, required: true },
  seats: { type: Number, required: true },
  description: String,
  registrations: [registrationSchema]
}, { timestamps: true });

const libraryBookSchema = new mongoose.Schema({
  bookId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  department: { type: String, default: "Common" },
  copies: { type: Number, required: true },
  shelf: { type: String, required: true },
  registrations: [registrationSchema]
}, { timestamps: true });

const iotDeviceSchema = new mongoose.Schema({
  deviceId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  deviceType: { type: String, required: true },
  protocol: { type: String, required: true },
  area: { type: String, required: true },
  floor: { type: String, required: true },
  status: { type: String, default: "On" },
  lastSeen: { type: Number, default: Date.now }
}, { timestamps: true });

module.exports = {
  User: mongoose.model("User", userSchema),
  Resource: mongoose.model("Resource", resourceSchema),
  Booking: mongoose.model("Booking", bookingSchema),
  Event: mongoose.model("Event", eventSchema),
  LibraryBook: mongoose.model("LibraryBook", libraryBookSchema),
  IotDevice: mongoose.model("IotDevice", iotDeviceSchema)
};
