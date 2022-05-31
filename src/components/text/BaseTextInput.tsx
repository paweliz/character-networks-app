import { FunctionComponent } from 'react';

interface BaseTextInputProps {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  disabled?: boolean;
  placeholder?: string;
  type: 'text' | 'textarea';
}

const BaseTextInput: FunctionComponent<BaseTextInputProps> = (props) => {
  return (
    <>
    {
      props.type === 'textarea' ?
      <textarea
        onChange={props.onChange}
        value={props.value}
        disabled={props.disabled}
        className="
          form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
        "
        placeholder={props.placeholder}
      ></textarea> :
      <input
        onChange={props.onChange}
        value={props.value}
        className="
          bg-gray-200
          appearance-none
          border-2
          border-gray-200
          rounded w-full
          py-2
          px-4
          text-gray-700
          leading-tight
          focus:outline-none
          focus:bg-white
          focus:border-purple-500
        "  
        disabled={props.disabled}
        type="text" placeholder={props.placeholder}
      />
    }
    </>
  );
};

export default BaseTextInput;
