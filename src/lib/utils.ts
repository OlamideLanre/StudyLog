import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface category {
  id: number;
  category_name: string;
}
export interface categoryProps {
  setCategory: React.Dispatch<React.SetStateAction<category[] | []>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}