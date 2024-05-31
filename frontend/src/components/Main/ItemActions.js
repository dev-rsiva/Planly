import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimeInput from "./TimeInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import dataContext from "../../utills/dataContext";

import { updateFirebaseDoc } from "../../utills/updateFirebase";
import { createUpdatedWorkspaceDataType1 } from "../../utills/createUpdatedWorkspaceDataType1";

const ItemActions = ({
  setShowItemAction,
  item,
  paramObj,
  workspaceData,
  checklist,
}) => {
  const deleteItemCardRef = useRef();

  const deleteItem = (e) => {
    e.stopPropagation();
    console.log("deleting item");
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
            items: eachChecklist?.items.filter((eachItem) => {
              return eachItem.id !== item.id;
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

    setShowItemAction(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      e.stopPropagation();
      if (!deleteItemCardRef?.current?.contains(e.target)) {
        setShowItemAction(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <>
      <div
        ref={deleteItemCardRef}
        onClick={(e) => e.stopPropagation()}
        className="absolute right-[-120px] top-[-85px] bg-white p-4 rounded w-[300px] z-[1801]"
      >
        <div className="flex justify-between items-center mb-3">
          <p className="flex-grow text-center font-sans text-sm font-semibold text-[#172b4d]">
            Delete an Item?
          </p>
          <div
            className="ml-2"
            onClick={(e) => {
              e.stopPropagation();
              setShowItemAction(false);
            }}
          >
            <FontAwesomeIcon icon={faX} className="cursor-pointer text-xs" />
          </div>
        </div>

        <div className="mt-4">
          <p className="font-sans text-sm">
            Deleting an Item is permanent and there is no way to get it back.
          </p>
        </div>

        <div>
          <button
            className={`mt-4 rounded py-2 px-2 my-3 text-sm font-semibold font-sans w-full ${
              false ? "bg-gray-400 text-gray-600" : "bg-red-700 text-white"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setShowItemAction(false);
              deleteItem(e);
            }}
          >
            Delete item
          </button>
        </div>
      </div>
    </>
  );
};

export default ItemActions;
