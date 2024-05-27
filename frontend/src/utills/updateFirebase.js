import { db } from "./firebase";
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

export const updateFirebaseDoc = async (updatedWorkspaceData) => {
  console.log(updatedWorkspaceData);
  const workspacesDocRef = doc(db, "workspaces", "workspaceData");
  const dataNow = await getDoc(workspacesDocRef);
  console.log(dataNow.data());
  const firebaseWorkspaceData = dataNow.data();

  const localWorkspaceIdArr = updatedWorkspaceData?.workspaces?.map(
    (each) => each?.id
  );
  console.log(localWorkspaceIdArr);

  const updatedFirebaseData = firebaseWorkspaceData?.workspaces?.map(
    (eachFirebaseWorkspace) => {
      if (!localWorkspaceIdArr?.includes(eachFirebaseWorkspace.id)) {
        console.log(eachFirebaseWorkspace);
        return eachFirebaseWorkspace;
      }

      let indexOfLocalWorkspace = updatedWorkspaceData?.workspaces?.findIndex(
        (eachLocalWorkspace) =>
          eachLocalWorkspace.id === eachFirebaseWorkspace.id
      );

      console.log(indexOfLocalWorkspace);
      console.log(updatedWorkspaceData?.workspaces[indexOfLocalWorkspace]);

      return { ...updatedWorkspaceData?.workspaces[indexOfLocalWorkspace] };
    }
  );

  console.log(updatedFirebaseData);

  await updateDoc(workspacesDocRef, {
    workspaces: updatedFirebaseData,
  });
};
