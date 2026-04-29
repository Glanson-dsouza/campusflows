const mongoose = require("mongoose");
const {
  User,
  Resource,
  Booking,
  Event,
  LibraryBook,
  IotDevice
} = require("./models");
const seedData = require("./data");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/campusflows";

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log(`Connected to ${MONGO_URI}`);

  await Promise.all([
    User.deleteMany({}),
    Resource.deleteMany({}),
    Booking.deleteMany({}),
    Event.deleteMany({}),
    LibraryBook.deleteMany({}),
    IotDevice.deleteMany({})
  ]);

  await User.insertMany(seedData.users);
  await Resource.insertMany(seedData.resources);
  await Booking.insertMany(seedData.bookings);
  await Event.insertMany(seedData.events);
  await LibraryBook.insertMany(seedData.libraryBooks);
  await IotDevice.insertMany(seedData.iotDevices);

  console.log("Seeded campusflows database.");
  console.log({
    users: seedData.users.length,
    resources: seedData.resources.length,
    bookings: seedData.bookings.length,
    events: seedData.events.length,
    libraryBooks: seedData.libraryBooks.length,
    iotDevices: seedData.iotDevices.length
  });
}

seed()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
