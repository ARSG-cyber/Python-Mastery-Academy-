import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'purple' | 'python';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const variantStyles = {
    default: 'bg-[#F3F1EC] text-[#55514B] dark:bg-[#282623] dark:text-[#A8A49D] border-[#E8E5DF] dark:border-[#2C2A26]',
    primary: 'bg-[#FAF0EB] text-[#C96B45] dark:bg-[#33170B] dark:text-[#EBC0AF] border-[#EBC0AF] dark:border-[#5A2B18]',
    success: 'bg-[#EBF5F0] text-[#287A52] dark:bg-[#152E20] dark:text-[#A2D4BC] border-[#C3E4D4] dark:border-[#206342]',
    warning: 'bg-[#FEF6EE] text-[#B54708] dark:bg-[#332012] dark:text-[#FAD2A4] border-[#F9DBAF] dark:border-[#7A3608]',
    danger: 'bg-[#FBF0EF] text-[#B94B45] dark:bg-[#301614] dark:text-[#EDB0AC] border-[#F2C5C3] dark:border-[#6B2824]',
    purple: 'bg-[#F3F1EC] text-[#55514B] dark:bg-[#282623] dark:text-[#A8A49D] border-[#E8E5DF] dark:border-[#2C2A26]',
    python: 'bg-[#FAF0EB] text-[#C96B45] dark:bg-[#282623] dark:text-[#DF9F84] border-[#EBC0AF] dark:border-[#3D3A35]',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 rounded-md',
    md: 'text-xs font-medium px-2.5 py-0.5 rounded-md',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium border transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
};
