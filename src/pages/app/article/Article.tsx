import { useSearchParams } from "react-router";

import { useArticle } from "@/hooks/use-article";

export default function Article() {
  const [searchParams, _] = useSearchParams();
  const { data, isLoading, isError } = useArticle(
    decodeURIComponent(searchParams.get("url") || ""),
  );

  return (
    data?.content && (
      <div className="mx-auto flex w-full max-w-2xl min-w-0 flex-1 flex-col gap-8 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
          {data?.title}
        </h1>
        <p className="text-muted-foreground text-xl leading-7">
          {data.excerpt}
        </p>
        <article
          id="readability-page"
          dangerouslySetInnerHTML={{ __html: data.content }}
        ></article>
      </div>
    )
  );
}
