"use client";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  href?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  href,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium tracking-[0.1em] uppercase transition-all duration-500 relative overflow-hidden group";

  const variants = {
    primary:
      "bg-white text-black hover:bg-white/90",
    outline:
      "border border-white/20 text-white hover:bg-white hover:text-black",
    ghost: "text-white/50 hover:text-white",
  };

  const sizes = {
    sm: "px-6 py-2.5 text-[10px]",
    md: "px-8 py-3.5 text-[11px]",
    lg: "px-12 py-4 text-[11px]",
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
