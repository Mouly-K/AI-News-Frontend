import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

import { useArticle } from "@/hooks/use-article";

export default function Article({
  url,
  isOpen,
  setIsOpen,
}: {
  url: string | null;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { data, isLoading, isError } = useArticle(url || "");

  return (
    data?.content && (
      <Drawer open={isOpen} onOpenChange={setIsOpen} dismissible={true}>
        <DrawerContent>
          <div className="mx-auto flex w-full max-w-2xl min-w-0 flex-1 flex-col gap-8 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <DrawerHeader>
              <DrawerTitle className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
                {data.title}
              </DrawerTitle>
              <DrawerDescription className="text-muted-foreground text-xl leading-7">
                {data.excerpt}
              </DrawerDescription>
            </DrawerHeader>
            <article
              id="readability-page"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
            <DrawerFooter>
              <DrawerClose asChild>
                <Button
                  className="max-w-fit"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    )
  );
}
