import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "outline-dark";
};

export default function Button({
  href,
  children,
  variant = "primary",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center px-8 py-3 rounded-full text-sm font-medium transition-colors uppercase tracking-widest";

  const styles = {
    primary: "bg-primary text-paper hover:bg-primary-dark",
    outline:
      "border border-primary text-primary hover:bg-primary hover:text-paper",
    "outline-dark":
      "border border-paper text-paper hover:bg-paper hover:text-primary",
  };

  return (
    <Link href={href} className={`${base} ${styles[variant]}`}>
      {children}
    </Link>
  );
}
