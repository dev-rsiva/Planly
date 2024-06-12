import { useState } from "react";
import { useParams } from "react-router-dom";
import List from "./List";
import CreateList from "./CreateList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWandSparkles,
  faWandMagicSparkles,
  faFlask,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import TaskCreator from "./TaskCreator";

const Lists = ({
  workspaceData,
  setWorkspaceData,
  workspaceInfo,
  boardInfo,
}) => {
  const [showTaskCreator, setShowTaskCreator] = useState(false);
  const paramObj = useParams();
  console.log(boardInfo);
  return (
    <div className="flex px-[15px] pt-[10px] h-[80vh] w-[80vw] overflow-x-auto">
      <div className="flex" style={{ width: "fit-content" }}>
        <div
          className="w-[325px] h-[275px] rounded-2xl bg-gradient-to-r from-purple-700 to-blue-900 text-left cursor-pointer mr-2"
          onClick={(e) => {
            e.stopPropagation();
            setShowTaskCreator(true);
          }}
        >
          <div className="relative flex flex-col justify-center items-center text-white w-full h-full p-6 rounded-2xl">
            <div className="pb-2">
              {/* <FontAwesomeIcon icon={faFlask} className="w-16 h-16 text-4xl" /> */}
              <FontAwesomeIcon
                icon={faWandMagicSparkles}
                className="w-12 h-12"
              />
            </div>
            <div className="text-center">
              <h3 className="text-[20px] font-bold pb-2">
                Smart Task Recommendations
              </h3>

              <p className="text-base font-base mt-2">
                AI suggests tasks based on the current board's context and task
                history.
              </p>
            </div>
          </div>
        </div>

        {boardInfo?.lists?.map((list, i) => {
          return (
            <div className={`mr-2 mb-2`} key={list?.id}>
              <List
                workspaceData={workspaceData}
                setWorkspaceData={setWorkspaceData}
                listId={list?.id}
                i={i}
                workspaceInfo={workspaceInfo}
                boardInfo={boardInfo}
                list={list}
                paramObj={paramObj}
              />
            </div>
          );
        })}
      </div>
      <div className="w-[275px] mr-2 mb-2">
        <CreateList boardInfo={boardInfo} />
      </div>
      {showTaskCreator && (
        <TaskCreator
          setShowTaskCreator={setShowTaskCreator}
          workspaceInfo={workspaceInfo}
          boardInfo={boardInfo}
        />
      )}
    </div>
  );
};

export default Lists;
