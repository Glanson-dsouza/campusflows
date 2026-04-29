const STORAGE_KEY = "smart-campus-resource-platform-v1";
const SESSION_KEY = "smart-campus-current-user-v1";

const resourceTypes = ["Classroom", "Lab", "Seminar Hall", "Equipment"];
const departments = ["CSE", "MBA", "ECE", "CSDS","ISE","CV","AIMl","ME","EEE","MCA"];
const roleRank = { student: 1, faculty: 2, admin: 3 };
const demoUsers = [
  { id: "student01", password: "student123", name: "Student User", role: "student", usn: "1PI23CS001", section: "A", department: "CSE", homeView: "dashboard" },
  { id: "faculty01", password: "faculty123", name: "Faculty User", role: "faculty", essn: "ESSN001", department: "MBA", homeView: "dashboard" },
  { id: "admin01", password: "admin123", name: "Admin User", role: "admin", department: "Administration", homeView: "dashboard" }
];

const seedResources = [
  { id: "rg1", name: "Ground Floor Seminar Hall", type: "Seminar Hall", capacity: 180, availability: "Available", location: "Ground Floor, West Wing", floor: "ground", department: "Common", features: ["Projector", "Audio", "AC"] },
  { id: "rg2", name: "Ground Floor Library", type: "Lab", capacity: 80, availability: "Available", location: "Ground Floor, East Wing", floor: "ground", department: "Common", features: ["Systems", "Study Area"] },
  { id: "rg3", name: "Ground Floor Class Room", type: "Classroom", capacity: 70, availability: "Available", location: "Ground Floor, South Wing", floor: "ground", department: "Common", features: ["Whiteboard", "Projector"] },
  { id: "r101", name: "Classroom 1F West", type: "Classroom", capacity: 70, availability: "Available", location: "First Floor, West Wing", floor: "first", department: "CSE", features: ["Whiteboard", "Projector"] },
  { id: "r102", name: "First Floor Computer Lab", type: "Lab", capacity: 80, availability: "Available", location: "First Floor, East Wing", floor: "first", department: "CSE", features: ["Systems", "LAN"] },
  { id: "r103", name: "First Floor Seminar Hall", type: "Seminar Hall", capacity: 140, availability: "Available", location: "First Floor, South Centre", floor: "first", department: "Common", features: ["Projector", "Audio"] },
  { id: "r1", name: "Seminar Hall 2716", type: "Seminar Hall", capacity: 180, availability: "Available", location: "Second Floor, South Centre", department: "Common", features: ["Projector", "Audio", "AC"] },
  { id: "r2", name: "OS/USP/MF Lab 2718-A", type: "Lab", capacity: 64, availability: "Available", location: "Second Floor, Centre Wing", department: "CSE", features: ["Systems", "LAN", "Whiteboard"] },
  { id: "r3", name: "Classroom 2701", type: "Classroom", capacity: 72, availability: "Available", location: "Second Floor, North East Wing", department: "MBA", features: ["Smart Board", "Projector"] },
  { id: "r4", name: "Network Lab 2710-B", type: "Lab", capacity: 48, availability: "Maintenance", location: "Second Floor, South East Wing", department: "ECE", features: ["Kits", "LAN"] },
  { id: "r5", name: "Tutorial Room 2718", type: "Seminar Hall", capacity: 120, availability: "Available", location: "Second Floor, Centre", department: "Common", features: ["Projector", "Discussion Seating"] },
  { id: "r6", name: "Store Room 2715", type: "Equipment", capacity: 1, availability: "Available", location: "Second Floor, South Centre", department: "Common", features: ["Projector Set", "Shared Equipment"] },
  { id: "r7", name: "Classroom 2729", type: "Classroom", capacity: 55, availability: "Available", location: "Second Floor, North West Wing", department: "CSE", features: ["Whiteboard", "Projector"] },
  { id: "r8", name: "Department Lab 2714", type: "Equipment", capacity: 12, availability: "Available", location: "Second Floor, South Centre", department: "ECE", features: ["Sensors", "Controllers"] },
  { id: "r301", name: "Third Floor Classroom", type: "Classroom", capacity: 70, availability: "Available", location: "Third Floor, North Wing", floor: "third", department: "ECE", features: ["Whiteboard", "Projector"] },
  { id: "r302", name: "Third Floor Lab", type: "Lab", capacity: 60, availability: "Available", location: "Third Floor, East Wing", floor: "third", department: "ECE", features: ["Systems", "LAN"] },
  { id: "r303", name: "Third Floor Tutorial Room", type: "Seminar Hall", capacity: 90, availability: "Available", location: "Third Floor, West Wing", floor: "third", department: "Common", features: ["Discussion Seating"] },
  { id: "r401", name: "Library 4F10-A", type: "Lab", capacity: 120, availability: "Available", location: "Fourth Floor, Centre Wing", floor: "fourth", department: "Common", features: ["Reading Area", "Systems"] },
  { id: "r402", name: "Computer Lab MBA", type: "Lab", capacity: 70, availability: "Available", location: "Fourth Floor, East Centre", floor: "fourth", department: "MBA", features: ["Systems", "LAN"] },
  { id: "r403", name: "Classroom MBA 4F01", type: "Classroom", capacity: 72, availability: "Available", location: "Fourth Floor, North East Wing", floor: "fourth", department: "MBA", features: ["Whiteboard", "Projector"] },
  { id: "r404", name: "D.B.M.S Lab B.E", type: "Lab", capacity: 64, availability: "Available", location: "Fourth Floor, South West Wing", floor: "fourth", department: "B.E", features: ["Database Systems", "LAN"] },
  { id: "r405", name: "Activity Room MBA", type: "Seminar Hall", capacity: 100, availability: "Available", location: "Fourth Floor, South East Wing", floor: "fourth", department: "MBA", features: ["Projector", "Open Seating"] }
];

const today = new Date().toISOString().slice(0, 10);

