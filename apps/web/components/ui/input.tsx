import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "prefix"
> & {
  label?: string;
  error?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, prefix, suffix, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm font-semibold text-[#1c1c1e]">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {prefix && (
            <div className="absolute left-3 text-[#8e8e93] pointer-events-none">
              {prefix}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "flex h-11 w-full rounded-[13px] border border-[#e5e5ea] bg-white px-4 py-2.5 text-base text-[#1c1c1e] placeholder:text-[#c7c7cc] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
              prefix && "pl-10",
              suffix && "pr-10",
              error && "border-[#FF3B30] focus:ring-[#FF3B30]",
              className
            )}
            ref={ref}
            {...props}
          />
          {suffix && (
            <div className="absolute right-3 text-[#8e8e93] pointer-events-none">
              {suffix}
            </div>
          )}
        </div>
        {error && (
          <p className="text-xs text-[#FF3B30] font-medium">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
