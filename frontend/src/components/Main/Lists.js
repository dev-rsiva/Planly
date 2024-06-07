import { useParams } from "react-router-dom";
import List from "./List";
import CreateList from "./CreateList";

const Lists = ({ workspaceData, setWorkspaceData, boardInfo }) => {
  const paramObj = useParams();
  console.log(boardInfo);
  return (
    <div className="flex px-[15px] pt-[10px] h-[80vh] w-[80vw] overflow-x-auto">
      <div className="flex" style={{ width: "fit-content" }}>
        {boardInfo?.lists?.map((list, i) => {
          return (
            <div className={`mr-2 mb-2`} key={list?.id}>
              <List
                workspaceData={workspaceData}
                setWorkspaceData={setWorkspaceData}
                list={list}
                listId={list?.id}
                i={i}
                boardInfo={boardInfo}
              />
            </div>
          );
        })}
      </div>
      <div className="w-[275px] mr-2 mb-2">
        <CreateList boardInfo={boardInfo} />
      </div>
    </div>
  );
};

export default Lists;
