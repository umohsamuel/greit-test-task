export function formatAmount(amount: number, precision = 0): string {
  return `$${amount.toLocaleString("en-US", {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  })}`;
}
