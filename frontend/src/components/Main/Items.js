import React from "react";
import { useState, useEffect, useRef, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import dataContext from "../../utills/dataContext";
import Item from "./Item";
import { createUpdatedWorkspaceDataType1 } from "../../utills/createUpdatedWorkspaceDataType1";
import { updateFirebaseDoc } from "../../utills/updateFirebase";
import generateUniqueNumber from "../../utills/generateUniqueNum";
import ItemInputComp from "./ItemInputComp";

const Items = ({
  items,
  checklist,
  indexOfChecklist,
  currIndexOfChecklist,
  setCurrIndexOfChecklist,
  currIndexOfAddItemBtn,
  setCurrIndexOfAddItemBtn,
  paramObj,
  workspaceData,
}) => {
  const [currIndexOfItem, setCurrIndexOfItem] = useState(null);

  const [itemTitle, setItemTitle] = useState("");
  const itemInputRef = useRef();
  const addBtnRef = useRef();

  console.log(itemTitle);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      e.stopPropagation();
      if (
        !itemInputRef?.current?.contains(e.target) &&
        !addBtnRef?.current?.contains(e.target)
      ) {
        setCurrIndexOfAddItemBtn(null);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div className="my-2">
      {items?.map((eachItem, indexOfItem) => {
        return (
          <Item
            indexOfItem={indexOfItem}
            indexOfChecklist={indexOfChecklist}
            currIndexOfItem={currIndexOfItem}
            setCurrIndexOfItem={setCurrIndexOfItem}
            item={eachItem}
            checklist={checklist}
            itemTitle={itemTitle}
            setItemTitle={setItemTitle}
            currIndexOfChecklist={currIndexOfChecklist}
            setCurrIndexOfChecklist={setCurrIndexOfChecklist}
            currIndexOfAddItemBtn={currIndexOfAddItemBtn}
            setCurrIndexOfAddItemBtn={setCurrIndexOfAddItemBtn}
          />
        );
      })}
      {currIndexOfAddItemBtn !== indexOfChecklist && (
        <button
          ref={addBtnRef}
          className="font-sans text-sm font-semibold text-[#172b4d] bg-gray-300 rounded p-2 ml-10 my-2"
          onClick={(e) => {
            e.stopPropagation();
            setCurrIndexOfAddItemBtn(indexOfChecklist);
            setCurrIndexOfItem(null);
            setCurrIndexOfChecklist(indexOfChecklist);
          }}
        >
          Add an Item
        </button>
      )}
      {currIndexOfAddItemBtn === indexOfChecklist && (
        <div
          ref={itemInputRef}
          className="py-2 ml-[28px] my-2 bg-gray-200 rounded-xl"
        >
          <ItemInputComp
            // indexOfItem={indexOfItem}
            checklist={checklist}
            setCurrIndexOfItem={setCurrIndexOfItem}
            setCurrIndexOfChecklist={setCurrIndexOfChecklist}
            itemTitle={itemTitle}
            setItemTitle={setItemTitle}
            paramObj={paramObj}
            workspaceData={workspaceData}
            actionType={"add item"}
            currIndexOfAddItemBtn={currIndexOfAddItemBtn}
            setCurrIndexOfAddItemBtn={setCurrIndexOfAddItemBtn}
          />
        </div>
      )}
    </div>
  );
};

export default Items;
