# Micro Scraper

A simple web scraper API. Provide a URL and get the title, meta description, and h1 tag instantly.

## Quick Start

```bash
npm install
npm run dev
```

Open **localhost:3000/api/scrape?url=https://example.com**

## Available Commands

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run lint    # Check code quality
```

## Tech Stack

Next.js 16, TypeScript, and Playwright for headless browser automation.

## Project Structure

```
app/
  api/scrape/route.ts    → Scraper API
lib/
  scraper.ts             → Playwright logic
  validator.ts           → URL validation
types/
  scraper.ts             → Type definitions
```

## API Endpoint

**GET `/api/scrape?url=...`**

Request:
```bash
curl "http://localhost:3000/api/scrape?url=https://example.com"
```

Response:
```json
{
  "title": "Example Domain",
  "metaDescription": "This domain is for use in...",
  "h1": "Example Domain",
  "status": 200
}
```

Invalid URL returns 400 error. Timeout (>20s) returns 504 error.

## How It Works

Like taking a snapshot of a webpage: the scraper visits the URL, waits for the page to fully load, then extracts the metadata.

**Extraction:**
- Page title from `<title>` tag
- Meta description from `<meta name="description">`
- First `<h1>` heading on the page

**Behavior:**
- 20-second timeout for slow pages
- Waits for network idle (handles JavaScript)
- Returns `null` for missing elements
- Follows redirects automatically
- Retries once on navigation errors

## Features

- Headless browser (Chromium)
- JavaScript rendering (works with SPAs)
- User-agent override (avoids detection)
- Automatic retry mechanism
- Proper error handling
- Resource cleanup

## Testing

```bash
# Valid URL
curl "http://localhost:3000/api/scrape?url=https://example.com"

# Invalid URL
curl "http://localhost:3000/api/scrape?url=notaurl"

# Missing URL
curl "http://localhost:3000/api/scrape"
```

## Assumptions

URLs require `http://` or `https://` protocol. Returns first h1 if multiple exist. Missing elements return `null`. Works with JavaScript-heavy sites (React, Vue, etc.).
