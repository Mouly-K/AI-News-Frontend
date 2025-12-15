import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { FeedCard } from "./feed-card";
import { useFeeds, useCreateFeed, useDeleteFeed } from "@/hooks/use-feeds";
import { useCategories } from "@/hooks/use-categories";
import { useSettings } from "@/providers/settings";

export function FeedsTab() {
  // Keeping the states separate to prevent state updates from affecting each other
  const [newFeedName, setNewFeedName] = useState("");
  const [newFeedUrl, setNewFeedUrl] = useState("");
  const [newFeedImage, setNewFeedImage] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<bigint[]>([]);

  const { data: feeds = [], isLoading: feedsLoading } = useFeeds();
  const { data: categories = [] } = useCategories();
  const { setSettings } = useSettings();
  const createFeedMutation = useCreateFeed();
  const deleteFeedMutation = useDeleteFeed();

  const handleAddFeed = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newFeedName.trim() || !newFeedUrl.trim()) {
      return;
    }

    if (selectedCategories.length === 0) {
      return;
    }

    try {
      const newFeed = await createFeedMutation.mutateAsync({
        name: newFeedName,
        url: newFeedUrl,
        img_url: newFeedImage || undefined,
        categoryIds: selectedCategories,
      });

      // Sync with settings context
      setSettings((prev) => ({
        ...prev,
        feeds: [...prev.feeds, newFeed],
      }));

      setNewFeedName("");
      setNewFeedUrl("");
      setNewFeedImage("");
      setSelectedCategories([]);
    } catch (error) {
      // Error handling is done in the mutation hook
      console.error("Error adding feed:", error);
    }
  };

  const handleDeleteFeed = (feedId: bigint) => {
    deleteFeedMutation.mutate(feedId, {
      onSuccess: () => {
        // Sync with settings context
        setSettings((prev) => ({
          ...prev,
          feeds: prev.feeds.filter((feed) => feed.id !== feedId),
        }));
      },
    });
  };

  if (feedsLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-muted-foreground">Loading feeds...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Feeds List */}
      <Card className="flex flex-col flex-1">
        <CardHeader>
          <CardTitle>Your Feeds</CardTitle>
          <CardDescription>
            {feeds.length === 0
              ? "No feeds yet. Add one below!"
              : `You have ${feeds.length} feed${feeds.length !== 1 ? "s" : ""}`}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden flex flex-col">
          {feeds.length > 0 ? (
            <ScrollArea className="flex-1">
              <div className="space-y-3 pr-4">
                {feeds.map((feed) => (
                  <FeedCard
                    key={String(feed.id)}
                    feed={feed}
                    onDelete={() => handleDeleteFeed(feed.id)}
                  />
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex items-center justify-center py-8 text-muted-foreground">
              <p>No feeds added yet</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Feed Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Add New Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddFeed} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="feed-name">Feed Name</Label>
              <Input
                id="feed-name"
                placeholder="e.g., Tech News Daily"
                value={newFeedName}
                onChange={(e) => setNewFeedName(e.target.value)}
                disabled={createFeedMutation.isPending}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="feed-url">Feed URL</Label>
              <Input
                id="feed-url"
                placeholder="e.g., https://example.com/feed.xml"
                type="url"
                value={newFeedUrl}
                onChange={(e) => setNewFeedUrl(e.target.value)}
                disabled={createFeedMutation.isPending}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="feed-image">Image URL (Optional)</Label>
              <Input
                id="feed-image"
                placeholder="e.g., https://example.com/logo.png"
                type="url"
                value={newFeedImage}
                onChange={(e) => setNewFeedImage(e.target.value)}
                disabled={createFeedMutation.isPending}
              />
            </div>

            <div className="grid gap-2">
              <Label>Categories (Required)</Label>
              <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-muted/50 min-h-10">
                {categories.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No categories available. Create one in the Categories tab.
                  </p>
                ) : (
                  categories.map((category) => (
                    <Badge
                      key={String(category.id)}
                      variant={
                        selectedCategories.includes(category.id)
                          ? "default"
                          : "outline"
                      }
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedCategories((prev) =>
                          prev.includes(category.id)
                            ? prev.filter((id) => id !== category.id)
                            : [...prev, category.id],
                        );
                      }}
                    >
                      {category.name}
                    </Badge>
                  ))
                )}
              </div>
              {selectedCategories.length === 0 && categories.length > 0 && (
                <p className="text-xs text-destructive">
                  At least one category must be selected
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={createFeedMutation.isPending || categories.length === 0}
              className="w-full"
            >
              {createFeedMutation.isPending ? "Adding..." : "Add Feed"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
