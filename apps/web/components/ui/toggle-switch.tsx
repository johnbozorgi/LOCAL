"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

interface ToggleSwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  label?: string;
  description?: string;
}

const ToggleSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  ToggleSwitchProps
>(({ className, label, description, ...props }, ref) => (
  <div className="flex items-center justify-between gap-4">
    {(label || description) && (
      <div className="flex flex-col gap-0.5">
        {label && (
          <span className="text-sm font-semibold text-[#1c1c1e]">{label}</span>
        )}
        {description && (
          <span className="text-xs text-[#8e8e93]">{description}</span>
        )}
      </div>
    )}
    <SwitchPrimitives.Root
      className={cn(
        "peer inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#34C759] data-[state=unchecked]:bg-[#e5e5ea]",
        className
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-6 w-6 rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.18)] ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitives.Root>
  </div>
));
ToggleSwitch.displayName = SwitchPrimitives.Root.displayName;

export { ToggleSwitch };
