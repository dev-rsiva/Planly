import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import Header from "./components/Header/Header.js";
import dataContext from "./utills/dataContext.js";
import sideBarSelectionContext from "./utills/sideBarSelectionContext.js";
import { useAppState } from "./utills/useAppState.js";
import Login from "./pages/Login.js";
import Shimmer from "./utills/Shimmer.js";
import { data } from "./utills/utills.js";

const App = () => {
  console.log(data);
  const paramObj = useParams();
  const useTemplateBtn = useRef();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
  } = useAppState(user, setUser, isLoading, setIsLoading);

  console.log(allCardData);
  console.log(workspaceData);
  console.log(user);

  // if (!isUserAuthenticated) return <Shimmer />;
  // if (isLoading) return <Shimmer />;
  // if (!workspaceData || !allCardData || !templatesData) return <Shimmer />;
  if (!isUserAuthenticated)
    return (
      <Login
        setIsUserAuthenticated={setIsUserAuthenticated}
        user={user}
        setUser={setUser}
        workspaceData={workspaceData}
        setWorkspaceData={setWorkspaceData}
        setAllCardData={setAllCardData}
        setTemplatesData={setTemplatesData}
      />
    );

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
          <Header
            isUserAuthenticated={isUserAuthenticated}
            setIsUserAuthenticated={setIsUserAuthenticated}
            setIsLoading={setIsLoading}
          />
          <Outlet />
        </sideBarSelectionContext.Provider>
      </dataContext.Provider>
    </>
  );
};

export default App;