function offsetDate(days) {
  const date = new Date(`${today}T00:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

const seedBookings = [
  { id: "b1", resourceId: "r1", requester: "MBA Department", purpose: "Guest lecture", date: today, start: "10:00", end: "12:00", status: "Approved", createdAt: Date.now() - 900000 },
  { id: "b2", resourceId: "r2", requester: "CSE 6th Sem", purpose: "Cloud lab session", date: today, start: "13:00", end: "15:00", status: "Approved", createdAt: Date.now() - 800000 },
  { id: "b3", resourceId: "r3", requester: "Placement Cell", purpose: "Aptitude training", date: today, start: "09:00", end: "11:00", status: "Pending", createdAt: Date.now() - 700000 },
  { id: "b4", resourceId: "r5", requester: "IEEE Student Branch", purpose: "Technical talk", date: today, start: "16:00", end: "18:00", status: "Pending", createdAt: Date.now() - 600000 }
];

const seedEvents = [
  { id: "e1", title: "AI Tools for Smart Campuses", type: "Technical", venueResourceId: "r1", date: today, start: "11:30", end: "13:00", organizer: "CSE Department", seats: 120, description: "A campus seminar on practical AI use in academic operations.", registrations: [] },
  { id: "e2", title: "Cloud Lab Bootcamp", type: "Workshop", venueResourceId: "r2", date: today, start: "14:30", end: "17:00", organizer: "Computer Science Association", seats: 55, description: "Hands-on cloud deployment and monitoring workshop.", registrations: [] },
  { id: "e3", title: "Placement Readiness Drive", type: "Placement", venueResourceId: "r5", date: offsetDate(1), start: "10:00", end: "16:00", organizer: "Training and Placement Cell", seats: 100, description: "Resume review, aptitude practice, and mock interview rounds.", registrations: [] },
  { id: "e4", title: "Inter-Department Futsal", type: "Sports", venueName: "Campus Ground", date: offsetDate(2), start: "15:30", end: "18:30", organizer: "Sports Committee", seats: 80, description: "Team registration and spectator entry for the campus futsal event.", registrations: [] },
  { id: "e5", title: "Ethnic Day Cultural Fest", type: "Cultural", venueName: "Open Air Stage", date: offsetDate(5), start: "09:30", end: "17:30", organizer: "Cultural Club", seats: 300, description: "Cultural performances, showcases, and student-led stalls.", registrations: [] }
];

const seedIoTDevices = [
  { id: "iot1", name: "Second Floor Corridor Lights", deviceType: "Lights", protocol: "LoRaWAN", area: "Second Floor Corridor", floor: "second", status: "On", lastSeen: Date.now() - 120000 },
  { id: "iot2", name: "MBA Classroom Fan Bank", deviceType: "Fans", protocol: "WiFi", area: "Classroom MBA 4F01", floor: "fourth", status: "On", lastSeen: Date.now() - 180000 },
  { id: "iot3", name: "Ground Floor Library Lights", deviceType: "Lights", protocol: "WiFi", area: "Ground Floor Library", floor: "ground", status: "On", lastSeen: Date.now() - 240000 },
  { id: "iot4", name: "CSE Lab Fan Controller", deviceType: "Fans", protocol: "LoRaWAN", area: "OS/USP/MF Lab 2718-A", floor: "second", status: "Off", lastSeen: Date.now() - 300000 }
];

const seedLibraryBooks = readLibraryBooksFromJson();

let state = loadState();
syncSeedResourceDetails();
state.events ||= cloneData(seedEvents);
state.iotDevices ||= cloneData(seedIoTDevices);
state.libraryBooks ||= cloneData(seedLibraryBooks);
state.users = normalizeUsers(state.users);
syncSeedLibraryBooks();
saveState();
let currentUser = loadSession();
let filters = {
  search: "",
  type: "all",
  availability: "all",
  status: "all",
  trendType: "all",
  eventTime: "all",
  eventType: "all",
  librarySearch: "",
  department: "all",
  mapType: "all",
  mapFloor: "second",
  mapBuilding: "all"
};

const floorPlans = {
  ground: {
    label: "Ground Floor",
    image: "assets/floor-ground.jpg",
    places: {
      "Ground Entrance": { x: 12, y: 50 },
      "West Corridor": { x: 28, y: 48 },
      "Central Courtyard": { x: 55, y: 48 },
      "East Corridor": { x: 78, y: 48 }
    }
  },
  first: {
    label: "First Floor",
    image: "assets/floor-1.jpg",
    places: {
      "First Floor Entrance": { x: 50, y: 83 },
      "First Floor West Wing": { x: 28, y: 43 },
      "First Floor Centre": { x: 50, y: 53 },
      "First Floor East Wing": { x: 73, y: 43 }
    }
  },
  second: {
    label: "Second Floor",
    image: "assets/floor-2.jpg",
    places: {
      "Main Entrance": { x: 50, y: 79 },
      "South Corridor": { x: 50, y: 64 },
      "Centre Staircase": { x: 50, y: 51 },
      "West Wing": { x: 27, y: 42 },
      "East Wing": { x: 73, y: 42 },
      "North West Staircase": { x: 34, y: 23 },
      "North East Staircase": { x: 66, y: 23 }
    }
  },
  third: {
    label: "Third Floor",
    image: "assets/floor-3.jpg",
    places: {
      "Third Floor Entrance": { x: 12, y: 52 },
      "Third Floor West Wing": { x: 32, y: 50 },
      "Third Floor Centre": { x: 52, y: 49 },
      "Third Floor East Wing": { x: 75, y: 47 }
    }
  },
  fourth: {
    label: "Fourth Floor",
    image: "assets/floor-4.jpg",
    places: {
      "Fourth Floor Entrance": { x: 50, y: 79 },
      "Fourth Floor West Wing": { x: 27, y: 42 },
      "Fourth Floor Centre": { x: 50, y: 54 },
      "Fourth Floor East Wing": { x: 73, y: 42 }
    }
  }
};

const resourceCoordinates = {
  rg1: { x: 24, y: 49 },
  rg2: { x: 78, y: 45 },
  rg3: { x: 31, y: 68 },
  r101: { x: 31, y: 34 },
  r102: { x: 76, y: 43 },
  r103: { x: 50, y: 76 },
  r1: { x: 50, y: 73 },
  r2: { x: 57, y: 53 },
  r3: { x: 72, y: 32 },
  r4: { x: 77, y: 67 },
  r5: { x: 50, y: 48 },
  r6: { x: 57, y: 67 },
  r7: { x: 28, y: 32 },
  r8: { x: 62, y: 67 },
  r301: { x: 43, y: 35 },
  r302: { x: 68, y: 45 },
  r303: { x: 28, y: 58 },
  r401: { x: 50, y: 53 },
  r402: { x: 62, y: 54 },
  r403: { x: 72, y: 33 },
  r404: { x: 24, y: 67 },
  r405: { x: 77, y: 67 }
};

let activeRoute = {
  from: "Main Entrance",
  destinationId: null
};

function defaultState() {
  return {
    resources: cloneData(seedResources),
    bookings: cloneData(seedBookings),
    events: cloneData(seedEvents),
    iotDevices: cloneData(seedIoTDevices),
    libraryBooks: cloneData(seedLibraryBooks),
    users: cloneData(demoUsers)
  };
}

function normalizeUsers(users = []) {
  const userMap = new Map();
  const sourceUsers = Array.isArray(users) ? users : [];

  demoUsers.forEach((user) => {
    userMap.set(user.id.toLowerCase(), { ...cloneData(user), id: user.id.trim() });
  });

  sourceUsers.forEach((user) => {
    if (!user?.id || !user?.password || !user?.role) return;
    const id = String(user.id).trim();
    if (!id) return;
    userMap.set(id.toLowerCase(), {
      ...user,
      id,
      name: String(user.name || id).trim(),
      role: user.role,
      department: user.department || "Common",
      homeView: user.homeView || "dashboard"
    });
  });

  return [...userMap.values()];
}

function registeredUsers() {
  state.users ||= normalizeUsers();
  return state.users;
}

function findRegisteredUser(userId) {
  const normalizedId = String(userId || "").trim().toLowerCase();
  if (!normalizedId) return null;

  return registeredUsers().find((user) => (
    user.id.toLowerCase() === normalizedId ||
    user.usn?.toLowerCase() === normalizedId ||
    user.essn?.toLowerCase() === normalizedId
  )) || null;
}

function makeSessionToken() {
  return globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : `session-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function loadSession() {
  const saved = sessionStorage.getItem(SESSION_KEY);
  if (!saved) return null;

  try {
    const user = JSON.parse(saved);
    const registeredUser = findRegisteredUser(user.id);
    if (!registeredUser || !user.token || registeredUser.sessionToken !== user.token) {
      sessionStorage.removeItem(SESSION_KEY);
      return null;
    }
    return registeredUser;
  } catch {
    sessionStorage.removeItem(SESSION_KEY);
    return null;
  }
}

function saveSession(user) {
  if (user) {
    user.sessionToken = makeSessionToken();
    saveState();
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ id: user.id, token: user.sessionToken }));
  } else {
    sessionStorage.removeItem(SESSION_KEY);
  }
}

function hasRole(minRole) {
  if (!minRole) return Boolean(currentUser);
  return Boolean(currentUser) && roleRank[currentUser.role] >= roleRank[minRole];
}

function canAccessView(viewName) {
  if (!currentUser) return false;
  if (viewName === "booking") return hasRole("faculty");
  if (viewName === "admin") return hasRole("admin");
  if (viewName === "library") return currentUser.role === "student";
  return ["dashboard", "resources", "events", "map"].includes(viewName);
}

function cloneData(data) {
  return typeof structuredClone === "function" ? structuredClone(data) : JSON.parse(JSON.stringify(data));
}

function makeId() {
  return globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  })[char]);
}

function readLibraryBooksFromJson() {
  const source = document.querySelector("#libraryBookData");
  if (!source) return [];

  try {
    const books = JSON.parse(source.textContent);
    if (!Array.isArray(books)) return [];
    return books.map(normalizeLibraryBook).filter(Boolean);
  } catch (error) {
    console.warn("Library book JSON could not be parsed.", error);
    return [];
  }
}

function normalizeLibraryBook(book, index) {
  const title = String(book.name || book.title || "").trim();
  if (!title) return null;

  const generatedId = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const copies = Number(book.copies);
  return {
    id: String(book.id || `lib-${generatedId || index + 1}`).trim(),
    title,
    author: String(book.author || "Library").trim(),
    department: String(book.department || "Common").trim(),
    copies: Number.isFinite(copies) && copies > 0 ? Math.floor(copies) : 1,
    shelf: String(book.shelf || "GEN").trim(),
    registrations: []
  };
}

const views = {
  dashboard: document.querySelector("#dashboardView"),
  resources: document.querySelector("#resourcesView"),
  booking: document.querySelector("#bookingView"),
  events: document.querySelector("#eventsView"),
  library: document.querySelector("#libraryView"),
  map: document.querySelector("#mapView"),
  admin: document.querySelector("#adminView")
};

const pageTitles = {
  dashboard: "Dashboard",
  resources: "Resource Inventory",
  booking: "Smart Booking",
  events: "Campus Events",
  library: "Library",
  map: "Campus Map",
  admin: "Monitoring & Approvals"
};

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  return defaultState();
}

function syncSeedResourceDetails() {
  const seedById = Object.fromEntries(seedResources.map((resource) => [resource.id, resource]));
  const synced = state.resources.map((resource) => {
    const seed = seedById[resource.id];
    if (!seed) return resource;
    return {
      ...resource,
      name: seed.name,
      type: seed.type,
      capacity: seed.capacity,
      location: seed.location,
      floor: seed.floor || floorFromLocation(seed.location),
      department: seed.department || "Common",
      features: cloneData(seed.features)
    };
  });
  const existingIds = new Set(synced.map((resource) => resource.id));
  const missingSeeds = seedResources
    .filter((resource) => !existingIds.has(resource.id))
    .map((resource) => ({ ...cloneData(resource), floor: resource.floor || floorFromLocation(resource.location), department: resource.department || "Common" }));
  state.resources = [...synced, ...missingSeeds];
}

