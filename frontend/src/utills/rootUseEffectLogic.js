import { useEffect } from "react";
import { doc, collection, setDoc, getDocs, query } from "firebase/firestore";
import { db } from "../utills/firebase";

const rootUseEffectLogic = (
  templatesData,
  setTemplatesData,
  workspaceData,
  setWorkspaceData,
  allCardData,
  setAllCardData,
  userId,
  isLoading,
  setIsLoading
) => {
  useEffect(() => {
    const updateUserWorkspacesData = async () => {
      if (!workspaceData || !userId) return;

      const userDocRef = doc(db, "users", userId);
      const workspacesCollectionsRef = collection(userDocRef, "workspaces");
      const workspaceDocRef = doc(workspacesCollectionsRef, "workspacesDoc");
      console.log(workspaceData);
      console.log(userDocRef);
      console.log(workspacesCollectionsRef);
      console.log(workspaceDocRef);
      const querySnapshot = await getDocs(workspacesCollectionsRef);
      console.log(querySnapshot);
      try {
        // Check if the document exists
        const querySnapshot = await getDocs(workspacesCollectionsRef);
        console.log(
          "querySnapshot in rootUseEffectLogic",
          querySnapshot.docs[0].data()
        );
        if (!querySnapshot.empty) {
          // Document exists, update it with new data
          if (workspaceData.workspaces) {
            console.log(workspaceData);
            await setDoc(workspaceDocRef, workspaceData);
            console.log("Workspaces data updated in Firestore");
          }
        }
      } catch (error) {
        console.error("Error updating Workspaces data in Firestore:", error);
      }

      // const getWorkspaceData = async () => {
      //   const userDocRef = doc(db, "users", user?.uid);
      //   const workspacesCollectionRef = collection(userDocRef, "workspaces");
      //   const workspaceQuery = query(workspacesCollectionRef);
      //   const querySnapshot = await getDocs(workspaceQuery);
      //   const updatedWorkspaceData = querySnapshot?.docs[0]?.data();
      //   console.log(updatedWorkspaceData);
      //   setWorkspaceData(updatedWorkspaceData);
      // };
      // await getWorkspaceData();
    };

    const updateUserAllCardData = async () => {
      if (!allCardData || !userId) return;

      const userDocRef = doc(db, "users", userId);
      const allCardCollectionsRef = collection(userDocRef, "allCardData");
      const allCardDocRef = doc(allCardCollectionsRef, "allCardDataDoc");

      try {
        const querySnapshot = await getDocs(allCardCollectionsRef);

        if (!querySnapshot.empty) {
          console.log(querySnapshot);
          await setDoc(allCardDocRef, allCardData);
          console.log("allCardData updated in Firestore");
        }
      } catch (error) {
        console.error("Error updating allCardData in Firestore:", error);
      }

      // const getAllCardData = async () => {
      //   const userDocRef = doc(db, "users", user?.uid);
      //   const allcardDataCollectionRef = collection(userDocRef, "allCardData");
      //   const allcardDataQuery = query(allcardDataCollectionRef);
      //   const querySnapshot = await getDocs(allcardDataQuery);
      //   const updatedAllCardData = querySnapshot?.docs[0]?.data();
      //   setAllCardData(updatedAllCardData);
      // };
      // await getAllCardData();
    };

    const updateUserTemplatesData = async () => {
      if (!templatesData || !userId) return;

      const userDocRef = doc(db, "users", userId);
      const templatesCollectionsRef = collection(userDocRef, "templates");
      const templatesDocRef = doc(templatesCollectionsRef, "templatesDoc");

      try {
        const querySnapshot = await getDocs(templatesCollectionsRef);

        if (!querySnapshot.empty) {
          await setDoc(templatesDocRef, templatesData);
          console.log("Templates data updated in Firestore");
        }
      } catch (error) {
        console.error("Error updating Templates data in Firestore:", error);
      }

      // const getTemplatesData = async () => {
      //   const userDocRef = doc(db, "users", user?.uid);
      //   const templatesDataCollectionRef = collection(userDocRef, "templates");
      //   const templatesDataQuery = query(templatesDataCollectionRef);
      //   const querySnapshot = await getDocs(templatesDataQuery);
      //   const updatedTemplatesData = querySnapshot?.docs[0]?.data();
      //   setTemplatesData(updatedTemplatesData);
      // };
      // await getTemplatesData();
      setIsLoading(false);
    };

    // Call update functions for each data type
    if (userId) {
      updateUserWorkspacesData();
      updateUserAllCardData();
      updateUserTemplatesData();
    }
  }, [templatesData, workspaceData, allCardData]);
};

export default rootUseEffectLogic;
