import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimeInput from "./TimeInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import dataContext from "../../utills/dataContext";
import { updateFirebaseDoc } from "../../utills/updateFirebase";
import { useParams } from "react-router-dom";
import { createUpdatedWorkspaceDataType1 } from "../../utills/createUpdatedWorkspaceDataType1";

const MoveListComp = ({
  setShowMoveListComp,
  moveListBtnRef,
  workspaceData,
  boardInfo,
  listInfo,
}) => {
  const [boardTitle, setBoardTitle] = useState(boardInfo.title);
  const [boardChoosed, setBoardChoosed] = useState(boardInfo);

  const moveListRef = useRef();
  const paramObj = useParams();

  const moveList = (e) => {
    e.stopPropagation();

    let updatedWorkspaceData = { ...workspaceData };

    let targetBoard = boardChoosed;

    let currWorkspace = workspaceData?.workspaces?.find((eachWorkspace) => {
      return eachWorkspace?.boards?.some((eachBoard) => {
        return eachBoard?.lists?.some((eachList) => {
          return eachList?.id === listInfo.id;
        });
      });
    });
    console.log(currWorkspace);

    let currBoard = currWorkspace?.boards?.find((eachBoard) => {
      return eachBoard?.lists?.some((eachList) => {
        return eachList?.id === listInfo.id;
      });
    });
    console.log(currBoard);

    let currList = currBoard?.lists?.find((eachList) => {
      return eachList?.id === listInfo.id;
    });
    console.log(currList);

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
            lists: board?.lists?.filter((eachList) => {
              return eachList?.id !== currList?.id;
            }),
          };
        }),
      };
    });

    console.log(filteredData);

    let movedData = filteredData.map((workspace) => {
      if (workspace?.id !== currWorkspace?.id) {
        return workspace;
      }
      return {
        ...workspace,
        boards: workspace?.boards?.map((board) => {
          if (board?.id !== targetBoard.id) {
            return board;
          }

          return {
            ...board,
            lists: [currList, ...board?.lists],
          };
        }),
      };
    });

    console.log(movedData);

    updatedWorkspaceData.workspaces = movedData;

    updateFirebaseDoc(updatedWorkspaceData);

    setShowMoveListComp(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      e.stopPropagation();
      if (
        !moveListRef?.current?.contains(e.target) &&
        !moveListBtnRef?.current?.contains(e.target)
      ) {
        setShowMoveListComp(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  });
  return (
    <>
      <div
        ref={moveListRef}
        className="absolute left-[200px] top-0 bg-white p-4 rounded w-[300px] z-[1801]"
      >
        <div className="flex justify-between items-center mb-3">
          <p className="flex-grow text-center font-sans text-sm font-semibold text-[#172b4d]">
            Move List
          </p>
          <div className="ml-2" onClick={() => setShowMoveListComp(false)}>
            <FontAwesomeIcon icon={faX} className="cursor-pointer text-xs" />
          </div>
        </div>
        <p className="font-sans text-xs font-semibold text-gray-500">
          Select Destination
        </p>
        <div className="mt-4">
          <p className="font-sans text-sm font-semibold text-[#172b4d]">
            Board
          </p>
          <div className="flex items-center gap-2 mt-1">
            <select
              name="workspaces"
              className={`w-full border-2 rounded focus:outline-none pl-2 py-[6px] font-sans text-custom text-sm`}
              value={boardTitle}
              onChange={(e) => {
                setBoardTitle(e.target.value);
                setBoardChoosed((prev) => {
                  console.log(workspaceData);
                  let workspace = workspaceData?.workspaces?.find(
                    (workspace) => {
                      console.log(workspace);
                      return workspace?.boards?.some((board) => {
                        console.log(board?.title);
                        console.log(e.target.value);
                        return board?.title === e.target.value;
                      });
                    }
                  );
                  console.log(workspace);
                  let updatedBoard = workspace?.boards?.filter(
                    (board) => board?.title === e.target.value
                  )[0];

                  console.log(updatedBoard);

                  return updatedBoard;
                });
              }}
            >
              {workspaceData?.workspaces?.map((workspace) => (
                <optgroup key={workspace?.id} label={workspace?.name}>
                  {workspace?.boards?.map((board) => (
                    <option key={board?.id} value={board?.title}>
                      {board?.title}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>
        {/* <div className="mt-4">
          <p className="font-sans text-sm font-semibold text-[#172b4d]">List</p>

          <div className="flex items-center gap-2 mt-1">
            <select
              name="workspaces"
              className={`w-full border-2 rounded focus:outline-none pl-2 py-[6px] font-sans text-custom text-sm`}
              value={listTitle}
              onChange={(e) => {
                setListTitle(e.target.value);
                setListChoosed((prev) => {
                  console.log(workspaceData);
                  let updatedList = boardChoosed. lists?.filter(
                    (list) => list?.title === e.target.value
                  )[0];

                  console.log(updatedList);

                  return updatedList;
                });
              }}
            >
              {boardChoosed?.lists?.map((list) => (
                <option key={list?.id} value={list?.title}>
                  {list?.title}
                </option>
              ))}
            </select>
          </div>
        </div> */}

        <div>
          <button
            className={`mt-4 rounded py-2 px-2 my-3 text-sm font-semibold font-sans w-full ${
              false ? "bg-gray-400 text-gray-600" : "bg-blue-600 text-white"
            }`}
            onClick={moveList}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default MoveListComp;
