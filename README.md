# Mini Full-Stack Search

A quick search tool for finding FAQs. Type what you need, get the top 3 matches instantly.

## Get it running

```bash
npm install
npm run dev
```

Open **localhost:3000** and start searching!

## Commands

```bash
npm run dev     # Start it up
npm run build   # Build for prod
npm test        # Run tests
npm run lint    # Check code
```

## Stack

Next.js 16 • TypeScript • React 19 • Tailwind v4 • Vitest

## Folder structure

```
app/api/search/route.ts  → Search API
app/page.tsx             → Main page
components/              → UI stuff
hooks/                   → Custom hooks
data/faqs.json           → The 5 FAQs
__tests__/               → Tests
```

## API

**POST to `/api/search`**

Send:
```json
{ "query": "trust badges" }
```

Get back:
```json
{
  "results": [{ "id": "1", "title": "...", "body": "..." }],
  "summary": "...",
  "sources": ["1"]
}
```

Empty query? → `400 error`

No matches? → Empty array + friendly message

## How search works

Each FAQ gets scored based on matches:

- Word in title: **10 pts**
- Word in body: **3 pts**
- Exact phrase in title: **+20 pts**
- Exact phrase in body: **+5 pts**

**Example:** Search "trust badges" → finds "Trust badges near CTA" first
- "trust" in title (10) + "badges" in title (10) + exact phrase (20) + "badges" in body (3) = **43 pts**

Top 3 results win!

## Features

- Instant search (doesn't care about capitals)
- Top 3 ranked results
- Auto-generated summary
- Loading/error/empty states
- Mobile friendly + dark mode

## Why I built it this way

**Titles score higher** → People scan titles first

**Case-insensitive** → Easier to search, no caps needed

**Local JSON file** → Simple, no database setup

**Client + server validation** → Fast feedback + safe API

## The data

5 FAQs in `data/faqs.json` about conversion stuff:
1. Trust badges near CTA
2. Above-the-fold form
3. Qualifying question
4. Test ID visibility
5. Down-funnel icon

## Tests

```bash
npm test              # 12 tests
npm run test:ui       # Visual runner
npm run test:coverage # Coverage
```
