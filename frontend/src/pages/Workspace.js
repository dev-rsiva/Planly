import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar.js";
import WorkspaceHeading from "../components/Main/WorkspaceHeading.js";
import { data } from "../utills/utills.js";
// import { useOutletContext } from "react-router-dom";
import dataContext from "../utills/dataContext.js";
const Workspace = () => {
  const { workspaceData, setWorkspaceData } = useContext(dataContext);

  const paramObj = useParams();
  console.log(paramObj);
  const [workspaceInfo, setWorkspaceInfo] = useState(() =>
    workspaceData?.workspaces?.find(
      (workspace) => workspace?.shortname === paramObj?.workspaceShortName
    )
  );
  console.log(workspaceData);
  console.log(workspaceInfo);
  console.log(
    workspaceData?.workspaces?.find(
      (workspace) => workspace?.shortname === paramObj?.workspaceShortName
    )
  );

  useEffect(() => {
    const currWorkspace = workspaceData?.workspaces?.find((workspace) => {
      console.log(workspace?.shortname);
      console.log(paramObj?.workspaceShortName);
      return workspace?.shortname === paramObj?.workspaceShortName;
    });
    console.log(currWorkspace);
    setWorkspaceInfo((prev) => {
      console.log({
        ...prev,
        ...currWorkspace,
      });
      return {
        ...prev,
        ...currWorkspace,
      };
    });
  }, [workspaceData, paramObj]);

  return (
    <div className="flex relative top-[45px]">
      <div className="mr-2 flex fixed h-[85vh]">
        <Sidebar workspaceInfo={workspaceInfo} />
        <hr
          style={{
            borderRightWidth: "1px",
            borderColor: "#CCCCCC", // Mild gray color
            height: "90vh",
          }}
          // className="ml-[20px]"
        />
      </div>
      <div className="flex-1 ml-[260px]">
        <WorkspaceHeading workspaceInfo={workspaceInfo} fromWorkspace={true} />
        <hr className="" />
        <Outlet context={[workspaceInfo]} />
      </div>
    </div>
  );
};

export default Workspace;
