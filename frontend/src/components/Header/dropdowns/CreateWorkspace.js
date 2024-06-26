import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { data } from "../../../utills/utills.js";
import { Link } from "react-router-dom";
import generateUniqueNumber from "../../../utills/generateUniqueNum.js";
import { randomGradientColor } from "../../../utills/randomGradientColor.js";

const CreateWorkspace = ({
  createDropdownStatus,
  setCreateDropdownStatus,
  setCreateDropdownDetails,
  workspaceData,
  setWorkspaceData,
  // currWorkspace,
  // setCurrWorkspace,
}) => {
  const workspaceUserInfo = {
    id: "",
    name: "",
    shortname: "",
    website: "",
    description: "",
    businessType: "Choose...",
  };

  const listOfBusinessType = [
    "Small business",
    "Operations",
    "Education",
    "Marketing",
    "Human Resources",
    "Engineering IT",
    "Sales CRM",
    "Other",
  ];
  const [workspaceDetails, setWorkspaceDetails] = useState(workspaceUserInfo);

  const [showWorkspaceType, setShowWorkspaceType] = useState(false);

  const [showContinueButton, setShowContinueButton] = useState(false);

  const navigate = useNavigate();

  console.log(workspaceDetails);
  console.log(workspaceData);
  // console.log(currWorkspace);
  function handleInputChange(e) {
    setWorkspaceDetails((prev) => {
      const { name, value } = e.target;
      return { ...prev, [name]: value };
    });
  }

  function updatedWorkspaceData() {
    let firstTwoChar = workspaceDetails.name.slice(0, 3);

    let workspaceData = {
      id: `workspace-${data.workspaces.length + 1}`,
      name: workspaceDetails.name,
      shortname: generateUniqueNumber(firstTwoChar, 5),
      website: workspaceDetails.shortname,
      description: workspaceDetails.description,
      businessType: workspaceDetails.businessType,
      iconColors: {
        color1: randomGradientColor(),
        color2: randomGradientColor(),
      },
      boards: [],
    };

    setWorkspaceData((prev) => {
      let updatedData = { ...prev };
      updatedData.workspaces.push(workspaceData);
      return updatedData;
    });

    setCreateDropdownDetails((prev) => {
      let updatedCreateDropdownDetails = [...prev];
      updatedCreateDropdownDetails[2] = {
        ...updatedCreateDropdownDetails[2],
        Workspace: {
          ...updatedCreateDropdownDetails[2].Workspace,
          isShowing: false,
        },
      };
      return updatedCreateDropdownDetails;
    });
    console.log(data);

    navigate(
      `/w/${workspaceData.shortname}/${workspaceData.name.replace(/ /g, "-")}`
    );
  }

  return (
    <div className="">
      <div
        id="popup-overlay"
        className="fixed left-0 top-0 w-full h-full flex justify-center items-center bg-gray-700 bg-opacity-50 "
        onClick={() => {
          console.log("createworkspace5");
          setCreateDropdownDetails((prev) => {
            let updatedCreateDropdownDetails = [...prev];
            updatedCreateDropdownDetails[2].Workspace.isShowing = false;
            return updatedCreateDropdownDetails;
          });
        }}
      />
      <div
        id="popup-content"
        className="absolute left-[-420px] top-3 min-w-[1100px] bg-white px-20 pt-8 pb-10 border rounded-md shadow-lg z-10"
      >
        <div className="ml-8 flex justify-end pb-8 ">
          <FontAwesomeIcon
            icon={faX}
            className="cursor-pointer"
            onClick={() => {
              console.log("createworkspace4");
              setCreateDropdownDetails((prev) => {
                let updatedCreateDropdownDetails = [...prev];
                updatedCreateDropdownDetails[2] = {
                  ...updatedCreateDropdownDetails[2],
                  Workspace: {
                    ...updatedCreateDropdownDetails[2].Workspace,
                    isShowing: false,
                  },
                };

                return updatedCreateDropdownDetails;
              });
            }}
          />
        </div>

        <div className="flex">
          <div className="w-[50%]">
            <div className="pb-2 text-slate-800">
              <h1 className="font-bold text-2xl ">Let's build a Workspace</h1>
              <p>
                Boost your productivity by making it easier for everyone to
                access boards in one location.
              </p>
            </div>
            <div className="pb-2 text-slate-800">
              <p className="font-bold">Workspace name</p>
              <input
                placeholder="Taco's Co"
                className="pl-2 border border-black rounded-sm w-full h-[30px]"
                name="name"
                value={workspaceDetails.name}
                onChange={handleInputChange}
              />
              <p>This is the name of your company, team or organization.</p>
            </div>

            <div className="pb-2 text-slate-800">
              <p className="font-bold">Workspace Type</p>

              <div
                className="relative flex items-center justify-between w-full px-2 border border-black text-black rounded-sm h-[30px] cursor-pointer"
                onClick={() => {
                  console.log("createworkspace3");
                  setShowWorkspaceType(!showWorkspaceType);
                  handleInputChange;
                }}
              >
                <p>{workspaceDetails.businessType}</p>

                <FontAwesomeIcon icon={faAngleDown} className="" />
                {showWorkspaceType && (
                  <ul className="absolute bg-white border-slate-300 border-2 shadow-md rounded w-[102%] left-[-1px] top-8 ">
                    {listOfBusinessType.map((each) => {
                      return (
                        <li
                          name="businessType"
                          value={workspaceDetails.businessType}
                          className="hover:bg-gray-300 px-2 cursor-pointer"
                          onClick={() => {
                            console.log("createworkspace2");

                            setWorkspaceDetails((prev) => {
                              let updatedWorkspaceDetails = { ...prev };
                              updatedWorkspaceDetails.businessType = each;
                              return updatedWorkspaceDetails;
                            });
                          }}
                        >
                          {each}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>

            <div className="pb-2 text-slate-">
              <p className="font-bold">Workspace Description (Optional)</p>
              <input
                placeholder="Our team organizes everything here"
                className="pl-2 border border-black rounded-sm w-full h-[150px]"
                name="description"
                value={workspaceDetails.description}
                onChange={handleInputChange}
              />
              <p>This is the name of your company, team or organization.</p>
            </div>

            <div
              className={`py-2 text-center ${
                workspaceDetails.name !== "" &&
                workspaceDetails.businessType !== "Choose..."
                  ? "cursor-pointer bg-blue-600 text-white rounded"
                  : "cursor-not-allowed text-slate-400"
              }`}
              onClick={() => {
                console.log("createworkspace1");
                updatedWorkspaceData();
              }}
            >
              <button
                disabled={workspaceDetails.name == "" ? true : false}
                className={`${
                  workspaceDetails.name !== "" &&
                  workspaceDetails.businessType !== "Choose..."
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                }`}
              >
                Continue
              </button>
            </div>
          </div>

          <div className="w-[50%] h-auto flex justify-center items-center bg-blue-200 ml-8 rounded">
            <div>
              <img src="https://trello.com/assets/d1f066971350650d3346.svg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkspace;
