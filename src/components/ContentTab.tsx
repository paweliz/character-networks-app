import React, { FunctionComponent } from "react";
import GeneralContentTab from "./contentTabsComponents/GeneralContentTab";
import NodeContentTab from "./contentTabsComponents/NodeContentTab";
import { TabsTypes } from "./RightTab";

interface ContentTabProps {
  tabType: TabsTypes,
}

const ContentTab: FunctionComponent<ContentTabProps> = (props) => {


  return (
    <div className="h-full p-4 border-4 border-indigo-500 rounded-md">
      {
        props.tabType === TabsTypes.general && <GeneralContentTab/>
      }
      {
        props.tabType === TabsTypes.node && <NodeContentTab/>
      }
    </div>
  );
}

export default ContentTab;