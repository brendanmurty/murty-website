import { PageFrame } from "$fe/layouts/page.tsx";
import { type PostData } from "$fe/types.ts";
import { PostHeading, PostInfo, PostTags } from "$fe/components/post.tsx";

export default function Post(data: Lume.Data) {
  const page = data as Lume.Data & PostData & { content: string };

  return (
    <PageFrame data={page}>
      <PostHeading title={page.title} url={page.url} />
      <PostInfo date={page.date} words={page.readingInfo?.words ?? 0} />
      <PostTags tags={page.tags ?? []} />
      <div className="post-content" dangerouslySetInnerHTML={{ __html: page.content }} />
    </PageFrame>
  );
}
