import React from "react";
import { motion } from "framer-motion";
import { ButtonProps } from "../types";

const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  children,
  variant = "primary",
  className = "",
  href = "",
  icon: Icon,
  ...props
}) => {
  const baseStyles =
    "flex items-center justify-center gap-2 rounded-lg py-2 font-semibold transition";
  
  const variantStyles = {
    primary:
      "bg-primary-a40/5 border border-primary-a10/80 hover:bg-primary-a50/20 text-light-a0",
    secondary:
      "bg-primary-a50/10 border border-primary-a10/60 hover:bg-primary-a40/20 text-light-a0",
    link:
      "bg-transparent border-none text-primary-a50 hover:text-primary-a60 underline",
    outline:
      "border border-primary-a50 hover:bg-primary-a50/20 text-primary-a50",
    ghost:
      "bg-transparent border-none hover:bg-primary-a40/10",
    danger:
      "bg-red-600 hover:bg-red-700 text-white border-none",
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={`${combinedClassName} ${className && className.includes('w-full') ? '' : ''}`} 
        {...props}
      >
        {Icon && <Icon size={20} />}
        {children}
      </a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={combinedClassName}
      {...props}
    >
      {Icon && <Icon size={20} />}
      {children}
    </motion.button>
  );
};

export default Button;
