# Smart Campus Resource Optimization Platform

A self-contained full web application prototype for managing campus classrooms, labs, seminar halls, and shared equipment.

## Features

- Resource inventory with capacity, type, availability, location, and utilization.
- Booking request workflow with pending, approved, and rejected states.
- Campus events section with current/upcoming events, venue details, seat counts, and registration.
- Interactive campus map showing where classrooms, labs, halls, and equipment are located.
- Current-location navigation that lets students search by room number, place, or resource name and follow a highlighted route.
- Conflict detection for overlapping bookings.
- Smart alternate slot/resource suggestions.
- Admin dashboard with occupancy, analytics, alerts, and optimization reports.
- Search and filtering across resources and bookings.
- Role-based login for student, faculty, and admin users.
- Student access: view resources, submit booking requests, and register for campus events.
- Faculty access: student permissions plus dashboard visibility.
- Admin access: full dashboard, approvals, resource management, and demo reset.
- Local persistence using `localStorage`.

## Run

Open `index.html` in a browser, or serve this folder with any static server.

## Demo Logins

- Student: `student01` / `student123`
- Faculty: `faculty01` / `faculty123`
- Admin: `admin01` / `admin123`
