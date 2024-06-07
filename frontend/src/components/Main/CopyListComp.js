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
import generateUniqueNumber from "../../utills/generateUniqueNum";

const CopyListComp = ({
  setShowCopyListComp,
  copyListBtnRef,
  workspaceData,
  boardInfo,
  listInfo,
}) => {
  const [copiedListTitle, setCopiedListTitle] = useState("");

  const copyListRef = useRef();
  const paramObj = useParams();

  const copyList = (e) => {
    e.stopPropagation();
    console.log(workspaceData);
    console.log(listInfo);

    let updatedWorkspaceData = { ...workspaceData };

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
        return eachList?.id === listInfo?.id;
      });
    });
    console.log(currBoard);

    let currList = currBoard?.lists?.find((eachList) => {
      return eachList?.id === listInfo?.id;
    });
    console.log(currList);

    console.log(updatedWorkspaceData);

    let CopiedData = updatedWorkspaceData?.workspaces?.map((workspace) => {
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
            lists: [
              ...board?.lists,
              {
                ...currList,
                title: copiedListTitle,
                id: generateUniqueNumber(copiedListTitle, 5),
                cards: currList?.cards?.map((eachCard) => {
                  return {
                    ...eachCard,
                    id: generateUniqueNumber(
                      copiedListTitle.slice(0, 4) + eachCard?.title.slice(0, 4),
                      5
                    ),
                    members: [],
                  };
                }),
              },
            ],
          };
        }),
      };
    });

    console.log(CopiedData);

    updatedWorkspaceData.workspaces = CopiedData;

    updateFirebaseDoc(updatedWorkspaceData);

    setShowCopyListComp(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      e.stopPropagation();
      if (
        !copyListRef?.current?.contains(e.target) &&
        !copyListBtnRef?.current?.contains(e.target)
      ) {
        setShowCopyListComp(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  });

  return (
    <>
      <div
        ref={copyListRef}
        className="absolute left-[230px] top-[-10px] bg-white p-4 rounded w-[300px] z-[2000]"
      >
        <div className="flex justify-between items-center mb-3">
          <p className="flex-grow text-center font-sans text-sm font-semibold text-[#172b4d]">
            Copy List
          </p>
          <div className="ml-2" onClick={() => setShowCopyListComp(false)}>
            <FontAwesomeIcon icon={faX} className="cursor-pointer text-xs" />
          </div>
        </div>
        <div>
          <p className="font-sans text-xs font-semibold text-gray-500">Title</p>
          <input
            className="w-full h-[50px] py-1 px-2 border-2 border-blue-500 rounded outline-none font-sans text-sm text-[#172b4d] mt-2 mb-2"
            type="text"
            value={copiedListTitle}
            onChange={(e) => setCopiedListTitle(e.target.value)}
          />
        </div>

        <div>
          <button
            className={`mt-4 rounded py-2 px-2 my-3 text-sm font-semibold font-sans w-full ${
              false ? "bg-gray-400 text-gray-600" : "bg-blue-600 text-white"
            }`}
            onClick={(e) => copyList(e)}
          >
            Create List
          </button>
        </div>
      </div>
    </>
  );
};

export default CopyListComp;
