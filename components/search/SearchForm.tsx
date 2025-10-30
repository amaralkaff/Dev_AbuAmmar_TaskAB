import { useState, FormEvent } from 'react';
import { Button } from '@/components/retroui/Button';
import { Input } from '@/components/retroui/Input';

interface SearchFormProps {
  onSearch: (query: string) => void;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      setError('Please enter a search query');
      return;
    }

    setError('');
    onSearch(trimmedQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-start gap-3">
        <div className="flex-1">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What are you looking for?"
            className="py-3"
            aria-invalid={error ? true : undefined}
          />
          {error && (
            <p className="text-sm text-destructive mt-1.5">
              {error}
            </p>
          )}
        </div>
        <Button type="submit" className="py-3">
          Search
        </Button>
      </div>
    </form>
  );
}
