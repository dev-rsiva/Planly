import { useState, useEffect, useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { data } from "../../utills/utills.js";
import { useNavigate } from "react-router-dom";
import dataContext from "../../utills/dataContext.js";
import DisplayInviteToWorkspace from "./DisplayInviteToWorkspace";
import { db } from "../../utills/firebase";
import { collection, addDoc } from "firebase/firestore";

const WorkspaceHeading = ({ workspaceInfo, fromWorkspace }) => {
  const { workspaceData, setWorkspaceData } = useContext(dataContext);
  const [displayWorkspaceEdit, setDisplayWorkspaceEdit] = useState(false);
  const [isSaveBtnEnabled, setIsSaveBtnEnabled] = useState(false);

  const [editedData, setEditedData] = useState(null);

  const [nameField, setNameField] = useState("");
  const [shortNameField, setShortNameField] = useState("");
  const [isShortNameTaken, setIsShortNameTaken] = useState(false);
  const [showInviteWorkspace, setShowInviteWorkspace] = useState(false);
  const navigate = useNavigate();

  const handleChange = (value, field) => {
    if (field === "name" || "website" || "description") {
      setEditedData((prevData) => {
        let updatedData = { ...prevData, [field]: value };
        return updatedData;
      });

      field === "name" ? setNameField(value) : "";
    }

    if (field === "shortname") {
      setEditedData((prevData) => {
        let updatedData = { ...prevData, [field]: value };
        return updatedData;
      });

      setShortNameField(value);
    }
  };

  workspaceData?.workspaces.map((workspace) => {});
  const handleSaveClick = (e) => {
    let shortName = shortNameField.split(" ").join("");

    let shortNameIsNotTaken = workspaceData?.workspaces
      ?.filter((workspace, index) => {
        return workspaceInfo?.id[workspaceInfo?.id?.length - 1] - 1 !== index;
      })
      .every((workspace) => {
        return (
          workspace?.shortname?.toLowerCase().slice(0, 3) !==
          shortName?.toLowerCase().slice(0, 3)
        );
      });

    setIsShortNameTaken(shortNameIsNotTaken ? false : true);

    if (shortNameIsNotTaken) {
      const currWorkspaceIndex = Number(
        editedData?.id[editedData.id.length - 1]
      );

      // workspaceData?.workspaces[currWorkspaceIndex - 1] = editedData;
      setEditedData((prev) => {
        let updatedEditedData = { ...prev, shortname: shortName };

        setWorkspaceData((prev) => {
          let updatedWorkspaceData = { ...prev };
          updatedWorkspaceData.workspaces = [
            ...updatedWorkspaceData.workspaces,
          ];
          updatedWorkspaceData.workspaces[currWorkspaceIndex - 1] =
            updatedEditedData;

          return updatedWorkspaceData;
        });

        return updatedEditedData;
      });

      setDisplayWorkspaceEdit(false);
    }
  };

  useEffect(() => {
    const mandFieldsAreFilled = nameField !== "" && shortNameField !== "";
    setIsSaveBtnEnabled(mandFieldsAreFilled);
  }, [nameField, shortNameField]);

  useEffect(() => {
    setEditedData(workspaceInfo);
    setNameField(workspaceInfo?.name);
    setShortNameField(workspaceInfo?.shortname);
  }, [workspaceInfo, workspaceData]);

  useEffect(() => {}, [editedData]);

  return (
    <div className="px-[120px] py-8">
      {!displayWorkspaceEdit && (
        <div className="flex justify-between">
          <div>
            <div className="flex items-center">
              <div
                style={{
                  backgroundImage: `linear-gradient(to bottom, ${workspaceInfo?.iconColors?.color1}, ${workspaceInfo?.iconColors?.color2})`,
                }}
                className={`relative w-[60px] h-[60px] rounded mr-3 flex justify-center items-center font-bold text-white text-xl`}
              >
                <div className="bg-black opacity-30 absolute w-full h-full rounded" />
                <p className="z-50 rounded text-[32px] text-white font-bold font-sans">
                  {editedData && editedData.name && editedData?.name[0]}
                </p>
              </div>

              <div className="flex flex-col px-1">
                <div className="flex items-center">
                  <p className="font-sans text-xl text-[#44546f] font-semibold pr-2">
                    {editedData?.name}
                  </p>
                  <div
                    onClick={() => setDisplayWorkspaceEdit(true)}
                    className="hover:bg-gray-200 px-[6px] rounded cursor-pointer"
                  >
                    <FontAwesomeIcon
                      icon={faPencil}
                      className="text-xs text-[#44546f]"
                    />
                  </div>
                </div>
                <div className="flex items-center text-[#172b4d] font-sans text-xs pl-1">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="text-[#44546f] font-sans text-xs mr-1"
                  />
                  <p className="text-[#44546f] font-sans text-xs">Private</p>
                </div>
              </div>
            </div>

            <div className="text-sans text-xs text-[#45546f] font-normal pl-1">
              {editedData?.description}
            </div>
          </div>

          {fromWorkspace && (
            <div className="">
              <button
                className="relative cursor-pointer bg-blue-600 rounded px-3 py-2 text-white text-sm font-semibold font-sans"
                onClick={() => setShowInviteWorkspace(true)}
              >
                <span className="mr-2">
                  <FontAwesomeIcon icon={faUserPlus} />
                </span>
                Invite Workspace Members
              </button>
              {showInviteWorkspace && (
                <div className="absolute top-8 right-28">
                  <DisplayInviteToWorkspace
                    workspaceInfo={workspaceInfo}
                    setShowInviteWorkspace={setShowInviteWorkspace}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {displayWorkspaceEdit && (
        <div>
          <div className="mb-4">
            <h3>Name *</h3>
            <input
              className="min-w-[240px] border-2 border-gray-300 rounded px-2 py-1"
              value={editedData?.name}
              onChange={(e) => handleChange(e.target.value, "name")}
            />
          </div>

          <div className="mb-4">
            <h3> Short name *</h3>
            <input
              className={`min-w-[240px] border-2 border-gray-300 ${
                isShortNameTaken ? "border-red-700" : ""
              } rounded px-2 py-1`}
              value={editedData?.shortname}
              onChange={(e) => handleChange(e.target.value, "shortname")}
            />
            {isShortNameTaken && (
              <p className="text-red-700">Short Name is Taken.</p>
            )}
          </div>

          <div className="mb-4">
            <h3>Website (optional) </h3>
            <input
              className="min-w-[240px] border-2 border-gray-300 rounded px-2 py-1"
              value={editedData?.website}
              onChange={(e) => handleChange(e.target.value, "website")}
            />
          </div>

          <div className="mb-4">
            <h3> Description (optional)</h3>
            <input
              className="min-w-[240px] border-2 border-gray-300 rounded px-2 py-1 pb-4"
              value={editedData?.description}
              onChange={(e) => handleChange(e.target.value, "description")}
            />
          </div>

          <div>
            <button
              className={`${
                !isSaveBtnEnabled
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "hover:bg-blue-700"
              } bg-blue-600 px-3 py-1 rounded mr-4 text-white`}
              disabled={!isSaveBtnEnabled}
              onClick={(e) => handleSaveClick(e)}
            >
              Save
            </button>
            <button
              className="bg-slate-200 px-3 py-1 rounded mr-4 hover:bg-slate-300"
              onClick={() => setDisplayWorkspaceEdit(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceHeading;
