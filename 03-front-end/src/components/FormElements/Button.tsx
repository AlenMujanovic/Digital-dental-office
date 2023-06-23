import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: string;
  className?: string;
  type: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button = ({ children, className, type, onClick }: ButtonProps) => {
  return (
    <button
      className={`${className} items-center justify-center rounded-lg py-3 px-6 text-center text-base font-normal text-white hover:bg-opacity-90 sm:px-10 lg:px-8 xl:px-10 bg-theme-green`}
      type={type}
      onClick={onClick}>
      {children}
    </button>
  );
};
export default Button;
