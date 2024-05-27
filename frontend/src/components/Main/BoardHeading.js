import { useState, useContext, useEffect } from "react";
import { visibilityDetails } from "../../utills/visibilityData.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { faBoltLightning } from "@fortawesome/free-solid-svg-icons";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import dataContext from "../../utills/dataContext";
import { updateFirebaseDoc } from "../../utills/updateFirebase";

const BoardHeading = ({ boardInfo, workspaceInfo }) => {
  // const data = visibilityDetails?.map((each) => {
  //   console.log(each?.name);
  //   console.log(boardInfo?.visibility);
  //   if (each?.name === boardInfo?.visibility) {
  //     let updatedVisibility = { ...each, isShowing: true };
  //     console.log(updatedVisibility);
  //     return updatedVisibility;
  //   } else {
  //     let updatedVisibility = { ...each, isShowing: false };
  //     console.log(updatedVisibility);
  //     return updatedVisibility;
  //   }
  // });

  // console.log(data);

  const [showBoardVisibility, setShowBoardVisibility] = useState(false);
  const [boardVisibility, setBoardVisibility] = useState(null);
  console.log(boardInfo, boardVisibility);
  console.log(showBoardVisibility);
  const { workspaceData, setWorkspaceData, user } = useContext(dataContext);
  console.log(user);
  console.log(workspaceData);

  // setWorkspaceData(null);

  const updateBoardMembers = () => {
    if (!workspaceData || !boardInfo) {
      return;
    }

    const check = boardInfo.members.some((member) => {
      console.log(member.userId);
      console.log(user.uid);
      console.log(member.userId === user.uid);
      return member.userId === user.uid;
    });
    console.log(check);

    if (boardInfo.members.some((member) => member.userId === user.uid)) {
      return;
    }

    if (boardInfo.admins.some((member) => member.userId === user.uid)) {
      return;
    }

    const updatedBoardInfo = { ...boardInfo };
    const updatedWorkspaceInfo = { ...workspaceInfo };
    const updatedboardMemberInfo = [
      ...boardInfo?.members,
      {
        userId: user?.uid,
        role: "member",
        name: user?.displayName,
        email: user?.email,
      },
    ];
    updatedBoardInfo.members = updatedboardMemberInfo;

    updatedWorkspaceInfo.boards = [...updatedWorkspaceInfo.boards];

    const indexOfCurrBoard = updatedWorkspaceInfo.boards.findIndex(
      (eachBoard) => eachBoard.id === boardInfo.id
    );
    updatedWorkspaceInfo.boards[indexOfCurrBoard] = updatedBoardInfo;

    const indexOfCurrWorkspace = workspaceData?.workspaces?.findIndex(
      (eachWorkspace) => eachWorkspace?.id === updatedWorkspaceInfo?.id
    );

    const updatedWorkspaceData = { ...workspaceData };

    updatedWorkspaceData.workspaces[indexOfCurrWorkspace] =
      updatedWorkspaceInfo;

    console.log(updatedboardMemberInfo);
    console.log(updatedBoardInfo);
    console.log(updatedWorkspaceInfo);
    console.log(updatedWorkspaceData);

    updateFirebaseDoc(updatedWorkspaceData);
  };

  console.log(boardInfo);

  useEffect(() => {
    if (!boardInfo) return;
    console.log("useEffect started in BoardHeading");
    const data = visibilityDetails?.map((each) => {
      console.log(each?.name);
      console.log(boardInfo?.visibility);
      if (each?.name === boardInfo?.visibility) {
        let updatedVisibility = { ...each, isShowing: true };
        console.log(updatedVisibility);
        return updatedVisibility;
      } else {
        let updatedVisibility = { ...each, isShowing: false };
        console.log(updatedVisibility);
        return updatedVisibility;
      }
    });
    console.log(data);
    setBoardVisibility(data);
  }, [boardInfo]);

  return (
    <div className="flex justify-between items-center px-[30px] py-3">
      <div className="flex items-center">
        <div className="pr-4 font-sans text-lg text-[#172b4d] font-bold">
          <h1>{boardInfo && boardInfo?.title}</h1>
        </div>
        <div className="pr-4">
          <FontAwesomeIcon
            icon={faStar}
            className="text-sm font-semibold text-[#172b4d] font-sans"
          />
        </div>
        <div className="pr-4 relative">
          <div
            className="cursor-pointer"
            onClick={() => setShowBoardVisibility(!showBoardVisibility)}
          >
            <FontAwesomeIcon
              icon={faUserGroup}
              className="text-sm font-semibold text-[#172b4d] font-sans"
            />
          </div>

          <div className="absolute top-[150%] border border-gray-200 z-50 bg-white rounded-lg shadow-lg">
            {showBoardVisibility && (
              <div>
                <div className="flex items-center mx-3 my-2">
                  <h1 className="flex-1 font-semibold text-sm text-gray-500 text-center">
                    Change Board Visibility
                  </h1>
                  <FontAwesomeIcon
                    icon={faX}
                    className="text-gray-500 text-xs hover:bg-gray-200 p-2 rounded cursor-pointer"
                    onClick={() => setShowBoardVisibility(false)}
                  />
                </div>
                <hr className="border-b-gray-50 text-center mx-auto" />
                <div>
                  {boardVisibility?.map((eachCategory, index) => {
                    return (
                      <div
                        className={`w-[250px] flex flex-col p-2  hover:bg-slate-300 ${
                          index === 2 ? "hover:rounded-b-lg" : ""
                        } cursor-pointer ${
                          eachCategory?.isShowing && "bg-blue-200"
                        }`}
                        onClick={(e) => {
                          console.log("clicking");
                          // e.stopPropagation();
                          // setBoardVisibility((prev) => {
                          //   console.log("clicking inside");

                          //   let updatedBoardVisibility = [...prev];
                          //   console.log(updatedBoardVisibility);

                          //   const data = updatedBoardVisibility?.map((each) => {
                          //     console.log(each?.name);
                          //     console.log(eachCategory?.name);
                          //     if (each?.name === eachCategory?.name) {
                          //       console.log("same");
                          //       let updatedEachData = {
                          //         ...each,
                          //         isShowing: true,
                          //       };
                          //       console.log(updatedEachData);
                          //       return updatedEachData;
                          //     } else {
                          //       console.log("no same");
                          //       let updatedEachData = {
                          //         ...each,
                          //         isShowing: false,
                          //       };
                          //       console.log(updatedEachData);
                          //       return updatedEachData;
                          //     }
                          //   });
                          //   console.log(data);
                          //   return data;
                          // });

                          let updatedWorkspaceData = { ...workspaceData };

                          let indexOfCurrWorkspace =
                            updatedWorkspaceData.workspaces.findIndex(
                              (eachWorkspace) =>
                                eachWorkspace.id === workspaceInfo.id
                            );

                          let updatedBoards = [...workspaceInfo.boards];

                          let indexOfCurrBoard = workspaceInfo.boards.findIndex(
                            (eachBoard) => eachBoard.id === boardInfo.id
                          );
                          console.log(indexOfCurrBoard);
                          console.log(indexOfCurrWorkspace);
                          updatedBoards[indexOfCurrBoard] = {
                            ...updatedBoards[indexOfCurrBoard],
                            visibility: eachCategory.name,
                          };
                          updatedWorkspaceData.workspaces[
                            indexOfCurrWorkspace
                          ] = { ...workspaceInfo, boards: updatedBoards };

                          console.log(updatedWorkspaceData);

                          updateFirebaseDoc(updatedWorkspaceData);
                        }}
                      >
                        <h1
                          className={`text-sm text-custom ${
                            eachCategory?.isShowing && "text-blue-700"
                          }`}
                        >
                          {eachCategory?.name}
                        </h1>
                        <p
                          className={`text-xs text-custom ${
                            eachCategory?.isShowing && "text-blue-700"
                          }`}
                        >
                          {eachCategory?.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mr-4 bg-[#DFE1E6] rounded-[4px] px-4 py-2 font-sans text-sm text-[#172b4d] font-semibold">
          <button>Board</button>
        </div>
        <div className="mr-4 bg-[#DFE1E6] rounded-[4px] px-2 py-2 flex justify-between items-center">
          <FontAwesomeIcon
            icon={faAngleDown}
            className="text-lg text-[#172b4d]"
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <FontAwesomeIcon
          icon={faRocket}
          className="pr-4 text-sm font-semibold text-[#172b4d] font-sans"
        />
        <FontAwesomeIcon
          icon={faBoltLightning}
          className="pr-4 text-sm font-semibold text-[#172b4d] font-sans"
        />
        <div className="pr-4 flex items-center">
          <FontAwesomeIcon
            icon={faFilter}
            className="pr-2 text-sm font-semibold text-[#172b4d] font-sans"
          />
          <p className="flex text-sm font-semibold text-[#172b4d] font-sans">
            Filters
          </p>
        </div>
        <hr className="border h-5 border-gray-400 mr-4"></hr>
        <div className="mr-2 flex">
          {boardInfo?.members?.map((eachMember) => {
            return (
              <div className="w-[30px] h-[30px] mr-1 rounded-full bg-blue-600 flex justify-center items-center text-sm font-semibold text-slate-200 font-sans">
                {eachMember?.name[0] +
                  eachMember?.name[eachMember.name.length - 1]}
              </div>
            );
          })}
        </div>
        {!boardInfo?.members?.some(
          (eachMember) => eachMember.userId === user.uid
        ) && (
          <button
            className="bg-blue-600 px-4 py-2 rounded text-white text-sm font-semibold mx-3"
            onClick={() => updateBoardMembers()}
          >
            Join Board
          </button>
        )}
        <div className="flex justify-center items-center bg-[#DFE1E6] px-4 py-2 rounded-[3px] mr-4 text-[#172b4d] font-sans text-sm font-semibold">
          <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
          <p>Share</p>
        </div>
        <div>
          <FontAwesomeIcon
            icon={faEllipsis}
            className="text-sm font-semibold text-[#172b4d] font-sans"
          />
        </div>
      </div>
    </div>
  );
};

export default BoardHeading;
