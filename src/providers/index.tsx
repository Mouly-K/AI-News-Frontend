import { SettingsProvider } from "./settings";
import { SettingsModalProvider } from "./settings-modal";
import { SearchProvider } from "./search";
import { CategoriesProvider } from "./categories";
import { ArticleModalProvider } from "./article-modal";
import { ChatProvider } from "./chat";

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
            <ArticleModalProvider>
              <ChatProvider>{children}</ChatProvider>
            </ArticleModalProvider>
          </CategoriesProvider>
        </SearchProvider>
      </SettingsModalProvider>
    </SettingsProvider>
  );
}
