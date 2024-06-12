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
  console.log("App Rendering started");
  const paramObj = useParams();
  const useTemplateBtn = useRef();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isSignInForm, setIsSignInForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showWorkspaceHeading, setShowWorkspaceHeading] = useState(true);
  const {
    workspaceData,
    setWorkspaceData,
    globalWorkspaceData,
    setGlobalWorkspaceData,
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
  } = useAppState(
    user,
    setUser,
    isSignInForm,
    setIsSignInForm,
    isLoading,
    setIsLoading
  );
  console.log(workspaceData);
  // if (!isUserAuthenticated) return <Shimmer />;

  // if (!workspaceData || !allCardData || !templatesData) return <Shimmer />;
  if (!isUserAuthenticated)
    return (
      <Login
        setIsLoading={setIsLoading}
        setIsUserAuthenticated={setIsUserAuthenticated}
        user={user}
        setIsSignInForm={setIsSignInForm}
        isSignInForm={isSignInForm}
        setUser={setUser}
        workspaceData={workspaceData}
        setWorkspaceData={setWorkspaceData}
        globalWorkspaceData={globalWorkspaceData}
        setGlobalWorkspaceData={setGlobalWorkspaceData}
        // setAllCardData={setAllCardData}
        setTemplatesData={setTemplatesData}
      />
    );

  if (isLoading) return <Shimmer />;

  return (
    <div className="">
      <dataContext.Provider
        value={{
          user,
          workspaceData,
          setWorkspaceData,
          currWorkspace,
          setCurrWorkspace,
          // allCardData,
          // setAllCardData,
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
          showWorkspaceHeading,
          setShowWorkspaceHeading,
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
    </div>
  );
};

export default App;
