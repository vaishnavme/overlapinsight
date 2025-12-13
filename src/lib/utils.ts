import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatCurrency = (value: number): string => {
  // Convert to crores (1 crore = 10,000,000)
  const crores = value / 10000000;

  // Format with Indian numbering system
  const formatted = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(crores);

  return `₹${formatted} Cr.`;
};
