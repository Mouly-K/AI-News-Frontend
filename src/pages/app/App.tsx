import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import Article from "@/components/article/article";

import News from "@/pages/app/news";

import { Settings } from "@/components/settings/settings";

export default function App() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <News />
        <Toaster position="top-right" />
      </SidebarInset>
      <Article />
      <Settings />
    </SidebarProvider>
  );
}
