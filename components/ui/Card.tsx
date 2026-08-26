import React from "react";
import { cn } from "@/utils/cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  className,
  children,
  hoverEffect = true,
  ...props
}) => {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl overflow-hidden border border-gray-100/80 shadow-sm transition-premium",
        hoverEffect && "hover:shadow-xl hover:-translate-y-1.5 hover:border-secondary/20",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
export default Card;
