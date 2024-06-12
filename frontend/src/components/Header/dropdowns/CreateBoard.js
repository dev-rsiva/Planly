import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { visibilityDetails } from "../../../utills/visibilityData.js";
import generateUniqueNumber from "../../../utills/generateUniqueNum.js";

import dataContext from "../../../utills/dataContext.js";

import { updateFirebaseDoc } from "../../../utills/updateFirebase";
const CreateBoard = ({
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

  const BoardNameRef = useRef();
  const BoardDescriptionRef = useRef();

  const paramObj = useParams();

  const [inputSelection, setInputSelection] = useState("");
  const [visibility, setVisibility] = useState(visibilityDetails);
  const [visibiltyDropdown, setVisibilityDropdown] = useState(false);
  const [editedData, setEditedData] = useState({
    id: "",
    title: "",
    description: "",
    backgroundImg: currImage,
    // visibility: visibility.find((each) => each.isShowing === true).name,
    visibility: "Workspace",
  });
  console.log(editedData.visibility);
  console.log(workspaceData);
  console.log(paramObj);
  const currWorkspaceNameIntialData = paramObj.workspaceShortName
    ? workspaceData?.workspaces?.find(
        (workspace) => workspace?.shortname === paramObj.workspaceShortName
      )?.name
    : paramObj.boardId
    ? workspaceData?.workspaces?.find((workspace) =>
        workspace?.boards?.some((board) => board?.id === paramObj.boardId)
      )?.name
    : workspaceData?.workspaces[0]?.name;

  const [currWorkspaceName, setCurrWorkspaceName] = useState(
    currWorkspaceNameIntialData
  );

  console.log(currWorkspaceNameIntialData);
  const { user, createBoardSourceClick, setCreateBoardSourceClick } =
    useContext(dataContext);
  console.log(user);
  const bgImages = [
    "https://images.unsplash.com/photo-1705154580249-55990fe3a8fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNzA1OTkyMDY5fA&ixlib=rb-4.0.3&q=80&w=400&quot",
    "https://images.unsplash.com/photo-1703432799866-1f788053fb3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNzA0MTY0ODgyfA&ixlib=rb-4.0.3&q=80&w=400&quot",
    "https://images.unsplash.com/photo-1703002917693-e51692232c81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNzA0MTY0ODgyfA&ixlib=rb-4.0.3&q=80&w=400&quot",
    "https://images.unsplash.com/photo-1703692218696-c9f830a81f65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDR8MzE3MDk5fHx8fHwyfHwxNzA0MTY0ODgyfA&ixlib=rb-4.0.3&q=80&w=400&quot",
    "https://trello.com/assets/707f35bc691220846678.svg",
    "https://trello.com/assets/d106776cb297f000b1f4.svg",
    "https://trello.com/assets/8ab3b35f3a786bb6cdac.svg",
    "https://trello.com/assets/a7c521b94eb153008f2d.svg",
    // "https://trello.com/assets/aec98becb6d15a5fc95e.svg",
  ];

  const bgColors = [
    "https://trello.com/assets/707f35bc691220846678.svg",
    "https://trello.com/assets/d106776cb297f000b1f4.svg",
    "https://trello.com/assets/8ab3b35f3a786bb6cdac.svg",
    "https://trello.com/assets/a7c521b94eb153008f2d.svg",
    // "https://trello.com/assets/aec98becb6d15a5fc95e.svg",
  ];

  const createBoard = useRef(null);
  const angleLeft = useRef(null);

  const navigate = useNavigate();

  function addBoard() {
    let firstTwoChar = editedData.title.slice(0, 3);

    const updatedBoard = {
      id: generateUniqueNumber(firstTwoChar, 5),
      title: editedData.title,
      description: editedData.description,
      backgroundImg: editedData.backgroundImg,
      visibility: editedData.visibility,
      // members: [user],
      // admins: [user], // For Premium Workspaces
      admins: [
        {
          userId: user.uid,
          role: "admin",
          name: user.displayName,
          email: user.email,
          photoURL: user?.photoURL,
        },
      ],
      members: [
        {
          userId: user.uid,
          role: "admin",
          name: user.displayName,
          email: user.email,
          photoURL: user?.photoURL,
        },
      ], // also role - normal exists.
      starred: false,
      viewedAt: "",
      lists: [],
      highlights: [],
    };
    console.log(updatedBoard);
    console.log(currWorkspaceName);

    let updatedWorkspaceData = { ...workspaceData };
    console.log(updatedWorkspaceData);
    const currWorkspaceData = updatedWorkspaceData?.workspaces?.find(
      (workspace) => workspace?.name === currWorkspaceName
    );
    console.log(currWorkspaceData);
    const workspaceIndex = updatedWorkspaceData?.workspaces?.findIndex(
      (workspace) => workspace?.name === currWorkspaceName
    );
    console.log(workspaceIndex);
    if (!currWorkspaceData?.boards) {
      currWorkspaceData.boards = [];
    }

    currWorkspaceData?.boards?.push(updatedBoard);
    updatedWorkspaceData.workspaces[workspaceIndex] = currWorkspaceData;
    console.log(updatedWorkspaceData);
    console.log("firebase");
    updateFirebaseDoc(updatedWorkspaceData);

    setCreateDropdownDetails((prev) => {
      prev = [...prev];

      prev[0].Board.isShowing = false;

      return prev;
    });

    navigate(`/b/${updatedBoard.id}/${updatedBoard.title.replace(/ /g, "-")}`);
  }

  useEffect(() => {
    BoardNameRef.current.focus();
  }, []);

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
      className={`absolute top-[140%] ${
        createBoardSourceClick === "workspaceSidebarBtn"
          ? "left-[-362px]"
          : "left-0"
      } rounded-md shadow-2xl w-[308px] min-w-[308px] border border-gray-200 py-2 px-4 max-h-[570px] overflow-y-auto bg-white z-10`}
    >
      <div className="flex justify-between items-center mb-4">
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
          className="cursor-pointer"
        >
          <FontAwesomeIcon
            icon={faAngleLeft}
            className="text-gray-500 text-base"
          />
        </div>
        <div className="font-sans text-custom text-sm font-semibold">
          CreateBoard
        </div>
        <div
          className="cursor-pointer"
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
          <FontAwesomeIcon icon={faX} className="text-gray-500 text-xs" />
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
        <p className="mb-1 font-sans text-custom text-xs font-bold">
          Background
        </p>
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
        <p className="mb-1 font-sans text-xs text-custom font-bold">
          Board Name*
        </p>
        <input
          ref={BoardNameRef}
          type="input"
          className="w-full border-2 rounded pl-2 py-[6px] border-gray-400 focus:outline-none focus:border-blue-600 
          font-sans text-custom text-sm"
          value={editedData.title}
          onChange={(e) =>
            setEditedData((prev) => {
              return (prev = { ...prev, title: e.target.value });
            })
          }
          onClick={() => setInputSelection("Board Name")}
        />
        <p className="mb-1 font-sans text-xs text-custom">
          Board title required
        </p>
      </div>

      <div>
        <p className="mb-1 font-sans text-xs text-custom font-bold">
          Board description
        </p>
        <textarea
          ref={BoardDescriptionRef}
          type="input"
          className="w-full border-2 rounded pl-2 py-[6px] border-gray-400 focus:outline-none focus:border-blue-600 
          font-sans text-custom text-sm"
          rows="4"
          value={editedData?.description}
          onChange={(e) =>
            setEditedData((prev) => {
              return (prev = { ...prev, description: e.target.value });
            })
          }
          onClick={() => setInputSelection("Board Description")}
        />
        <p className="mb-1 font-sans text-xs text-custom">
          Board description required
        </p>
      </div>

      <div className="mb-2">
        <label
          for="workspaces"
          className="mb-1 font-sans text-xs text-custom font-bold"
        >
          Workspace
        </label>

        <select
          name="workspaces"
          className={`w-full border-2 rounded focus:outline-none pl-2 py-[6px] ${
            inputSelection === "Workspace"
              ? "border-blue-600"
              : "border-gray-400"
          } font-sans text-custom text-sm`}
          value={currWorkspaceName}
          onChange={(e) => setCurrWorkspaceName(e.target.value)}
          onClick={() => setInputSelection("Workspace")}
        >
          {workspaceData?.workspaces?.map((workspace) => {
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
        <label className="mb-1 font-sans text-xs text-custom font-bold">
          Visibility
        </label>
        <div
          className={`w-full border-2 px-1 rounded flex justify-between items-center focus:outline-none pl-2 py-[6px] ${
            inputSelection === "Visibility"
              ? "border-blue-600"
              : "border-gray-400"
          }`}
          onClick={() => {
            setVisibilityDropdown(!visibiltyDropdown);
            setInputSelection("Visibility");
          }}
        >
          <p className="font-sans text-custom text-sm">
            {/* {visibility.map((eachCategory) => {
              return eachCategory.isShowing && eachCategory.name;
            })} */}
            {editedData.visibility}
          </p>

          <FontAwesomeIcon icon={faAngleDown} size="sm" />
        </div>
        <div>
          {visibiltyDropdown && (
            <div className="absolute top-[120%] bg-slate-200 rounded-md py-1 shadow">
              {visibility.map((eachCategory, index) => {
                return (
                  <div
                    className={`flex flex-col p-2 hover:bg-slate-300 cursor-pointer ${
                      eachCategory.isShowing && "bg-blue-200"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      // setVisibility((prev) => {
                      //   let updatedVisibility = prev.map((eachObj, i) => {
                      //     let updatedObj = {
                      //       ...eachObj,
                      //       isShowing: i === index,
                      //     };
                      //     return updatedObj;
                      //   });
                      //   return updatedVisibility;
                      // });
                      setEditedData((prev) => {
                        let updatedEditedData = {
                          ...prev,
                          visibility: eachCategory.name,
                        };
                        return updatedEditedData;
                      });
                      setVisibilityDropdown(false);
                    }}
                  >
                    <h1
                      className={`text-sm text-custom ${
                        eachCategory.isShowing && "text-blue-700"
                      }`}
                    >
                      {eachCategory.name}
                    </h1>
                    <p
                      className={`text-xs text-custom ${
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
        <p className="mb-3 font-sans text-custom text-sm">
          This Workspace has 4 boards remaining. Free Workspaces can only have
          10 open boards?. For unlimited boards, upgrade your Workspace.
        </p>
        <button className="bg-gray-200 hover:bg-gray-300 rounded py-[6px] px-3 mb-3 font-sans text-custom text-sm cursor-not-allowed">
          Start free trial
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 rounded py-[6px] px-3 mb-3 font-sans text-white text-sm font-semibold"
          onClick={() => {
            addBoard();
          }}
        >
          Create
        </button>
        <button className="rounded py-[6px] font-sans text-custom text-sm bg-gray-200 hover:bg-gray-300 font-semibold">
          Start With a Template
        </button>
      </div>
    </div>
  );
};

export default CreateBoard;
