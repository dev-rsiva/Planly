import { useContext } from "react";
import { useParams } from "react-router-dom";
import WorkspaceHeading from "../components/Main/WorkspaceHeading";
import WorkspaceInfo from "../components/Main/WorkspaceInfo";
import OverviewSidebar from "../components/Sidebar/OverviewSidebar";
import dataContext from "../utills/dataContext";

const WorkspaceHome = () => {
  const { workspaceData, setWorkspaceData } = useContext(dataContext);
  console.log(workspaceData);
  const paramObj = useParams();
  console.log(paramObj);
  const workspaceInfo = workspaceData?.workspaces?.find(
    (workspace) => workspace?.shortname === paramObj?.workspaceShortName
  );
  console.log(workspaceData);
  console.log(workspaceInfo);
  return (
    <div className="flex pl-32 pr-6 mt-8 relative top-[45px]">
      <div className="w-1/4 mr-2">
        <OverviewSidebar />
      </div>

      <div className="flex flex-col ml-48">
        <div className="">
          <WorkspaceHeading
            workspaceInfo={workspaceInfo}
            fromWorkspace={false}
          />
        </div>
        <hr className="mx-30" />

        <div>
          <WorkspaceInfo workspaceInfo={workspaceInfo} />
        </div>
      </div>
    </div>
  );
};

export default WorkspaceHome;
