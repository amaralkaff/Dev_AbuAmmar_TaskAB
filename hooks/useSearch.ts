import { useState, useCallback } from 'react';
import type { FAQ, SearchResponse, SearchHookReturn } from '@/types';

export function useSearch(): SearchHookReturn {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FAQ[]>([]);
  const [summary, setSummary] = useState('');
  const [sources, setSources] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const resetResults = useCallback(() => {
    setError('');
    setMessage('');
    setResults([]);
    setSummary('');
    setSources([]);
  }, []);

  const search = useCallback(async (searchQuery: string) => {
    resetResults();

    if (!searchQuery.trim()) {
      setError('Please enter a search query');
      return;
    }

    setQuery(searchQuery.trim());
    setLoading(true);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchQuery.trim() }),
      });

      const data: SearchResponse = await response.json();

      if (!response.ok) {
        setError(data.error || 'An error occurred while searching');
        return;
      }

      setResults(data.results || []);
      setSummary(data.summary || '');
      setSources(data.sources || []);
      setMessage(data.message || '');

    } catch (err) {
      setError('Failed to connect to search service. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  }, [resetResults]);

  return {
    query,
    setQuery,
    results,
    summary,
    sources,
    message,
    loading,
    error,
    search,
    resetResults,
  };
}
