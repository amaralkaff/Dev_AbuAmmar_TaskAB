import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import faqs from '@/data/faqs.json';
import type { FAQ, SearchResponse } from '@/types';

const searchRequestSchema = z.object({
  query: z.string().min(1, 'Query cannot be empty').trim(),
});

interface SearchResult extends FAQ {
  score: number;
}

// Scoring weights: titles matter more than body, exact phrases score highest
const SCORING = {
  TITLE_MATCH: 10,
  BODY_MATCH: 3,
  EXACT_PHRASE_TITLE: 20,
  EXACT_PHRASE_BODY: 5,
  MAX_RESULTS: 3,
} as const;

function normalizeText(text: string): string {
  return text.toLowerCase().trim();
}

function countTermOccurrences(text: string, term: string): number {
  return (text.match(new RegExp(term, 'g')) || []).length;
}

// Score FAQs by counting term matches + bonus for exact phrase matches
function calculateScore(faq: FAQ, query: string): number {
  const normalizedQuery = normalizeText(query);
  const queryTerms = normalizedQuery.split(/\s+/).filter(term => term.length > 0);

  const normalizedTitle = normalizeText(faq.title);
  const normalizedBody = normalizeText(faq.body);

  let score = 0;

  for (const term of queryTerms) {
    score += countTermOccurrences(normalizedTitle, term) * SCORING.TITLE_MATCH;
    score += countTermOccurrences(normalizedBody, term) * SCORING.BODY_MATCH;
  }

  if (normalizedTitle.includes(normalizedQuery)) {
    score += SCORING.EXACT_PHRASE_TITLE;
  }
  if (normalizedBody.includes(normalizedQuery)) {
    score += SCORING.EXACT_PHRASE_BODY;
  }

  return score;
}

// Create summary from first sentence of each result
function generateSummary(results: FAQ[]): string {
  if (results.length === 0) return '';

  const summaries = results.map(faq => {
    const insight = faq.body.split('.')[0] + '.';
    return `${faq.title}: ${insight}`;
  });

  return summaries.join(' ');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = searchRequestSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { query } = validation.data;

    const scoredResults: SearchResult[] = faqs.map((faq) => ({
      ...faq,
      score: calculateScore(faq, query)
    }));

    const rankedResults = scoredResults
      .filter(result => result.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, SCORING.MAX_RESULTS);

    const results: FAQ[] = rankedResults.map(({ id, title, body }) => ({ id, title, body }));

    const response: SearchResponse = { results };

    if (results.length > 0) {
      response.summary = generateSummary(results);
      response.sources = results.map(r => r.id);
    } else {
      response.message = 'No results found for your query. Try different keywords.';
    }

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
