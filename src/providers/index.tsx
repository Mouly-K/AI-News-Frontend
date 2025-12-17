import { SettingsProvider } from "@/providers/settings";
import { SettingsModalProvider } from "@/providers/settings-modal";
import { SearchProvider } from "@/providers/search";
import { SelectedCategoriesProvider } from "@/providers/selected-categories";
import { SelectedFeedsProvider } from "@/providers/selected-feeds";
import { ArticleModalProvider } from "@/providers/article-modal";
import { ChatProvider } from "@/providers/chat";

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SettingsProvider>
      <SettingsModalProvider>
        <SearchProvider>
          <SelectedCategoriesProvider>
            <SelectedFeedsProvider>
              <ArticleModalProvider>
                <ChatProvider>{children}</ChatProvider>
              </ArticleModalProvider>
            </SelectedFeedsProvider>
          </SelectedCategoriesProvider>
        </SearchProvider>
      </SettingsModalProvider>
    </SettingsProvider>
  );
}
