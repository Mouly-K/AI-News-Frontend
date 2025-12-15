import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function NewsCardSkeleton() {
  return (
    <div className="block rounded-xl border">
      <div className="p-2">
        <Skeleton className="aspect-video w-full rounded-lg" />
      </div>
      <div className="px-3 pb-4 pt-2">
        <Skeleton className="mb-1 h-6 w-3/4 rounded" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-5/6 rounded" />
        </div>
        <Separator className="my-5" />
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="h-4 w-24 rounded" />
          </div>
          <Skeleton className="h-6 w-16 rounded" />
        </div>
      </div>
    </div>
  );
}
