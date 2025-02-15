import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div
        className="relative"
      >
        {icon && (
          <div className="absolute left-3 top-3 text-gray-500">{icon}</div>
        )}
        <input
          type={type}
          className={cn(
            "w-full pl-10 pr-4 py-2 rounded-lg border border-primary-a20/60 bg-surface-a0 text-light-a0 focus:border-primary-a40 focus:outline-none",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
