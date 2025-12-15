import { useState } from "react";
import { initialState, ArticleModalProviderContext } from "./helpers";

import type { ArticleModalProviderProps } from "@/types/providers/article-modal";

export function ArticleModalProvider({
  children,
  ...props
}: ArticleModalProviderProps) {
  const [articleModal, setArticleModal] = useState(initialState.articleModal);

  const value = {
    articleModal,
    setArticleModal,
  };

  return (
    <ArticleModalProviderContext.Provider {...props} value={value}>
      {children}
    </ArticleModalProviderContext.Provider>
  );
}
