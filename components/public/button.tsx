import Link from "next/link";

import { cx } from "@/lib/cx";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  ariaLabel?: string;
};

const variantClasses = {
  primary:
    "bg-brand-green-600 text-white shadow-public1 hover:-translate-y-px hover:bg-brand-green-700 hover:shadow-public2 active:translate-y-0 active:scale-[0.98] active:bg-brand-green-800",
  secondary:
    "border-[1.5px] border-brand-green-600 bg-transparent text-brand-green-700 hover:bg-brand-green-50 hover:text-brand-green-800 active:scale-[0.98]",
  ghost: "bg-transparent text-brand-green-700 hover:bg-brand-green-50 active:scale-[0.98]",
};

const sizeClasses = {
  sm: "min-h-9 px-4 py-2 text-xs",
  md: "min-h-11 px-6 py-3 text-sm",
  lg: "min-h-[52px] px-8 py-4 text-base",
};

function classes(variant: NonNullable<ButtonProps["variant"]>, size: NonNullable<ButtonProps["size"]>, className?: string, disabled?: boolean) {
  return cx(
    "inline-flex items-center justify-center rounded-lg font-semibold transition duration-150 focus-visible:outline-none focus-visible:shadow-focus",
    variantClasses[variant],
    sizeClasses[size],
    disabled && "pointer-events-none opacity-45",
    className,
  );
}

export function Button({ children, className, variant = "primary", size = "md", href, type = "button", disabled, ariaLabel }: ButtonProps) {
  if (href && !disabled) {
    return (
      <Link aria-label={ariaLabel} className={classes(variant, size, className)} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button aria-label={ariaLabel} className={classes(variant, size, className, disabled)} disabled={disabled} type={type}>
      {children}
    </button>
  );
}
