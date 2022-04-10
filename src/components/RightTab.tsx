import { FunctionComponent } from 'react';
import BaseButton from './BaseButton';

interface RighTabProps {
  /* nodes props etc */
}

const RighTab: FunctionComponent<RighTabProps> = () => {
  return (
    <div>
      <div>
        <BaseButton onClick={() => {}} text={'Selected node'} />
        <BaseButton onClick={() => {}} text={'General'} />
      </div>
    </div>
  );
};

export default RighTab;
