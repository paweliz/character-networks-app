import { ChangeEventHandler, FunctionComponent } from 'react';
import './switch.css';

interface BaseSwitchProps {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: boolean;
  label?: string;
  disabled?: boolean;
}

const BaseSwitch: FunctionComponent<BaseSwitchProps> = (props: BaseSwitchProps) => {


  return (
    <label className="flex items-center cursor-pointer relative mb-4">
      <input type="checkbox"  className="sr-only" checked={props.value} onChange={props.onChange} disabled={props.disabled}/>
      <div className="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full"></div>
      <span className="ml-3 text-gray-500 font-bold md:text-right mb-0">{props.label}</span>
    </label>
  );
};

export default BaseSwitch;
