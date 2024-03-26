import WorkspaceStarredBoards from "./WorkspaceStarredBoards";
import WorkspaceYourBoards from "./WorkspaceYourBoards";
import WorkspaceAllBoards from "./WorkspaceAllBoards";
const WorkspaceInfo = ({ workspaceInfo }) => {
  return (
    <div className="ml-6 mt-6">
      <WorkspaceStarredBoards />
      <WorkspaceYourBoards workspaceInfo={workspaceInfo} />
      <WorkspaceAllBoards workspaceInfo={workspaceInfo}/>
      <button className="bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded-md font-sans text-sm text-custom font-semibold">
        View closed boards
      </button>
    </div>
  );
};

export default WorkspaceInfo;
