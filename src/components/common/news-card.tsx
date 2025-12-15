import { NavLink } from "react-router";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import type { RssItem } from "@/types/rss-feed";

export default function NewsCard({
  title,
  description,
  images,
  categories,
  link,
  pubDate,
  readTime,
  source,
}: RssItem & { source: { title: string; url: string; image: string } }) {
  return (
    <NavLink
      className="block rounded-xl border hover:shadow-md transition-shadow"
      to={`/articles/?url=${encodeURIComponent(link)}`}
    >
      <div className="p-2">
        <img
          className="aspect-video w-full rounded-lg object-cover bg-linear-to-r from-blue-600 to-violet-600"
          src={images?.[0]}
        />
      </div>
      <div className="px-3 pb-4 pt-2">
        <h2 className="mb-1 font-medium line-clamp-1">{title}</h2>
        <p className="text-muted-foreground line-clamp-2 text-sm">
          {description}
        </p>
        <Separator className="my-5" />
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={source.image} alt={source.title} />
            </Avatar>
            <span className="text-sm font-medium">{source.title}</span>
          </div>
          <Badge variant="secondary">{readTime} Read</Badge>
        </div>
      </div>
    </NavLink>
  );
}