function syncSeedLibraryBooks() {
  const existingById = Object.fromEntries((state.libraryBooks || []).map((book) => [book.id, book]));
  state.libraryBooks = seedLibraryBooks.map((seed) => {
    const existing = existingById[seed.id];
    return {
      ...cloneData(seed),
      registrations: cloneData(existing?.registrations || [])
    };
  });
}

function floorFromLocation(location) {
  if (location.includes("Ground Floor")) return "ground";
  if (location.includes("First Floor")) return "first";
  if (location.includes("Third Floor")) return "third";
  if (location.includes("Fourth Floor")) return "fourth";
  return "second";
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function minutes(time) {
  const [hours, mins] = time.split(":").map(Number);
  return hours * 60 + mins;
}

function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function overlaps(a, b) {
  return a.date === b.date && minutes(a.start) < minutes(b.end) && minutes(a.end) > minutes(b.start);
}

function getResource(resourceId) {
  return state.resources.find((resource) => resource.id === resourceId);
}

function resourceDepartment(resource) {
  return resource.department || "Common";
}

function canUseResource(resource) {
  if (!resource || hasRole("admin")) return Boolean(resource);
  return resourceDepartment(resource) === "Common" || resourceDepartment(resource) === currentUser.department;
}

function departmentMatchesFilter(resource) {
  if (!hasRole("admin")) return true;
  return filters.department === "all" || resourceDepartment(resource) === filters.department;
}

function visibleResources() {
  return state.resources.filter(canUseResource).filter(departmentMatchesFilter);
}

function approvedBookings(resourceId) {
  return state.bookings.filter((booking) => booking.resourceId === resourceId && booking.status === "Approved");
}

function hasConflict(candidate, includePending = false) {
  return state.bookings.some((booking) => {
    const sameResource = booking.resourceId === candidate.resourceId;
    const trackedStatus = includePending ? booking.status !== "Rejected" : booking.status === "Approved";
    const notSame = booking.id !== candidate.id;
    return sameResource && trackedStatus && notSame && overlaps(candidate, booking);
  });
}

function utilization(resourceId) {
  const total = approvedBookings(resourceId).reduce((sum, booking) => sum + (minutes(booking.end) - minutes(booking.start)), 0);
  return Math.min(100, Math.round((total / (8 * 60)) * 100));
}

function occupancy(resource) {
  if (resource.availability === "Maintenance") return "Maintenance";
  const now = new Date();
  const current = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  const active = state.bookings.some((booking) => (
    booking.resourceId === resource.id &&
    booking.status === "Approved" &&
    booking.date === today &&
    minutes(booking.start) <= minutes(current) &&
    minutes(booking.end) > minutes(current)
  ));
  return active ? "Occupied" : "Available";
}

function buildingName(resource) {
  if (resource.location.includes("West")) return "West Wing";
  if (resource.location.includes("East")) return "East Wing";
  if (resource.location.includes("Centre")) return "Centre Wing";
  return "Second Floor";
}

function resourceFloor(resource) {
  return resource.floor || floorFromLocation(resource.location);
}

function activeFloorPlan() {
  return floorPlans[filters.mapFloor] || floorPlans.second;
}

function mapPosition(resource, index = 0) {
  const exact = resourceCoordinates[resource.id];
  if (exact) return exact;

  const places = floorPlans[resourceFloor(resource)]?.places || activeFloorPlan().places;
  const base = places[buildingName(resource)] || Object.values(places)[0];
  const offset = ((index % 5) - 2) * 2.2;
  return {
    x: Math.max(5, Math.min(95, base.x + offset)),
    y: Math.max(8, Math.min(92, base.y + Math.floor(index / 5) * 3))
  };
}

function resourceMapPosition(resource) {
  const building = buildingName(resource);
  const peers = state.resources.filter((item) => buildingName(item) === building);
  return mapPosition(resource, peers.findIndex((item) => item.id === resource.id));
}

function routePointStyle(point) {
  return `left:${point.x}%; top:${point.y}%;`;
}

function destinationOptions() {
  const resourceOptions = visibleResources()
    .filter((resource) => resourceFloor(resource) === filters.mapFloor)
    .map((resource) => ({
      label: `${resource.name} - ${resource.location}`,
      resource
    }));

  const placeOptions = Object.keys(activeFloorPlan().places).map((building) => ({
    label: `${building} - ${activeFloorPlan().label}`,
    place: building
  }));

  return [...resourceOptions, ...placeOptions];
}

function findDestination(query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return null;

  const resources = visibleResources();
  const resource = resources.find((item) => (
    item.name.toLowerCase() === normalized ||
    item.location.toLowerCase() === normalized ||
    `${item.name} - ${item.location}`.toLowerCase() === normalized
  )) || resources.find((item) => (
    item.name.toLowerCase().includes(normalized) ||
    item.location.toLowerCase().includes(normalized)
  ));

  if (resource) {
    return { type: "resource", resource };
  }

  const floorPlaceEntries = Object.entries(floorPlans).flatMap(([floor, plan]) => (
    Object.keys(plan.places).map((placeName) => ({ floor, placeName, label: `${placeName} - ${plan.label}` }))
  ));
  const place = floorPlaceEntries.find((item) => item.placeName.toLowerCase() === normalized || item.label.toLowerCase() === normalized) ||
    floorPlaceEntries.find((item) => item.placeName.toLowerCase().includes(normalized) || item.label.toLowerCase().includes(normalized));

  return place ? { type: "place", place: place.placeName, floor: place.floor } : null;
}

function searchMatchesResource(resource) {
  const query = filters.search.toLowerCase();
  return [resource.name, resource.type, resource.location, resourceDepartment(resource), ...resource.features].join(" ").toLowerCase().includes(query);
}

function searchMatchesBooking(booking) {
  const resource = getResource(booking.resourceId);
  const query = filters.search.toLowerCase();
  return [resource?.name, booking.requester, booking.purpose, booking.status, booking.date].join(" ").toLowerCase().includes(query);
}

function eventVenue(event) {
  const resource = event.venueResourceId ? getResource(event.venueResourceId) : null;
  return resource ? `${resource.name}, ${resource.location}` : event.venueName;
}

function eventStatus(event) {
  if (event.date === today) return "Current";
  return event.date > today ? "Upcoming" : "Completed";
}

function eventRegistered(event) {
  return Boolean(currentUser) && event.registrations.some((item) => item.userId === currentUser.id);
}

function searchMatchesEvent(event) {
  const query = filters.search.toLowerCase();
  return [event.title, event.type, event.organizer, event.description, eventVenue(event), event.date].join(" ").toLowerCase().includes(query);
}

function renderMetrics() {
  const resources = visibleResources();
  const resourceIds = new Set(resources.map((resource) => resource.id));
  const total = resources.length;
  const pending = state.bookings.filter((booking) => resourceIds.has(booking.resourceId) && booking.status === "Pending").length;
  const conflicts = state.bookings.filter((booking) => resourceIds.has(booking.resourceId) && booking.status === "Pending" && hasConflict(booking)).length;
  const avgUtil = total ? Math.round(resources.reduce((sum, resource) => sum + utilization(resource.id), 0) / total) : 0;

  const metrics = [
    ["Resources", total, "Inventory"],
    ["Pending Requests", pending, "Workflow"],
    ["Avg. Utilization", `${avgUtil}%`, "Optimization"]
  ];

  if (currentUser.role !== "student") {
    metrics.splice(2, 0, ["Conflict Alerts", conflicts, "Scheduling"]);
  }

  document.querySelector("#metrics").innerHTML = metrics.map(([label, value, tag]) => `
    <article class="metric">
      <small>${tag}</small>
      <strong>${value}</strong>
      <span>${label}</span>
    </article>
  `).join("");
}

function renderDepartmentDashboard() {
  const target = document.querySelector("#departmentDashboard");
  if (!target) return;

  const resources = visibleResources();
  const title = hasRole("admin") ? "All departments" : `${currentUser.department} department + Common`;
  const departmentCounts = departments
    .map((department) => ({
      department,
      count: resources.filter((resource) => resourceDepartment(resource) === department).length
    }))
    .filter((item) => item.count > 0);

  target.innerHTML = `
    <div class="department-summary-top">
      <div>
        <strong>${escapeHtml(title)}</strong>
        <span>${resources.length} accessible facilities for this login</span>
      </div>
      <div class="resource-meta">
        ${departmentCounts.map((item) => `<span class="badge">${escapeHtml(item.department)} ${item.count}</span>`).join("")}
      </div>
    </div>
    <div class="department-facility-list">
      ${resources.slice(0, 8).map((resource) => `
        <article class="department-facility">
          <div>
            <strong>${escapeHtml(resource.name)}</strong>
            <span>${escapeHtml(resourceDepartment(resource))} - ${escapeHtml(resource.type)} - ${escapeHtml(resource.location)}</span>
          </div>
          <span class="badge ${occupancy(resource)}">${occupancy(resource)}</span>
        </article>
      `).join("") || `<div class="empty">No facilities available for this department.</div>`}
    </div>
  `;
}

function canAccessBook(book) {
  if (!currentUser || currentUser.role !== "student") return false;
  return book.department === "Common" || book.department === currentUser.department;
}

function bookRegistration(book) {
  return book.registrations?.find((item) => item.userId === currentUser.id);
}

function availableBookCopies(book) {
  return Math.max(0, book.copies - (book.registrations?.length || 0));
}

function allocatePickupSlot() {
  const totalRegistrations = state.libraryBooks.reduce((sum, book) => sum + (book.registrations?.length || 0), 0);
  const slotStart = 9 * 60 + 30 + (totalRegistrations % 36) * 10;
  const pickupDate = offsetDate(Math.floor(totalRegistrations / 36));
  const hours = Math.floor(slotStart / 60);
  const mins = slotStart % 60;
  return {
    date: pickupDate,
    time: `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`
  };
}

function returnDateForPickup(pickupDate) {
  const date = new Date(`${pickupDate}T00:00:00`);
  date.setDate(date.getDate() + 7);
  return date.toISOString().slice(0, 10);
}

function bookMatchesSearch(book) {
  const query = filters.librarySearch.toLowerCase();
  return [book.title, book.author, book.department, book.shelf].join(" ").toLowerCase().includes(query);
}

function libraryBookHtml(book, showAction = true) {
  const registration = bookRegistration(book);
  const copiesLeft = availableBookCopies(book);
  return `
    <article class="library-book">
      <div>
        <strong>${escapeHtml(book.title)}</strong>
        <span>${escapeHtml(book.author)}</span>
        <div class="resource-meta">
          <span class="badge">${escapeHtml(book.department)}</span>
          <span class="badge">${copiesLeft} available</span>
          <span class="badge">Shelf ${escapeHtml(book.shelf)}</span>
        </div>
        ${registration ? `
          <p>Pickup: ${formatDate(registration.pickupDate)}, ${registration.pickupTime}</p>
          <p>Return by: ${formatDate(registration.returnDate)}, ${registration.returnTime}</p>
        ` : ""}
      </div>
      ${showAction ? `
        <button class="primary library-register" type="button" data-book-id="${book.id}" ${registration || copiesLeft === 0 ? "disabled" : ""}>
          ${registration ? "Registered" : copiesLeft === 0 ? "Unavailable" : "Register"}
        </button>
      ` : ""}
    </article>
  `;
}

function renderLibraryBooks() {
  const catalogTarget = document.querySelector("#libraryCatalog");
  const studentTarget = document.querySelector("#studentLibraryBooks");
  const suggestionsTarget = document.querySelector("#libraryBookSuggestions");
  const searchInput = document.querySelector("#librarySearch");

  if (currentUser?.role !== "student") {
    if (catalogTarget) catalogTarget.innerHTML = "";
    if (studentTarget) studentTarget.innerHTML = "";
    if (suggestionsTarget) suggestionsTarget.innerHTML = "";
    return;
  }

  if (searchInput && searchInput.value !== filters.librarySearch) {
    searchInput.value = filters.librarySearch;
  }

  const books = state.libraryBooks.filter(canAccessBook).sort((firstBook, secondBook) => firstBook.title.localeCompare(secondBook.title));
  const query = filters.librarySearch.toLowerCase();
  const exactBook = books.find((book) => book.title.toLowerCase() === query);
  const searchedBooks = query ? (exactBook ? [exactBook] : books.filter(bookMatchesSearch)) : [];
  const registeredBooks = books.filter(bookRegistration);

  if (suggestionsTarget) {
    suggestionsTarget.innerHTML = books.map((book) => `
      <option value="${escapeHtml(book.title)}">${escapeHtml(book.author)} - ${escapeHtml(book.department)} - Shelf ${escapeHtml(book.shelf)}</option>
    `).join("");
  }

  if (studentTarget) {
    studentTarget.innerHTML = registeredBooks.length
      ? registeredBooks.map((book) => libraryBookHtml(book, false)).join("")
      : `<div class="empty">Registered books will appear here after you select and register a book.</div>`;
  }

  if (catalogTarget) {
    catalogTarget.innerHTML = query
      ? searchedBooks.length ? searchedBooks.map((book) => libraryBookHtml(book)).join("") : `<div class="empty">No books match your search.</div>`
      : `<div class="empty">Search and select a book name to register.</div>`;
  }
}

function renderOccupancy() {
  const resources = visibleResources()
    .filter((resource) => filters.trendType === "all" || resource.type === filters.trendType)
    .filter(searchMatchesResource)
    .sort((a, b) => utilization(b.id) - utilization(a.id));

  document.querySelector("#occupancyChart").innerHTML = resources.length ? resources.map((resource) => {
    const used = utilization(resource.id);
    return `
      <div class="chart-row">
        <strong>${escapeHtml(resource.name)}</strong>
        <div class="progress" aria-label="${resource.name} utilization ${used}%"><span style="width:${used}%"></span></div>
        <span>${used}%</span>
      </div>
    `;
  }).join("") : `<div class="empty">No resources match the current filters.</div>`;
}

function renderAlerts() {
  const panel = document.querySelector("#dashboardAlertsPanel");
  if (panel) panel.classList.toggle("hidden", currentUser?.role === "student");

  const target = document.querySelector("#conflictAlerts");
  if (!target || currentUser?.role === "student") return;

  const resources = visibleResources();
  const resourceIds = new Set(resources.map((resource) => resource.id));
  const pendingConflicts = state.bookings.filter((booking) => resourceIds.has(booking.resourceId) && booking.status === "Pending" && hasConflict(booking));
  const underused = resources.filter((resource) => utilization(resource.id) < 20 && resource.availability !== "Maintenance").slice(0, 2);

  const alerts = [
    ...pendingConflicts.map((booking) => {
      const resource = getResource(booking.resourceId);
      return `<div class="alert danger"><strong>${escapeHtml(resource.name)}</strong><p>${escapeHtml(booking.requester)} conflicts on ${formatDate(booking.date)}, ${booking.start}-${booking.end}.</p></div>`;
    }),
    ...underused.map((resource) => `<div class="alert warn"><strong>${escapeHtml(resource.name)}</strong><p>Low utilization at ${utilization(resource.id)}%. Route smaller bookings here when capacity fits.</p></div>`)
  ];

  target.innerHTML = alerts.length ? alerts.join("") : `<div class="empty">No conflict alerts right now.</div>`;
}

function renderResources() {
  renderDepartmentFilter();
  const resources = visibleResources()
    .filter((resource) => filters.type === "all" || resource.type === filters.type)
    .filter((resource) => filters.availability === "all" || occupancy(resource) === filters.availability)
    .filter(searchMatchesResource);

  document.querySelector("#resourceGrid").innerHTML = resources.length ? resources.map((resource) => {
    const used = utilization(resource.id);
    const status = occupancy(resource);
    return `
      <article class="resource-card">
        <div class="resource-top">
          <div>
            <h2>${escapeHtml(resource.name)}</h2>
            <p>${escapeHtml(resource.location)}</p>
          </div>
          <span class="badge ${status}">${status}</span>
        </div>
        <div class="resource-meta">
          <span class="badge">${escapeHtml(resource.type)}</span>
          <span class="badge">${escapeHtml(resourceDepartment(resource))}</span>
          <span class="badge">Capacity ${resource.capacity}</span>
          ${resource.features.map((feature) => `<span class="badge">${escapeHtml(feature)}</span>`).join("")}
        </div>
        <p>Utilization</p>
        <div class="progress"><span style="width:${used}%"></span></div>
      </article>
    `;
  }).join("") : `<div class="empty">No resources match the current filters.</div>`;
}

function renderEvents() {
  const events = state.events
    .filter((event) => filters.eventType === "all" || event.type === filters.eventType)
    .filter((event) => {
      if (filters.eventTime === "current") return eventStatus(event) === "Current";
      if (filters.eventTime === "upcoming") return eventStatus(event) === "Upcoming";
      if (filters.eventTime === "registered") return eventRegistered(event);
      return eventStatus(event) !== "Completed";
    })
    .filter(searchMatchesEvent)
    .sort((a, b) => `${a.date}${a.start}`.localeCompare(`${b.date}${b.start}`));

  document.querySelector("#eventGrid").innerHTML = events.length ? events.map((event) => {
    const status = eventStatus(event);
    const registered = eventRegistered(event);
    const seatsLeft = Math.max(0, event.seats - event.registrations.length);
    const full = seatsLeft === 0;
    return `
      <article class="event-card">
        <div class="event-media">
          <span class="badge ${status}">${status}</span>
          <span>${escapeHtml(event.type)}</span>
        </div>
        <div class="event-body">
          <div class="resource-top">
            <div>
              <h2>${escapeHtml(event.title)}</h2>
              <p>${escapeHtml(event.organizer)}</p>
            </div>
            <span class="badge ${registered ? "Approved" : "Pending"}">${registered ? "Registered" : `${seatsLeft} seats`}</span>
          </div>
          <p>${escapeHtml(event.description)}</p>
          <div class="resource-meta">
            <span class="badge">${formatDate(event.date)}</span>
            <span class="badge">${event.start}-${event.end}</span>
            <span class="badge">${escapeHtml(eventVenue(event))}</span>
          </div>
          <button class="primary event-register" data-event-id="${event.id}" ${registered || full || status === "Completed" ? "disabled" : ""}>
            ${registered ? "Already registered" : full ? "Full" : "Apply / Register"}
          </button>
        </div>
      </article>
    `;
  }).join("") : `<div class="empty">No campus events match the current filters.</div>`;
}

function renderDepartmentFilter() {
  const select = document.querySelector("#departmentFilter");
  if (!select) return;

  select.classList.toggle("hidden", !hasRole("admin"));
  if (!hasRole("admin")) {
    select.innerHTML = `<option value="all">${escapeHtml(currentUser.department)} facilities</option>`;
    select.value = "all";
    filters.department = "all";
    return;
  }

  const current = select.value || filters.department;
  select.innerHTML = [
    `<option value="all">All departments</option>`,
    ...departments.map((department) => `<option value="${escapeHtml(department)}">${escapeHtml(department)}</option>`)
  ].join("");
  select.value = departments.includes(current) ? current : "all";
  filters.department = select.value;
}

function renderMapBuildings() {
  const select = document.querySelector("#mapBuildingFilter");
  const current = select.value || "all";
  const buildings = [...new Set(visibleResources()
    .filter((resource) => resourceFloor(resource) === filters.mapFloor)
    .map(buildingName))].sort();
  select.innerHTML = [
    `<option value="all">All areas</option>`,
    ...buildings.map((building) => `<option value="${escapeHtml(building)}">${escapeHtml(building)}</option>`)
  ].join("");
  select.value = buildings.includes(current) ? current : "all";
}

function renderFloorPlan() {
  const plan = activeFloorPlan();
  const image = document.querySelector("#floorPlanImage");
  image.src = plan.image;
  image.alt = `${plan.label} plan`;
  document.querySelectorAll("#mapFloorFilters button").forEach((button) => {
    button.classList.toggle("active", button.dataset.mapFloor === filters.mapFloor);
  });
}

function renderMapNavigationControls() {
  const currentSelect = document.querySelector("#currentLocation");
  const destinations = document.querySelector("#destinationList");
  const current = currentSelect.value || activeRoute.from;
  const places = Object.keys(activeFloorPlan().places);

  currentSelect.innerHTML = places.map((place) => `<option value="${escapeHtml(place)}">${escapeHtml(place)}</option>`).join("");
  currentSelect.value = places.includes(current) ? current : places[0];
  activeRoute.from = currentSelect.value;

  destinations.innerHTML = destinationOptions()
    .map((option) => `<option value="${escapeHtml(option.label)}"></option>`)
    .join("");
}

function renderRoute() {
  const plan = activeFloorPlan();
  const fromPoint = plan.places[activeRoute.from] || Object.values(plan.places)[0];
  const marker = document.querySelector("#currentMarker");
  marker.innerHTML = `<div class="current-location" style="${routePointStyle(fromPoint)}"><span>You</span></div>`;

  const routeSvg = document.querySelector("#mapRouteSvg");
  const notice = document.querySelector("#routeNotice");
  let destinationPoint = null;
  let destinationLabel = "";

  if (activeRoute.destinationId?.startsWith("place:")) {
    destinationLabel = activeRoute.destinationId.replace("place:", "");
    destinationPoint = plan.places[destinationLabel];
  } else if (activeRoute.destinationId) {
    const resource = getResource(activeRoute.destinationId);
    if (resource && resourceFloor(resource) === filters.mapFloor) {
      destinationPoint = resourceMapPosition(resource);
      destinationLabel = `${resource.name}, ${resource.location}`;
    }
  }

  if (!destinationPoint) {
    routeSvg.innerHTML = "";
    notice.textContent = "Choose your current location and search a room to navigate.";
    return;
  }

  const midX = destinationPoint.x;
  const midY = fromPoint.y;
  routeSvg.innerHTML = `
    <polyline points="${fromPoint.x},${fromPoint.y} ${midX},${midY} ${destinationPoint.x},${destinationPoint.y}" />
    <circle cx="${destinationPoint.x}" cy="${destinationPoint.y}" r="1.8" />
  `;
  notice.textContent = `Route from ${activeRoute.from} to ${destinationLabel}: follow the highlighted path on the ${plan.label.toLowerCase()} plan.`;
}

function renderMap() {
  renderFloorPlan();
  renderMapBuildings();
  renderMapNavigationControls();
  const resources = visibleResources()
    .filter((resource) => resourceFloor(resource) === filters.mapFloor)
    .filter((resource) => filters.mapType === "all" || resource.type === filters.mapType)
    .filter((resource) => filters.mapBuilding === "all" || buildingName(resource) === filters.mapBuilding)
    .filter(searchMatchesResource);

  const buildingSeen = {};
  document.querySelector("#mapPins").innerHTML = resources.map((resource) => {
    const building = buildingName(resource);
    const index = buildingSeen[building] || 0;
    buildingSeen[building] = index + 1;
    const position = mapPosition(resource, index);
    const status = occupancy(resource);
    return `
      <button class="map-pin ${resource.type.replace(/\s+/g, "-")} ${status}" style="left:${position.x}%; top:${position.y}%;" data-resource-id="${resource.id}" title="${escapeHtml(resource.name)}">
        <span>${escapeHtml(resource.type.slice(0, 1))}</span>
      </button>
    `;
  }).join("");

  document.querySelector("#mapDetails").innerHTML = resources.length ? resources.map((resource) => {
    const status = occupancy(resource);
    return `
      <button class="map-detail" type="button" data-resource-id="${resource.id}">
        <strong>${escapeHtml(resource.name)}</strong>
        <span>${escapeHtml(buildingName(resource))} - ${escapeHtml(resource.location)}</span>
        <span class="badge">${escapeHtml(resourceDepartment(resource))}</span>
        <span class="badge ${status}">${status}</span>
      </button>
    `;
  }).join("") : `<div class="empty">No mapped resources match the current filters.</div>`;
  renderRoute();
}

function renderBookingOptions() {
  const typeSelect = document.querySelector("#bookingType");
  const resourceSelect = document.querySelector("#bookingResource");
  const selectedType = typeSelect.value || "Classroom";

  typeSelect.innerHTML = resourceTypes.map((type) => `<option ${type === selectedType ? "selected" : ""}>${type}</option>`).join("");

  const resources = visibleResources().filter((resource) => resource.type === selectedType);
  resourceSelect.innerHTML = resources.map((resource) => (
    `<option value="${resource.id}">${escapeHtml(resource.name)} - ${escapeHtml(resourceDepartment(resource))} - capacity ${resource.capacity}</option>`
  )).join("") || `<option value="">No accessible ${escapeHtml(selectedType.toLowerCase())} facilities</option>`;
}

function renderResourceControls() {
  const typeSelect = document.querySelector("#resourceForm select[name='type']");
  const departmentSelect = document.querySelector("#resourceForm select[name='department']");
  const statusResource = document.querySelector("#statusResource");

  typeSelect.innerHTML = resourceTypes.map((type) => `<option>${type}</option>`).join("");
  departmentSelect.innerHTML = departments.map((department) => `<option>${department}</option>`).join("");
  statusResource.innerHTML = state.resources.map((resource) => (
    `<option value="${resource.id}">${escapeHtml(resource.name)} - ${escapeHtml(resourceDepartment(resource))} - ${escapeHtml(resource.availability)}</option>`
  )).join("");
}

function getFormCandidate() {
  const form = document.querySelector("#bookingForm");
  const data = new FormData(form);
  return {
    resourceId: data.get("resourceId"),
    requester: data.get("requester")?.trim() || currentUser?.name || "Campus user",
    purpose: data.get("purpose")?.trim() || "Resource booking",
    date: data.get("date"),
    start: data.get("start"),
    end: data.get("end")
  };
}

function findSuggestions(candidate, type, capacity) {
  const slots = [
    ["08:00", "09:30"],
    ["09:30", "11:00"],
    ["11:00", "12:30"],
    ["13:00", "14:30"],
    ["14:30", "16:00"],
    ["16:00", "17:30"],
    ["17:30", "19:00"]
  ];

  const options = [];
  visibleResources()
    .filter((resource) => resource.type === type && resource.capacity >= capacity && resource.availability !== "Maintenance")
    .forEach((resource) => {
      const sameSlot = { ...candidate, resourceId: resource.id };
      if (!hasConflict(sameSlot)) {
        options.push({ resource, start: candidate.start, end: candidate.end, score: 100 - utilization(resource.id), reason: "Available in requested slot" });
      }

      slots.forEach(([start, end]) => {
        const alternative = { ...candidate, resourceId: resource.id, start, end };
        if (!hasConflict(alternative) && !(start === candidate.start && end === candidate.end)) {
          options.push({ resource, start, end, score: 90 - utilization(resource.id), reason: "Alternate slot" });
        }
      });
    });

  return options.sort((a, b) => b.score - a.score).slice(0, 5);
}

function renderSuggestions() {
  const form = document.querySelector("#bookingForm");
  const candidate = getFormCandidate();
  const type = form.elements.type.value;
  const capacity = Number(form.elements.capacity.value || 1);
  const target = document.querySelector("#suggestions");

  if (!candidate.date || !candidate.start || !candidate.end) {
    target.innerHTML = `<div class="empty">Choose date and time to see smart suggestions.</div>`;
    return;
  }

  const suggestions = findSuggestions(candidate, type, capacity);
  target.innerHTML = suggestions.length ? suggestions.map((item) => `
    <button class="suggestion" type="button" data-resource="${item.resource.id}" data-start="${item.start}" data-end="${item.end}">
      <strong>${escapeHtml(item.resource.name)}</strong>
      <p>${item.reason}: ${item.start}-${item.end}. Capacity ${item.resource.capacity}, utilization ${utilization(item.resource.id)}%.</p>
    </button>
  `).join("") : `<div class="empty">No matching slots found. Try a different date, type, or capacity.</div>`;
}

function showNotice(message, isError = false) {
  const notice = document.querySelector("#bookingNotice");
  notice.textContent = message;
  notice.className = `notice show${isError ? " error" : ""}`;
}

function autoClassroomDecision(candidate, resource, requestedCapacity) {
  if (resource.type !== "Classroom") return null;
  if (resource.availability === "Maintenance") return { status: "Rejected", reason: "classroom is under maintenance" };
  if (requestedCapacity > resource.capacity) return { status: "Rejected", reason: "capacity is too low" };
  if (hasConflict(candidate)) return { status: "Rejected", reason: "requested slot conflicts with another approved booking" };
  return { status: "Approved", reason: "classroom is available" };
}

function renderBookings() {
  const resourceIds = new Set(visibleResources().map((resource) => resource.id));
  const bookings = state.bookings
    .filter((booking) => resourceIds.has(booking.resourceId))
    .filter((booking) => filters.status === "all" || booking.status === filters.status)
    .filter(searchMatchesBooking)
    .sort((a, b) => b.createdAt - a.createdAt);

  document.querySelector("#bookingTable").innerHTML = bookings.length ? bookings.map((booking) => {
    const resource = getResource(booking.resourceId);
    const conflict = booking.status === "Pending" && hasConflict(booking);
    return `
      <tr>
        <td><strong>${escapeHtml(resource?.name || "Unknown")}</strong><br><span>${escapeHtml(resource?.type || "")}</span></td>
        <td>${escapeHtml(booking.requester)}<br><span>${escapeHtml(booking.purpose)}</span></td>
        <td>${formatDate(booking.date)}<br>${booking.start}-${booking.end}</td>
        <td><span class="badge ${booking.status}">${booking.status}</span>${conflict ? `<br><span class="badge Rejected">Conflict</span>` : ""}</td>
        <td>
          <div class="actions">
            <button class="row-button approve" data-action="approve" data-id="${booking.id}" ${booking.status !== "Pending" || conflict ? "disabled" : ""}>Approve</button>
            <button class="row-button reject" data-action="reject" data-id="${booking.id}" ${booking.status !== "Pending" ? "disabled" : ""}>Reject</button>
          </div>
        </td>
      </tr>
    `;
  }).join("") : `<tr><td colspan="5"><div class="empty">No bookings match the current filters.</div></td></tr>`;
}

function roleLabel(role) {
  return role ? `${role.charAt(0).toUpperCase()}${role.slice(1)}` : "User";
}

function userIdentifier(user) {
  if (user.role === "student") return `USN ${user.usn || user.id}`;
  if (user.role === "faculty") return `ESSN ${user.essn || user.id}`;
  return user.id;
}

function userDepartmentText(user) {
  if (user.role === "student") {
    return `${user.department}${user.section ? `-${user.section}` : ""}`;
  }
  return user.department;
}

function renderRegisterDepartments() {
  const select = document.querySelector("#register-department");
  if (!select) return;

  select.innerHTML = departments.map((department) => (
    `<option value="${escapeHtml(department)}">${escapeHtml(department)}</option>`
  )).join("");
}

function updateRegisterFields() {
  const role = document.querySelector("#register-role")?.value || "student";
  const isStudent = role === "student";
  const idLabel = document.querySelector("#registerUserIdLabel");
  const nameLabel = document.querySelector("#registerNameLabel");
  const idInput = document.querySelector("#register-userId");
  const sectionField = document.querySelector("#registerSectionField");
  const sectionInput = document.querySelector("#register-section");

  if (idLabel) idLabel.textContent = isStudent ? "USN" : "ESSN";
  if (nameLabel) nameLabel.textContent = isStudent ? "Name of student" : "Name of faculty";
  if (idInput) idInput.placeholder = isStudent ? "1PI23CS001" : "ESSN001";
  if (sectionField) sectionField.classList.toggle("hidden", !isStudent);
  if (sectionInput) sectionInput.required = isStudent;
}

function setAuthMode(mode) {
  const isRegister = mode === "register";
  document.querySelector("#loginForm")?.classList.toggle("hidden", isRegister);
  document.querySelector("#registerForm")?.classList.toggle("hidden", !isRegister);
  document.querySelectorAll("[data-auth-mode]").forEach((button) => {
    button.classList.toggle("active", button.dataset.authMode === mode);
  });
  document.querySelector("#loginNotice").className = "notice";
  document.querySelector("#registerNotice").className = "notice";
}

function showRegisterNotice(message, isError = false) {
  const notice = document.querySelector("#registerNotice");
  notice.textContent = message;
  notice.className = `notice show${isError ? " error" : ""}`;
}

function registerUser(form) {
  const data = new FormData(form);
  const role = data.get("role");
  const id = String(data.get("userId") || "").trim();
  const name = String(data.get("name") || "").trim();
  const department = data.get("department");
  const section = String(data.get("section") || "").trim().toUpperCase();
  const password = String(data.get("password") || "");
  const confirmPassword = String(data.get("confirmPassword") || "");

  if (!["student", "faculty"].includes(role)) {
    showRegisterNotice("Choose student or faculty account type.", true);
    return;
  }

  if (findRegisteredUser(id)) {
    showRegisterNotice("This USN, ESSN, or user ID is already registered.", true);
    return;
  }

  if (role === "student" && !section) {
    showRegisterNotice("Section is required for student registration.", true);
    return;
  }

  if (password.length < 4) {
    showRegisterNotice("Password must be at least 4 characters.", true);
    return;
  }

  if (password !== confirmPassword) {
    showRegisterNotice("Passwords do not match.", true);
    return;
  }

  const user = {
    id,
    password,
    name,
    role,
    department,
    homeView: "dashboard",
    ...(role === "student" ? { usn: id, section } : { essn: id })
  };

  state.users.push(user);
  saveState();
  currentUser = user;
  saveSession(user);
  form.reset();
  updateRegisterFields();
  renderAuth();
  renderAll();
}

function renderAuth() {
  document.body.classList.toggle("logged-in", Boolean(currentUser));

  if (!currentUser) {
    return;
  }

  document.querySelector("#userChip").textContent = `${currentUser.name} - ${roleLabel(currentUser.role)} - ${userIdentifier(currentUser)} - ${userDepartmentText(currentUser)}`;
  document.querySelector("#resetDemo").classList.toggle("hidden", !hasRole("admin"));

  document.querySelectorAll(".nav-item").forEach((item) => {
    const minRole = item.dataset.minRole;
    const studentOnly = item.dataset.studentOnly === "true";
    item.classList.toggle("hidden", !hasRole(minRole) || (studentOnly && currentUser.role !== "student"));
  });

  const requester = document.querySelector("#bookingForm input[name='requester']");
  requester.value = currentUser.role === "admin" ? "" : currentUser.name;
  requester.readOnly = currentUser.role !== "admin";

  const activeView = document.querySelector(".view.active")?.id?.replace("View", "");
  if (!activeView || !canAccessView(activeView)) {
    setView(currentUser.homeView);
  }
}

function login(userId, password) {
  const submitBtn = document.querySelector("#loginSubmitBtn");
  const submitText = submitBtn?.querySelector(".login-submit-text");
  const submitSpinner = submitBtn?.querySelector(".login-spinner");
  const notice = document.querySelector("#loginNotice");

  // Show loading state
  if (submitText) submitText.style.display = "none";
  if (submitSpinner) submitSpinner.style.display = "inline-block";
  if (submitBtn) submitBtn.disabled = true;

  // Small delay for UX feel
  setTimeout(() => {
    const user = findRegisteredUser(userId);

    // Restore button
    if (submitText) submitText.style.display = "";
    if (submitSpinner) submitSpinner.style.display = "none";
    if (submitBtn) submitBtn.disabled = false;

    if (!user || user.password !== password) {
      notice.textContent = "Invalid credentials. Register first, then sign in with your USN, ESSN, or user ID.";
      notice.className = "notice show error login-shake";
      setTimeout(() => notice.classList.remove("login-shake"), 400);
      return;
    }

    currentUser = user;
    saveSession(user);
    document.querySelector("#loginForm").reset();
    notice.className = "notice";
    renderAuth();
    renderAll();
  }, 500);
}

function logout() {
  if (currentUser) {
    currentUser.sessionToken = null;
    saveState();
  }
  currentUser = null;
  saveSession(null);
  document.body.classList.remove("logged-in");
  document.querySelector("#loginNotice").className = "notice";
}

function renderOptimization() {
  const resourcesByUse = visibleResources().sort((a, b) => utilization(a.id) - utilization(b.id));
  const lowUse = resourcesByUse.filter((resource) => utilization(resource.id) < 25 && resource.availability !== "Maintenance").slice(0, 3);
  const highUse = resourcesByUse.filter((resource) => utilization(resource.id) > 65).slice(-3);
  const maintenance = resourcesByUse.filter((resource) => resource.availability === "Maintenance");

  const items = [
    ...lowUse.map((resource) => `<div class="suggestion"><strong>Route small groups to ${escapeHtml(resource.name)}</strong><p>Current utilization is ${utilization(resource.id)}%, so it is a strong candidate for overflow bookings.</p></div>`),
    ...highUse.map((resource) => `<div class="suggestion"><strong>Protect peak load for ${escapeHtml(resource.name)}</strong><p>Utilization is ${utilization(resource.id)}%. Prefer alternate resources for non-critical sessions.</p></div>`),
    ...maintenance.map((resource) => `<div class="suggestion"><strong>Maintenance block: ${escapeHtml(resource.name)}</strong><p>Keep unavailable until facility status is restored.</p></div>`)
  ];

  document.querySelector("#optimizationReport").innerHTML = items.length ? items.join("") : `<div class="empty">Utilization is balanced across resources.</div>`;
}

function formatLastSeen(timestamp) {
  const elapsed = Math.max(1, Math.round((Date.now() - timestamp) / 60000));
  return `${elapsed} min ago`;
}

function showIoTNotice(message, isError = false) {
  const notice = document.querySelector("#iotNotice");
  notice.textContent = message;
  notice.className = `notice show${isError ? " error" : ""}`;
}

function renderIoTDevices() {
  const target = document.querySelector("#iotDeviceList");
  if (!target) return;

  const devices = state.iotDevices || [];
  const onCount = devices.filter((device) => device.status === "On").length;
  const lorawanCount = devices.filter((device) => device.protocol === "LoRaWAN").length;
  const wifiCount = devices.filter((device) => device.protocol === "WiFi").length;

  target.innerHTML = `
    <div class="iot-summary">
      <span><strong>${devices.length}</strong> connected</span>
      <span><strong>${onCount}</strong> on</span>
      <span><strong>${lorawanCount}</strong> LoRaWAN</span>
      <span><strong>${wifiCount}</strong> WiFi</span>
    </div>
    ${devices.length ? devices.map((device) => `
      <article class="iot-device">
        <div>
          <strong>${escapeHtml(device.name)}</strong>
          <span>${escapeHtml(device.deviceType)} - ${escapeHtml(floorPlans[device.floor]?.label || device.floor)} - ${escapeHtml(device.area)}</span>
          <span>${escapeHtml(device.protocol)} gateway - last seen ${formatLastSeen(device.lastSeen)}</span>
        </div>
        <div class="iot-device-actions">
          <span class="badge ${device.status === "On" ? "Approved" : "Rejected"}">${device.status}</span>
          <button class="row-button" type="button" data-iot-action="toggle" data-device-id="${device.id}">
            Turn ${device.status === "On" ? "off" : "on"}
          </button>
        </div>
      </article>
    `).join("") : `<div class="empty">No IoT devices connected yet.</div>`}
  `;
}

function setAllIoTDevices(status) {
  state.iotDevices.forEach((device) => {
    device.status = status;
    device.lastSeen = Date.now();
  });
  saveState();
  renderIoTDevices();
}

function renderAll() {
  if (!currentUser) return;
  renderMetrics();
  renderDepartmentDashboard();
  renderLibraryBooks();
  renderOccupancy();
  renderAlerts();
  renderResources();
  renderEvents();
  renderMap();
  renderBookingOptions();
  renderResourceControls();
  renderSuggestions();
  renderBookings();
  renderOptimization();
  renderIoTDevices();
}

function setView(viewName) {
  if (!canAccessView(viewName)) return;
  Object.entries(views).forEach(([name, view]) => view.classList.toggle("active", name === viewName));
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === viewName));
  document.querySelector("#pageTitle").textContent = pageTitles[viewName];
}

