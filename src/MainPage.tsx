import React from "react";
import TextProvider from "./components/TextProvider";

const MainPage = () => {
  return (
    <div className="mt-40 flex flex-row justify-center">
      <div className="flex w-1/4  center p-4 border-4 border-indigo-500 rounded-md">
        <TextProvider/>
      </div>
    </div>
  );
}
export default MainPage;