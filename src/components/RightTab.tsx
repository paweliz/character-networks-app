import { FunctionComponent } from 'react';
import BaseButton from './BaseButton';
import ContentTab from './ContentTab';

interface RightTabProps {
  /* nodes props etc */
}

const RightTab: FunctionComponent<RightTabProps> = () => {
  return (
    <div className="h-full">
      <div>
        <BaseButton onClick={() => {}} text={'Selected node'} />
        <BaseButton onClick={() => {}} text={'General'} />
      </div>
      <ContentTab/>
    </div>
  );
};

export default RightTab;