function approveBooking(id) {
  if (!hasRole("admin")) return;
  const booking = state.bookings.find((item) => item.id === id);
  if (!booking || hasConflict(booking)) return;
  booking.status = "Approved";
  saveState();
  renderAll();
}

function rejectBooking(id) {
  if (!hasRole("admin")) return;
  const booking = state.bookings.find((item) => item.id === id);
  if (!booking) return;
  booking.status = "Rejected";
  saveState();
  renderAll();
}

function registerForEvent(eventId) {
  if (!hasRole("student")) return;
  const event = state.events.find((item) => item.id === eventId);
  if (!event || eventRegistered(event) || event.registrations.length >= event.seats || eventStatus(event) === "Completed") return;

  event.registrations.push({
    userId: currentUser.id,
    name: currentUser.name,
    role: currentUser.role,
    registeredAt: new Date().toISOString()
  });
  saveState();
  renderEvents();
}

function wireEvents() {
  document.querySelector(".auth-tabs").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-auth-mode]");
    if (!button) return;
    setAuthMode(button.dataset.authMode);
  });

  document.querySelector("#loginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    login(data.get("userId").trim(), data.get("password"));
  });

  document.querySelector("#register-role").addEventListener("change", updateRegisterFields);

  document.querySelector("#registerForm").addEventListener("submit", (event) => {
    event.preventDefault();
    registerUser(event.currentTarget);
  });

  document.querySelector(".demo-users").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-demo-user]");
    if (!button) return;
    const user = findRegisteredUser(button.dataset.demoUser);
    if (!user) return;
    setAuthMode("login");
    document.querySelector("#login-userId").value = user.id;
    document.querySelector("#login-password").value = user.password;
    const notice = document.querySelector("#loginNotice");
    notice.textContent = "Sample registered account filled. Select Sign In to continue.";
    notice.className = "notice show";
  });

  // Password visibility toggle
  const togglePw = document.querySelector("#togglePassword");
  if (togglePw) {
    togglePw.addEventListener("click", () => {
      const pwInput = document.querySelector("#login-password");
      const eyeOpen = togglePw.querySelector(".eye-open");
      const eyeClosed = togglePw.querySelector(".eye-closed");
      if (pwInput.type === "password") {
        pwInput.type = "text";
        if (eyeOpen) eyeOpen.style.display = "none";
        if (eyeClosed) eyeClosed.style.display = "";
      } else {
        pwInput.type = "password";
        if (eyeOpen) eyeOpen.style.display = "";
        if (eyeClosed) eyeClosed.style.display = "none";
      }
    });
  }

  document.querySelector("#logoutButton").addEventListener("click", logout);

  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", () => setView(item.dataset.view));
  });

  document.querySelector("#globalSearch").addEventListener("input", (event) => {
    filters.search = event.target.value.trim();
    renderAll();
  });

  document.querySelector("#typeFilters").addEventListener("click", (event) => {
    if (!event.target.matches("button")) return;
    filters.type = event.target.dataset.type;
    document.querySelectorAll("#typeFilters button").forEach((button) => button.classList.toggle("active", button === event.target));
    renderResources();
  });

  document.querySelector("#availabilityFilter").addEventListener("change", (event) => {
    filters.availability = event.target.value;
    renderResources();
  });

  document.querySelector("#departmentFilter").addEventListener("change", (event) => {
    filters.department = event.target.value;
    renderAll();
  });

  document.querySelector("#trendFilter").addEventListener("change", (event) => {
    filters.trendType = event.target.value;
    renderOccupancy();
  });

  document.querySelector("#bookingStatusFilter").addEventListener("change", (event) => {
    filters.status = event.target.value;
    renderBookings();
  });

  document.querySelector("#eventFilters").addEventListener("click", (event) => {
    if (!event.target.matches("button")) return;
    filters.eventTime = event.target.dataset.eventFilter;
    document.querySelectorAll("#eventFilters button").forEach((button) => button.classList.toggle("active", button === event.target));
    renderEvents();
  });

  document.querySelector("#eventTypeFilter").addEventListener("change", (event) => {
    filters.eventType = event.target.value;
    renderEvents();
  });

  document.querySelector("#eventGrid").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-event-id]");
    if (!button) return;
    registerForEvent(button.dataset.eventId);
  });

  document.querySelector("#libraryCatalog").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-book-id]");
    if (!button || currentUser?.role !== "student") return;
    const book = state.libraryBooks.find((item) => item.id === button.dataset.bookId);
    if (!book || !canAccessBook(book) || bookRegistration(book) || availableBookCopies(book) === 0) return;

    const slot = allocatePickupSlot();
    book.registrations ||= [];
    book.registrations.push({
      userId: currentUser.id,
      name: currentUser.name,
      department: currentUser.department,
      pickupDate: slot.date,
      pickupTime: slot.time,
      returnDate: returnDateForPickup(slot.date),
      returnTime: "17:00",
      registeredAt: new Date().toISOString()
    });
    saveState();
    renderLibraryBooks();
  });

  document.querySelector("#librarySearch").addEventListener("input", (event) => {
    filters.librarySearch = event.target.value.trim();
    renderLibraryBooks();
  });

  document.querySelector("#mapTypeFilters").addEventListener("click", (event) => {
    if (!event.target.matches("button")) return;
    filters.mapType = event.target.dataset.mapType;
    document.querySelectorAll("#mapTypeFilters button").forEach((button) => button.classList.toggle("active", button === event.target));
    renderMap();
  });

  document.querySelector("#mapFloorFilters").addEventListener("click", (event) => {
    if (!event.target.matches("button")) return;
    filters.mapFloor = event.target.dataset.mapFloor;
    filters.mapBuilding = "all";
    activeRoute.destinationId = null;
    renderMap();
  });

  document.querySelector("#mapBuildingFilter").addEventListener("change", (event) => {
    filters.mapBuilding = event.target.value;
    renderMap();
  });

  document.querySelector("#currentLocation").addEventListener("change", (event) => {
    activeRoute.from = event.target.value;
    renderRoute();
  });

  document.querySelector("#mapSearchForm").addEventListener("submit", (event) => {
    event.preventDefault();
    activeRoute.from = document.querySelector("#currentLocation").value;
    const destination = findDestination(document.querySelector("#destinationSearch").value);
    if (!destination) {
      document.querySelector("#routeNotice").textContent = "No matching room found. Try a room number, resource name, or staircase name.";
      document.querySelector("#mapRouteSvg").innerHTML = "";
      return;
    }

    filters.mapFloor = destination.type === "resource" ? resourceFloor(destination.resource) : destination.floor;
    filters.mapBuilding = "all";
    activeRoute.destinationId = destination.type === "resource" ? destination.resource.id : `place:${destination.place}`;
    renderMap();
    if (destination.type === "resource") {
      document.querySelectorAll(".map-pin, .map-detail").forEach((item) => item.classList.toggle("selected", item.dataset.resourceId === destination.resource.id));
    }
  });

  document.querySelector("#mapView").addEventListener("click", (event) => {
    const target = event.target.closest("[data-resource-id]");
    if (!target) return;
    const id = target.dataset.resourceId;
    activeRoute.destinationId = id;
    document.querySelectorAll(".map-pin, .map-detail").forEach((item) => item.classList.toggle("selected", item.dataset.resourceId === id));
    renderRoute();
  });

  document.querySelector("#bookingType").addEventListener("change", () => {
    renderBookingOptions();
    renderSuggestions();
  });

  document.querySelector("#bookingForm").addEventListener("input", renderSuggestions);

  document.querySelector("#bookingForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!hasRole("student")) return;
    const candidate = getFormCandidate();
    const form = event.currentTarget;

    if (minutes(candidate.end) <= minutes(candidate.start)) {
      showNotice("End time must be later than start time.", true);
      return;
    }

    const resource = getResource(candidate.resourceId);
    if (!canUseResource(resource)) {
      showNotice("You can only request facilities assigned to your department or common facilities.", true);
      return;
    }

    const requestedCapacity = Number(form.elements.capacity.value);
    const classroomDecision = autoClassroomDecision(candidate, resource, requestedCapacity);

    if (classroomDecision) {
      state.bookings.unshift({
        id: makeId(),
        ...candidate,
        requesterId: currentUser.id,
        requesterRole: currentUser.role,
        status: classroomDecision.status,
        createdAt: Date.now()
      });
      saveState();
      form.reset();
      form.elements.date.value = today;
      form.elements.start.value = "10:00";
      form.elements.end.value = "11:00";
      showNotice(`Classroom booking ${classroomDecision.status.toLowerCase()} automatically because ${classroomDecision.reason}.`, classroomDecision.status === "Rejected");
      renderAuth();
      renderAll();
      return;
    }

    if (resource.availability === "Maintenance") {
      showNotice("This resource is under maintenance. Choose another suggested option.", true);
      return;
    }

    if (requestedCapacity > resource.capacity) {
      showNotice("Selected resource does not meet the required capacity.", true);
      return;
    }

    if (hasConflict(candidate)) {
      showNotice("Conflict detected. Pick one of the suggested alternatives before submitting.", true);
      return;
    }

    state.bookings.unshift({
      id: makeId(),
      ...candidate,
      requesterId: currentUser.id,
      requesterRole: currentUser.role,
      status: "Pending",
      createdAt: Date.now()
    });
    saveState();
    form.reset();
    form.elements.date.value = today;
    form.elements.start.value = "10:00";
    form.elements.end.value = "11:00";
    showNotice("Booking request submitted for admin approval.");
    renderAuth();
    renderAll();
  });

  document.querySelector("#suggestions").addEventListener("click", (event) => {
    const suggestion = event.target.closest(".suggestion");
    if (!suggestion) return;
    const form = document.querySelector("#bookingForm");
    form.elements.resourceId.value = suggestion.dataset.resource;
    form.elements.start.value = suggestion.dataset.start;
    form.elements.end.value = suggestion.dataset.end;
    showNotice("Suggested resource and slot selected.");
    renderSuggestions();
  });

  document.querySelector("#optimizePick").addEventListener("click", () => {
    const first = document.querySelector("#suggestions .suggestion");
    if (first) first.click();
  });

  document.querySelector("#bookingTable").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    if (button.dataset.action === "approve") approveBooking(button.dataset.id);
    if (button.dataset.action === "reject") rejectBooking(button.dataset.id);
  });

  document.querySelector("#resourceForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!hasRole("admin")) return;
    const data = new FormData(event.currentTarget);
    const features = String(data.get("features") || "")
      .split(",")
      .map((feature) => feature.trim())
      .filter(Boolean);

    state.resources.push({
      id: makeId(),
      name: data.get("name").trim(),
      type: data.get("type"),
      department: data.get("department"),
      capacity: Number(data.get("capacity")),
      availability: "Available",
      location: data.get("location").trim(),
      floor: floorFromLocation(data.get("location").trim()),
      features
    });

    saveState();
    event.currentTarget.reset();
    renderAll();
  });

  document.querySelector("#saveStatus").addEventListener("click", () => {
    if (!hasRole("admin")) return;
    const resource = getResource(document.querySelector("#statusResource").value);
    if (!resource) return;
    resource.availability = document.querySelector("#statusValue").value;
    saveState();
    renderAll();
  });

  document.querySelector("#collegeCloseShutdown").addEventListener("click", () => {
    if (!hasRole("admin")) return;
    const closeTime = document.querySelector("#collegeCloseTime").value || "18:00";
    setAllIoTDevices("Off");
    showIoTNotice(`All connected lights, fans, and electronics were switched off for college closing time ${closeTime}.`);
  });

  document.querySelector("#switchAllOn").addEventListener("click", () => {
    if (!hasRole("admin")) return;
    setAllIoTDevices("On");
    showIoTNotice("All connected IoT devices were switched on.");
  });

  document.querySelector("#iotDeviceForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!hasRole("admin")) return;
    const data = new FormData(event.currentTarget);
    state.iotDevices.unshift({
      id: makeId(),
      name: data.get("name").trim(),
      deviceType: data.get("deviceType"),
      protocol: data.get("protocol"),
      area: data.get("area").trim(),
      floor: data.get("floor"),
      status: "On",
      lastSeen: Date.now()
    });
    saveState();
    event.currentTarget.reset();
    showIoTNotice(`${data.get("name").trim()} connected through ${data.get("protocol")}.`);
    renderIoTDevices();
  });

  document.querySelector("#iotDeviceList").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-iot-action]");
    if (!button || !hasRole("admin")) return;
    const device = state.iotDevices.find((item) => item.id === button.dataset.deviceId);
    if (!device) return;
    device.status = device.status === "On" ? "Off" : "On";
    device.lastSeen = Date.now();
    saveState();
    showIoTNotice(`${device.name} turned ${device.status.toLowerCase()} through ${device.protocol}.`);
    renderIoTDevices();
  });

  document.querySelector("#resetDemo").addEventListener("click", () => {
    if (!hasRole("admin")) return;
    const activeUserId = currentUser.id;
    state = defaultState();
    syncSeedResourceDetails();
    currentUser = findRegisteredUser(activeUserId);
    saveSession(currentUser);
    saveState();
    renderAuth();
    renderAll();
  });
}

function init() {
  const form = document.querySelector("#bookingForm");
  form.elements.date.value = today;
  form.elements.start.value = "10:00";
  form.elements.end.value = "11:00";
  renderRegisterDepartments();
  updateRegisterFields();
  wireEvents();
  renderAuth();
  renderAll();
}

init();
