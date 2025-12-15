import { ArticleModalProvider } from "./article-modal";
import { CategoriesProvider } from "./categories";
import { SearchProvider } from "./search";
import { SettingsProvider } from "./settings";
import { SettingsModalProvider } from "./settings-modal";

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SettingsProvider>
      <SettingsModalProvider>
        <SearchProvider>
          <CategoriesProvider>
            <ArticleModalProvider>{children}</ArticleModalProvider>
          </CategoriesProvider>
        </SearchProvider>
      </SettingsModalProvider>
    </SettingsProvider>
  );
}
