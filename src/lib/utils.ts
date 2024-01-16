import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseDanishDate(dateString: string): Date | null {
  try {
    // Split the date and time parts
    var parts = dateString.split(" ");
    var dateParts = parts[0].split("-");
    var timeParts = parts[1].split(":");

    // Extract the day, month, and year
    var day = parseInt(dateParts[0], 10);
    var month = parseInt(dateParts[1], 10) - 1; // Month is 0-indexed in JavaScript
    var year = parseInt(dateParts[2], 10);

    // Extract the hours, minutes, and seconds
    var hours = parseInt(timeParts[0], 10);
    var minutes = parseInt(timeParts[1], 10);
    var seconds = parseInt(timeParts[2], 10);

    // Create a new Date object
    return new Date(year, month, day, hours, minutes, seconds);
  } catch (ex) {
    return null;
  }
}
