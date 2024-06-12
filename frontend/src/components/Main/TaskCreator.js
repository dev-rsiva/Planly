import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import TaskRecommendations from "./TaskRecommendations";
import Loading from "./Loading";

const TaskCreator = ({ setShowTaskCreator, workspaceInfo, boardInfo }) => {
  const [boardDesc, setBoardDesc] = useState(boardInfo.description);
  const [showEditBoardDesc, setShowEditBoardDesc] = useState(false);
  const [startGeneratingTasks, setStartGeneratingTasks] = useState(false);
  const [showGptTasks, setShowGptTasks] = useState(false);
  const [loading, setLoading] = useState(false);
  const taskCreatorRef = useRef();
  const boardDescriptionRef = useRef();

  useEffect(() => {
    console.log("useEffect");
    const handleOutsideClick = (e) => {
      console.log("handleOutside");

      e.stopPropagation();
      if (!taskCreatorRef.current.contains(e.target)) {
        console.log("inside");
        setShowTaskCreator(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (showEditBoardDesc) {
      const input = boardDescriptionRef.current;
      if (input) {
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      }
    }
  }, [showEditBoardDesc]);

  return (
    <div>
      <div className="fixed left-0 top-0 right-0 bottom-0 bg-black bg-opacity-60 z-[999] flex justify-center items-center"></div>
      <div
        ref={taskCreatorRef}
        className={`absolute flex flex-col h-auto overflow-auto top-1/2 left-1/2 translate-x-[-65%] bg-purple-700 z-[1005] rounded-lg ${
          !showGptTasks
            ? "py-6 px-12 translate-y-[-75%] w-[770px]"
            : "px-2 translate-y-[-55%] w-[970px]"
        }`}
      >
        <div className="flex justify-between mb-4">
          {!showGptTasks && (
            <div className="flex flex-col w-full">
              <div>
                <div className="flex pb-2 w-full justify-center">
                  <p className="font-sans text-lg font-semibold text-white text-center w-full pb-4">
                    Write an objective of this board to acheive. <br />
                    i.e., write a detailed description for this board to which
                    the tasks are generated.
                  </p>
                </div>

                <p className="font-sans text-sm font-semibold text-slate-100 pb-3">
                  Your current board description:
                </p>
                {!showEditBoardDesc && (
                  <div
                    className="bg-slate-100 pl-2 pt-2 pb-4 mb-4 rounded w-full font-semibold text-[14px] hover:bg-slate-200 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowEditBoardDesc(true);
                    }}
                  >
                    <p className="p-1">{boardDesc}</p>
                  </div>
                )}
              </div>

              {showEditBoardDesc && (
                <div>
                  <textarea
                    ref={boardDescriptionRef}
                    type="text"
                    value={boardDesc}
                    className="bg-slate-100 pl-2 pr-2 pt-2 pb-4 rounded w-full h-auto font-sans text-sm font-semibold text-[#172b4d] mb-4 border-2 border-solid outline-none"
                    row="3"
                    placeholder="Add a more detailed description..."
                    onChange={(e) => {
                      setBoardDesc(e.target.value);
                    }}
                    onBlur={(e) => {
                      e.stopPropagation();
                      setShowEditBoardDesc(false);
                    }}
                  />
                </div>
              )}

              <div className="flex text-sm mt-2 justify-center items-center">
                <button
                  className="bg-white border border-blue-900 hover:bg-slate-200 rounded-md py-2 px-3 text-blue-900 font-bold p-3 mr-4 cursor-pointer shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLoading(true);
                    setShowGptTasks(true);
                    setStartGeneratingTasks(true);
                  }}
                >
                  Generate Task Recommendations
                </button>
              </div>
            </div>
          )}
        </div>

        {startGeneratingTasks && (
          <TaskRecommendations
            boardDesc={boardDesc}
            startGeneratingTasks={startGeneratingTasks}
            setStartGeneratingTasks={setStartGeneratingTasks}
            workspaceInfo={workspaceInfo}
            boardInfo={boardInfo}
            setShowGptTasks={setShowGptTasks}
            setShowTaskCreator={setShowTaskCreator}
            loading={loading}
            setLoading={setLoading}
          />
        )}
      </div>
    </div>
  );
};

export default TaskCreator;
