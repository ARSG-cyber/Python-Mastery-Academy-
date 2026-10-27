import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = false,
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-[#1F1E1C] border border-[#E8E5DF] dark:border-[#2C2A26] rounded-xl p-5 sm:p-6 transition-all duration-150 ${
        hoverable ? 'hover:border-[#D8D4CC] dark:hover:border-[#3D3A35] cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
