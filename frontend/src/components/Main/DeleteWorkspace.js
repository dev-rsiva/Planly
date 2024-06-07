import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimeInput from "./TimeInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import dataContext from "../../utills/dataContext";

import { updateFirebaseDoc } from "../../utills/updateFirebase";
import { createUpdatedWorkspaceDataType1 } from "../../utills/createUpdatedWorkspaceDataType1";
import { db } from "../../utills/firebase";
import {
  doc,
  collection,
  setDoc,
  getDocs,
  getDoc,
  updateDoc,
  arrayUnion,
  query,
} from "firebase/firestore";

const DeleteWorkspace = ({
  setShowDeleteWorkspace,
  workspaceData,
  workspaceInfo,
  user,
}) => {
  const deleteWorkspaceRef = useRef();
  const navigate = useNavigate();

  const deleteWorkspace = async (e) => {
    e.stopPropagation();

    if (
      !workspaceInfo?.admins?.some(
        (eachAdmin) => eachAdmin?.userId === user?.uid
      )
    ) {
      console.log("Not an admin");
      return;
    }

    console.log("deleting workspace");

    const workspacesDocRef = doc(db, "workspaces", "workspaceData");
    const dataNow = await getDoc(workspacesDocRef);
    console.log(dataNow.data());
    const firebaseWorkspaceData = dataNow.data();

    let updatedFirebaseData = firebaseWorkspaceData?.workspaces?.filter(
      (eachFirebaseWorkspace) => {
        console.log(eachFirebaseWorkspace.id);
        return eachFirebaseWorkspace?.id !== workspaceInfo?.id;
      }
    );

    console.log(updatedFirebaseData);

    await updateDoc(workspacesDocRef, {
      workspaces: updatedFirebaseData,
    });

    setShowDeleteWorkspace(false);
    navigate("/");
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      e.stopPropagation();
      if (!deleteWorkspaceRef?.current?.contains(e.target)) {
        setShowDeleteWorkspace(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <>
      <div
        ref={deleteWorkspaceRef}
        onClick={(e) => e.stopPropagation()}
        className="absolute left-[175px] bottom-0 bg-gray-50 p-4 rounded-md w-[300px] z-[1801] border border-gray-400"
      >
        <div className="flex justify-between items-center mb-3">
          <p className="flex-grow text-center font-sans text-sm font-semibold text-[#172b4d]">
            Delete workspace?
          </p>
          <div
            className="ml-2"
            onClick={(e) => {
              e.stopPropagation();
              setShowDeleteWorkspace(false);
            }}
          >
            <FontAwesomeIcon icon={faX} className="cursor-pointer text-xs" />
          </div>
        </div>

        {workspaceInfo?.admins.some(
          (eachAdmin) => eachAdmin?.userId === user?.uid
        ) ? (
          <>
            <div className="mt-4">
              <p className="font-sans text-sm">
                Deleting an Workspace is permanent and there is no way to get it
                back.
              </p>
            </div>

            <div>
              <button
                className={`mt-4 rounded py-2 px-2 my-3 text-sm font-semibold font-sans w-full ${
                  false ? "bg-gray-400 text-gray-600" : "bg-red-700 text-white"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteWorkspace(false);
                  deleteWorkspace(e);
                }}
              >
                Delete workspace
              </button>
            </div>
          </>
        ) : (
          <div className="mt-4">
            <p className="font-sans text-sm">
              Only Workspace Admin can delete the workspace.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default DeleteWorkspace;
