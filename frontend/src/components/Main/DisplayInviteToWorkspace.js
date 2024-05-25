import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { db } from "../../utills/firebase";
import { collection, addDoc } from "firebase/firestore";
import sendInvitationEmail from "../../utills/sendEmail";

const DisplayInviteToWorkspace = ({
  setShowInviteWorkspace,
  workspaceInfo,
}) => {
  const inviteWorkspaceRef = useRef(null);
  const [showError, setShowError] = useState(false);

  // Function to send invitation
  const sendInvitation = async (email, workspaceId) => {
    try {
      // Add the invitation to Firestore
      const docRef = await addDoc(collection(db, "invitations"), {
        email: email,
        workspaceId: workspaceId,
        status: "pending",
      });

      // Send the invitation email
      //   await sendInvitationEmail(email, workspaceId);

      console.log("Invitation sent with ID: ", docRef.id);
    } catch (error) {
      console.error("Error sending invitation:", error);
    }
  };
  return (
    <div className="flex flex-col shadow-lg rounded-lg p-4 w-[360px] bg-white border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-custom text-lg font-semibold">
          Invite To Workspace
        </h1>
        <div onClick={() => setShowInviteWorkspace(false)}>
          <FontAwesomeIcon
            icon={faX}
            className="text-gray-500 text-sm cursor-pointer"
          />
        </div>
      </div>
      <input
        type="text"
        ref={inviteWorkspaceRef}
        className="outline-none py-2 px-4 rounded mb-4 bg-gray-200"
        placeholder="Enter email address here..."
      />
      <button
        className="w-full font-sans text-sm font-medium text-white bg-blue-600 rounded mr-4 h-[33px]"
        onClick={() =>
          sendInvitation(inviteWorkspaceRef.current.value, workspaceInfo.id)
        }
      >
        Send Invite
      </button>
      {showError && (
        <p className="text-sm text-red-600 mt-4">
          The email id is invalid. Enter valid email address.
        </p>
      )}
    </div>
  );
};

export default DisplayInviteToWorkspace;
