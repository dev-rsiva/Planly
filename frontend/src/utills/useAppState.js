import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { data } from "./utills.js";
import { cardData } from "./cardData.js";
import allTemplatesData from "./allTemplatesData.js";
import { createDropdownInfo } from "./createDropdownInfo.js";
import rootUseEffectLogic from "./rootUseEffectLogic.js";
import { auth, db } from "./firebase.js";
import {
  doc,
  collection,
  query,
  where,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export const useAppState = (
  user,
  setUser,
  isSignInForm,
  setIsSignInForm,
  isLoading,
  setIsLoading
) => {
  console.log(user);
  const [globalWorkspaceData, setGlobalWorkspaceData] = useState(null);
  const [workspaceData, setWorkspaceData] = useState(null);

  // const [currWorkspace, setCurrWorkspace] = useState("");

  const [allCardData, setAllCardData] = useState(null);

  const [templatesData, setTemplatesData] = useState(null);

  console.log(globalWorkspaceData);
  console.log(templatesData);
  const location = useLocation();

  const isTemplatesPage = location.pathname.endsWith("/templates");

  const [createDropdownDetails, setCreateDropdownDetails] =
    useState(createDropdownInfo);

  const [sidebarSelection, setSidebarSelection] = useState(() => {
    return isTemplatesPage ? "Templates" : "Boards";
  });

  const [createBoardWithTemplateCard, setCreateBoardWithTemplateCard] =
    useState(false);

  const [templateSelected, setTemplateSelected] = useState("");
  const [dropDownSourceClick, setDropDownSourceClick] = useState("");
  const [createBoardSourceClick, setCreateBoardSourceClick] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        console.log("oAuth changed");
        if (user) {
          console.log("user is available");
          const workspaceCollectionRef = collection(db, "workspaces");
          const querySnapshot = await getDocs(workspaceCollectionRef);
          console.log(querySnapshot);
          if (!querySnapshot?.docs[0]?.data()) {
            console.log("document not exist");
            //if the document doesn't exist, but the user exists means it is first time user, so signup logic will take care of updating the workspaceData, so, return from the function
            return;
          }

          //if the document exist, also the user exist means, the page is refreshing now, so update the workspaceData.
          const globalWorkspaceData = querySnapshot.docs[0].data();
          console.log(globalWorkspaceData);

          if (!isSignInForm) {
            setGlobalWorkspaceData(globalWorkspaceData);
          }
          // setUser(user);
          setIsLoading(false);
        } else {
          setGlobalWorkspaceData(null);
          setIsLoading(false);
        }

        if (user) {
          const templatesCollectionRef = collection(db, "templates");
          const querySnapshot = await getDocs(templatesCollectionRef);

          if (!querySnapshot?.docs[0]?.data()) {
            //if the document doesn't exist, but the user exists means it is first time user, so signup logic will take care of updating the templatesData, so, return from the function
            return;
          }

          const templatesData = querySnapshot.docs[0].data();
          console.log(templatesData);
          setTemplatesData(templatesData);
          // setUser(user);
          setIsLoading(false);
        } else {
          setTemplatesData(null);
          setIsLoading(false);
        }
      });

      return () => unsubscribe();
    };

    fetchData();
  }, [user]);

  rootUseEffectLogic(
    templatesData,
    setTemplatesData,
    workspaceData,
    setWorkspaceData,
    globalWorkspaceData,
    setGlobalWorkspaceData,
    allCardData,
    setAllCardData,
    user?.uid,
    isLoading,
    setIsLoading
  );

  console.log(allCardData);
  return {
    workspaceData,
    setWorkspaceData,
    globalWorkspaceData,
    setGlobalWorkspaceData,
    allCardData,
    setAllCardData,
    templatesData,
    setTemplatesData,
    createBoardWithTemplateCard,
    setCreateBoardWithTemplateCard,
    templateSelected,
    setTemplateSelected,
    dropDownSourceClick,
    setDropDownSourceClick,
    createDropdownDetails,
    setCreateDropdownDetails,
    createBoardSourceClick,
    setCreateBoardSourceClick,
    sidebarSelection,
    setSidebarSelection,
  };
};
