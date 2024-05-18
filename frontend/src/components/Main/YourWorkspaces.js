import { useState, useContext } from "react";
import YourWorkspace from "./YourWorkspace";
const YourWorkspaces = ({ workspaceData }) => {
  return (
    <div>
      <h1 className="pb-4 font-bold text-base font-sans text-[#44546f]">
        YOUR WORKSPACES
      </h1>

      {workspaceData?.workspaces?.map((workspace, index) => {
        return <YourWorkspace key={index} workspace={workspace} />;
      })}
    </div>
  );
};

export default YourWorkspaces;
