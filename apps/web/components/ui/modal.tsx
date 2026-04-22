"use client";

import * as React from "react";
import * as DialogPrimitives from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Modal = DialogPrimitives.Root;
const ModalTrigger = DialogPrimitives.Trigger;
const ModalPortal = DialogPrimitives.Portal;
const ModalClose = DialogPrimitives.Close;

const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitives.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitives.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitives.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=open]:animate-[fadeIn_0.2s_ease-out] data-[state=closed]:animate-[fadeIn_0.15s_ease-out_reverse]",
      className
    )}
    {...props}
  />
));
ModalOverlay.displayName = DialogPrimitives.Overlay.displayName;

const ModalContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitives.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitives.Content> & {
    variant?: "center" | "bottom";
  }
>(({ className, children, variant = "center", ...props }, ref) => (
  <ModalPortal>
    <ModalOverlay />
    <DialogPrimitives.Content
      ref={ref}
      className={cn(
        "fixed z-50 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.16)] focus:outline-none",
        variant === "center" &&
          "left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg rounded-[28px] data-[state=open]:animate-[fadeIn_0.25s_cubic-bezier(0.32,0.72,0,1)] data-[state=closed]:animate-[fadeIn_0.2s_ease-in_reverse]",
        variant === "bottom" &&
          "bottom-0 left-0 right-0 rounded-t-[28px] max-h-[90vh] overflow-auto data-[state=open]:animate-[slideUp_0.4s_cubic-bezier(0.32,0.72,0,1)] data-[state=closed]:animate-[slideUp_0.3s_ease-in_reverse]",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitives.Close className="absolute right-4 top-4 rounded-full bg-[#f2f2f7] p-1.5 text-[#8e8e93] hover:text-[#1c1c1e] transition-colors focus:outline-none focus:ring-2 focus:ring-[#007AFF]">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitives.Close>
    </DialogPrimitives.Content>
  </ModalPortal>
));
ModalContent.displayName = DialogPrimitives.Content.displayName;

const ModalHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-1.5 px-6 pt-6 pb-4", className)}
    {...props}
  />
);
ModalHeader.displayName = "ModalHeader";

const ModalFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col gap-2 px-6 py-4 border-t border-[#f2f2f7]", className)}
    {...props}
  />
);
ModalFooter.displayName = "ModalFooter";

const ModalTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitives.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitives.Title
    ref={ref}
    className={cn("text-xl font-bold text-[#1c1c1e] leading-tight", className)}
    {...props}
  />
));
ModalTitle.displayName = DialogPrimitives.Title.displayName;

const ModalDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitives.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitives.Description
    ref={ref}
    className={cn("text-sm text-[#8e8e93] leading-relaxed", className)}
    {...props}
  />
));
ModalDescription.displayName = DialogPrimitives.Description.displayName;

export {
  Modal,
  ModalPortal,
  ModalOverlay,
  ModalClose,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
};
