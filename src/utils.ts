import type { SidebarRoute } from "./routes";

const DEFAULT_MAX_AGE = 300;

// General helpers
function indexBy<T extends Record<K, T[K]>, K extends keyof T>(
  array: readonly T[],
  key: K,
): { [key in K]: Omit<T, K> } {
  return array.reduce(
    (acc, item) => {
      const keyValue = item[key];
      const { [key]: _, ...rest } = item;
      acc[keyValue] = rest;
      return acc;
    },
    {} as { [key in K]: Omit<T, K> },
  );
}

function filterObject<T extends Record<K, T[K]>, K extends keyof T>(
  obj: T,
  predicate: <K extends keyof T>(key: K, value: T[K]) => boolean,
): Partial<T> {
  const filteredEntries = Object.entries(obj).filter(([key, value]) =>
    predicate(key as keyof T, value as T[keyof T]),
  );
  return Object.fromEntries(filteredEntries) as Partial<T>;
}

function findSidebarRouteNameByPath(
  routes: SidebarRoute[],
  path: string,
): string | undefined {
  for (const route of routes) {
    if (route.path === path) {
      return route.name;
    }
    if (route.children) {
      const found = findSidebarRouteNameByPath(route.children, path);
      if (found) return found;
    }
  }
  return undefined;
}

/**
 * Extract max-age from Cache-Control header (in seconds)
 * Returns default of 5 minutes (300 seconds) if no max-age is found
 */
function extractMaxAge(cacheControlHeader: string | null): number {
  if (!cacheControlHeader) {
    return DEFAULT_MAX_AGE; // Default 5 minutes
  }

  const match = cacheControlHeader.match(/max-age=(\d+)/);
  if (match && match[1]) {
    // If max-age is explicitly set to 0, set it to default
    return parseInt(match[1], 10) || DEFAULT_MAX_AGE;
  }

  return DEFAULT_MAX_AGE; // Default 5 minutes
}

export { indexBy, filterObject, findSidebarRouteNameByPath, extractMaxAge };
