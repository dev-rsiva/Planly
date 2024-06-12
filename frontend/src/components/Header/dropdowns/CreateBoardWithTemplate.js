import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { visibilityDetails } from "../../../utills/visibilityData";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import dataContext from "../../../utills/dataContext";
import generateUniqueNumber from "../../../utills/generateUniqueNum";
import { updateFirebaseDoc } from "../../../utills/updateFirebase";

const CreateBoardWithTemplate = ({
  createDropdownStatus,
  setCreateDropdownStatus,
  createDropdownDetails,
  setCreateDropdownDetails,
  workspaceData,
  setWorkspaceData,
  templateSelected,
  createBoardWithTemplateCard,
  setCreateBoardWithTemplateCard,
  dropDownSourceClick,
  navbarBtn,
  setNavbarBtn,
}) => {
  console.log(templateSelected);
  const paramObj = useParams();

  const BoardNameRef = useRef();
  const BoardDecriptionRef = useRef();

  const createBoardwithTemplateRef = useRef();

  const navigate = useNavigate();

  const { user, templatesData, setTemplatesData, useTemplateBtn } =
    useContext(dataContext);

  const currWorkspaceNameIntialData = paramObj.workspaceShortName
    ? workspaceData?.workspaces?.find(
        (workspace) => workspace?.shortname === paramObj.workspaceShortName
      ).name
    : paramObj.boardId
    ? workspaceData?.workspaces?.find((workspace) =>
        workspace?.boards?.some((board) => board?.id === paramObj.boardId)
      ).name
    : workspaceData?.workspaces[0].name;

  const [currWorkspaceName, setCurrWorkspaceName] = useState(
    currWorkspaceNameIntialData
  );
  const [inputSelection, setInputSelection] = useState("");
  const [visibility, setVisibility] = useState(visibilityDetails);
  const [visibiltyDropdown, setVisibilityDropdown] = useState(false);
  const [editedData, setEditedData] = useState({
    id: "",
    title: templateSelected.templateName,
    description: templateSelected.templateShortDesc,
    backgroundImg: templateSelected.templateImage,
    // visibility: visibility.find((each) => each.isShowing === true).name,
    visibility: "Workspace",
  });

  const [keepCards, setKeepCards] = useState(true);

  const templateCategoryFound = templatesData?.templates.find(
    (templateCategory) =>
      templateCategory?.templateList?.some((template) => {
        return template.templateId === templateSelected.templateId;
      })
  );

  function addBoard() {
    let firstTwoChar = editedData.title.slice(0, 3);
    const updatedBoard = {
      id: generateUniqueNumber(firstTwoChar, 5),
      title: editedData.title,
      description: editedData.description,
      backgroundImg: editedData.backgroundImg,
      // visibility: visibility.find((each) => each.isShowing === true).name,
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
      lists: templateSelected.lists,
      highlights: [],
    };
    // setWorkspaceData((prev) => {
    let updatedWorkspaceData = { ...workspaceData };
    const currWorkspaceData = updatedWorkspaceData?.workspaces?.find(
      (workspace) => workspace?.name === currWorkspaceName
    );
    const workspaceIndex =
      currWorkspaceData?.id[currWorkspaceData?.id.length - 1];
    if (!currWorkspaceData.boards) {
      currWorkspaceData.boards = [];
    }
    currWorkspaceData?.boards?.push(updatedBoard);
    updatedWorkspaceData.workspaces[workspaceIndex - 1] = currWorkspaceData;
    console.log("firebase");

    updateFirebaseDoc(updatedWorkspaceData);
    // return updatedWorkspaceData;
    // });

    setCreateBoardWithTemplateCard(false);

    navigate(`/b/${updatedBoard.id}/${updatedBoard.title.replace(/ /g, "-")}`);
  }

  useEffect(() => {
    setEditedData(
      (prev) => (prev = { ...prev, title: templateSelected.templateName })
    );
  }, [templateSelected.templateName]);

  useEffect(() => {
    BoardNameRef.current.focus();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      e.stopPropagation();
      if (
        createBoardwithTemplateRef.current &&
        !createBoardwithTemplateRef?.current?.contains(e.target) &&
        !useTemplateBtn?.current?.contains(e.target)
      ) {
        setCreateBoardWithTemplateCard(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => document.addEventListener("click", handleOutsideClick);
  }, [createBoardWithTemplateCard]);

  return (
    <div
      ref={createBoardwithTemplateRef}
      className={`absolute top-[160%] ${
        dropDownSourceClick === "useTemplateBtn"
          ? "left-[380px]"
          : dropDownSourceClick === "templatesDropdownBtn"
          ? "left-[-125px]"
          : dropDownSourceClick === "createBtn"
          ? ""
          : ""
      } rounded-md shadow-2xl w-[308px] min-w-[308px] border border-gray-200 py-2 px-4 max-h-[570px] overflow-y-auto bg-white z-10`}
    >
      <div className="flex justify-between items-center mb-4">
        <div
          //   ref={angleLeft}
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setCreateBoardWithTemplateCard(false);
            setCreateDropdownDetails((prev) => {
              let updatedDropdownDetails = [...prev];
              updatedDropdownDetails[1] = {
                ...updatedDropdownDetails[1],
                Template: {
                  ...updatedDropdownDetails[1].Template,
                  isShowing: true,
                },
              };

              return updatedDropdownDetails;
            });
          }}
        >
          <FontAwesomeIcon
            icon={faAngleLeft}
            className="text-base text-gray-500"
          />
        </div>
        <div className="font-sans text-custom text-sm font-semibold">
          {templateSelected.templateName}
        </div>
        <div
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setCreateBoardWithTemplateCard(false);
            // setCreateDropdownDetails((prev) => {
            //   let updatedCreateDropdownDetails = [...prev];
            //   updatedCreateDropdownDetails[0] = {
            //     ...updatedCreateDropdownDetails[0],
            //     Board: {
            //       ...updatedCreateDropdownDetails[0].Board,
            //       isShowing: false,
            //     },
            //   };

            //   return updatedCreateDropdownDetails;
            // });
            setNavbarBtn((prev) => {
              let updatedNavBarBtn = { ...prev };
              updatedNavBarBtn.selected = "";
              updatedNavBarBtn.hovered = "";
              return updatedNavBarBtn;
            });
          }}
        >
          <FontAwesomeIcon icon={faX} className="text-xs text-gray-500" />
        </div>
      </div>

      <div className="flex items-center mb-3">
        <img
          src={templateSelected.templateImage}
          className="w-[40px] h-[40px] rounded-md mr-2"
          onClick={() =>
            navigate(
              `/templates/${
                templateCategoryFound.templateCategory
              }/${templateSelected.templateId.replace(/ /g, "-")}`
            )
          }
        />
        <div className="flex flex-col flex-1 mr-[2px]">
          <Link
            to={`/templates/${
              templateCategoryFound.templateCategory
            }/${templateSelected.templateId.replace(/ /g, "-")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p
              className="text-sm font-sans text-custom font-bold overflow-hidden whitespace-nowrap overflow-ellipsis 
            hover:underline cursor-pointer"
              style={{ maxWidth: "170px" }}
            >
              {templateSelected.templateName}
            </p>
          </Link>
          <p className="text-xs font-sans text-custom">
            by {templateSelected.createdBy},{" "}
            {templateSelected.creatorProffession}
          </p>
        </div>

        <Link
          to={`/templates/${
            templateCategoryFound.templateCategory
          }/${templateSelected.templateId.replace(/ /g, "-")}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div
            className="w-[35px] h-[35px] bg-gray-300 rounded-md flex justify-center items-center cursor-pointer"
            onClick={() => setCreateBoardWithTemplateCard(false)}
          >
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className="text-xs"
            />
          </div>
        </Link>
      </div>
      <div className="mb-1 text-xs font-sans text-custom">
        {templateSelected.templateShortDesc}
      </div>

      <hr className="mb-2" />

      <div>
        <p className="mb-1 font-sans text-xs text-custom font-bold">
          Board Name*
        </p>
        <input
          ref={BoardNameRef}
          type="input"
          className="w-full border-2 rounded pl-2 py-[6px]  border-gray-400 focus:outline-none focus:border-blue-600 
          font-sans text-custom text-sm "
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
          Board Description*
        </p>
        <textarea
          ref={BoardDecriptionRef}
          type="input"
          className="w-full border-2 rounded pl-2 py-[6px]  border-gray-400 focus:outline-none focus:border-blue-600 
          font-sans text-custom text-sm "
          rows="4"
          value={editedData.description}
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
            {visibility.map((eachCategory) => {
              return eachCategory.isShowing && eachCategory.name;
            })}
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
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={keepCards}
            className="mr-3 w-4 h-4"
            onChange={() => setKeepCards(!keepCards)}
          />
          <p className="font-sans text-custom text-sm">Keep cards</p>
        </div>

        <p className="mb-5 font-sans text-custom text-sm">
          Activity and members will not be copied to the new board?.
        </p>
        <p className="mb-3 font-sans text-custom text-sm">
          This Workspace has 4 boards remaining. Free Workspaces can only have
          10 open boards?. For unlimited boards, upgrade your Workspace.
        </p>
        <button className="bg-gray-200 hover:bg-gray-300 rounded py-[6px] px-3 mb-3 font-sans text-custom text-sm cursor-not-allowed">
          Start free trial
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 rounded py-[6px] px-3 mb-3 font-sans text-white font-semibold text-sm"
          onClick={() => {
            addBoard();
          }}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateBoardWithTemplate;
