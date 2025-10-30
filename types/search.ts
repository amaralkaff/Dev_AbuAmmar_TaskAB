export interface FAQ {
  id: string;
  title: string;
  body: string;
}

export interface SearchResponse {
  results: FAQ[];
  summary?: string;
  sources?: string[];
  message?: string;
  error?: string;
}

export interface SearchState {
  query: string;
  results: FAQ[];
  summary: string;
  sources: string[];
  message: string;
  loading: boolean;
  error: string;
}

export interface SearchHookReturn {
  query: string;
  setQuery: (query: string) => void;
  results: FAQ[];
  summary: string;
  sources: string[];
  message: string;
  loading: boolean;
  error: string;
  search: (searchQuery: string) => Promise<void>;
  resetResults: () => void;
}
