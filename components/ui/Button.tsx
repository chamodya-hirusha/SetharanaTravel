import React from "react";
import { cn } from "@/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-medium rounded-full transition-premium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
        // Variants
        variant === "primary" && "bg-primary text-white hover:bg-[#093025] hover:shadow-lg focus:ring-primary/50",
        variant === "secondary" && "bg-secondary text-primary hover:bg-[#c29e2f] hover:shadow-lg focus:ring-secondary/50",
        variant === "outline" && "border-2 border-secondary text-secondary bg-transparent hover:bg-secondary hover:text-primary focus:ring-secondary/50",
        variant === "ghost" && "text-gray-600 hover:bg-gray-100 focus:ring-gray-300",
        // Sizes
        size === "sm" && "px-4 py-2 text-sm",
        size === "md" && "px-6 py-3 text-base",
        size === "lg" && "px-8 py-4 text-lg",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
