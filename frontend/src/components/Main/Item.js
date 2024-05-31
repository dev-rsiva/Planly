import React, { useState, useContext, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { updateFirebaseDoc } from "../../utills/updateFirebase";
import { useParams } from "react-router-dom";
import dataContext from "../../utills/dataContext";
import { createUpdatedWorkspaceDataType1 } from "../../utills/createUpdatedWorkspaceDataType1";
import ItemInputComp from "./ItemInputComp";
import ItemActions from "./ItemActions";
import DeleteChecklistCard from "./DeleteChecklistCard";

const Item = ({
  item,
  checklist,
  itemTitle,
  setItemTitle,
  indexOfItem,
  indexOfChecklist,
  currIndexOfItem,
  setCurrIndexOfItem,
  currIndexOfChecklist,
  setCurrIndexOfChecklist,
  currIndexOfAddItemBtn,
  setCurrIndexOfAddItemBtn,
}) => {
  const [itemHovered, setItemHovered] = useState(false);
  const [showItemAction, setShowItemAction] = useState(false);


  const paramObj = useParams();
  const { workspaceData } = useContext(dataContext);
  const itemInputRef = { useRef };

  const updateItemStatus = () => {
    const generatedObj = (card) => {
      return {
        ...card,
        checklists: card.checklists.map((eachChecklist) => {
          if (eachChecklist?.id !== checklist?.id) {
            return eachChecklist;
          }
          return {
            ...eachChecklist,
            items: eachChecklist?.items.map((eachItem) => {
              if (eachItem.id !== item.id) {
                return eachItem;
              }
              return {
                ...eachItem,
                status:
                  eachItem.status === "completed"
                    ? "not completed"
                    : "completed",
              };
            }),
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
  };

  console.log(currIndexOfItem);

  useEffect(() => {
    if (currIndexOfItem === indexOfItem) {
      console.log("updating title: ", item?.title);
      setItemTitle(item?.title);
    }

    if (currIndexOfItem === null) {
      console.log("emptying title");
      setItemTitle("");
    }
  }, [currIndexOfItem]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      e.stopPropagation();
      if (!itemInputRef?.current?.contains(e.target)) {
        setCurrIndexOfItem(null);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={() => setItemHovered(true)}
      onMouseLeave={() => setItemHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        setCurrIndexOfItem(indexOfItem);
        setCurrIndexOfChecklist(indexOfChecklist);
        setCurrIndexOfAddItemBtn(null);
      }}
    >
      <div
        className={`flex ${
          currIndexOfItem === indexOfItem &&
          currIndexOfChecklist === indexOfChecklist
            ? "items-baseline"
            : "items-center"
        }  gap-2`}
      >
        <input
          type="checkbox"
          checked={item.status === "completed"}
          className="w-[20px] h-[16px]"
          onChange={() => {
            updateItemStatus();
          }}
          onClick={(e) => e.stopPropagation()}
        />

        {currIndexOfItem !== indexOfItem && (
          <div className="w-full flex justify-between items-center font-sans text-sm text-[#172b4d] py-2 px-3 hover:bg-gray-200 rounded-xl outline-none cursor-pointer">
            <div className={`${item.status === "completed" && "line-through"}`}>
              {item?.title}
            </div>
            <div
              className={`flex items-center gap-2 ${
                itemHovered ? "block" : "hidden"
              }`}
            >
              <FontAwesomeIcon
                icon={faUserPlus}
                className="mr-2 text-[#3c5a8f]"
              />
              <FontAwesomeIcon
                icon={faEllipsis}
                className="mr-2 p-[3px] text-[#3c5a8f] rounded-full hover:bg-gray-300"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowItemAction(true);
                }}
              />
            </div>
          </div>
        )}

        {currIndexOfItem === indexOfItem &&
          currIndexOfChecklist === indexOfChecklist && (
            <div
              ref={itemInputRef}
              className="py-2 my-2 bg-gray-200 rounded-xl"
            >
              <ItemInputComp
                item={item}
                checklist={checklist}
                itemTitle={itemTitle}
                setItemTitle={setItemTitle}
                setCurrIndexOfItem={setCurrIndexOfItem}
                setCurrIndexOfChecklist={setCurrIndexOfChecklist}
                indexOfChecklist={indexOfChecklist}
                paramObj={paramObj}
                workspaceData={workspaceData}
                actionType={"update item"}
                currIndexOfAddItemBtn={currIndexOfAddItemBtn}
                setCurrIndexOfAddItemBtn={setCurrIndexOfAddItemBtn}
              />
            </div>
          )}

        {showItemAction && (
          <ItemActions
            setShowItemAction={setShowItemAction}
            item={item}
            paramObj={paramObj}
            workspaceData={workspaceData}
            checklist={checklist}
          />
        )}


      </div>
    </div>
  );
};

export default Item;
