import { RefObject } from "react";

export const useDropdownPosition = (
  ref: React.RefObject<HTMLElement | null> | RefObject<HTMLDivElement>
) => {
  const getDropdownPosition = () => {
    if (!ref.current) return { left: 0, top: 0 };

    const rect = ref.current.getBoundingClientRect();
    const dropdownWidth = 240; // Assume a fixed width for the dropdown

    let left = rect.left + window.scrollX;
    const top = rect.bottom + window.scrollY;

    // Adjust left position if dropdown overflows the viewport
    if (left + dropdownWidth > window.innerWidth) {
      left = rect.right + window.scrollX - dropdownWidth;

      // if still off screen, alight to right edge with some padding

      if (left < 0) {
        left = window.innerWidth - dropdownWidth - 16; // 16px padding
      }
    }

    // Ensure dropdown doesn't go off left edge

    if (left < 0) {
      left = 16; // 16px padding
    }
    return { left, top };
  };

  return { getDropdownPosition };
};
