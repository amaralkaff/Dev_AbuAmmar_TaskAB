import { chromium, Browser, BrowserContext, Page } from 'playwright';
import type { ScrapeSuccess } from '@/types';

const CONFIG = {
  TIMEOUT_MS: 20000,
  WAIT_UNTIL: 'networkidle' as const,
  USER_AGENT: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
} as const;

let browserInstance: Browser | null = null;

// Reuse browser instance across requests for better performance
async function getBrowser(): Promise<Browser> {
  if (!browserInstance || !browserInstance.isConnected()) {
    browserInstance = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  }
  return browserInstance;
}

// Returns null for missing elements (title, meta, h1)
async function extractMetadata(page: Page): Promise<Omit<ScrapeSuccess, 'status'>> {
  const [title, metaDescription, h1] = await Promise.all([
    page.title().then(t => t || null).catch(() => null),

    // Only name="description", not og:description
    page.$eval('meta[name="description"]', el => el.getAttribute('content'))
      .then(content => content || null)
      .catch(() => null),

    page.$eval('h1', el => el.textContent?.trim() || null)
      .catch(() => null),
  ]);

  return { title, metaDescription, h1 };
}

// Retry once if navigation fails (but not on timeout)
async function scrapeWithRetry(
  context: BrowserContext,
  url: string,
  retryCount: number = 0
): Promise<Omit<ScrapeSuccess, 'status'>> {
  const page = await context.newPage();

  try {
    await page.goto(url, {
      timeout: CONFIG.TIMEOUT_MS,
      waitUntil: CONFIG.WAIT_UNTIL,
    });

    return await extractMetadata(page);
  } catch (error) {
    // Retry navigation errors, but not timeouts
    if (
      retryCount === 0 &&
      error instanceof Error &&
      !error.name.includes('TimeoutError') &&
      !error.message.includes('Timeout')
    ) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await page.close();
      return scrapeWithRetry(context, url, 1);
    }

    throw error;
  } finally {
    await page.close();
  }
}

export async function scrapeUrl(url: string): Promise<ScrapeSuccess> {
  const browser = await getBrowser();

  // Each request gets isolated context with custom UA
  const context = await browser.newContext({
    userAgent: CONFIG.USER_AGENT
  });

  try {
    const metadata = await scrapeWithRetry(context, url);

    return {
      ...metadata,
      status: 200,
    };
  } finally {
    await context.close();
  }
}

export function isTimeoutError(error: unknown): boolean {
  return (
    error instanceof Error &&
    (error.name.includes('TimeoutError') || error.message.includes('Timeout'))
  );
}

// Cleanup browser when server stops
if (typeof process !== 'undefined') {
  process.on('SIGINT', async () => {
    if (browserInstance) {
      await browserInstance.close();
      browserInstance = null;
    }
  });

  process.on('SIGTERM', async () => {
    if (browserInstance) {
      await browserInstance.close();
      browserInstance = null;
    }
  });
}
