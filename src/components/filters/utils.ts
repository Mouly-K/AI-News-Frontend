type GT = { id: bigint | string; name: string; url?: string; feedUrl?: string };

function isSelected<T extends GT>(selectedItems: T[], item: T) {
  return selectedItems.some((c) => c.id === item.id);
}

function toggleItemSelection<T extends GT>(items: T[], item: T): T[] {
  if (items.find((f) => f.id === item.id)) {
    return items.filter((f) => f.id !== item.id);
  } else {
    return [...items, item];
  }
}

export { isSelected, toggleItemSelection };
export type { GT };
