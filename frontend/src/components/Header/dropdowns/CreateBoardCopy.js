import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { visibilityDetails } from "../../../utills/visibilityData.js";
import generateUniqueNumber from "../../../utills/generateUniqueNum.js";

const CreateBoardCopy = ({
  usingTemplate,
  createDropdownStatus,
  setCreateDropdownStatus,
  createDropdownDetails,
  setCreateDropdownDetails,
  workspaceData,
  setWorkspaceData,
}) => {

  const [currImage, setCurrImage] = useState(
    "https://images.unsplash.com/photo-1703002917693-e51692232c81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNzA0MTY0ODgyfA&ixlib=rb-4.0.3&q=80&w=400&quot"
  );

  const paramObj = useParams();

  const [visibility, setVisibility] = useState(visibilityDetails);
  const [visibiltyDropdown, setVisibilityDropdown] = useState(false);
  const [editedData, setEditedData] = useState({
    id: "",
    title: "",
    backgroundImg: currImage,
    visibility: visibility.find((each) => each.isShowing === true).name,
  });

  const currWorkspaceNameIntialData = paramObj.workspaceShortName
    ? workspaceData?.workspaces.find(
        (workspace) => workspace?.shortname === paramObj.workspaceShortName
      ).name
    : paramObj.boardId
    ? workspaceData?.workspaces.find((workspace) =>
        workspace?.boards.some((board) => board.id === paramObj.boardId)
      ).name
    : workspaceData?.workspaces[0].name;



  const [currWorkspaceName, setCurrWorkspaceName] = useState(
    currWorkspaceNameIntialData
  );

  const bgImages = [
    "https://images.unsplash.com/photo-1705154580249-55990fe3a8fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNzA1OTkyMDY5fA&ixlib=rb-4.0.3&q=80&w=400&quot",
    "https://images.unsplash.com/photo-1703432799866-1f788053fb3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNzA0MTY0ODgyfA&ixlib=rb-4.0.3&q=80&w=400&quot",
    "https://images.unsplash.com/photo-1703002917693-e51692232c81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNzA0MTY0ODgyfA&ixlib=rb-4.0.3&q=80&w=400&quot",
    "https://images.unsplash.com/photo-1703692218696-c9f830a81f65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDR8MzE3MDk5fHx8fHwyfHwxNzA0MTY0ODgyfA&ixlib=rb-4.0.3&q=80&w=400&quot",
    "https://trello.com/assets/707f35bc691220846678.svg",
    "https://trello.com/assets/d106776cb297f000b1f4.svg",
    "https://trello.com/assets/8ab3b35f3a786bb6cdac.svg",
    "https://trello.com/assets/a7c521b94eb153008f2d.svg",
    "https://trello.com/assets/aec98becb6d15a5fc95e.svg",
  ];

  const bgColors = [
    "https://trello.com/assets/707f35bc691220846678.svg",
    "https://trello.com/assets/d106776cb297f000b1f4.svg",
    "https://trello.com/assets/8ab3b35f3a786bb6cdac.svg",
    "https://trello.com/assets/a7c521b94eb153008f2d.svg",
    "https://trello.com/assets/aec98becb6d15a5fc95e.svg",
  ];

  const createBoard = useRef(null);
  const angleLeft = useRef(null);

  const navigate = useNavigate();

  function addBoard() {
    let firstTwoChar = editedData.title.slice(0, 3);
    const updatedBoard = {
      id: generateUniqueNumber(firstTwoChar, 5),
      title: editedData.title,
      backgroundImg: editedData.backgroundImg,
      // visibility: visibility.find((each) => each.isShowing === true).name,
      lists: [],
    };
    setWorkspaceData((prev) => {
      let updatedWorkspaceData = { ...prev };
      const currWorkspaceData = updatedWorkspaceData.workspaces.find(
        (workspace) => workspace?.name === currWorkspaceName
      );
      const workspaceIndex =
        currWorkspaceData?.id[currWorkspaceData?.id.length - 1];
      if (!currWorkspaceData.boards) {
        currWorkspaceData.boards = [];
      }
      currWorkspaceData?.boards?.push(updatedBoard);
      updatedWorkspaceData.workspaces[workspaceIndex - 1] = currWorkspaceData;

      return updatedWorkspaceData;
    });

    setCreateDropdownDetails((prev) => {
      prev = [...prev];

      prev[0].Board.isShowing = false;

      return prev;
    });

    navigate(`/b/${updatedBoard.id}/${updatedBoard.title.replace(/ /g, "-")}`);
  }

  useEffect(() => {
    function handleOutside(e) {
      if (createBoard?.current && !createBoard?.current?.contains(e.target)) {
        setCreateDropdownDetails((prev) => {
          let updatedCreateDropdownDetails = [...prev];
          updatedCreateDropdownDetails[0] = {
            ...updatedCreateDropdownDetails[0],
            Board: {
              ...updatedCreateDropdownDetails[0].Board,
              isShowing: false,
            },
          };
          return updatedCreateDropdownDetails;
        });
      }
    }

    document.addEventListener("click", (e) => handleOutside(e));

    return () => document.removeEventListener("click", (e) => handleOutside(e));
  }, [createDropdownDetails[0].Board.isShowing]);

  return (
    <div
      ref={createBoard}
      className="absolute top-[160%] rounded-md shadow-2xl w-[308px] min-w-[308px] border border-gray-200 py-2 px-4 max-h-[570px] overflow-y-auto bg-white z-10"
    >
      <div className="flex justify-between mb-4">
        <div
          ref={angleLeft}
          onClick={() => {
            setCreateDropdownStatus(true);
            setCreateDropdownDetails((prev) => {
              let updatedDropdownDetails = [...prev];
              updatedDropdownDetails[0] = {
                ...updatedDropdownDetails[0],
                Board: {
                  ...updatedDropdownDetails[0].Board,
                  isShowing: false,
                },
              };
              return updatedDropdownDetails;
            });
          }}
        >
          <FontAwesomeIcon icon={faAngleLeft} className="cursor-pointer" />
        </div>
        <div>CreateBoard</div>
        <div
          onClick={() => {
            setCreateDropdownDetails((prev) => {
              let updatedCreateDropdownDetails = [...prev];
              updatedCreateDropdownDetails[0] = {
                ...updatedCreateDropdownDetails[0],
                Board: {
                  ...updatedCreateDropdownDetails[0].Board,
                  isShowing: false,
                },
              };

              return updatedCreateDropdownDetails;
            });
          }}
        >
          <FontAwesomeIcon icon={faX} className="cursor-pointer" />
        </div>
      </div>

      <div className="w-full flex justify-center mb-4">
        <div
          className={`w-[200px] h-[125px] rounded flex justify-center items-center`}
          style={{ backgroundImage: `url(${currImage})` }}
        >
          <img
            src="https://trello.com/assets/14cda5dc635d1f13bc48.svg"
            alt="svg"
          />
        </div>
      </div>

      <div className="mb-4">
        <p className="mb-1">Background</p>
        <ul className="flex flex-wrap">
          {bgImages.map((each, i) => {
            return (
              <li
                className="relative mb-4 mr-2 w-[55px] h-[38px]"
                key={i}
                onClick={() => {
                  setCurrImage(each);
                  setEditedData((prev) => {
                    return (prev = { ...prev, backgroundImg: each });
                  });
                }}
              >
                <button className="w-full h-full ">
                  <img
                    src={each}
                    className="w-full h-full object-cover rounded"
                  />
                </button>
                {currImage == each ? (
                  <div className="absolute top-[20%] left-[50%] translate-x-[-50%]">
                    <FontAwesomeIcon
                      icon={faCheck}
                      style={{ color: "#ffff" }}
                    />
                  </div>
                ) : (
                  ""
                )}
              </li>
            );
          })}
        </ul>
      
      </div>

      <div>
        <p className="mb-1">Board Name*</p>
        <input
          type="input"
          className="w-full border-2 border-black rounded"
          value={editedData.title}
          onChange={(e) =>
            setEditedData((prev) => {
              return (prev = { ...prev, title: e.target.value });
            })
          }
        />
        <p className="mb-1">Board title required</p>
      </div>

      <div className="mb-2">
        <label for="workspaces" className="mb-1">
          Workspace
        </label>

        <select
          name="workspaces"
          className="w-full border-2 border-black rounded"
          value={currWorkspaceName}
          onChange={(e) => setCurrWorkspaceName(e.target.value)}
        >
          {workspaceData?.workspaces.map((workspace) => {
            return (
              <option
                value={workspace?.name}
                selected={workspace?.name === currWorkspaceName}
              >
                {workspace?.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="relative mb-3">
        <label className="mb-1">Visibility</label>
        <div
          className="w-full border-2 px-1 border-black rounded flex justify-between items-center"
          onClick={() => {
            setVisibilityDropdown(!visibiltyDropdown);
          }}
        >
          <p>
            {visibility.map((eachCategory) => {
              return eachCategory.isShowing && eachCategory.name;
            })}
          </p>

          <FontAwesomeIcon icon={faAngleDown} size="sm" />
        </div>
        <div>
          {visibiltyDropdown && (
            <div className="absolute top-[120%] bg-slate-200 rounded-lg shadow">
              {visibility.map((eachCategory, index) => {
                return (
                  <div
                    className={`flex flex-col p-2 hover:bg-slate-300 cursor-pointer ${
                      eachCategory.isShowing && "bg-blue-200"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setVisibility((prev) => {
                        let updatedVisibility = prev.map((eachObj, i) => {
                          let updatedObj = {
                            ...eachObj,
                            isShowing: i === index,
                          };
                          return updatedObj;
                        });
                        return updatedVisibility;
                      });

                      setVisibilityDropdown(false);
                    }}
                  >
                    <h1
                      className={`text-md ${
                        eachCategory.isShowing && "text-blue-700"
                      }`}
                    >
                      {eachCategory.name}
                    </h1>
                    <p
                      className={`text-sm ${
                        eachCategory.isShowing && "text-blue-700"
                      }`}
                    >
                      {eachCategory.description}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <p className="mb-3">
          This Workspace has 4 boards remaining. Free Workspaces can only have
          10 open boards. For unlimited boards, upgrade your Workspace.
        </p>
        <button className="bg-blue-600 rounded py-1 px-3 mb-3">
          Start free trial
        </button>
        <button
          className="bg-blue-600 rounded py-1 px-3 mb-3"
          onClick={() => {
     
            addBoard();
          }}
        >
          Create
        </button>
        <button className="pb-3">Start With a Template</button>
      </div>
    </div>
  );
};

export default CreateBoardCopy;
