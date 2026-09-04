import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import Link from "next/link";
import clsx from "clsx";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary: "bg-brand-600 text-white hover:bg-brand-700",
  secondary: "bg-white text-brand-700 border border-brand-200 hover:bg-brand-50",
  ghost: "text-brand-700 hover:bg-brand-50",
  inverse: "bg-white text-brand-800 hover:bg-brand-50",
};

type Variant = keyof typeof variants;

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={clsx(baseStyles, variants[variant], className)} {...props} />;
}

export function LinkButton({
  variant = "primary",
  className,
  href,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; href: string }) {
  return <Link href={href} className={clsx(baseStyles, variants[variant], className)} {...props} />;
}
