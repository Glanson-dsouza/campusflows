# Library System Enhancement TODO

## Approved Plan Steps (Sequential)

### 1. Create books.json ✅
- Extract book data from index.html #libraryBookData to new books.json file.
- Ensure format matches current normalizeLibraryBook.

### 2. Update index.html ✅
- Remove the `<script id=\"libraryBookData\">` block.

### 3. Update app.js - Data Loading ✅
- Replace readLibraryBooksFromJson() to async fetch('./books.json').
- Wrap async init in initializeApp() + window.load handler.
- Fixed login error from top-level await.

### 4. Enhance Registration Logic in app.js ✅
- Add 'collected: false' and 'collectedAt' to registration object.
- In libraryCatalog click handler: After register, show "collect" message.

### 5. Add Mark Collected Feature in app.js ✅
- New markCollected(bookId) function: Set collected=true, collectedAt=now.
- Add button in renderLibraryBooks for !collected registrations.

### 6. Add Return Notifications in app.js
- New getReturnAlerts(): Find registrations where returnDate <= today or near.
- Integrate into renderAlerts() for dashboard.

### 7. Update renderLibraryBooks()
- Show \"Collect from library\" message for registered !collected.
- Add \"Mark Collected\" button post-pickup time.
- Show \"Collected, return by DATE\".

### 8. Update styles.css
- Add .collect-message, .mark-collected-button, .overdue-alert styles.

### 9. Test & Polish
- Test student flow: register → collect → notification.
- Verify persistence, search, availability.

## Progress
- [x] Step 1
- [x] Step 2
- [x] Step 3
- [x] Step 4
- [x] Step 5
- [x] Step 6
- [x] Step 7
- [x] Step 8
- [ ] Step 9
