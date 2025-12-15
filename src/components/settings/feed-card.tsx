import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import type { Category } from "@/types/category";

interface Feed {
  id: bigint;
  name: string;
  url: string;
  img_url: string | null;
  created_at: string;
  categories: Category[];
}

interface FeedCardProps {
  feed: Feed;
  onDelete: () => void;
}

export function FeedCard({ feed, onDelete }: FeedCardProps) {
  return (
    <div className="flex items-start gap-4 p-3 border rounded-lg bg-card hover:bg-accent/50 transition-colors">
      {/* Feed Image */}
      <div className="shrink-0">
        {feed.img_url ? (
          <img
            src={feed.img_url}
            alt={feed.name}
            className="w-12 h-12 rounded object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div className="w-12 h-12 rounded bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground">
            {feed.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Feed Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm leading-tight mb-1 truncate">
          {feed.name}
        </h3>
        <p className="text-xs text-muted-foreground truncate mb-2">
          {feed.url}
        </p>

        {/* Categories */}
        <div className="flex flex-wrap gap-1">
          {feed.categories.length === 0 ? (
            <Badge variant="outline" className="text-xs">
              No categories
            </Badge>
          ) : (
            feed.categories.map((category) => (
              <Badge
                key={String(category.id)}
                variant="secondary"
                className="text-xs"
              >
                {category.name}
              </Badge>
            ))
          )}
        </div>
      </div>

      {/* Delete Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onDelete}
        className="shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="w-4 h-4" />
        <span className="sr-only">Delete feed</span>
      </Button>
    </div>
  );
}
