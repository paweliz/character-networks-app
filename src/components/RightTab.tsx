import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { SelectedNodeContext } from '../contexts/SelectedNodeContext';
import BaseButton from './BaseButton';
import ContentTab from './ContentTab';

export enum TabsTypes {
  general,
  node,
};

interface RightTabProps {
  /* nodes props etc */
}

const RightTab: FunctionComponent<RightTabProps> = () => {

  const [currentTab, setCurrentTab] = useState<TabsTypes>(TabsTypes.general);
  const selectedNode = useContext(SelectedNodeContext);
  
  useEffect(() => {
    if (selectedNode.nodeId !== null) {
      setCurrentTab(TabsTypes.node);
    } else {
      setCurrentTab(TabsTypes.general);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNode.nodeId]);
  console.log(currentTab);
  return (
    <div className="flex flex-col grow basis-0">
      <div className="grow-none">
        <BaseButton onClick={() => setCurrentTab(TabsTypes.node)} text={'Selected node'} active={currentTab === TabsTypes.node}/>
        <BaseButton onClick={() => setCurrentTab(TabsTypes.general)} text={'General'} active={currentTab === TabsTypes.general}/>
      </div>
      <div className="flex flex-col grow basis-0">
        <ContentTab tabType={currentTab}/>
      </div>
    </div>
  );
};

export default RightTab;
