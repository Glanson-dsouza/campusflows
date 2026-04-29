const today = new Date().toISOString().slice(0, 10);

function offsetDate(days) {
  const date = new Date(`${today}T00:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

const users = [
  { userId: "student01", password: "student123", name: "Student User", role: "student", usn: "1PI23CS001", section: "A", department: "CSE", homeView: "dashboard" },
  { userId: "faculty01", password: "faculty123", name: "Faculty User", role: "faculty", essn: "ESSN001", department: "MBA", homeView: "dashboard" },
  { userId: "admin01", password: "admin123", name: "Admin User", role: "admin", department: "Administration", homeView: "dashboard" }
];

const resources = [
  { resourceId: "rg1", name: "Ground Floor Seminar Hall", type: "Seminar Hall", capacity: 180, availability: "Available", location: "Ground Floor, West Wing", floor: "ground", department: "Common", features: ["Projector", "Audio", "AC"] },
  { resourceId: "rg2", name: "Ground Floor Library", type: "Lab", capacity: 80, availability: "Available", location: "Ground Floor, East Wing", floor: "ground", department: "Common", features: ["Systems", "Study Area"] },
  { resourceId: "rg3", name: "Ground Floor Class Room", type: "Classroom", capacity: 70, availability: "Available", location: "Ground Floor, South Wing", floor: "ground", department: "Common", features: ["Whiteboard", "Projector"] },
  { resourceId: "r101", name: "Classroom 1F West", type: "Classroom", capacity: 70, availability: "Available", location: "First Floor, West Wing", floor: "first", department: "CSE", features: ["Whiteboard", "Projector"] },
  { resourceId: "r102", name: "First Floor Computer Lab", type: "Lab", capacity: 80, availability: "Available", location: "First Floor, East Wing", floor: "first", department: "CSE", features: ["Systems", "LAN"] },
  { resourceId: "r103", name: "First Floor Seminar Hall", type: "Seminar Hall", capacity: 140, availability: "Available", location: "First Floor, South Centre", floor: "first", department: "Common", features: ["Projector", "Audio"] },
  { resourceId: "r1", name: "Seminar Hall 2716", type: "Seminar Hall", capacity: 180, availability: "Available", location: "Second Floor, South Centre", floor: "second", department: "Common", features: ["Projector", "Audio", "AC"] },
  { resourceId: "r2", name: "OS/USP/MF Lab 2718-A", type: "Lab", capacity: 64, availability: "Available", location: "Second Floor, Centre Wing", floor: "second", department: "CSE", features: ["Systems", "LAN", "Whiteboard"] },
  { resourceId: "r3", name: "Classroom 2701", type: "Classroom", capacity: 72, availability: "Available", location: "Second Floor, North East Wing", floor: "second", department: "MBA", features: ["Smart Board", "Projector"] },
  { resourceId: "r4", name: "Network Lab 2710-B", type: "Lab", capacity: 48, availability: "Maintenance", location: "Second Floor, South East Wing", floor: "second", department: "ECE", features: ["Kits", "LAN"] },
  { resourceId: "r5", name: "Tutorial Room 2718", type: "Seminar Hall", capacity: 120, availability: "Available", location: "Second Floor, Centre", floor: "second", department: "Common", features: ["Projector", "Discussion Seating"] },
  { resourceId: "r6", name: "Store Room 2715", type: "Equipment", capacity: 1, availability: "Available", location: "Second Floor, South Centre", floor: "second", department: "Common", features: ["Projector Set", "Shared Equipment"] },
  { resourceId: "r7", name: "Classroom 2729", type: "Classroom", capacity: 55, availability: "Available", location: "Second Floor, North West Wing", floor: "second", department: "CSE", features: ["Whiteboard", "Projector"] },
  { resourceId: "r8", name: "Department Lab 2714", type: "Equipment", capacity: 12, availability: "Available", location: "Second Floor, South Centre", floor: "second", department: "ECE", features: ["Sensors", "Controllers"] },
  { resourceId: "r301", name: "Third Floor Classroom", type: "Classroom", capacity: 70, availability: "Available", location: "Third Floor, North Wing", floor: "third", department: "ECE", features: ["Whiteboard", "Projector"] },
  { resourceId: "r302", name: "Third Floor Lab", type: "Lab", capacity: 60, availability: "Available", location: "Third Floor, East Wing", floor: "third", department: "ECE", features: ["Systems", "LAN"] },
  { resourceId: "r303", name: "Third Floor Tutorial Room", type: "Seminar Hall", capacity: 90, availability: "Available", location: "Third Floor, West Wing", floor: "third", department: "Common", features: ["Discussion Seating"] },
  { resourceId: "r401", name: "Library 4F10-A", type: "Lab", capacity: 120, availability: "Available", location: "Fourth Floor, Centre Wing", floor: "fourth", department: "Common", features: ["Reading Area", "Systems"] },
  { resourceId: "r402", name: "Computer Lab MBA", type: "Lab", capacity: 70, availability: "Available", location: "Fourth Floor, East Centre", floor: "fourth", department: "MBA", features: ["Systems", "LAN"] },
  { resourceId: "r403", name: "Classroom MBA 4F01", type: "Classroom", capacity: 72, availability: "Available", location: "Fourth Floor, North East Wing", floor: "fourth", department: "MBA", features: ["Whiteboard", "Projector"] },
  { resourceId: "r404", name: "D.B.M.S Lab B.E", type: "Lab", capacity: 64, availability: "Available", location: "Fourth Floor, South West Wing", floor: "fourth", department: "B.E", features: ["Database Systems", "LAN"] },
  { resourceId: "r405", name: "Activity Room MBA", type: "Seminar Hall", capacity: 100, availability: "Available", location: "Fourth Floor, South East Wing", floor: "fourth", department: "MBA", features: ["Projector", "Open Seating"] }
];

const bookings = [
  { bookingId: "b1", resourceId: "r1", requester: "MBA Department", purpose: "Guest lecture", date: today, start: "10:00", end: "12:00", status: "Approved", createdAt: Date.now() - 900000 },
  { bookingId: "b2", resourceId: "r2", requester: "CSE 6th Sem", purpose: "Cloud lab session", date: today, start: "13:00", end: "15:00", status: "Approved", createdAt: Date.now() - 800000 },
  { bookingId: "b3", resourceId: "r3", requester: "Placement Cell", purpose: "Aptitude training", date: today, start: "09:00", end: "11:00", status: "Pending", createdAt: Date.now() - 700000 },
  { bookingId: "b4", resourceId: "r5", requester: "IEEE Student Branch", purpose: "Technical talk", date: today, start: "16:00", end: "18:00", status: "Pending", createdAt: Date.now() - 600000 }
];

const events = [
  { eventId: "e1", title: "AI Tools for Smart Campuses", type: "Technical", venueResourceId: "r1", date: today, start: "11:30", end: "13:00", organizer: "CSE Department", seats: 120, description: "A campus seminar on practical AI use in academic operations.", registrations: [] },
  { eventId: "e2", title: "Cloud Lab Bootcamp", type: "Workshop", venueResourceId: "r2", date: today, start: "14:30", end: "17:00", organizer: "Computer Science Association", seats: 55, description: "Hands-on cloud deployment and monitoring workshop.", registrations: [] },
  { eventId: "e3", title: "Placement Readiness Drive", type: "Placement", venueResourceId: "r5", date: offsetDate(1), start: "10:00", end: "16:00", organizer: "Training and Placement Cell", seats: 100, description: "Resume review, aptitude practice, and mock interview rounds.", registrations: [] },
  { eventId: "e4", title: "Inter-Department Futsal", type: "Sports", venueName: "Campus Ground", date: offsetDate(2), start: "15:30", end: "18:30", organizer: "Sports Committee", seats: 80, description: "Team registration and spectator entry for the campus futsal event.", registrations: [] },
  { eventId: "e5", title: "Ethnic Day Cultural Fest", type: "Cultural", venueName: "Open Air Stage", date: offsetDate(5), start: "09:30", end: "17:30", organizer: "Cultural Club", seats: 300, description: "Cultural performances, showcases, and student-led stalls.", registrations: [] }
];

const libraryBooks = [
  { bookId: "lib1", title: "Introduction to Algorithms", author: "Cormen, Leiserson, Rivest, Stein", department: "CSE", copies: 4, shelf: "CSE-A12", registrations: [] },
  { bookId: "lib2", title: "Database System Concepts", author: "Silberschatz, Korth, Sudarshan", department: "CSE", copies: 3, shelf: "CSE-B04", registrations: [] },
  { bookId: "lib3", title: "Marketing Management", author: "Philip Kotler", department: "MBA", copies: 5, shelf: "MBA-M02", registrations: [] },
  { bookId: "lib4", title: "Electronic Devices and Circuits", author: "Boylestad", department: "ECE", copies: 3, shelf: "ECE-E08", registrations: [] },
  { bookId: "lib5", title: "Engineering Mathematics", author: "B. S. Grewal", department: "Common", copies: 6, shelf: "GEN-G01", registrations: [] },
  { bookId: "lib6", title: "Communication Skills", author: "Sanjay Kumar", department: "Common", copies: 8, shelf: "GEN-G05", registrations: [] }
];

const iotDevices = [
  { deviceId: "iot1", name: "Second Floor Corridor Lights", deviceType: "Lights", protocol: "LoRaWAN", area: "Second Floor Corridor", floor: "second", status: "On", lastSeen: Date.now() - 120000 },
  { deviceId: "iot2", name: "MBA Classroom Fan Bank", deviceType: "Fans", protocol: "WiFi", area: "Classroom MBA 4F01", floor: "fourth", status: "On", lastSeen: Date.now() - 180000 },
  { deviceId: "iot3", name: "Ground Floor Library Lights", deviceType: "Lights", protocol: "WiFi", area: "Ground Floor Library", floor: "ground", status: "On", lastSeen: Date.now() - 240000 },
  { deviceId: "iot4", name: "CSE Lab Fan Controller", deviceType: "Fans", protocol: "LoRaWAN", area: "OS/USP/MF Lab 2718-A", floor: "second", status: "Off", lastSeen: Date.now() - 300000 }
];

module.exports = {
  users,
  resources,
  bookings,
  events,
  libraryBooks,
  iotDevices
};
