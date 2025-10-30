import { Loader } from '@/components/retroui/Loader';

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Searching...' }: LoadingStateProps) {
  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-4">
        <Loader count={4} duration={0.6} delayStep={120} />
      </div>
      <p className="mt-4 text-muted-foreground font-medium">
        {message}
      </p>
    </div>
  );
}

interface ErrorStateProps {
  error: string;
}

export function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className="bg-destructive/10 border-2 border-destructive shadow-md p-4 mb-6">
      <p className="text-destructive font-medium">
        {error}
      </p>
    </div>
  );
}

interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="bg-card border-2 border-border shadow-md p-8 text-center">
      <p className="text-foreground font-medium text-lg">
        {message}
      </p>
    </div>
  );
}

interface InitialStateProps {
  suggestions?: string[];
}

export function InitialState({ suggestions = ['"trust badges"', '"form"'] }: InitialStateProps) {
  return (
    <div className="text-center py-16">
      <p className="text-foreground font-medium text-xl">
        Enter a search query to get started
      </p>
      <p className="text-muted-foreground mt-2">
        Try searching for {suggestions.join(' or ')}
      </p>
    </div>
  );
}
