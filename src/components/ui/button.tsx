import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "ghost" | "outline";
};

const variants = {
  primary:
    "bg-clay text-ivory shadow-[0_18px_60px_rgba(169,54,45,0.24)] hover:bg-[#bd473c]",
  ghost: "text-ivory/78 hover:text-ivory hover:bg-white/7",
  outline:
    "border border-ivory/18 text-ivory hover:border-ivory/45 hover:bg-ivory/8",
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition duration-300 disabled:pointer-events-none disabled:opacity-45",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}

export function ButtonLink({
  className,
  variant = "primary",
  children,
  ...props
}: ComponentPropsWithoutRef<typeof Link> & {
  variant?: ButtonProps["variant"];
  children: ReactNode;
}) {
  return (
    <Link
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition duration-300",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
