import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Calculate estimated reading time for content
 * @param content - The content to analyze (markdown/text)
 * @returns Reading time in minutes
 */
export function calculateReadingTime(content: string): number {
  if (!content || content.trim().length === 0) {
    return 1;
  }

  // Remove markdown syntax
  const cleanText = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[.*?\]\(.*?\)/g, '') // Remove links
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/[*_~`]/g, '') // Remove emphasis markers
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();

  // Count words for different languages
  // For Japanese/Chinese/Korean, count characters and divide by average characters per word
  const cjkChars = cleanText.match(/[\u3400-\u4DBF\u4E00-\u9FFF\u3040-\u309F\u30A0-\u30FF]/g);
  const cjkCharCount = cjkChars ? cjkChars.length : 0;
  
  // Count Latin-based words (separated by spaces)
  const latinWords = cleanText
    .replace(/[\u3400-\u4DBF\u4E00-\u9FFF\u3040-\u309F\u30A0-\u30FF]/g, '') // Remove CJK chars
    .split(/\s+/)
    .filter(word => word.length > 0);
  
  // Estimate total word count
  // Assume 2.5 characters per Japanese word on average
  const estimatedCjkWords = Math.ceil(cjkCharCount / 2.5);
  const totalWords = latinWords.length + estimatedCjkWords;
  
  // Calculate reading time (assuming 200 words per minute)
  const readingTime = Math.ceil(totalWords / 200);
  
  // Minimum 1 minute
  return Math.max(1, readingTime);
}
