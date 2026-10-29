import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatIndianNumber(num: number): string {
  if (num >= 10000000) {
    return `₹${(num / 10000000).toFixed(2)} Cr`;
  } else if (num >= 100000) {
    return `₹${(num / 100000).toFixed(2)} L`;
  } else if (num >= 1000) {
    return `₹${(num / 1000).toFixed(2)} K`;
  }
  return `₹${num.toFixed(0)}`;
}

/**
 * Calculate SIP future value
 * FV = P × [(1 + r)^n - 1] / r × (1 + r)
 * where r = monthly rate, n = total months
 */
export function calculateSIPFutureValue(
  monthlyAmount: number,
  annualReturnPercent: number,
  years: number
): {
  totalInvested: number;
  estimatedValue: number;
  estimatedGain: number;
  yearlyData: { year: number; invested: number; value: number }[];
} {
  const r = annualReturnPercent / 100 / 12; // monthly rate
  const n = years * 12; // total months

  let estimatedValue: number;
  if (r === 0) {
    estimatedValue = monthlyAmount * n;
  } else {
    estimatedValue = monthlyAmount * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  }

  const totalInvested = monthlyAmount * n;
  const estimatedGain = estimatedValue - totalInvested;

  // Build yearly data for chart
  const yearlyData: { year: number; invested: number; value: number }[] = [];
  for (let y = 1; y <= years; y++) {
    const months = y * 12;
    const inv = monthlyAmount * months;
    let val: number;
    if (r === 0) {
      val = inv;
    } else {
      val =
        monthlyAmount * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
    }
    yearlyData.push({ year: y, invested: inv, value: val });
  }

  return { totalInvested, estimatedValue, estimatedGain, yearlyData };
}
