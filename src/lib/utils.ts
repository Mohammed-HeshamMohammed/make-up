import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateConfirmationCode() {
  const prefix = "GLAM";
  const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit number
  return `${prefix}-${randomNum}`;
}

