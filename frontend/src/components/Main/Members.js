import { useState, useContext, useEffect, useRef, useNavigate } from "react";
import { useOutletContext } from "react-router-dom";
import { useNavigate, useOutletContext } from "react-router-dom";
import dataContext from "../../utills/dataContext";
import { faX } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import CommonBoard from "./CommonBoard";

const Members = () => {
  const [showBoardsOfUser, setShowBoardsOfUser] = useState("");
  const [userBoards, setUserBoards] = useState([]);
  const navigate = useNavigate();
  const { workspaceData, setWorkspaceData, user } = useContext(dataContext);
  const [workspaceInfo] = useOutletContext();
  console.log(workspaceInfo);

  if (workspaceInfo?.members?.length === 0) {
    return (
      <p className="font-sans text-sm font-semibold text-[#172b4d]">
        No members belongs to this workspace.
      </p>
    );
  }

  return (
    <div className="px-[34px] pt-[40px] ">
      <div className="mb-6">
        <h1 className="font-sans text-xl text-[#44546f] font-semibold pr-2 mb-2">
          {`Workspace Members(${workspaceInfo?.members?.length})`}
        </h1>
        <p className="font-sans text-sm text-[#44546f] pr-2">
          Workspace members can view and join all Workspace visible boards and
          create new boards in the Workspace. Adding new members will
          automatically update your billing.
        </p>
      </div>
      <hr className="border-b-gray-50 text-center mx-auto my-6" />

      {workspaceInfo?.admins?.some((admin) => admin?.userId === user?.uid) && (
        <>
          <div className="mb-6">
            <h1 className="font-sans text-xl text-[#44546f] font-semibold pr-2 mb-2">
              Invite members to join you
            </h1>
            <p className="font-sans text-sm text-[#44546f] pr-2">
              Anyone with an invite link can join this paid Workspace. You’ll be
              billed for each member that joins. You can also disable and create
              a new invite link for this Workspace at any time.
            </p>
          </div>
          <hr className="border-b-gray-50 text-center mx-auto my-6" />
        </>
      )}

      <div className="flex justify-between mb-4">
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
                          let allWorkspaceBoards =
                            workspaceInfo?.boards?.filter((eachBoard) => {
                              return eachBoard?.members?.some((eachMember) => {
                                return eachMember.userId === eachUser.userId;
                              });
                            });

                          console.log(allWorkspaceBoards);

                          return allWorkspaceBoards;
                        });
                      }}
                    >
                      <p className="text-[#172b4d] font-sans text-sm font-semibold cursor-pointer">
                        View Boards
                      </p>
                      {showBoardsOfUser === eachUser.userId && (
                        <div className="absolute left-[120px] bottom-[-50%] bg-white p-4 rounded w-[300px] max-h-[450px] overflow-y-auto z-[1801] border border-gray-200">
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
                                        }/${eachBoard?.title.replace(
                                          / /g,
                                          "-"
                                        )}`
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
      </div>
    </div>
  );
};

export default Members;
