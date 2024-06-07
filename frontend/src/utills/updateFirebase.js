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

  let updatedFirebaseData = firebaseWorkspaceData?.workspaces?.map(
    (eachFirebaseWorkspace) => {
      console.log(eachFirebaseWorkspace.id);
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

  const firebaseWorkspaceIdArr = firebaseWorkspaceData?.workspaces?.map(
    (each) => each?.id
  );

  console.log(firebaseWorkspaceIdArr);

  const uniqueDataInUpdatedWorkspaceData =
    updatedWorkspaceData?.workspaces?.filter((eachWorkspace) => {
      return !firebaseWorkspaceIdArr?.includes(eachWorkspace?.id);
    });

  console.log(uniqueDataInUpdatedWorkspaceData);

  updatedFirebaseData =
    uniqueDataInUpdatedWorkspaceData &&
    uniqueDataInUpdatedWorkspaceData?.length !== 0
      ? [...updatedFirebaseData, ...uniqueDataInUpdatedWorkspaceData]
      : [...updatedFirebaseData];

  console.log(updatedFirebaseData);

  await updateDoc(workspacesDocRef, {
    workspaces: updatedFirebaseData,
  });
};
