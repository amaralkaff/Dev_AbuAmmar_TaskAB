# Dev_AbuAmmar_TaskAB

Developer: Abu Ammar

---

Two tasks for the technical assessment:
- **Task A**: Search interface with a backend API
- **Task B**: Web scraper that extracts page metadata

Built with Next.js 16, React 19, and TypeScript.

---

## How to Run

**Task A:**
```bash
cd task-a-mini-full-stack-search
npm install && npm run dev
```
Open http://localhost:3000

**Task B:**
```bash
cd task-b-micro-scraper
npm install && npm run dev
```
Open http://localhost:3000

---

## What Each Task Does

**Task A - Mini Full-Stack Search**

Search UI that queries local JSON data and shows top 3 matches.

See [task-a-mini-full-stack-search/README.md](task-a-mini-full-stack-search/README.md) for details.

**Task B - Micro Scraper**

API endpoint that scrapes webpage title, meta description, and h1 tag. Has 20-second timeout and proper error handling.

See [task-b-micro-scraper/README.md](task-b-micro-scraper/README.md) for details.

---

## Project Structure

```
.
├── task-a-mini-full-stack-search/
└── task-b-micro-scraper/
```

---

## Key Features

**Task A**
- Returns top 3 results by relevance score
- Query "trust badges" correctly returns item #1 first
- Empty queries return 400 error
- Bonus: Generates summary and includes source IDs

**Task B**
- Extracts title, meta description, h1 from any webpage
- Invalid URLs return 400 error
- Timeouts return 504 error
- Bonus: Custom user-agent and retry logic

---

## Common Commands

```bash
npm install    # Install dependencies
npm run dev    # Start dev server
npm run build  # Build for production
npm run lint   # Check code quality
```
