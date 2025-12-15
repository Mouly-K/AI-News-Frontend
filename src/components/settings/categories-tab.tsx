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
import { useCategories, useCreateCategory } from "@/hooks/use-categories";
import { useSettings } from "@/providers/settings";

export function CategoriesTab() {
  const [newCategoryName, setNewCategoryName] = useState("");

  const { data: categories = [], isLoading } = useCategories();
  const { setSettings } = useSettings();
  const createCategoryMutation = useCreateCategory();

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newCategoryName.trim()) {
      return;
    }

    try {
      const newCategory =
        await createCategoryMutation.mutateAsync(newCategoryName);

      // Sync with settings context
      setSettings((prev) => ({
        ...prev,
        categories: [...prev.categories, newCategory],
      }));

      setNewCategoryName("");
    } catch (error) {
      // Error handling is done in the mutation hook
      console.error("Error adding category:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-muted-foreground">Loading categories...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Categories List */}
      <Card className="flex flex-col flex-1">
        <CardHeader>
          <CardTitle>Your Categories</CardTitle>
          <CardDescription>
            {categories.length === 0
              ? "No categories yet. Create one below!"
              : `You have ${categories.length} categor${categories.length !== 1 ? "ies" : "y"}`}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden flex flex-col">
          {categories.length > 0 ? (
            <ScrollArea className="flex-1">
              <div className="flex flex-wrap gap-2 pr-4">
                {categories.map((category) => (
                  <Badge
                    key={String(category.id)}
                    variant="secondary"
                    className="text-sm py-2 px-3"
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex items-center justify-center py-8 text-muted-foreground">
              <p>No categories created yet</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Category Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Create New Category</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddCategory} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="category-name">Category Name</Label>
              <Input
                id="category-name"
                placeholder="e.g., Technology, Science, Business"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                disabled={createCategoryMutation.isPending}
              />
            </div>

            <Button
              type="submit"
              disabled={createCategoryMutation.isPending}
              className="w-full"
            >
              {createCategoryMutation.isPending
                ? "Creating..."
                : "Create Category"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
