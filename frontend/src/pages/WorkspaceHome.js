import { useContext } from "react";
import { useParams } from "react-router-dom";
import WorkspaceHeading from "../components/Main/WorkspaceHeading";
import WorkspaceInfo from "../components/Main/WorkspaceInfo";
import OverviewSidebar from "../components/Sidebar/OverviewSidebar";
import dataContext from "../utills/dataContext";

const WorkspaceHome = () => {
  const { workspaceData, setWorkspaceData } = useContext(dataContext);

  const paramObj = useParams();

  console.log(workspaceData);

  const workspaceInfo = workspaceData.workspaces.find(
    (workspace) => workspace.shortname === paramObj.workspaceShortName
  );

  console.log(workspaceInfo);

  return (
    <div className="flex px-32 mt-8 relative top-[45px]">
      <div className="w-1/4 mr-2">
        <OverviewSidebar />
      </div>

      <div className="flex flex-col flex-1">
        <div className="">
          <WorkspaceHeading
            workspaceInfo={workspaceInfo}
            fromWorkspace={false}
          />
        </div>
        <div>
          <WorkspaceInfo workspaceInfo={workspaceInfo}/>
        </div>
      </div>
      {console.log("Workspace ended")}
    </div>
  );
};

export default WorkspaceHome;
