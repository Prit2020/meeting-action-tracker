import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant =
  | "primary"
  | "success"
  | "danger"
  | "secondary"
  | "outline";

type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
}

const variantStyles: Record<Variant, string> = {
  primary: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100",
  success: "border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 active:bg-emerald-100",
  danger: "border-2 border-red-600 text-red-600 hover:bg-red-50 active:bg-red-100",
  secondary: "border-2 border-slate-600 text-slate-600 hover:bg-slate-50 active:bg-slate-100",
  outline: "border-2 border-slate-300 text-slate-700 hover:bg-slate-50 active:bg-slate-100 hover:border-slate-400",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;