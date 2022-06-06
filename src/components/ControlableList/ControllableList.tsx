import { ComponentType, FunctionComponent } from 'react';
import "./ControllableList.css";

export interface ControllableListProps {
  listArray: any[];
  elementRenderer: ComponentType<any>;
  width?: string;
  height?: string;
  className?: string;
}

export interface ControllableListElementProps {
  className?: string;
  onClick?: (event: any) => void;
  children?: React.ReactNode;
}

const ControllableList: FunctionComponent<ControllableListProps> = ({listArray, elementRenderer, width, height, className}) => {
  const Renderer = elementRenderer;
  return (
    <div className={`grid grid-cols-1 divide-y border rounded-md ${width ? width : ''} ${height ? height : ''} overflow-auto ${className ? className : ''} list`}>
      {
        listArray.map((el, i) => {
          return (
            <Renderer key={i} {...el}/>
          );
        })
      }
    </div>
  );
};

export const ControllableListElement: FunctionComponent< ControllableListElementProps> = (props) => {
  return (
    <div className={` ${props.className ? props.className : ''} element`} onClick={props.onClick}>
      {props.children}
    </div>
  );
}

export default ControllableList;
