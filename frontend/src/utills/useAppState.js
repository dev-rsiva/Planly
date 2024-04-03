import { useState } from "react";
import { useLocation } from "react-router-dom";

import { data } from "./utills.js";
import { cardData } from "./cardData.js";
import allTemplatesData from "./allTemplatesData.js";
import { createDropdownInfo } from "./createDropdownInfo.js";
import rootUseEffectLogic from "./rootUseEffectLogic.js";

export const useAppState = () => {
  const [workspaceData, setWorkspaceData] = useState(() => {
    const storedData = localStorage.getItem("workspaceData");
    try {
      return storedData ? JSON.parse(storedData) : data;
    } catch (error) {
      console.error("Error parsing JSON from localStorage:", error);
      return data;
    }
  });

  const [currWorkspace, setCurrWorkspace] = useState("");

  const [allCardData, setAllCardData] = useState(() => {
    let storedCardData = localStorage.getItem("allCardData");

    try {
      if (storedCardData) {
        return JSON.parse(storedCardData);
      } else {
        return cardData;
      }
    } catch (error) {
      console.log("error:", error);
      return cardData;
    }
  });

  const [templatesData, setTemplatesData] = useState(() => {
    let storedTemplatesData = localStorage.getItem("templatesData");

    return storedTemplatesData
      ? JSON.parse(storedTemplatesData)
      : allTemplatesData;
  });

  console.log(templatesData);
  const location = useLocation();

  const isTemplatesPage = location.pathname.endsWith("/templates");

  console.log(isTemplatesPage);

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

  console.log(dropDownSourceClick);
  console.log(createBoardSourceClick);
  console.log(cardData);

  rootUseEffectLogic(templatesData, workspaceData, allCardData);

  return {
    workspaceData,
    setWorkspaceData,
    currWorkspace,
    setCurrWorkspace,
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
