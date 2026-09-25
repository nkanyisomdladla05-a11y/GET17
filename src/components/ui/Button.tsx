import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost" | "outline" | "light";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/70 disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-white shadow-[0_10px_28px_rgba(70,51,185,0.28)] hover:bg-brand-2 hover:shadow-[0_14px_36px_rgba(56,39,150,0.35)] hover:-translate-y-0.5",
  ghost: "text-mist hover:text-ink hover:bg-ink/5",
  outline:
    "border border-ink text-ink hover:bg-ink hover:text-white hover:-translate-y-0.5",
  light:
    "border border-white/40 text-white hover:border-white hover:bg-white/10 hover:-translate-y-0.5",
};

interface ButtonProps extends ComponentProps<"button"> {
  variant?: Variant;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

interface ButtonLinkProps extends ComponentProps<typeof Link> {
  variant?: Variant;
  children: ReactNode;
}

export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </Link>
  );
}
