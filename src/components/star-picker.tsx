"use client";

import { StarIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface StarPickerProps {
  value: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  className?: string;
}

export const StarPicker = ({
  value,
  onChange,
  disabled,
  className,
}: StarPickerProps) => {
  const [hoverValue, setHoverValue] = useState(0);
  return (
    <div
      className={cn(
        "flex items-center gap-1",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className
      )}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={disabled}
          className={cn(
            "p-0.5 hover:scale-110 transition",
            !disabled && "cursor-pointer",
            disabled && "hover:scale-100"
          )}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => setHoverValue(star)}
          onMouseLeave={() => setHoverValue(0)}
        >
          <StarIcon
            className={cn(
              "w-6 h-6",
              (hoverValue || value) >= star
                ? "fill-black stroke-black"
                : "stoke-black"
            )}
          />
        </button>
      ))}
    </div>
  );
};
