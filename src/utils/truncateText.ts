/**
 * Обрізає текст, якщо він довший за maxLength, та додає "…".
 *
 * Приклад:
 * "Цей текст занадто довгий" → "Цей текст занадто до…"
 */

export const truncateText = (text: string, maxLength = 25): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "…";
};
