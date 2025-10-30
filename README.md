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

Scoring system:

- Word in title: **10 points**
- Word in body: **3 points**
- Exact phrase in title: **+20 points**
- Exact phrase in body: **+5 points**

**Example:** Searching "trust badges"
- FAQ with "trust badges" in title = 40 points (2 words × 10 + exact phrase 20)
- FAQ with just "badges" in body = 3 points

Top 3 results are returned sorted by score.

## Features

- Case-insensitive search
- Real-time results
- Top 3 ranked matches
- Loading, error, and empty states
- Responsive design with dark mode

## Sample Data

5 FAQs focused on conversion optimization:
1. Trust badges near CTA
2. Above-the-fold form placement
3. Qualifying questions
4. Test ID visibility
5. Down-funnel icon usage
