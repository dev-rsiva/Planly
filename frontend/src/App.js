import { useState, useEffect, useRef } from "react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Outlet, createBrowserRouter } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
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
import { createDropdownInfo } from "./utills/createDropdownInfo.js";
import TemplateHomePage from "./components/Main/TemplateHomePage.js";
import sideBarSelectionContext from "./utills/sideBarSelectionContext.js";
import Home from "./components/Main/Home.js";
import TemplateGallery from "./components/Main/TemplateGallery.js";
import TemplateCategorySection from "./components/Main/TemplateCategorySection.js";
import ListOfTemplateCards from "./components/Main/ListOfTemplateCards.js";
import Template from "./components/Main/Template.js";
import allTemplatesData from "./utills/allTemplatesData.js";
import WorkspaceHome from "./pages/WorkspaceHome.js";
import rootUseEffectLogic from "./utills/rootUseEffectLogic.js";

const App = () => {
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
  const paramObj = useParams();

  const useTemplateBtn = useRef();

  console.log(paramObj);

  rootUseEffectLogic(templatesData, workspaceData, allCardData);

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
