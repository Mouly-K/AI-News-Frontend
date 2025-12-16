import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import type { RssFeed, RssItem } from "@/types/rss-feed";

export default function NewsCard({
  title,
  description,
  images,
  categories,
  link,
  pubDate,
  readTime,
  source,
  onClick,
  className,
}: RssItem & {
  source?: RssFeed | null;
} & React.ComponentProps<"div">) {
  const sourceHostname = source?.link ? new URL(source.link).hostname : "";

  return (
    <div
      className={`cursor-pointer block rounded-xl border hover:shadow-md transition-shadow ${className}`}
      onClick={onClick}
    >
      {images?.[0] && (
        <div className="p-2">
          <img
            className="aspect-video w-full rounded-lg object-cover bg-linear-to-r from-blue-600 to-violet-600"
            src={images?.[0]}
          />
        </div>
      )}
      <div className="px-3 pb-4 pt-2">
        <h2 className={`mb-1 font-medium ${!images?.[0] && "mt-1 mb-2"}`}>
          {title}
        </h2>
        <p className="text-muted-foreground text-sm">{description}</p>
        <Separator className="my-5" />
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage
                className="object-contain"
                src={`https://icon.horse/icon/${sourceHostname}`}
                alt={`https://icons.duckduckgo.com/ip2/${sourceHostname}.ico`}
              />
            </Avatar>
            <span className="text-sm font-medium">{source?.title}</span>
          </div>
          {readTime ? (
            <Badge variant="secondary">{readTime} read</Badge>
          ) : (
            <Badge variant="secondary">
              {source?.categories?.[0].name || categories?.[0]}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
