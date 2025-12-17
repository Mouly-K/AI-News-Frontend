type GT = { id: bigint; name: string; url?: string };

function isSelected<T extends GT>(selectedItems: T[], item: T) {
  return selectedItems.some((c) => c.id === item.id);
}

function toggleItemSelection<T extends { id: bigint }>(
  items: T[],
  item: T,
): T[] {
  if (items.find((f) => f.id === item.id)) {
    return items.filter((f) => f.id !== item.id);
  } else {
    return [...items, item];
  }
}

export { isSelected, toggleItemSelection };
export type { GT };
