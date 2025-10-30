export interface ScrapeRequest {
  url: string;
}

export interface ScrapeSuccess {
  title: string | null;
  metaDescription: string | null;
  h1: string | null;
  status: 200;
}

export interface ScrapeError {
  error: string;
}

export type ScrapeResponse = ScrapeSuccess | ScrapeError;
