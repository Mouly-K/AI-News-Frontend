import { useSettingsModal } from "@/providers/settings-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FeedsTab } from "./feeds-tab";
import { CategoriesTab } from "./categories-tab";

export function Settings() {
  const { open, setOpen } = useSettingsModal();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col">
        <DialogTitle>Settings</DialogTitle>
        <DialogDescription>Manage your feeds and categories</DialogDescription>
        <Tabs
          defaultValue="feeds"
          className="flex-1 flex flex-col overflow-hidden"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="feeds">Feeds</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>
          <TabsContent
            value="feeds"
            className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            <FeedsTab />
          </TabsContent>
          <TabsContent
            value="categories"
            className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            <CategoriesTab />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
