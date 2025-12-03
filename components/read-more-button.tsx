import React, { ReactNode, MouseEventHandler } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface ReadMoreProps {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const ReadMore: React.FC<ReadMoreProps> = ({ children, className = "", onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 text-[#e1b261] hover:text-white transition-colors duration-300 ${className}`}
    >
      <span className="text-lg">
        {children}
      </span>

      <FontAwesomeIcon
        icon={faChevronRight}
        className="w-2 h-2"
      />
    </button>
  );
};

export default ReadMore;
