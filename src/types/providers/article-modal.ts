export type ArticleModalState = {
  articleOpen: boolean;
  articleUrl: string | null;
};

export type ArticleModalProviderState = {
  articleModal: ArticleModalState;
  setArticleModal: React.Dispatch<React.SetStateAction<ArticleModalState>>;
};

export type ArticleModalProviderProps = {
  children: React.ReactNode;
};
