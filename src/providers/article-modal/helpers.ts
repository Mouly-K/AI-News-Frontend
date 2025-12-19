import { createContext, useContext } from "react";
import type { ArticleModalProviderState } from "@/types/providers/article-modal";

const initialState: ArticleModalProviderState = {
  articleModal: {
    articleOpen: false,
    modalData: null,
  },
  setArticleModal: () => null,
};

const ArticleModalProviderContext =
  createContext<ArticleModalProviderState>(initialState);

function useArticleModal() {
  const context = useContext(ArticleModalProviderContext);

  if (context === undefined)
    throw new Error(
      "useArticleModal must be used within an ArticleModalProvider",
    );

  return context;
}

export { ArticleModalProviderContext, useArticleModal, initialState };
