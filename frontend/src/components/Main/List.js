import { useState, useRef, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Cards from "./Cards";
import DisplayAddCard from "./DisplayAddCard.js";
import ListActionCard from "./ListActionCard.js";
import CopyListComp from "./CopyListComp";
import MoveListComp from "./MoveListComp";

const List = ({
  workspaceData,
  setWorkspaceData,
  list,
  listId,
  currWorkspace,
  setCurrWorkspace,
  i,
  boardInfo,
}) => {
  const [showCopyListComp, setShowCopyListComp] = useState(false);
  const [showMoveListComp, setShowMoveListComp] = useState(false);
  const [showListActionCard, setShowListActionCard] = useState(false);

  const [listActionCardRightPosition, setListActionCardRightPosition] =
    useState("");

  const [showAddCardInput, setShowCardInput] = useState({
    top: false,
    bottom: false,
  });
  const listCard = useRef();
  const listActionCardBtn = useRef();
  const copyListBtnRef = useRef();
  const moveListBtnRef = useRef();

  useEffect(() => {
    if (showListActionCard && listCard.current) {
      const { right } = listCard.current.getBoundingClientRect();
      const screenWidth = window.innerWidth;
      const overflow = screenWidth - right < 310;
      const overflowPosition = screenWidth - right + 310;

      setListActionCardRightPosition(
        overflow
          ? `right-[${Math.round(overflowPosition)}px]`
          : "right-[-260px]"
      );
    }
  }, [showListActionCard]);

  console.log(boardInfo);
  console.log(list);
  return (
    <div
      className={`relative w-[275px] h-auto bg-[#f1f2f4] rounded-lg px-4 py-4 flex flex-col `}
      ref={listCard}
    >
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-3">
          <h1 className="mr-2 font-sans text-sm font-semibold text-[#172b4d]">
            {list?.title}
          </h1>
          <div className="flex items-center">
            {list?.watching && (
              <div className="flex justify-center items-center">
                <FontAwesomeIcon
                  icon={faEye}
                  className="mr-3 text-xs text-[#172b4d]"
                />
              </div>
            )}
            <div
              ref={listActionCardBtn}
              onClick={() => {
                setShowListActionCard(true);
              }}
              className="cursor-pointer hover:bg-gray-200 w-6 h-6 rounded-full flex justify-center items-center"
            >
              <FontAwesomeIcon
                icon={faEllipsis}
                className="text-[#172b4d] text-sm"
              />
            </div>
          </div>
        </div>
        {showAddCardInput.top && (
          <div>
            <DisplayAddCard
              showAddCardInput={showAddCardInput}
              setShowCardInput={setShowCardInput}
              currListTitle={list?.title}
              workspaceData={workspaceData}
              setWorkspaceData={setWorkspaceData}
              boardInfo={boardInfo}
              list={list}
            />
          </div>
        )}
      </div>
      <div>
        <Cards
          workspaceData={workspaceData}
          setWorkspaceData={setWorkspaceData}
          boardInfo={boardInfo}
          cards={list?.cards}
          list={list}
        />
      </div>

      {!showAddCardInput?.bottom && (
        <div
          className="flex justify-between items-center"
          onClick={() => {
            setShowCardInput((prev) => {
              return (prev = { ...prev, bottom: true });
            });
          }}
        >
          <div className="w-full flex justify-start items-center p-2 rounded-md mr-4 cursor-pointer hover:bg-slate-300">
            <FontAwesomeIcon icon={faPlus} className="pr-2" size={"sm"} />
            <p className="font-sans text-sm font-semibold text-[#172b4d]">
              Add a card
            </p>
          </div>
          <FontAwesomeIcon
            icon={faFile}
            className="font-sans text-sm font-semibold text-[#172b4d]"
          />
        </div>
      )}

      {showAddCardInput?.bottom && (
        <div>
          <DisplayAddCard
            showAddCardInput={showAddCardInput}
            setShowCardInput={setShowCardInput}
            currListTitle={list?.title}
            workspaceData={workspaceData}
            setWorkspaceData={setWorkspaceData}
            boardInfo={boardInfo}
            list={list}
          />
        </div>
      )}

      {showListActionCard && (
        <ListActionCard
          listActionCardRightPosition={listActionCardRightPosition}
          setShowListActionCard={setShowListActionCard}
          setShowCardInput={setShowCardInput}
          listActionCardBtn={listActionCardBtn}
          setShowCopyListComp={setShowCopyListComp}
          setShowMoveListComp={setShowMoveListComp}
          copyListBtnRef={copyListBtnRef}
          moveListBtnRef={moveListBtnRef}
          workspaceData={workspaceData}
          boardInfo={boardInfo}
          listInfo={list}
        />
      )}

      {showCopyListComp && (
        <CopyListComp
          setShowCopyListComp={setShowCopyListComp}
          copyListBtnRef={copyListBtnRef}
          workspaceData={workspaceData}
          boardInfo={boardInfo}
          listInfo={list}
        />
      )}

      {showMoveListComp && (
        <MoveListComp
          setShowMoveListComp={setShowMoveListComp}
          moveListBtnRef={moveListBtnRef}
          workspaceData={workspaceData}
          boardInfo={boardInfo}
          listInfo={list}
        />
      )}
    </div>
  );
};

export default List;
