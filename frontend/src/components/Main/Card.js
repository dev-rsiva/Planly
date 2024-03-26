import { useState, useEffect, useRef, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPencil, faFileLines } from "@fortawesome/free-solid-svg-icons";
import { cardData } from "../../utills/cardData.js";

const Card = ({ workspaceData, setWorkspaceData, list, card, cardId, i }) => {
  console.log("card started");
  const [editIconIsVisible, setEditIconIsVisible] = useState(false);
  const [editCardIsVisible, setEditCardIsVisible] = useState(false);
  const [zIndex, setZindex] = useState(false);

  // const [showOpenCard, setShowOpenCard] = useState(false);

  const openCardContext = createContext();

  const navigate = useNavigate();

  console.log(zIndex);

  const inputField = useRef(null);

  console.log(inputField);

  const foucsInput = () => {
    console.log("focus input started");
    console.log(inputField?.current);
    if (inputField.current) {
      inputField?.current?.focus();
      inputField?.current?.select();
    }
  };

  useEffect(() => {
    console.log("useEffect in card started");
    if (editCardIsVisible) {
      foucsInput();
    }
  }, [editCardIsVisible]);

  return (
    <div key={card.id}>
      <div>
        <div
          className="flex justify-between items-center min-h-[40px] px-2 py-1 rounded-xl mr-2 mb-2 bg-white border-2 border-slate-300 shadow-lg hover:border-2 border-transparent hover:border-blue-700 hover:cursor-pointer"
          onMouseEnter={() => {
            console.log("entered");
            setEditIconIsVisible(true);
          }}
          onMouseLeave={() => setEditIconIsVisible(false)}
          onClick={() => {
            console.log("card4");
            console.log("Click event triggers from card component");
            // setShowOpenCard(!showOpenCard);
            navigate(`/c/${card.id}/${card.title}`);
          }}
        >
          <h1 className="font-sans text-sm font-base text-[#172b4d]">
            {card.title}
          </h1>
          {editIconIsVisible && (
            <div
              onClick={(event) => {
                console.log("card3");
                console.log("Click event triggers from pencil");
                event.stopPropagation();
                setEditCardIsVisible(true);
                setZindex(true);
              }}
              className="hover:bg-gray-200 rounded-full flex justify-center items-center p-2 hover:p-2"
            >
              <FontAwesomeIcon
                icon={faPencil}
                // className="mb-[2px] pl-1"
                size="xs"
              />
            </div>
          )}
        </div>

        {editCardIsVisible && (
          <>
            <div
              className={`fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 ${
                zIndex ? "z-40" : ""
              }`}
              onClick={() => {
                console.log("card2");
                setEditCardIsVisible(false);
              }}
            />
            <div
              className={`relative top-[-46px] flex justify-between items-start py-1 rounded-md bg-transparent ${
                zIndex ? "z-50" : ""
              }`}
            >
              <div>
                <div className="absolute w-[260px] bg-white rounded p-2 mb-2">
                  <input
                    ref={inputField}
                    value={card.title}
                    onChange={() => {}}
                    className="border-none bg-transparent whitespace-normal font-sans text-sm font-semibold text-[#172b4d]"
                  />
                  <FontAwesomeIcon
                    icon={faFileLines}
                    className="mb-[2px] pl-1"
                  />
                </div>
                <div className="absolute top-[50px]">
                  <button className="whitespace-nowrap px-2 py-1 bg-blue-600 rounded mb-1 text-white">
                    Save
                  </button>
                </div>
              </div>

              <div className="absolute left-[100%] flex flex-col">
                <button
                  className="whitespace-nowrap px-2 py-1 bg-gray-200 rounded mb-1"
                  onClick={() => {
                    console.log("card1");
                    navigate(`/c/${card.id}/${card.title}`);
                  }}
                >
                  Open card
                </button>
                <button className="whitespace-nowrap px-2 py-1 bg-gray-200 rounded mb-1">
                  Edit labels
                </button>
                <button className="whitespace-nowrap px-2 py-1 bg-gray-200 rounded mb-1">
                  Change members
                </button>
                <button className="whitespace-nowrap px-2 py-1 bg-gray-200 rounded mb-1">
                  Change cover
                </button>
                <button className="whitespace-nowrap px-2 py-1 bg-gray-200 rounded mb-1">
                  Move
                </button>
                <button className="whitespace-nowrap px-2 py-1 bg-gray-200 rounded mb-1">
                  Copy
                </button>
                <button className="whitespace-nowrap px-2 py-1 bg-gray-200 rounded mb-1">
                  Edited dates
                </button>
                <button className="whitespace-nowrap px-2 py-1 bg-gray-200 rounded mb-1">
                  Archive
                </button>
              </div>
            </div>
          </>
        )}

        {/* {showOpenCard && (
          <OpenCard
            list={list}
            card={card}
            showOpenCard={showOpenCard}
            setShowOpenCard={setShowOpenCard}
          />
        )} */}
      </div>
      {console.log(cardData)}
      {console.log("card ended")}
    </div>
  );
};

export default Card;
