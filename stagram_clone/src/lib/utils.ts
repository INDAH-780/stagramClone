import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


////date format
export default function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (seconds < 10) return "just now";
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return `${interval} year${interval !== 1 ? 's' : ''} ago`;

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return `${interval} month${interval !== 1 ? 's' : ''} ago`;

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return `${interval} day${interval !== 1 ? 's' : ''} ago`;

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return `${interval} hour${interval !== 1 ? 's' : ''} ago`;

  interval = Math.floor(seconds / 60);
  if (interval >= 1) return `${interval} minute${interval !== 1 ? 's' : ''} ago`;

  return `${Math.floor(seconds)} second${seconds !== 1 ? 's' : ''} ago`;
}

// Example usage:
const dateString = '2024-06-13T07:06:55.534+00:00';
console.log(timeAgo(dateString)); // Output will depend on the current date and time

export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};