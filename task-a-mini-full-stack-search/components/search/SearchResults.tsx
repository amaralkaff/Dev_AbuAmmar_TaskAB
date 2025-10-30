import type { FAQ } from '@/types';

interface SearchResultsProps {
  results: FAQ[];
  summary?: string;
  sources?: string[];
}

export function SearchResults({ results, summary, sources }: SearchResultsProps) {
  if (results.length === 0) return null;

  return (
    <div className="space-y-6">
      {summary && (
        <SummaryCard summary={summary} sources={sources} />
      )}

      <div className="flex items-center justify-between mb-4">
        <h2 className="font-head text-3xl font-black text-foreground">
          Results ({results.length})
        </h2>
      </div>

      {results.map((result, index) => (
        <ResultCard key={result.id} result={result} index={index} />
      ))}
    </div>
  );
}

interface SummaryCardProps {
  summary: string;
  sources?: string[];
}

function SummaryCard({ summary, sources }: SummaryCardProps) {
  const summaryItems = summary
    .split('.')
    .map(item => item.trim())
    .filter(item => item.length > 0);

  return (
    <div className="bg-card border-2 border-border shadow-md p-6">
      <h3 className="font-head text-xl font-black mb-3">
        Summary
      </h3>
      <ul className="list-disc list-inside space-y-2">
        {summaryItems.map((item, index) => (
          <li key={index} className="font-medium">
            {item}
          </li>
        ))}
      </ul>
      {sources && sources.length > 0 && (
        <p className="text-sm mt-3 font-mono">
          Sources: {sources.join(', ')}
        </p>
      )}
    </div>
  );
}

interface ResultCardProps {
  result: FAQ;
  index: number;
}

function ResultCard({ result, index }: ResultCardProps) {
  // Show first 150 chars of body as snippet
  const snippet = result.body.length > 150
    ? result.body.substring(0, 150).trim() + '...'
    : result.body;

  return (
    <div className="bg-card border-2 border-border shadow-md hover:shadow-lg p-6">
      <div className="flex items-start gap-4">
        <ResultBadge number={index + 1} />
        <div className="flex-1">
          <h3 className="font-head text-2xl font-black text-foreground mb-2">
            {result.title}
          </h3>
          <p className="text-foreground leading-relaxed font-medium">
            {snippet}
          </p>
          <IdBadge id={result.id} />
        </div>
      </div>
    </div>
  );
}

interface ResultBadgeProps {
  number: number;
}

function ResultBadge({ number }: ResultBadgeProps) {
  return (
    <div className="flex-shrink-0 w-10 h-10 bg-primary border-2 border-border text-primary-foreground flex items-center justify-center font-head font-black text-lg shadow-sm">
      {number}
    </div>
  );
}

interface IdBadgeProps {
  id: string;
}

function IdBadge({ id }: IdBadgeProps) {
  return (
    <div className="mt-3 inline-block px-3 py-1 bg-muted border border-border text-xs font-mono text-muted-foreground">
      ID: {id}
    </div>
  );
}
