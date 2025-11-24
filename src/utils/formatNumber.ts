/**
 * Додає пробіл після кожної третьої цифри.
 *
 * Приклад:
 * 1234567 → "123 456 7"
 */

export const formatNumber = (num: number | string): string => {
  return num.toString().replace(/(\d{3})(?=\d)/g, "$1 ");
};
