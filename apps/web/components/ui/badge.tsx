import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-[#007AFF]/10 text-[#007AFF]",
        secondary: "bg-[#f2f2f7] text-[#8e8e93]",
        destructive: "bg-[#FF3B30]/10 text-[#FF3B30]",
        success: "bg-[#34C759]/10 text-[#34C759]",
        warning: "bg-[#FF9500]/10 text-[#FF9500]",
        outline: "border border-[#e5e5ea] text-[#1c1c1e]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
