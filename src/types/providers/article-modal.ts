export type ArticleMetaData = {
  id: string;
  name: string;
  feedUrl?: string;
  itemLink: string;
};

export type ArticleModalState = {
  articleOpen: boolean;
  modalData: ArticleMetaData | null;
};

export type ArticleModalProviderState = {
  articleModal: ArticleModalState;
  setArticleModal: React.Dispatch<React.SetStateAction<ArticleModalState>>;
};

export type ArticleModalProviderProps = {
  children: React.ReactNode;
};
