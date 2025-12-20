import { Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

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
  const sourceHostname = feed?.url ? new URL(feed.url).hostname : "";
  const favicon1 = `https://icon.horse/icon/${sourceHostname}`;
  const favicon2 = `https://icons.duckduckgo.com/ip2/${sourceHostname}.ico`;

  const imageUrl = feed.img_url ? feed.img_url : favicon1;
  const mageAltUrl = feed.img_url ? favicon1 : favicon2;

  return (
    <div className="flex items-start gap-4 p-3 border rounded-lg bg-card hover:bg-accent/50 transition-colors">
      {/* Feed Image */}
      <div className="shrink-0">
        <Avatar className="h-9 w-9">
          <AvatarImage
            className="object-contain"
            src={imageUrl}
            alt={mageAltUrl}
          />
        </Avatar>
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
