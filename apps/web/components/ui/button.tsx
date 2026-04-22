"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.97] select-none",
  {
    variants: {
      variant: {
        default:
          "bg-[#007AFF] text-white hover:bg-[#0066DD] shadow-ios",
        destructive:
          "bg-[#FF3B30] text-white hover:bg-[#E0342A] shadow-ios",
        outline:
          "border border-[#e5e5ea] bg-white text-[#1c1c1e] hover:bg-[#f2f2f7]",
        secondary:
          "bg-[#f2f2f7] text-[#007AFF] hover:bg-[#e5e5ea]",
        ghost:
          "text-[#007AFF] hover:bg-[#f2f2f7]",
        success:
          "bg-[#34C759] text-white hover:bg-[#2BB44A] shadow-ios",
        link:
          "text-[#007AFF] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2.5 text-base rounded-[13px]",
        sm: "h-9 px-4 py-2 text-sm rounded-[10px]",
        lg: "h-14 px-8 py-3 text-lg rounded-[16px]",
        xl: "h-16 px-10 py-4 text-xl rounded-[20px]",
        icon: "h-10 w-10 rounded-[10px]",
        "icon-sm": "h-8 w-8 rounded-[8px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
