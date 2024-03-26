import { useState, useContext } from "react";
import dataContext from "../../utills/dataContext";
import { useNavigate } from "react-router-dom";

const CommonBoard = ({ board, typeOfBoard }) => {
  const [hoverStar, setHoverStar] = useState(false);
  const [hoverBoard, setHoverBoard] = useState(false);
  const { workspaceData, setWorkspaceData } = useContext(dataContext);

  const navigate = useNavigate();

  const commonClassName =
    typeOfBoard === "recentlyViewed"
      ? `absolute right-0 bottom-0 m-2 p-1 transform ${
          board.starred || hoverBoard ? "translate-x-0" : "translate-x-[150%]"
        } transition-transform duration-300 ease-in-out`
      : typeOfBoard === "yourBoard"
      ? `absolute right-0 bottom-0 m-2 p-1 transform ${
          board.starred || hoverBoard ? "translate-x-0" : "translate-x-[150%]"
        } transition-transform duration-300 ease-in-out`
      : typeOfBoard === "starredBoard"
      ? `absolute right-0 bottom-0 m-2 p-1`
      : "";

  const fillClassName =
    typeOfBoard === "recentlyViewed"
      ? (board.starred && !hoverStar) || (!board.starred && hoverStar)
        ? "#E2B203"
        : "none"
      : typeOfBoard === "yourBoard"
      ? (!hoverStar && !board.starred) || (hoverStar && board.starred)
        ? "none"
        : "#E2B203"
      : typeOfBoard === "starredBoard"
      ? hoverStar
        ? "none"
        : "#E2B203"
      : "";

  const strokeClassName =
    typeOfBoard === "recentlyViewed"
      ? board.starred || hoverStar
        ? "#E2B203"
        : "white"
      : typeOfBoard === "yourBoard"
      ? (board.starred && hoverStar) || (!board.starred && !hoverStar)
        ? "white"
        : "#E2B203"
      : typeOfBoard === "starredBoard"
      ? hoverStar
        ? "white"
        : "#E2B203"
      : "";

  console.log(
    "typeOfBoard:",
    typeOfBoard,
    commonClassName,
    fillClassName,
    strokeClassName
  );

  const workspaceName = workspaceData?.workspaces?.find((workspace) =>
    workspace?.boards?.find((eachBoard) => eachBoard?.title === board?.title)
  )?.name;

  console.log(workspaceName);

  return (
    <div
      className="relative w-[195px] h-[95px] overflow-hidden rounded-[3px] mr-4 mb-8 cursor-pointer"
      onMouseEnter={() => setHoverBoard(true)}
      onMouseLeave={() => setHoverBoard(false)}
      onClick={() =>
        navigate(`/b/${board.id}/${board.title.replace(/ /g, "-")}`)
      }
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
          setWorkspaceData((prev) => {
            console.log(prev.workspaces);
            let updatedWorkspaces = [...prev.workspaces];

            // let ty = updatedWorkspaces.map((eachWorkspace) => {
            //   console.log(eachWorkspace);
            //   const boardIndex = eachWorkspace?.boards?.findIndex(
            //     (eachBoard) => {
            //       console.log(eachBoard.id);
            //       console.log(board?.id);

            //       return eachBoard?.id === board?.id;
            //     }
            //   );

            //   console.log(boardIndex);
            // });

            console.log("Updated Workspaces before map:", updatedWorkspaces);

            updatedWorkspaces = updatedWorkspaces?.map((eachWorkspace) => {
              console.log(eachWorkspace);
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

                console.log(updatedBoards);
                console.log(eachWorkspace);

                return eachWorkspace;
              }

              return eachWorkspace;
            });

            console.log("Updated Workspaces after map:", updatedWorkspaces);
            return { ...prev, workspaces: updatedWorkspaces };
          });
        }}
        className={commonClassName}
      >
        <svg
          onMouseEnter={() => setHoverStar(true)}
          onMouseLeave={() => setHoverStar(false)}
          xmlns="http://www.w3.org/2000/svg"
          fill={fillClassName} // "none" for transparent fill
          viewBox="0 0 24 24"
          stroke={strokeClassName} // Set the stroke color to white
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
      {typeOfBoard === "starredBoard" && (
        <p className="w-[160px] absolute left-0 bottom-0 pb-3 pl-2 text-white text-sm font-normal text-wrap">
          {workspaceName}
        </p>
      )}
    </div>
  );
};

export default CommonBoard;
