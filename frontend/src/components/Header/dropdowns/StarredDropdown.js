import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import dataContext from "../../../utills/dataContext";

const Starred = ({ setNavItemStatus }) => {
  const { workspaceData, setWorkspaceData } = useContext(dataContext);

  const starredBoards = workspaceData?.workspaces
    ?.map((eachWorkspace, index) => {
      return eachWorkspace?.boards?.filter((eachBoard) => {
        return eachBoard?.starred;
      });
    })
    .flat();

  console.log(starredBoards);

  const navigate = useNavigate();

  return (
    <div className="absolute top-[160%] left-[0%] rounded-md shadow-2xl min-w-[308px] border border-gray-200 py-2 px-2 bg-white z-[1000] max-h-[375px] overflow-y-auto">
      {starredBoards?.length === 0 ? (
        <p className="font-sans text-sm text-custom font-semibold">
          You have no starred boards
        </p>
      ) : (
        <div>
          {starredBoards?.map((eachBoard, index) => {
            return (
              <div
                className="flex items-center py-2 px-2 rounded hover:bg-gray-100"
                onClick={() => {
                  setNavItemStatus((prev) => {
                    let updatedNavItemStatus = [...prev];

                    updatedNavItemStatus[2] = {
                      ...updatedNavItemStatus[2],
                      dropdownIsShowing: false,
                    };

                    return updatedNavItemStatus;
                  });
                  navigate(
                    `/b/${eachBoard?.id}/${eachBoard?.title.replace(/ /g, "-")}`
                  );
                }}
              >
                <img
                  src={eachBoard?.backgroundImg}
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
                          (board) => board?.id === eachBoard?.id
                        )
                      )?.name
                    }
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* {workspaceData?.workspaces
        ?.map((eachWorkspace, index) => {
          return eachWorkspace?.boards?.filter((eachBoard) => {
            return eachBoard?.starred;
          });
        })
        .flat()
        .map((eachBoard, index) => {
          return (
            <div
              className="flex items-center py-2 px-2 rounded hover:bg-gray-100"
              onClick={() => {
                setNavItemStatus((prev) => {
                  let updatedNavItemStatus = [...prev];

                  updatedNavItemStatus[2] = {
                    ...updatedNavItemStatus[2],
                    dropdownIsShowing: false,
                  };

                  return updatedNavItemStatus;
                });
                navigate(
                  `/b/${eachBoard?.id}/${eachBoard?.title.replace(/ /g, "-")}`
                );
              }}
            >
              <img
                src={eachBoard?.backgroundImg}
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
                        (board) => board?.id === eachBoard?.id
                      )
                    )?.name
                  }
                </p>
              </div>
            </div>
          );
        })} */}
    </div>
    // <div className="absolute top-[200%] left-[0%] rounded-md shadow-2xl min-w-[308px] border border-gray-200 py-2 px-4 bg-white z-[1000]">
    //   <ul>
    //     {info?.map((each, i) => {
    //       return (
    //         <li key={i}>
    //           <div className="flex items-center pb-4">
    //             <div className="flex justify-center text-lg text-white font-bold items-center w-[40px] h-[40px] bg-orange-700 border rounded px-4">
    //               {each["Workspace Icon"]}
    //             </div>

    //             <div className="flex flex-col">
    //               <p className="px-4">{each["Workspace Title"]}</p>
    //             </div>
    //           </div>
    //         </li>
    //       );
    //     })}
    //   </ul>
    // </div>
  );
};

export default Starred;
