import { useEffect } from "react";
import { doc, collection, setDoc, getDocs, query } from "firebase/firestore";
import { db } from "../utills/firebase";

const rootUseEffectLogic = (
  templatesData,
  setTemplatesData,
  globalWorkspaceData,
  setGlobalWorkspaceData,
  allCardData,
  setAllCardData,
  userId,
  isLoading,
  setIsLoading
) => {
  useEffect(() => {
    const updateUserWorkspacesData = async () => {
      if (!globalWorkspaceData || !userId) return;

      try {
        const workspacesCollectionsRef = collection(db, "workspaces");
        console.log(globalWorkspaceData);
        console.log(workspacesCollectionsRef);
        const querySnapshot = await getDocs(workspacesCollectionsRef);
        console.log(querySnapshot);
        console.log(
          "querySnapshot in rootUseEffectLogic for workspaceData",
          querySnapshot.docs[0].data()
        );
        // Check if the document exists
        if (!querySnapshot.empty) {
          // Document exists
          if (globalWorkspaceData?.workspaces) {
            // local state variable data exists, update firebase with local data
            console.log(globalWorkspaceData);
            const workspaceDocRef = doc(db, "workspaces", "workspaceData");
            await setDoc(workspaceDocRef, globalWorkspaceData);
            console.log("Workspaces data updated in Firestore");
          }
        }
      } catch (error) {
        console.error("Error updating Workspaces data in Firestore:", error);
      }
    };

    const updateUserTemplatesData = async () => {
      if (!templatesData || !userId) return;

      try {
        const templatesCollectionsRef = collection(db, "templates");
        console.log(templatesData);
        console.log(templatesCollectionsRef);
        const querySnapshot = await getDocs(templatesCollectionsRef);
        console.log(querySnapshot);
        console.log(
          "querySnapshot in rootUseEffectLogic for templatesData",
          querySnapshot.docs[0].data()
        );
        // Check if the document exists
        if (!querySnapshot.empty) {
          // Document exists
          if (templatesData.templates) {
            // local state variable data exists, update firebase with local data
            const templatesDocRef = doc(db, "templates", "templatesData");
            await setDoc(templatesDocRef, templatesData);
            console.log("Templates data updated in Firestore");
          }
        }
      } catch (error) {
        console.error("Error updating Templates data in Firestore:", error);
      }

      setIsLoading(false);
    };

    // Call update functions for each data type
    if (userId) {
      updateUserWorkspacesData();
      // updateUserAllCardData();
      updateUserTemplatesData();
    }
  }, [templatesData, globalWorkspaceData, allCardData]);
};

export default rootUseEffectLogic;
