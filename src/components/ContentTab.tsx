import React, { FunctionComponent } from "react";
import GeneralContentTab from "./contentTabsComponents/GeneralContentTab";

interface ContentTabProps {
  /* nodes props etc */
}

const ContentTab: FunctionComponent<ContentTabProps> = () => {


  return (
    <div className="h-full p-4 border-4 border-indigo-500 rounded-md">
      <GeneralContentTab/>
    </div>
  );
}

export default ContentTab;