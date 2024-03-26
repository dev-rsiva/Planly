import { useState, useEffect, useRef } from "react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Outlet, createBrowserRouter } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
// import { useContext } from "react";
// import dataContext from "./utills/dataContext.js";
// import { Provider } from "react";
import { data } from "./utills/utills.js";
import { cardData } from "./utills/cardData.js";
import Header from "./components/Header/Header.js";
import Overview from "./pages/Overview.js";
import About from "../About.js";
import Contact from "../Contact.js";
import Workspace from "./pages/Workspace.js";
import Boards from "./pages/Boards.js";
import OpenCard from "./components/Main/OpenCard.js";

import ListOfBoard from "./components/Main/ListOfBoard.js";
import Members from "./components/Main/Members.js";
import dataContext from "./utills/dataContext.js";
import { recentlyViewedContext } from "./utills/recentlyViewedContext.js";
import { starredBoardsContext } from "./utills/starredBoardsContext.js";
import { createDropdownInfo } from "./utills/createDropdownInfo.js";

import TemplateCategory from "./components/Main/TemplateCategory.js";
import TemplateHomePage from "./components/Main/TemplateHomePage.js";
import sideBarSelectionContext from "./utills/sideBarSelectionContext.js";
import Home from "./components/Main/Home.js";
import TemplateGallery from "./components/Main/TemplateGallery.js";
import TemplateCategorySection from "./components/Main/TemplateCategorySection.js";
import ListOfTemplateCards from "./components/Main/ListOfTemplateCards.js";
import Template from "./components/Main/Template.js";
import allTemplatesData from "./utills/allTemplatesData.js";
import WorkspaceHome from "./pages/WorkspaceHome.js";

const App = () => {
  const [workspaceData, setWorkspaceData] = useState(() => {
    const storedData = localStorage.getItem("workspaceData");
    try {
      return storedData ? JSON.parse(storedData) : data;
    } catch (error) {
      console.error("Error parsing JSON from localStorage:", error);
      return data; // Provide a default value or handle the error accordingly
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

  // const [recentlyViewedBoards, setRecentlyViewedBoards] = useState(() => {
  //   let recentlyViewedBoards = JSON.parse(
  //     localStorage.getItem("recentlyViewedBoards")
  //   );
  //   return recentlyViewedBoards ? recentlyViewedBoards : [];
  // });

  // const [starredBoards, setStarredBoards] = useState(() => {
  //   let starredBoards = JSON.parse(localStorage.getItem("starredBoards"));

  //   return starredBoards ? starredBoards : [];
  // });

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
<<<<<<< HEAD
    return isTemplatesPage ? "Templates" : "Boards";
=======
    return isTemplatesPage ? "Templates" : "Home";
>>>>>>> 2c1169d5b7c9f52a1b585d2c121d1615924fde6b
  });

  const [createBoardWithTemplateCard, setCreateBoardWithTemplateCard] =
    useState(false);

  const [templateSelected, setTemplateSelected] = useState("");
  const [dropDownSourceClick, setDropDownSourceClick] = useState("");
  const [createBoardSourceClick, setCreateBoardSourceClick] = useState("");

  console.log(dropDownSourceClick);
  console.log(createBoardSourceClick);
  console.log(cardData);
  const paramObj = useParams();

  const useTemplateBtn = useRef();

  console.log(paramObj);

  useEffect(() => {
    localStorage.setItem("templatesData", JSON.stringify(templatesData));
  }, [templatesData]);

  useEffect(() => {
    localStorage.setItem("workspaceData", JSON.stringify(workspaceData));
  }, [workspaceData]);

  useEffect(() => {
    localStorage.setItem("allCardData", JSON.stringify(allCardData));
  }, [allCardData]);

  useEffect(() => {
    console.log("workspaceData changes:", workspaceData);
  }, [workspaceData]);

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
          {/* <dataContext.Provider value={workspaceData}> */}
          <Header
          // workspaceData={workspaceData}
          // setWorkspaceData={setWorkspaceData}
          // currWorkspace={currWorkspace}
          // setCurrWorkspace={setCurrWorkspace}
          />

          <Outlet
          // context={[
          //   workspaceData,
          //   setWorkspaceData,
          //   // currWorkspace,
          //   // setCurrWorkspace,
          // ]}
          />
        </sideBarSelectionContext.Provider>
        {/* </dataContext.Provider> */}
      </dataContext.Provider>
    </>
  );
};

export default App;

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/user", element: <Overview /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      {
        path: "/w/:workspaceShortName/:workspaceName",
        element: <Workspace />,
        children: [
          {
            path: "/w/:workspaceShortName/:workspaceName",
            element: <ListOfBoard />,
          },
          { path: "Members", element: <Members /> },
        ],
      },
      { path: "/w/:workspaceShortName/Home", element: <WorkspaceHome /> },
      { path: "/b/:boardId/:boardName", element: <Boards /> },
      { path: "/c/:cardId/:cardName", element: <OpenCard /> },
      {
        path: "/templates",
        element: <TemplateHomePage />,
        children: [
          {
            path: "/templates",
            element: <TemplateGallery />,
          },
          {
            path: "/templates/:templateCategory",
            element: <TemplateCategorySection />,
            children: [
              {
                path: "/templates/:templateCategory",
                element: <ListOfTemplateCards />,
              },
              {
                path: "/templates/:templateCategory/:templateId",
                element: <Template />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

const rootEl = document.getElementById("root");
const root = ReactDOM.createRoot(rootEl);

root.render(<RouterProvider router={appRouter} />);

// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import { RouterProvider } from "react-router-dom";
// import { appRouter } from "./App";

// const rootEl = document.getElementById("root");
// const root = ReactDOM.createRoot(rootEl);

// root.render(<RouterProvider router={appRouter} />);
