import React from "react";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import Header from "./components/Header/Header.js";
import dataContext from "./utills/dataContext.js";
import sideBarSelectionContext from "./utills/sideBarSelectionContext.js";
import { useAppState } from "./utills/useAppState.js";

const App = () => {
  const paramObj = useParams();
  const useTemplateBtn = useRef();
  console.log(paramObj);

  const {
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
  } = useAppState();

  return (
    <>
      <dataContext.Provider
        value={{
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
          useTemplateBtn,
          createDropdownDetails,
          setCreateDropdownDetails,
          createBoardSourceClick,
          setCreateBoardSourceClick,
        }}
      >
        <sideBarSelectionContext.Provider
          value={{ sidebarSelection, setSidebarSelection }}
        >
          <Header />
          <Outlet />
        </sideBarSelectionContext.Provider>
      </dataContext.Provider>
    </>
  );
};

export default App;
