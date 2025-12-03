import React, { ReactNode, MouseEventHandler } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

interface ArrowButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({ children, className = "", onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 group py-2 ${className}`}
    >
   
      <span className="transition-colors duration-300 group-hover:text-[#e1b261] text-xl">
        {children}
      </span>

      <span className="border border-[#e1b261] w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-[#e1b261]">
        <FontAwesomeIcon
          icon={faArrowUp}
          className="text-white rotate-45 w-6 h-6"
        />
      </span>
    </button>
  );
};

export default ArrowButton;
