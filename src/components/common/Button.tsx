import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const variantStyles = {
    primary: 'bg-[#C96B45] hover:bg-[#B55A35] text-white focus:ring-[#C96B45] rounded-lg shadow-none',
    secondary: 'bg-[#F3F1EC] hover:bg-[#E8E5DF] dark:bg-[#282623] dark:hover:bg-[#33302B] text-[#242424] dark:text-[#FAF9F6] focus:ring-[#77736D] rounded-lg',
    outline: 'border border-[#E8E5DF] dark:border-[#2C2A26] hover:bg-[#F3F1EC] dark:hover:bg-[#282623] text-[#242424] dark:text-[#E8E5DF] focus:ring-[#C96B45] rounded-lg',
    ghost: 'hover:bg-[#F3F1EC] dark:hover:bg-[#282623] text-[#77736D] hover:text-[#242424] dark:text-[#A8A49D] dark:hover:text-[#FAF9F6] focus:ring-[#77736D] rounded-lg',
    danger: 'bg-[#B94B45] hover:bg-[#A33E39] text-white focus:ring-[#B94B45] rounded-lg shadow-none',
    success: 'bg-[#287A52] hover:bg-[#206342] text-white focus:ring-[#287A52] rounded-lg shadow-none',
    warning: 'bg-[#B55A35] hover:bg-[#9E4B28] text-white focus:ring-[#B55A35] rounded-lg shadow-none',
  };

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
        </>
      )}
    </button>
  );
};
