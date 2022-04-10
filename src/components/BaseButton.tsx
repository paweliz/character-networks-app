import { FunctionComponent } from 'react';

interface BaseButtonProps {
  onClick: () => void;
  text: string;
}

const BaseButton: FunctionComponent<BaseButtonProps> = ({ onClick, text }) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className='border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline'>
      {text}
    </button>
  );
};

export default BaseButton;
