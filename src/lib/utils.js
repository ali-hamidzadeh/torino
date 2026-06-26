export function toPersianNumber(num) {
  if (!num) return "";
  return String(num).replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
}