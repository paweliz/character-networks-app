import { FunctionComponent } from 'react';

interface BaseButtonProps {
  onClick: () => void;
  text: string;
  active?: boolean; 
  activeClassName?: string;
  className?: string;
  overrideClass?: boolean;
}

const BaseButton: FunctionComponent<BaseButtonProps> = ({ onClick, text, active, className, overrideClass, activeClassName}) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={(!overrideClass ? `border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline
      ${active && 'bg-indigo-700 ring ring-blue-600'}`: (active && activeClassName ? activeClassName : '') + className) }>
      {text}
    </button>
  );
};

export default BaseButton;
