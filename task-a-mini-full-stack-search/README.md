# Mini Full-Stack Search

A simple FAQ search tool. Type a query and get the top 3 matches instantly.

## Quick Start

```bash
npm install
npm run dev
```

Open **localhost:3000** to start searching.

## Available Commands

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run lint    # Check code quality
```

## Tech Stack

Next.js 16, React 19, TypeScript, Tailwind v4, and Zod for validation.

## Project Structure

```
app/
  api/search/route.ts    → Search API
  page.tsx               → Main page
components/
  search/                → Form, results, states
  retroui/               → UI components
hooks/
  useSearch.ts           → Search logic
data/
  faqs.json              → Sample FAQs
```

## API Endpoint

**POST `/api/search`**

Request:
```json
{ "query": "trust badges" }
```

Response:
```json
{
  "results": [
    { "id": "1", "title": "...", "body": "..." }
  ],
  "summary": "Found 3 results for 'trust badges'",
  "sources": ["1", "2", "3"]
}
```

Empty query returns 400 error. No matches returns empty array with message.

## Search Algorithm

Like scanning a book: titles are weighted higher than body text.

**Scoring:**
- Each word match in title: 10 points
- Each word match in body: 3 points
- Exact phrase in title: +20 bonus
- Exact phrase in body: +5 bonus

**Example:** Search "trust badges" → FAQ #1 gets 51 points
- Title has both words (20 pts) + exact phrase bonus (20 pts)
- Body has both words (6 pts) + exact phrase bonus (5 pts)
- Other FAQs: 0 points

Returns top 3 results sorted by score.

## Features

- Case-insensitive search
- Real-time results
- Top 3 ranked matches
- Loading, error, and empty states
- Responsive design (mobile-friendly)

## Sample Data

5 FAQs focused on conversion optimization:
1. Trust badges near CTA
2. Above-the-fold form placement
3. Qualifying questions
4. Test ID visibility
5. Down-funnel icon usage
