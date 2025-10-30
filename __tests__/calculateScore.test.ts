import { describe, it, expect } from 'vitest';

const SCORING = {
  TITLE_MATCH: 10,
  BODY_MATCH: 3,
  EXACT_PHRASE_TITLE: 20,
  EXACT_PHRASE_BODY: 5,
} as const;

function normalizeText(text: string): string {
  return text.toLowerCase().trim();
}

function countTermOccurrences(text: string, term: string): number {
  return (text.match(new RegExp(term, 'g')) || []).length;
}

function calculateScore(faq: { title: string; body: string }, query: string): number {
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

describe('calculateScore', () => {
  it('should return 0 for non-matching query', () => {
    const faq = { title: 'Test Title', body: 'Test body content' };
    const score = calculateScore(faq, 'nonexistent');
    expect(score).toBe(0);
  });

  it('should score title matches higher than body matches', () => {
    const faq = { title: 'trust badges', body: 'some content' };
    const titleScore = calculateScore(faq, 'trust');

    const faq2 = { title: 'some title', body: 'trust content' };
    const bodyScore = calculateScore(faq2, 'trust');

    expect(titleScore).toBeGreaterThan(bodyScore);
  });

  it('should give bonus for exact phrase match in title', () => {
    const faq = { title: 'trust badges near CTA', body: 'content' };
    const exactScore = calculateScore(faq, 'trust badges');
    const partialScore = calculateScore(faq, 'trust');

    expect(exactScore).toBeGreaterThan(partialScore);
  });

  it('should be case insensitive', () => {
    const faq = { title: 'Trust Badges', body: 'Content' };
    const lowerScore = calculateScore(faq, 'trust');
    const upperScore = calculateScore(faq, 'TRUST');
    const mixedScore = calculateScore(faq, 'TrUsT');

    expect(lowerScore).toBe(upperScore);
    expect(upperScore).toBe(mixedScore);
  });

  it('should handle multiple terms correctly', () => {
    const faq = { title: 'trust badges', body: 'near CTA' };
    const score = calculateScore(faq, 'trust badges');

    expect(score).toBeGreaterThan(0);
  });

  it('should trim whitespace from query', () => {
    const faq = { title: 'trust', body: 'content' };
    const score1 = calculateScore(faq, '  trust  ');
    const score2 = calculateScore(faq, 'trust');

    expect(score1).toBe(score2);
  });
});
