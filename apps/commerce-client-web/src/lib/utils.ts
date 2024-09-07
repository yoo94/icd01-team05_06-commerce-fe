import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const parseAndRoundPrice = (price: string | number): number => {
  const priceNumber = typeof price === 'number' ? price : parseFloat(price);
  return Math.round(priceNumber / 100) * 100;
};
