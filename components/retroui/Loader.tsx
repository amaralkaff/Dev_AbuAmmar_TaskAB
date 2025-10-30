import * as React from "react";

interface LoaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  count?: number;
  duration?: number;
  delayStep?: number;
}

const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
  (
    {
      className = "",
      count = 3,
      duration = 0.5,
      delayStep = 100,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={`flex gap-1 ${className}`}
        ref={ref}
        role="status"
        aria-label="Loading..."
        {...props}
      >
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="w-4 h-4 bg-primary border-2 border-black animate-bounce"
            style={{
              animationDuration: `${duration}s`,
              animationIterationCount: "infinite",
              animationDelay: `${i * delayStep}ms`,
            }}
          />
        ))}
      </div>
    );
  }
);

Loader.displayName = "Loader";
export { Loader };
