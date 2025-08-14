import { clsx } from "clsx"; // https://github.com/antfu/classnames
import { twMerge } from "tailwind-merge" // Merges Tailwind CSS classes intelligently

export function cn(...inputs) { // Combines class names
  return twMerge(clsx(inputs)); // Merges class names intelligently
}
