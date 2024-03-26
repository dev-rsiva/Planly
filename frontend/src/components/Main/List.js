import { useState, useRef, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Cards from "./Cards";
import DisplayAddCard from "./DisplayAddCard.js";
import ListActionCard from "./ListActionCard.js";

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
  console.log("List started");
  const [showListActionCard, setShowListActionCard] = useState(false);

  const [listActionCardRightPosition, setListActionCardRightPosition] =
    useState("");

  const [showAddCardInput, setShowCardInput] = useState({
    top: false,
    bottom: false,
  });
  const listCard = useRef();
  const listActionCardBtn = useRef();

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

  console.log(showListActionCard);

  console.log(showAddCardInput);

  return (
    <div
      className={`relative w-[275px] h-auto bg-[#f1f2f4] rounded-lg px-4 py-4 flex flex-col `}
      ref={listCard}
    >
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-3">
          <h1 className="mr-2 font-sans text-sm font-semibold text-[#172b4d]">
            {list.title}
          </h1>
          {console.log(list.title)}
          <div
            ref={listActionCardBtn}
            onClick={() => {
              console.log("list2");
              setShowListActionCard(true);
            }}
            className="cursor-pointer"
          >
            <FontAwesomeIcon
              icon={faEllipsis}
              className="text-[#172b4d] text-sm"
            />
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
          cards={list.cards}
          list={list}
        />
      </div>

      {!showAddCardInput.bottom && (
        <div
          className="flex justify-between items-center"
          onClick={() => {
            console.log("list1");
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

      {showAddCardInput.bottom && (
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

      {console.log(showListActionCard)}
      {showListActionCard && (
        <ListActionCard
          listActionCardRightPosition={listActionCardRightPosition}
          setShowListActionCard={setShowListActionCard}
          setShowCardInput={setShowCardInput}
          listActionCardBtn={listActionCardBtn}
        />
      )}
      {console.log("List ended")}
    </div>
  );
};

export default List;
