import { PageFrame } from "./page.tsx";
import GithubInfo from "../components/github.tsx";
import SocialLinks from "../components/social.tsx";
import { type PostData, PostItem } from "../components/post.tsx";

export default function Home(data: Lume.Data) {
  const page = data as Lume.Data & { search: { pages: (...args: string[]) => unknown[] }; SITE_BUILD_ID?: string };
  const posts = page.search.pages("type=post", "date=desc") as PostData[];

  return (
    <PageFrame data={page}>
      <div className="intro">
        <p>I specialise in actively leading software teams to build scalable, well-defined technical solutions.</p>
      </div>
      <div className="social-links-container">
        <SocialLinks buildId={page.SITE_BUILD_ID ?? ""} />
      </div>
      <div className="section-head">
        <h2>GitHub</h2>
        <a className="side-link" href="https://github.com/bcm-works" title="View my profile on GitHub">
          GitHub Profile
        </a>
      </div>
      <GithubInfo username="bcm-works" />
      <div className="section-head">
        <h2>Recent Posts</h2>
        <a className="side-link" href="/posts/" title="Show a list of all posts">All Posts</a>
      </div>
      <ul className="posts-list">
        {posts.slice(0, 6).filter((post) => post.url !== "/posts/").map((post) => (
          <PostItem key={post.url} post={post} />
        ))}
      </ul>
    </PageFrame>
  );
}
