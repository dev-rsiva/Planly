import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimeInput from "./TimeInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import dataContext from "../../utills/dataContext";
import { updateFirebaseDoc } from "../../utills/updateFirebase";
import dataContext from "../../utills/dataContext.js";
import generateUniqueNumber from "../../utills/generateUniqueNum";
import { createUpdatedWorkspaceDataType1 } from "../../utills/createUpdatedWorkspaceDataType1";
import { updateHighlightsDatabase } from "../../utills/updateHighlightsDatabase";

const AddChecklist = ({
  showAddChecklist,
  setShowAddChecklist,
  checklistBtnRef,
  workspaceInfo,
  boardInfo,
  listInfo,
  cardInfo,
}) => {
  const [checklistTitle, setChecklistTitle] = useState("");

  console.log(checklistTitle);
  const { workspaceData, user } = useContext(dataContext);
  const paramObj = useParams();
  const checklistRef = useRef();

  const addChecklist = (e) => {
    e.stopPropagation();
    let newChecklist = {
      id: generateUniqueNumber(
        checklistTitle.trim().split(" ").join("").slice(0, 4),
        5
      ),
      title: checklistTitle,
      items: [],
    };
    const generatedObj = (card) => {
      console.log({ ...card, checklists: [...card?.checklists, newChecklist] });
      return { ...card, checklists: [...card?.checklists, newChecklist] };
    };

    let updatedWorkspaceData = createUpdatedWorkspaceDataType1(
      generatedObj,
      workspaceData,
      paramObj
    );

    console.log(updatedWorkspaceData);
    console.log(updateFirebaseDoc);
    // updateFirebaseDoc(updatedWorkspaceData);

    console.log(checklistTitle);
    const addHighlight = (type, highlight, updatedWorkspaceData) => {
      console.log(highlight);
      updateHighlightsDatabase(type, highlight, updatedWorkspaceData);
    };

    addHighlight(
      "card",
      {
        id: generateUniqueNumber("adding_checklist", 5),
        type: "adding_checklist",
        details: {
          userId: user?.uid,
          memberName: user?.displayName,
          workspaceId: workspaceInfo?.id,
          workspaceName: workspaceInfo?.name,
          boardId: boardInfo?.id,
          boardName: boardInfo?.title,
          boardStarred: boardInfo?.starred,
          boardBackgroundImg: boardInfo?.backgroundImg,
          checklistName: checklistTitle,
          cardId: cardInfo.id,
          cardName: cardInfo?.title,
          cardLabels: cardInfo?.labels,
          cardMembers: cardInfo?.members,
          cardInfo: "",
          listId: listInfo?.id,
          listName: "",
          listInfo: "",
          timestamp: new Date().toISOString(),
          inviter: "",
          invitedMember: "",
          remover: "",
          comment: "",
          itemName: "",
          startDate: "",
          dueDate: "",
          description: "",
        },
      },
      updatedWorkspaceData
    );

    setShowAddChecklist(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      e.stopPropagation();
      if (
        !checklistRef?.current?.contains(e.target) &&
        !checklistBtnRef?.current?.contains(e.target)
      ) {
        setShowAddChecklist(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <>
      <div
        ref={checklistRef}
        className="absolute right-60 top-36 bg-white p-4 rounded w-[300px] z-[1801]"
      >
        <div className="flex justify-between items-center mb-3">
          <p className="flex-grow text-center font-sans text-sm font-semibold text-[#172b4d]">
            Add checklist
          </p>
          <div className="ml-2">
            <FontAwesomeIcon
              icon={faX}
              className="cursor-pointer text-xs"
              onClick={(e) => {
                e.stopPropagation();
                setShowAddChecklist(false);
              }}
            />
          </div>
        </div>

        <div className="mt-4">
          <p className="font-sans text-sm font-semibold text-[#172b4d]">
            Title
          </p>

          <div className="">
            <input
              type="text"
              value={checklistTitle}
              className="w-full py-1 px-2 border-2 border-blue-500 rounded outline-none font-sans text-sm text-[#172b4d]"
              onChange={(e) => setChecklistTitle(e.target.value)}
            />
          </div>
        </div>
        {/* <div className="mt-4">
          <p className="font-sans text-sm font-semibold text-[#172b4d]">
            Due date
          </p>

          <div className="flex items-center gap-2 mt-1">
            <div className="font-sans text-sm text-[#172b4d]">
              <div className="w-[100px] py-1 px-2 border-2 border-blue-500 rounded outline-none cursor-pointer"></div>
            </div>
          </div>
        </div> */}

        <div>
          <button
            className="mt-4 rounded py-2 px-2 my-3 text-sm font-semibold font-sans w-[80px] bg-blue-600 text-white"
            onClick={(e) => addChecklist(e)}
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default AddChecklist;
