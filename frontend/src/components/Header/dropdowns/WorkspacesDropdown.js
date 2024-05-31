import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { data } from "../../../utills/utills.js";
import { Link } from "react-router-dom";
import dataContext from "../../../utills/dataContext.js";

const WorkspacesDropdown = ({
  info,
  setNavItemStatus,
  workspaceData,
  setWorkspaceData,
}) => {
  console.log("workspacesDropdown running");
  console.log(workspaceData);
  const { currWorkspace, setCurrWorkspace } = useContext(dataContext);

  const paramObj = useParams();

  const currWorkspaceInfo = paramObj.workspaceShortName
    ? workspaceData?.workspaces?.find(
        (workspace) => workspace?.shortname === paramObj.workspaceShortName
      )
    : paramObj.boardName
    ? workspaceData?.workspaces?.find((workspace) =>
        workspace?.boards.some((board) => board.id === paramObj.boardId)
      )
    : "";

  const navigate = useNavigate();

  return (
    <>
      <div
        id="workspaceDropdown"
        className="absolute top-[160%] left-[0%] rounded-md shadow-2xl min-w-[308px] border border-gray-200 py-2 px-2 bg-white z-[1000]"
      >
        {currWorkspaceInfo?.name && currWorkspaceInfo.name !== "" && (
          <div>
            <p className="text-[12px] font-bold text-gray-500 pb-4">
              Current Workspaces
            </p>

            <div>
              <div
                className="flex justify-between items-center hover:bg-gray-200 rounded-lg my-[6px] py-[5px] cursor-pointer"
                onClick={() => {
                  setNavItemStatus((prev) => {
                    let updatedNavItemStatus = [...prev];
                    updatedNavItemStatus[0] = {
                      ...updatedNavItemStatus[0],
                      dropdownIsShowing: false,
                    };

                    return updatedNavItemStatus;
                  });

                  navigate(
                    `w/${
                      currWorkspaceInfo.shortname
                    }/${currWorkspaceInfo.name.replace(/ /g, "-")}`
                  );
                }}
              >
                <div className="w-full py-[2px] pr-2 flex items-center">
                  <div
                    style={{
                      backgroundImage: `linear-gradient(to bottom, ${currWorkspaceInfo?.iconColors?.color1}, ${currWorkspaceInfo?.iconColors?.color2})`,
                    }}
                    className={`relative w-[40px] h-[40px] rounded mr-3 flex justify-center items-center font-bold text-white text-xl`}
                  >
                    <div className="bg-black opacity-30 absolute w-full h-full rounded" />
                    <p className="z-50 rounded text-sm text-white font-bold font-sans">
                      {currWorkspaceInfo?.name[0]}
                    </p>
                  </div>
                  <h1 className="font-medium font-sans text-sm text-[#172b4d] flex-1">
                    {currWorkspaceInfo?.name}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        )}
        <p className="text-[12px] font-bold text-gray-500 pb-4">
          Your Workspaces
        </p>
        <ul>
          {workspaceData?.workspaces?.map((workspace) => {
            return (
              <div>
                <div
                  className="flex justify-between items-center hover:bg-gray-100 rounded-lg my-[6px] px-2 py-[5px] cursor-pointer"
                  onClick={() => {
                    setNavItemStatus((prev) => {
                      let updatedNavItemStatus = [...prev];
                      updatedNavItemStatus[0] = {
                        ...updatedNavItemStatus[0],
                        dropdownIsShowing: false,
                      };

                      return updatedNavItemStatus;
                    });

                    navigate(
                      `w/${workspace.shortname}/${workspace.name.replace(
                        / /g,
                        "-"
                      )}`
                    );
                  }}
                >
                  <div className="w-full py-[2px] pr-2 flex items-center">
                    <div
                      style={{
                        backgroundImage: `linear-gradient(to bottom, ${workspace?.iconColors?.color1}, ${workspace?.iconColors?.color2})`,
                      }}
                      className={`relative w-[40px] h-[40px] rounded mr-3 flex justify-center items-center font-bold text-white text-xl`}
                    >
                      <div className="bg-black opacity-30 absolute w-full h-full rounded" />
                      <p className="z-50 rounded text-sm text-white font-bold font-sans">
                        {workspace.name[0]}
                      </p>
                    </div>
                    <h1 className="font-semibold font-sans text-sm text-[#172b4d] flex-1">
                      {workspace.name}
                    </h1>
                  </div>
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default WorkspacesDropdown;
