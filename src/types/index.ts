export interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.FormEvent) => void | Promise<void>;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "link" | "outline" | "ghost" | "danger";
  className?: string;
  href?: string;
  icon?: React.ElementType;
}