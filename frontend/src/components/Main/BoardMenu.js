import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import { updateFirebaseDoc } from "../../utills/updateFirebase";

const BoardMenu = ({
  boardInfo,
  setShowBoardMenu,
  paramObj,
  workspaceData,
  boardMenuBtnRef,
  user,
}) => {
  const [boardDesc, setBoardDesc] = useState(boardInfo.description);
  const [showEditDesc, setShowEditDesc] = useState(false);
  const navigate = useNavigate();
  const boardMenuRef = useRef();
  const boardDescriptionRef = useRef();

  console.log(user);

  const admins = [
    {
      photoURL:
        "https://avataaars.io/?accessoriesType=Round&avatarStyle=Circle&clotheColor=PastelRed&clotheType=CollarSweater&eyeType=Hearts&eyebrowType=UnibrowNatural&facialHairColor=Red&facialHairType=BeardMagestic&hairColor=Auburn&hatColor=PastelBlue&mouthType=Eating&skinColor=Tanned&topType=LongHairNotTooLong",
      userId: "xArzKluSnnYanUFLmMOczSrokpA3",
      name: "user001",
      email: "user001@gmail.com",
      role: "admin",
    },
  ];

  const result = admins?.filter((eachMember) => {
    console.log(user?.uid);
    console.log(eachMember?.userId);
    console.log(eachMember?.userId !== user?.uid);
    return eachMember?.userId !== user?.uid;
  });

  console.log(result);

  const deleteBoard = (e) => {
    e.stopPropagation();

    let updatedWorkspaceData = { ...workspaceData };

    let currWorkspace = workspaceData?.workspaces?.find((eachWorkspace) => {
      return eachWorkspace?.boards?.some((eachBoard) => {
        return eachBoard?.id === paramObj?.boardId;
      });
    });
    console.log(currWorkspace);

    let currBoard = currWorkspace?.boards?.find((eachBoard) => {
      return eachBoard?.id === paramObj?.boardId;
    });
    console.log(currBoard);

    console.log(updatedWorkspaceData);

    let filteredData = updatedWorkspaceData?.workspaces?.map((workspace) => {
      if (workspace?.id !== currWorkspace?.id) {
        return workspace;
      }
      return {
        ...workspace,
        boards: workspace?.boards?.filter((board) => {
          return board?.id !== currBoard?.id;
        }),
      };
    });

    console.log(filteredData);

    updatedWorkspaceData.workspaces = filteredData;

    updateFirebaseDoc(updatedWorkspaceData);

    setShowBoardMenu(false);

    navigate("/");
  };

  const leaveBoard = (e) => {
    e.stopPropagation();

    let updatedWorkspaceData = { ...workspaceData };

    let currWorkspace = workspaceData?.workspaces?.find((eachWorkspace) => {
      return eachWorkspace?.boards?.some((eachBoard) => {
        return eachBoard?.id === paramObj?.boardId;
      });
    });
    console.log(currWorkspace);

    let currBoard = currWorkspace?.boards?.find((eachBoard) => {
      return eachBoard?.id === paramObj?.boardId;
    });
    console.log(currBoard);

    console.log(updatedWorkspaceData);

    let filteredData = updatedWorkspaceData?.workspaces?.map((workspace) => {
      if (workspace?.id !== currWorkspace?.id) {
        return workspace;
      }
      return {
        ...workspace,
        boards: workspace?.boards?.map((board) => {
          if (board?.id !== currBoard?.id) {
            return board;
          }
          return {
            ...board,
            members: board?.members?.filter(
              (eachMember) => eachMember?.userId !== user?.uid
            ),
            admins: board?.admins?.filter((eachAdmin) => {
              console.log("Current User ID:", user?.uid);
              console.log("Admin User ID:", eachAdmin?.userId);
              console.log(
                "Should filter out:",
                eachAdmin?.userId !== user?.uid
              );
              return eachAdmin?.userId !== user?.uid;
            }),
            lists: board?.lists?.map((eachList) => {
              return {
                ...eachList,
                cards: eachList?.cards?.map((eachCard) => {
                  return {
                    ...eachCard,
                    members: eachCard?.members?.filter((eachMember) => {
                      return eachMember?.userId !== user?.uid;
                    }),
                  };
                }),
              };
            }),
          };
        }),
      };
    });

    console.log(filteredData);

    updatedWorkspaceData.workspaces = filteredData;

    updateFirebaseDoc(updatedWorkspaceData);

    setShowBoardMenu(false);
  };

  const updateBoardDesc = (e) => {
    e.stopPropagation();

    let updatedWorkspaceData = { ...workspaceData };

    let currWorkspace = workspaceData?.workspaces?.find((eachWorkspace) => {
      return eachWorkspace?.boards?.some((eachBoard) => {
        return eachBoard?.id === paramObj?.boardId;
      });
    });
    console.log(currWorkspace);

    let currBoard = currWorkspace?.boards?.find((eachBoard) => {
      return eachBoard?.id === paramObj?.boardId;
    });
    console.log(currBoard);

    console.log(updatedWorkspaceData);

    let boardDescriptionUpdatedData = updatedWorkspaceData?.workspaces?.map(
      (workspace) => {
        if (workspace?.id !== currWorkspace?.id) {
          return workspace;
        }
        return {
          ...workspace,
          boards: workspace?.boards?.map((board) => {
            if (board?.id !== currBoard?.id) {
              return board;
            }
            return { ...board, description: boardDesc };
          }),
        };
      }
    );

    console.log(boardDescriptionUpdatedData);

    updatedWorkspaceData.workspaces = boardDescriptionUpdatedData;

    updateFirebaseDoc(updatedWorkspaceData);

    setShowBoardMenu(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      e.stopPropagation();
      if (
        !boardMenuRef?.current?.contains(e.target) &&
        !boardMenuBtnRef?.current?.contains(e.target)
      ) {
        setShowBoardMenu(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <>
      <div
        ref={boardMenuRef}
        onClick={(e) => e.stopPropagation()}
        className="absolute right-6 top-[50px] bg-gray-50 p-4 rounded w-[300px] z-[1801] border border-gray-200"
      >
        <div className="flex justify-between items-center mb-4">
          <p className="flex-grow text-center font-sans text-sm font-semibold text-[#172b4d]">
            Board Menu
          </p>
          <div
            className="ml-2 cursor-pointer w-6 h-6 flex justify-center items-center rounded hover:bg-gray-200"
            onClick={(e) => {
              e.stopPropagation();
              setShowBoardMenu(false);
            }}
          >
            <FontAwesomeIcon icon={faX} className="text-xs" />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex pb-2">
            <FontAwesomeIcon
              icon={faAlignLeft}
              size="md"
              className="mr-4 p-1"
            />
            <p className="font-sans text-sm font-semibold text-[#172b4d]">
              Board Description
            </p>
          </div>

          {!showEditDesc && (
            <div
              className="bg-gray-300 pl-2 pt-2 pb-4 rounded w-full font-semibold text-[14px] hover:bg-gray-400 cursor-pointer"
              onClick={() => setShowEditDesc(true)}
            >
              <p className="text-wrap w-[220px] p-1">{boardInfo.description}</p>
            </div>
          )}

          {showEditDesc && (
            <div>
              <textarea
                ref={boardDescriptionRef}
                type="text"
                value={boardDesc}
                className="bg-gray-300 pl-2 pr-2 pt-2 pb-4 rounded w-full h-[200px] font-sans text-sm font-semibold text-[#172b4d] mb-4 border-2 border-solid border-blue-600 outline-none"
                row="3"
                placeholder="Add a more detailed description..."
                onChange={(e) => setBoardDesc(e.target.value)}
              />
              <div className="flex text-sm">
                <button
                  className="bg-blue-600 rounded py-1 px-2 text-white border-blue-400 hover:bg-blue-700 mr-4"
                  onClick={(e) => {
                    if (boardDesc && boardDesc.trim() !== "") {
                      updateBoardDesc(e);
                    }
                  }}
                >
                  Save
                </button>
                <button
                  className="bg-gray-200 rounded py-1 px-2 text-gray-900 border-blue-400 hover:bg-gray-400 mr-4"
                  onClick={() => {
                    setShowEditDesc(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div>
          <button
            className={`mt-4 rounded py-2 px-2 text-sm font-semibold font-sans w-full bg-gray-200 text-gray-800
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setShowBoardMenu(false);
              leaveBoard(e);
            }}
          >
            Leave Board
          </button>
        </div>

        <div>
          <button
            className="mt-4 rounded py-2 px-2 text-sm font-semibold font-sans w-full bg-red-700 text-white"
            onClick={(e) => {
              e.stopPropagation();
              setShowBoardMenu(false);
              deleteBoard(e);
            }}
          >
            Delete Board
          </button>
        </div>
      </div>
    </>
  );
};

export default BoardMenu;
