import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import dataContext from "../../../utills/dataContext";

const Recent = ({ setNavItemStatus }) => {
  const { workspaceData, setWorkspaceData } = useContext(dataContext);

  const navigate = useNavigate();

  const recentlyViewedBoards = workspaceData?.workspaces
    .map((workspace) => {
      return workspace?.boards?.filter((eachBoard, index) => {
        return eachBoard?.viewedAt !== "" && !eachBoard.starred;
      });
    })
    .flat();

  return (
    <div className="absolute top-[160%] left-[0%] rounded-md shadow-2xl min-w-[308px] border border-gray-200 py-2 px-2 bg-white z-[1000]">
      {recentlyViewedBoards.length === 0 ? (
        <p className="font-sans text-sm text-custom font-semibold">
          You have no recently viewed boards
        </p>
      ) : (
        recentlyViewedBoards
          .sort((a, b) => b.viewedAt - a.viewedAt)
          .slice(0, 4)
          .map((eachBoard, index) => {
            return (
              <div
                className="flex items-center py-2 px-2 rounded hover:bg-gray-100"
                onClick={() => {
                  setNavItemStatus((prev) => {
                    let updatedNavItemStatus = [...prev];

                    updatedNavItemStatus[1] = {
                      ...updatedNavItemStatus[1],
                      dropdownIsShowing: false,
                    };

                    return updatedNavItemStatus;
                  });
                  navigate(
                    `/b/${eachBoard.id}/${eachBoard.title.replace(/ /g, "-")}`
                  );
                }}
              >
                <img
                  src={eachBoard.backgroundImg}
                  className="w-[40px] h-[33px] rounded mr-2"
                />
                <div className="flex flex-col flex-1 mr-[2px]">
                  <p
                    className="text-sm font-sans text-[#172b4d] font-semibold overflow-hidden whitespace-nowrap overflow-ellipsis cursor-pointer"
                    style={{ maxWidth: "210px" }}
                  >
                    {eachBoard?.title}
                  </p>
                  <p className="text-xs font-sans text-custom">
                    {
                      workspaceData?.workspaces?.find((workspace) =>
                        workspace?.boards?.some(
                          (board) => board.id === eachBoard.id
                        )
                      ).name
                    }
                  </p>
                </div>
              </div>
            );
          })
      )}
    </div>
  );
};

export default Recent;
