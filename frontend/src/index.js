import ReactDOM from "react-dom/client";
import { appRouter } from "./utills/routerConfiguration";
import { RouterProvider } from "react-router-dom";

const rootEl = document.getElementById("root");
const root = ReactDOM.createRoot(rootEl);

root.render(<RouterProvider router={appRouter} />);
