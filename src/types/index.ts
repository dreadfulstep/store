export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "link" | "outline" | "ghost" | "danger";
  className?: string;
  href?: string;
  icon?: React.ElementType;
}
