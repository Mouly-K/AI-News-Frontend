import { createBrowserRouter } from "react-router";

import App from "./pages/app/App";

const router = createBrowserRouter([
  // TODO: User authentication, login
  {
    path: "/",
    Component: App,
  },
]);

export default router;
