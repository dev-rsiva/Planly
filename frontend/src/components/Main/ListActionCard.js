import { useEffect, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { updateFirebaseDoc } from "../../utills/updateFirebase";

const ListActionCard = ({
  listActionCardRightPosition,
  setShowListActionCard,
  setShowCardInput,
  listActionCardBtn,
  setShowCopyListComp,
  setShowMoveListComp,
  copyListBtnRef,
  moveListBtnRef,
  workspaceData,
  boardInfo,
  listInfo,
}) => {
  const listActionCard = useRef();

  const toggleListWatching = (e) => {
    e.stopPropagation();

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
        return eachList?.id === listInfo.id;
      });
    });
    console.log(currBoard);

    let currList = currBoard?.lists?.find((eachList) => {
      return eachList?.id === listInfo.id;
    });
    console.log(currList);

    console.log(updatedWorkspaceData);
    let toggledData = updatedWorkspaceData?.workspaces?.map((workspace) => {
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
            lists: board?.lists?.map((eachList) => {
              if (eachList?.id !== currList?.id) {
                return eachList;
              }
              return { ...eachList, watching: !eachList?.watching };
            }),
          };
        }),
      };
    });

    console.log(toggledData);

    updatedWorkspaceData.workspaces = toggledData;

    updateFirebaseDoc(updatedWorkspaceData);
  };

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
      className={`absolute w-[300px] overflow-y-auto ${listActionCardRightPosition} top-[-10px] rounded-md z-[1900] bg-white p-4 text-sm shadow-xl border border-slate-200`}
      ref={listActionCard}
    >
      <div className="flex mb-2">
        <h1 className="flex-1 text-center font-sans text-sm font-semibold text-[#172b4d]">
          List actions
        </h1>
        <div
          className="flex-5 font-sans text-sm font-semibold text-[#172b4d]"
          onClick={() => setShowListActionCard(false)}
        >
          <FontAwesomeIcon
            icon={faX}
            size="sm"
            className=" rounded hover:bg-slate-300 p-1 hover:p-1 cursor-pointer"
          />
        </div>
      </div>
      <hr className="my-2"></hr>

      <div>
        <ul>
          <li
            className="py-2 font-sans text-sm font-semibold text-[#172b4d] cursor-pointer hover:bg-gray-200 p-2 rounded"
            onClick={() => {
              setShowCardInput((prev) => {
                return (prev = { ...prev, top: true });
              });

              setShowListActionCard(false);
            }}
          >
            Add card
          </li>
          <li
            ref={copyListBtnRef}
            className="py-2 font-sans text-sm font-semibold text-[#172b4d] cursor-pointer hover:bg-gray-200 p-2 rounded"
            onClick={(e) => {
              e.stopPropagation();
              setShowCopyListComp(true);
              setShowListActionCard(false);
            }}
          >
            Copy list
          </li>
          <li
            ref={moveListBtnRef}
            className="py-2 font-sans text-sm font-semibold text-[#172b4d] cursor-pointer hover:bg-gray-200 p-2 rounded"
            onClick={(e) => {
              e.stopPropagation();
              setShowMoveListComp(true);
              setShowListActionCard(false);
            }}
          >
            Move list
          </li>
          <li
            className="flex items-center justify-between py-2 font-sans text-sm font-semibold text-[#172b4d] cursor-pointer hover:bg-gray-200 p-2 rounded"
            onClick={(e) => toggleListWatching(e)}
          >
            <p>Watch</p>
            {listInfo?.watching && (
              <FontAwesomeIcon icon={faCheck} style={{ color: "#172b4d" }} />
            )}
          </li>
        </ul>
      </div>
      {/* <hr className="my-2"></hr>
      <div>
        <h1 className="py-1">Sort by...</h1>
      </div>
      <hr className="my-2"></hr>
      <div>
        <h1 className="font-semibold py-1">Automation</h1>
        <p className="py-1">When a card is added to the  list?...</p>
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
      </div> */}
    </div>
  );
};

export default ListActionCard;
