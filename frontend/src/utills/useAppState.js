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

export const useAppState = (user, setUser, isLoading, setIsLoading) => {
  console.log(user);
  const [workspaceData, setWorkspaceData] = useState(null);

  // const [currWorkspace, setCurrWorkspace] = useState("");

  const [allCardData, setAllCardData] = useState(null);

  const [templatesData, setTemplatesData] = useState(null);

  console.log(workspaceData);
  console.log(allCardData);
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
          const userDocRef = doc(db, "users", user.uid);
          const workspacesCollectionRef = collection(userDocRef, "workspaces");
          // const workspaceDocRef = doc(workspacesCollectionRef, "workspacesDoc");
          const querySnapshot = await getDocs(workspacesCollectionRef);
          console.log(querySnapshot);
          if (!querySnapshot?.docs[0]?.data()) {
            console.log("document not exist");
            //if the document doesn't exist, but the user exists means it is first time user, so signup logic will take care of updating the workspaceData, so, return from the function
            return;
          }

          //if the document exist, also the user exist means, the page is refreshing now, so update the workspaceData.
          const workspaceData = querySnapshot.docs[0].data();
          console.log(workspaceData);
          setWorkspaceData(workspaceData);
          // setUser(user);
          setIsLoading(false);
        } else {
          setWorkspaceData(null);
          setIsLoading(false);
        }

        if (user) {
          const userDocRef = doc(db, "users", user.uid);
          const allCardDataCollectionRef = collection(
            userDocRef,
            "allCardData"
          );
          // const workspaceDocRef = doc(
          //   allCardDataCollectionRef,
          //   "allCardDataDoc"
          // );
          const querySnapshot = await getDocs(allCardDataCollectionRef);

          if (!querySnapshot?.docs[0]?.data()) {
            //if the document doesn't exist, but the user exists means it is first time user, so signup logic will take care of updating the allCardData, so, return from the function
            return;
          }

          //if the document exist, also the user exist means, the page is refreshing now, so update the allCardData.
          const allCardData = querySnapshot.docs[0].data();
          console.log(allCardData);
          setAllCardData(allCardData);
          // setUser(user);
          setIsLoading(false);
        } else {
          setAllCardData(null);
          setIsLoading(false);
        }

        if (user) {
          const userDocRef = doc(db, "users", user.uid);
          const workspacesCollectionRef = collection(userDocRef, "templates");
          const querySnapshot = await getDocs(workspacesCollectionRef);

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
