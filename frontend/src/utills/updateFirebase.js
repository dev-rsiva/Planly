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

  try {
    await updateDoc(workspacesDocRef, {
      workspaces: updatedFirebaseData,
    });
  } catch (error) {
    console.log("Error updating the data:", error);
  }
};

// import { db } from "./firebase";
// import { doc, getDoc, updateDoc } from "firebase/firestore";

// export const updateFirebaseDoc = async (updatedWorkspaceData) => {
//   console.log("Updated Workspace Data:", updatedWorkspaceData);

//   const workspacesDocRef = doc(db, "workspaces", "workspaceData");
//   let dataNow;

//   try {
//     dataNow = await getDoc(workspacesDocRef);
//     if (!dataNow.exists()) {
//       throw new Error("Document does not exist");
//     }
//   } catch (error) {
//     console.error("Error fetching document:", error);
//     return;
//   }

//   const firebaseWorkspaceData = dataNow.data();
//   console.log("Firebase Workspace Data:", firebaseWorkspaceData);

//   const localWorkspaceIdArr = updatedWorkspaceData?.workspaces?.map(
//     (each) => each?.id
//   );
//   console.log("Local Workspace IDs:", localWorkspaceIdArr);

//   let updatedFirebaseData = firebaseWorkspaceData?.workspaces?.map(
//     (eachFirebaseWorkspace) => {
//       if (!localWorkspaceIdArr?.includes(eachFirebaseWorkspace.id)) {
//         return eachFirebaseWorkspace;
//       }

//       const indexOfLocalWorkspace = updatedWorkspaceData?.workspaces?.findIndex(
//         (eachLocalWorkspace) =>
//           eachLocalWorkspace.id === eachFirebaseWorkspace.id
//       );

//       return { ...updatedWorkspaceData?.workspaces[indexOfLocalWorkspace] };
//     }
//   );

//   console.log("Updated Firebase Data after mapping:", updatedFirebaseData);

//   const firebaseWorkspaceIdArr = firebaseWorkspaceData?.workspaces?.map(
//     (each) => each?.id
//   );

//   console.log("Firebase Workspace IDs:", firebaseWorkspaceIdArr);

//   const uniqueDataInUpdatedWorkspaceData =
//     updatedWorkspaceData?.workspaces?.filter((eachWorkspace) => {
//       return !firebaseWorkspaceIdArr?.includes(eachWorkspace?.id);
//     });

//   console.log(
//     "Unique Data in Updated Workspace Data:",
//     uniqueDataInUpdatedWorkspaceData
//   );

//   updatedFirebaseData =
//     uniqueDataInUpdatedWorkspaceData &&
//     uniqueDataInUpdatedWorkspaceData.length !== 0
//       ? [...updatedFirebaseData, ...uniqueDataInUpdatedWorkspaceData]
//       : [...updatedFirebaseData];

//   console.log("Final Updated Firebase Data:", updatedFirebaseData);

//   try {
//     await updateDoc(workspacesDocRef, {
//       workspaces: updatedFirebaseData,
//     });
//     console.log("Document successfully updated!");
//   } catch (error) {
//     console.error("Error updating the data:", error);
//   }
// };
