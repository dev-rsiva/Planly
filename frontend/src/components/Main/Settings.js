import { useState, useContext, useEffect, useRef, useNavigate } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useNavigate, useOutletContext } from "react-router-dom";
import dataContext from "../../utills/dataContext";
import { faX } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import CommonBoard from "./CommonBoard";
import DeleteWorkspace from "./DeleteWorkspace";

const Settings = () => {
  const [showBoardsOfUser, setShowBoardsOfUser] = useState("");
  const [showDeleteWorkspace, setShowDeleteWorkspace] = useState(false);

  const [userBoards, setUserBoards] = useState([]);
  const navigate = useNavigate();
  const paramObj = useParams();

  console.log(paramObj);
  const { workspaceData, setWorkspaceData, user } = useContext(dataContext);

  const workspaceInfo = workspaceData?.workspaces?.find(
    (eachWorkspace) => eachWorkspace?.shortname === paramObj?.workspaceShortName
  );

  console.log(workspaceInfo);

  return (
    <div className="px-[34px] pt-[40px] ">
      <div className="mb-6">
        <h1 className="font-sans text-2xl text-[#44546f] font-semibold pr-2 mb-8">
          Workspace Settings
        </h1>
        {/* <hr className="border-b-gray-50 text-center mx-auto my-3" /> */}

        <div>
          <h1 className="font-sans text-xl text-[#44546f] font-semibold pr-2 mb-2">
            Workspace Visibility
          </h1>
          <hr className="border-b-gray-50 text-center mx-auto my-3" />

          <p className="font-sans text-sm text-[#44546f] pr-2">
            Private - This Workspace is private. It's not indexed or visible to
            those outside the Workspace.
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h1 className="font-sans text-xl text-[#44546f] font-semibold pr-2 mb-2">
          Invite members to join you
        </h1>
        <hr className="border-b-gray-50 text-center mx-auto my-3" />
        <p className="font-sans text-sm text-[#44546f] pr-2">
          Only people with these email domains can join this Workspace.
        </p>
      </div>

      <div className="mb-6">
        <h1 className="font-sans text-xl text-[#44546f] font-semibold pr-2 mb-2">
          Board creation restrictions
        </h1>
        <hr className="border-b-gray-50 text-center mx-auto my-3" />
        <p className="font-sans text-sm text-[#44546f] pr-2 py-2">
          Only Workspace admins can create public boards?.
        </p>
        <p className="font-sans text-sm text-[#44546f] pr-2 py-2">
          Any Workspace member can create Workspace visible boards?.
        </p>
        <p className="font-sans text-sm text-[#44546f] pr-2 py-2">
          Any Workspace member can create private boards?.
        </p>
      </div>

      <div className="mb-6">
        <h1 className="font-sans text-xl text-[#44546f] font-semibold pr-2 mb-2">
          Board deletion restrictions
        </h1>
        <hr className="border-b-gray-50 text-center mx-auto my-3" />
        <p className="font-sans text-sm text-[#44546f] pr-2 py-2">
          Only Workspace admins can delete public boards?.
        </p>
        <p className="font-sans text-sm text-[#44546f] pr-2 py-2">
          Only Workspace admins can delete Workspace visible boards?.
        </p>
        <p className="font-sans text-sm text-[#44546f] pr-2 py-2">
          Only Workspace admins can delete private boards?.
        </p>
      </div>

      <div className="mb-6">
        <h1 className="font-sans text-xl text-[#44546f] font-semibold pr-2 mb-2">
          Sharing boards with guests
        </h1>
        <hr className="border-b-gray-50 text-center mx-auto my-3" />
        <p className="font-sans text-sm text-[#44546f] pr-2 py-2">
          Anybody can send or receive invitations to boards in this Workspace.
        </p>
      </div>

      <div className="mb-6">
        <h1 className="font-sans text-xl text-[#44546f] font-semibold pr-2 mb-2">
          Slack workspaces restrictions
        </h1>
        <hr className="border-b-gray-50 text-center mx-auto my-3" />
        <p className="font-sans text-sm text-[#44546f] pr-2 py-2">
          Any Workspace member can link and unlink this Trello Workspace with
          Slack workspaces.
        </p>
      </div>

      <div className="mb-6">
        <h1 className="font-sans text-xl text-[#44546f] font-semibold pr-2 mb-2">
          Slack workspaces linking
        </h1>
        <hr className="border-b-gray-50 text-center mx-auto my-3" />
        <p className="font-sans text-sm text-[#44546f] pr-2 py-2">
          Link your Slack and Trello Workspaces together to collaborate on
          Trello projects from within Slack. Learn more
        </p>
      </div>

      <div className="mb-6 relative">
        <p
          className="w-[155px] font-sans text-base text-red-700 hover:text-blue-700 hover:underline font-semibold pr-2 mb-2 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setShowDeleteWorkspace(true);
          }}
        >
          Delete Workspace ?
        </p>
        {showDeleteWorkspace && (
          <DeleteWorkspace
            setShowDeleteWorkspace={setShowDeleteWorkspace}
            workspaceInfo={workspaceInfo}
            workspaceData={workspaceData}
            user={user}
          />
        )}
      </div>

      {/* <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <div className="mr-2 w-[400px]">
            {workspaceInfo?.members?.map((eachUser) => {
              return (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <div
                      className={`flex justify-center text-white text-sm font-semibold items-center rounded-full min-w-[30px] w-[30px] h-[30px] mr-4`}
                    >
                      <img src={eachUser?.photoURL} className="w-full" />
                    </div>
                    <div className="flex flex-col w-full">
                      <div className="flex items-center mb-1">
                        <p className="text-base font-semibold mr-3 text-gray-800">
                          {eachUser?.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm mr-3 text-gray-600">
                          {eachUser.email}
                        </p>
                      </div>
                    </div>
                    <div
                      className="w-[175px] relative cursor-pointer flex gap-2 justify-center items-center bg-gray-200 rounded px-3 py-2 "
                      onClick={() => {
                        setShowBoardsOfUser(eachUser.userId);

                        setUserBoards((prev) => {
                          let allWorkspaceBoards = workspaceInfo?.boards?.filter(
                            (eachBoard) => {
                              return  eachBoard?.members.some((eachMember) => {
                                return eachMember.userId === eachUser.userId;
                              });
                            }
                          );

                          console.log(allWorkspaceBoards);

                          return allWorkspaceBoards;
                        });
                      }}
                    >
                      <p className="text-[#172b4d] font-sans text-sm font-semibold cursor-pointer">
                        View Boards
                      </p>
                      {showBoardsOfUser === eachUser.userId && (
                        <div className="absolute left-[120px] bottom-[-50%] bg-white p-4 rounded w-[300px] z-[1801] border border-gray-200">
                          <div className="flex justify-between items-center mb-3">
                            <p className="flex-grow text-center font-sans text-sm font-semibold text-[#172b4d]">
                              Workspace Boards
                            </p>

                            <div
                              className="ml-2 w-6 h-6 flex justify-center items-center rounded hover:bg-gray-200"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowBoardsOfUser(null);
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faX}
                                className="cursor-pointer text-xs"
                              />
                            </div>
                          </div>

                          <p className="flex-grow text-left font-sans text-sm text-[#172b4d] mb-3">
                            {userBoards.length === 0
                              ? `${eachUser.name} has no boards in this workspace`
                              : `${eachUser.name} is a member of the following Workspace boards?.`}
                          </p>
                          <hr className="border-b-gray-50 text-center mx-auto my-2" />

                          {userBoards.length !== 0 &&
                            userBoards.map((eachBoard) => {
                              return (
                                <>
                                  <div
                                    className="flex items-center py-2 rounded hover:bg-gray-100"
                                    onClick={() => {
                                      setShowBoardsOfUser(null);
                                      navigate(
                                        `/b/${
                                           eachBoard?.id
                                        }/${ eachBoard?.title.replace(/ /g, "-")}`
                                      );
                                    }}
                                  >
                                    <img
                                      src={eachBoard?.backgroundImg}
                                      className="w-[40px] h-[33px] rounded mr-2"
                                    />
                                    <div className="flex flex-col flex-1 mr-[2px]">
                                      <p
                                        className="text-sm font-sans text-[#172b4d] font-semibold overflow-hidden whitespace-nowrap overflow-ellipsis cursor-pointer"
                                        style={{ maxWidth: "210px" }}
                                      >
                                        {eachBoard?.title}
                                      </p>
                                      <p className="text-xs font-sans text-custom">
                                        {eachBoard?.name}
                                      </p>
                                    </div>
                                  </div>
                                </>
                              );
                            })}
                        </div>
                      )}
                    </div>
                  </div>
                  <hr className="w-[900px] border-b-gray-50 text-center mx-auto my-5" />
                </>
              );
            })}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Settings;
