import React, { ButtonHTMLAttributes } from "react";

export const Button = React.forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`px-4 py-2 bg-primary text-primary-foreground border-2 border-black shadow-md hover:shadow-lg active:shadow-none transition-all font-head font-medium rounded ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";