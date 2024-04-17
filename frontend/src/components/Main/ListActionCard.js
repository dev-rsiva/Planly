import { useEffect, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const ListActionCard = ({
  listActionCardRightPosition,
  setShowListActionCard,
  setShowCardInput,
  listActionCardBtn,
}) => {
  const listActionCard = useRef();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        listActionCard?.current &&
        !listActionCard?.current?.contains(e.target) &&
        !listActionCardBtn?.current?.contains(e.target)
      ) {
        setShowListActionCard(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div
      className={`absolute w-[300px] h-[485px] overflow-y-auto ${listActionCardRightPosition} top-[-10px] rounded-md z-[3100] bg-white p-4 text-sm shadow-xl border border-slate-200`}
      ref={listActionCard}
    >
      <div className="flex">
        <h1 className="flex-1 text-center font-semibold">List actions</h1>
        <div className="flex-5" onClick={() => setShowListActionCard(false)}>
          <FontAwesomeIcon
            icon={faX}
            size="sm"
            className=" rounded hover:bg-slate-300 p-1 hover:p-1 cursor-pointer"
          />
        </div>
      </div>

      <div>
        <h1
          className="py-1 cursor-pointer"
          onClick={() => {
            setShowCardInput((prev) => {
              return (prev = { ...prev, top: true });
            });

            setShowListActionCard(false);
          }}
        >
          Add card
        </h1>
        <h1 className="py-1">Copy list</h1>
        <h1 className="py-1">Move list</h1>
        <h1 className="py-1">Watch</h1>
      </div>
      <hr className="my-2"></hr>
      <div>
        <h1 className="py-1">Sort by...</h1>
      </div>
      <hr className="my-2"></hr>
      <div>
        <h1 className="font-semibold py-1">Automation</h1>
        <p className="py-1">When a card is added to the list...</p>
        <p className="py-1">Every day, sort list by...</p>
        <p className="py-1">Every monday, sort list by...</p>
        <span className="py-1">
          Create a rule <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
        </span>
      </div>
      <hr className="my-2"></hr>

      <div>
        <h1 className="py-1">Move all cards in this list</h1>
        <h1 className="py-1">Archive all cards in this list</h1>
      </div>
      <hr className="my-2"></hr>
      <div>
        <h1 className="py-1">Archive this list</h1>
      </div>
    </div>
  );
};

export default ListActionCard;
