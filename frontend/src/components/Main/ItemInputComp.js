import React, { useRef, useEffect } from "react";
import {
  useState,
  useEffect,
  useRef,
  useContext,
  useMemo,
  createContext,
} from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBoxArchive,
  faCopy,
  faDesktop,
  faFileInvoice,
  faPlus,
  faShareNodes,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faPaintRoller } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import dataContext from "../../utills/dataContext.js";
import { cardDataContext } from "../../utills/cardDataContext";
import generateUniqueNumber from "../../utills/generateUniqueNum";
import Labels from "./Labels.js";
import LabelList from "./LabelList";
import CreateLabel from "./CreateLabel";
import Boards from "../../pages/Boards.js";
import { updateFirebaseDoc } from "../../utills/updateFirebase";
import { createUpdatedWorkspaceDataType1 } from "../../utills/createUpdatedWorkspaceDataType1";

import DatesCard from "./DatesCard";
import Items from "./Items";
import ProgressBarContainer from "./ProgressBarContainer";

const ItemInputComp = ({
  item,
  itemTitle,
  setItemTitle,
  setCurrIndexOfItem,
  setCurrIndexOfChecklist,
  actionType,
  indexOfChecklist,
  currIndexOfAddItemBtn,
  setCurrIndexOfAddItemBtn,
  workspaceData,
  paramObj,
  checklist,
}) => {
  console.log(itemTitle);
  const itemInputRef = useRef();

  const updateItem = () => {
    console.log("udpdating item");
    const generatedObj = (card) => {
      console.log("generate");
      return {
        ...card,
        checklists: card?.checklists?.map((eachChecklist) => {
          if (eachChecklist?.id !== checklist?.id) {
            console.log(eachChecklist?.id);
            console.log(checklist?.id);
            console.log("generate1");

            return eachChecklist;
          }
          console.log("generate2");

          return {
            ...eachChecklist,
            items: eachChecklist?.items.map((eachItem) => {
              if (eachItem.id !== item.id) {
                console.log("generate3");

                return eachItem;
              }
              console.log("eeeeee");
              return {
                ...eachItem,
                title: itemTitle,
              };
            }),
          };
        }),
      };
    };

    const updatedWorkspaceData = createUpdatedWorkspaceDataType1(
      generatedObj,
      workspaceData,
      paramObj
    );
    console.log(updatedWorkspaceData);

    updateFirebaseDoc(updatedWorkspaceData);

    setCurrIndexOfItem(null);
    setCurrIndexOfChecklist(null);
    setItemTitle("");
  };

  const addItem = () => {
    let newItem = {
      id: generateUniqueNumber(
        itemTitle.trim().split(" ").join("").slice(0, 4),
        5
      ),
      title: itemTitle,
      status: "not completed",
    };

    const generatedObj = (card) => {
      return {
        ...card,
        checklists: card.checklists.map((eachChecklist) => {
          if (eachChecklist?.id !== checklist?.id) {
            return eachChecklist;
          }
          return {
            ...eachChecklist,
            items: [...eachChecklist?.items, newItem],
          };
        }),
      };
    };

    console.log(generatedObj);
    const updatedWorkspaceData = createUpdatedWorkspaceDataType1(
      generatedObj,
      workspaceData,
      paramObj
    );
    console.log(updatedWorkspaceData);

    updateFirebaseDoc(updatedWorkspaceData);

    setCurrIndexOfAddItemBtn(null);

    setItemTitle("");
  };

  useEffect(() => {
    itemInputRef.current.focus();
  }, []);
  return (
    <div
      className={`${
        actionType === "add item" ? "px-[12px]" : "px-[12px]"
      } my-2`}
    >
      <div>
        <input
          ref={itemInputRef}
          type="text"
          value={itemTitle}
          className="pl-2 py-2 rounded w-[470px] font-sans text-sm font-semibold text-[#172b4d] mb-4 border-2 border-solid border-blue-500 outline-none"
          placeholder="Add an item"
          onChange={(e) => setItemTitle(e.target.value)}
        />
        <div className="flex my-2">
          <button
            className="bg-blue-600 rounded py-1 px-2 text-white text-sm font-semibold border-blue-400 hover:bg-blue-700 mr-4"
            onClick={(e) => {
              e.stopPropagation();
              actionType === "add item" ? addItem() : updateItem();
            }}
          >
            {actionType === "add item" ? "Add" : "Save"}
          </button>
          <button
            className="bg-gray-200 rounded py-1 px-2 text-[#172b4d] text-sm font-semibold border border-gray-300 hover:bg-gray-500 mr-4 "
            onClick={(e) => {
              e.stopPropagation();

              actionType === "add item"
                ? setCurrIndexOfChecklist(null)
                : setCurrIndexOfItem(null);

              setCurrIndexOfAddItemBtn(null);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemInputComp;
