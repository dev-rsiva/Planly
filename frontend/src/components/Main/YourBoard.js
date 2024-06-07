import { useState, useContext } from "react";
import dataContext from "../../utills/dataContext";
import { updateFirebaseDoc } from "../../utills/updateFirebase";

const YourBoard = ({ board }) => {
  const [hoverStar, setHoverStar] = useState(false);
  const [hoverBoard, setHoverBoard] = useState(false);

  const { workspaceData, setWorkspaceData } = useContext(dataContext);

  return (
    <div
      className="w-[195px] h-[95px] overflow-hidden rounded-[3px] mr-4 mb-8 relative cursor-pointer"
      onMouseEnter={() => setHoverBoard(true)}
      onMouseLeave={() => setHoverBoard(false)}
    >
      <div className="w-full h-full absolute bg-black opacity-50 rounded" />
      <img
        src={`${board?.backgroundImg}`}
        className="w-full h-full object-cover"
      />
      <h1 className="absolute left-0 top-0 p-2 font-sans font-bold text-base text-white">
        {board?.title}
      </h1>

      <div
        onClick={(e) => {
          e.stopPropagation();
          // setWorkspaceData((prev) => {
          const updatedWorkspaceData = {
            ...prev,
            workspaces: prev.workspaces?.map((eachWorkspace) => {
              const boardIndex = eachWorkspace?.boards?.findIndex(
                (eachBoard) => eachBoard?.id === board?.id
              );

              if (boardIndex !== -1) {
                let updatedBoards = [...eachWorkspace?.boards];

                updatedBoards[boardIndex] = {
                  ...updatedBoards[boardIndex],
                  starred: !updatedBoards[boardIndex].starred,
                };

                eachWorkspace = {
                  ...eachWorkspace,
                  boards: updatedBoards,
                };

                return eachWorkspace;
              }

              return eachWorkspace;
            }),
          };
          console.log("firebase");

          updateFirebaseDoc(updatedWorkspaceData);
          // });
        }}
        className={`absolute right-0 bottom-0 m-2 p-1 transform ${
          board?.starred || hoverBoard ? "translate-x-0" : "translate-x-[150%]"
        } transition-transform duration-300 ease-in-out`}
      >
        <svg
          onMouseEnter={() => setHoverStar(true)}
          onMouseLeave={() => setHoverStar(false)}
          xmlns="http://www.w3.org/2000/svg"
          fill={
            (!hoverStar && !board?.starred) || (hoverStar && board?.starred)
              ? "none"
              : "#E2B203"
          } // "none" for transparent fill
          viewBox="0 0 24 24"
          stroke={
            (board?.starred && hoverStar) || (!board?.starred && !hoverStar)
              ? "white"
              : "#E2B203"
          } // Set the stroke color to white
          strokeWidth="2"
          className="w-5 h-5 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      </div>
    </div>
  );
};

export default YourBoard;
