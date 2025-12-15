import { createBrowserRouter, type RouteObject } from "react-router";
import type { Icon } from "@tabler/icons-react";
import { IconReport, IconSettings } from "@tabler/icons-react";

import App from "./pages/app/App";
import News from "./pages/app/News";
import Article from "./pages/app/article/Article";

const homePages: (RouteObject & {
  name: string;
  icon: Icon;
})[] = [
  {
    path: "/news",
    Component: News,
    name: "News",
    icon: IconReport,
  },
  {
    path: "/articles",
    Component: Article,
    name: "Article",
    icon: IconReport,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: News,
      },
      ...homePages.map((route) => ({
        path: route.path,
        Component: route.Component,
      })),
      {
        path: "/news/:genre",
        Component: News,
      },
      {
        path: "/articles/:genre",
        Component: Article,
      },
    ],
  },
]);

interface SidebarRoute {
  name: string;
  path: string;
  icon?: Icon;
  children?: SidebarRoute[];
}

const sidebarRoutes: { [key: string]: SidebarRoute[] } = {
  navMain: [
    ...homePages.map(
      (route) =>
        ({
          name: route.name,
          path: route.path,
          icon: route.icon,
        }) as SidebarRoute,
    ),
  ],
  navSecondary: [
    {
      name: "Settings",
      path: "/",
      icon: IconSettings,
    },
  ],
};

export default router;
export { sidebarRoutes, type SidebarRoute };
