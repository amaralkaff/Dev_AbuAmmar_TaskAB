import { NextRequest, NextResponse } from 'next/server';
import { validateUrl } from '@/lib/validator';
import { scrapeUrl, isTimeoutError } from '@/lib/scraper';
import type { ScrapeResponse } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl.searchParams.get('url') || undefined;

    const validation = validateUrl(url);
    if (!validation.valid) {
      return NextResponse.json<ScrapeResponse>(
        { error: validation.error || 'Invalid URL' },
        { status: 400 }
      );
    }

    const result = await scrapeUrl(url!);

    return NextResponse.json<ScrapeResponse>(result, { status: 200 });

  } catch (error) {
    // Timeouts get 504, everything else gets 500
    if (isTimeoutError(error)) {
      return NextResponse.json<ScrapeResponse>(
        { error: 'Timeout' },
        { status: 504 }
      );
    }

    console.error('Scrape API error:', error);
    return NextResponse.json<ScrapeResponse>(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
