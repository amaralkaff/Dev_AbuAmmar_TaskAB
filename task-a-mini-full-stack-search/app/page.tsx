'use client';

import { useSearch } from '@/hooks';
import {
  SearchForm,
  SearchResults,
  LoadingState,
  ErrorState,
  EmptyState,
  InitialState,
} from '@/components/search';

export default function Home() {
  const {
    query,
    results,
    summary,
    sources,
    message,
    loading,
    error,
    search,
  } = useSearch();

  const handleSearch = (query: string) => {
    search(query);
  };

  const hasSearched = results.length > 0 || message || error;
  const showInitialState = !loading && !hasSearched;
  const showEmptyState = !loading && !error && message;
  const showResults = !loading && !error && results.length > 0;

  return (
    <div className="min-h-screen bg-background font-body">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="font-head text-5xl md:text-6xl font-black text-foreground mb-4">
            FAQ Search
          </h1>
          <p className="text-lg text-muted-foreground font-medium">
            Search through our knowledge base to find answers
          </p>
        </header>

        <SearchForm onSearch={handleSearch} />

        {loading && <LoadingState message={`Searching for "${query}"...`} />}
        {error && !loading && <ErrorState error={error} />}
        {showEmptyState && <EmptyState message={message} />}
        {showResults && (
          <SearchResults
            results={results}
            summary={summary}
            sources={sources}
          />
        )}
        {showInitialState && <InitialState />}
      </main>
    </div>
  );
}
