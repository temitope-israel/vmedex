import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline";
};

export default function Button({
  href,
  children,
  variant = "primary",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium transition-colors";

  const styles =
    variant === "primary"
      ? "bg-primary text-paper hover:bg-primary-dark"
      : "border border-primary text-primary hover:bg-primary hover:text-paper";

  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}
