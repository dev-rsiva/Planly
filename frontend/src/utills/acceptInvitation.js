import { db } from "./firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

// Function to accept invitation
const acceptInvitation = async (user) => {
  console.log(
    `Starting to accept invitation for email: ${user.email} and userId: ${user.uid}`
  );

  const q = query(
    collection(db, "invitations"),
    where("email", "==", user.email),
    where("status", "==", "pending")
  );

  const querySnapshot = await getDocs(q);
  console.log(
    `Found ${querySnapshot.size} pending invitations for email: ${user.email}`
  );

  querySnapshot.forEach(async (invitationDoc) => {
    const invitationData = invitationDoc.data();
    console.log(
      `Processing invitation for workspaceId: ${invitationData.workspaceId}`
    );

    // Assuming 'workspaceDataId' is a known ID for the document containing the workspaces array
    const workspaceDataId = "workspaceData"; // Change this to the actual document ID if different
    const workspaceDocRef = doc(db, "workspaces", workspaceDataId);

    // Get the workspace document
    const workspaceDoc = await getDoc(workspaceDocRef);
    if (workspaceDoc.exists()) {
      const workspaces = workspaceDoc.data().workspaces;
      console.log(`Fetched workspaces data: ${JSON.stringify(workspaces)}`);

      // Find the specific workspace using the invitation's workspaceId
      const workspaceIndex = workspaces.findIndex(
        (workspace) => workspace.id === invitationData.workspaceId
      );
      if (workspaceIndex !== -1) {
        console.log(`Workspace found at index: ${workspaceIndex}`);

        // Add the user as a member to the specific workspace
        const updatedMembers = [
          ...workspaces[workspaceIndex].members,
          {
            userId: user.uid,
            role: "member",
            name: user.displayName,
            email: user.email,
          },
        ];

        // Update the specific workspace members
        const updatedWorkspaces = [...workspaces];
        updatedWorkspaces[workspaceIndex] = {
          ...workspaces[workspaceIndex],
          members: updatedMembers,
        };

        console.log("Updated workspaces data:", updatedWorkspaces);

        // Update the workspace document
        await updateDoc(workspaceDocRef, {
          workspaces: updatedWorkspaces,
        });

        console.log(
          `User ${user.uid} added to workspace ${invitationData.workspaceId}`
        );
      } else {
        console.error(
          `Workspace with id ${invitationData.workspaceId} not found`
        );
      }
    } else {
      console.error(
        `Workspace document with id ${workspaceDataId} does not exist`
      );
    }

    // Update the invitation status to accepted
    await updateDoc(invitationDoc.ref, {
      status: "accepted",
    });

    console.log(`Invitation for email ${user.email} accepted`);
  });
};

// Usage
// const [user] = useAuthState(auth);
// if (user) {
//   acceptInvitation(user.email, user.uid);
// }

export default acceptInvitation;
