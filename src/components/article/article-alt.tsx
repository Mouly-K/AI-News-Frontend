import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";

export function ArticleLoading() {
  return (
    <Empty className="w-full">
      <DrawerHeader>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Spinner />
          </EmptyMedia>
          <DrawerTitle asChild>
            <EmptyTitle>Loading article</EmptyTitle>
          </DrawerTitle>
          <DrawerDescription asChild>
            <EmptyDescription>
              Please wait while we load your article. Do not refresh the page.
            </EmptyDescription>
          </DrawerDescription>
        </EmptyHeader>
      </DrawerHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          Cancel
        </Button>
      </EmptyContent>
    </Empty>
  );
}

export function ArticleError() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>404 - Not Found</EmptyTitle>
        <EmptyDescription>
          The page you&apos;re looking for doesn&apos;t exist. Try searching for
          what you need below.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
