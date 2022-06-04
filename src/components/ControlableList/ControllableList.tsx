import { ComponentType, FunctionComponent } from 'react';

interface ControllableListProps {
  listArray: any[];
  elementRenderer: ComponentType<any>;
}

const ControllableList: FunctionComponent<ControllableListProps> = ({listArray, elementRenderer}) => {
  const Renderer = elementRenderer;
  return (
    <div className="grid grid-cols-1 divide-y border rounded-md">
      {
        listArray.map((el) => {
          return (
            <Renderer {...el}/>
          );
        })
      }
    </div>
  );
};

export default ControllableList;
