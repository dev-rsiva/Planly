import Overview from "../pages/Overview.js";
import Home from "../components/Main/Home.js";
import Template from "../components/Main/Template.js";
import About from "../../About.js";
import Contact from "../../Contact.js";
import TemplateGallery from "../components/Main/TemplateGallery.js";
import TemplateCategorySection from "../components/Main/TemplateCategorySection.js";
import ListOfTemplateCards from "../components/Main/ListOfTemplateCards.js";
import Workspace from "../pages/Workspace.js";
import Boards from "../pages/Boards.js";
import OpenCard from "../components/Main/OpenCard.js";
import ListOfBoard from "../components/Main/ListOfBoard.js";
import Members from "../components/Main/Members.js";
import Settings from "../components/Main/Settings.js";
import Table from "../components/Main/Table.js";
import TemplateHomePage from "../components/Main/TemplateHomePage.js";
import WorkspaceHome from "../pages/WorkspaceHome.js";
import App from "../App.js";
import Login from "../pages/Login";
import { createBrowserRouter } from "react-router-dom";

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
          {
            path: "/w/:workspaceShortName/:workspaceName/Members",
            element: <Members />,
          },
          {
            path: "/w/:workspaceShortName/:workspaceName/Settings",
            element: <Settings />,
          },
          {
            path: "/w/:workspaceShortName/:workspaceName/Views",
            element: <Table />,
          },
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
