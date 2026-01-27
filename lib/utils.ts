import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Parse a timestamp string ensuring it's treated as UTC
 * Backend sends timestamps without timezone, which JS interprets as local time
 */
export function parseUTCDate(timestamp: string): Date {
  if (!timestamp) return new Date();
  // If timestamp doesn't have timezone info, append Z to treat as UTC
  const normalized = timestamp.endsWith("Z") ? timestamp : timestamp + "Z";
  return new Date(normalized);
}
