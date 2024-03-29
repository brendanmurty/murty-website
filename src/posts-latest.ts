import { posix } from "std/path/mod.ts";
import { load } from "std/dotenv/mod.ts";
import { PostsList } from "./posts-list.ts";
import { JsonFeedItem } from "./types.ts";

export async function PostsLatest(): Promise<JsonFeedItem[]> {
  await load({ export: true });

  const postsDirectory: string = Deno.env.get("BLOG_POSTS_DIR") || "";
  const urlPosts: string = Deno.env.get("BLOG_POSTS_URL") || "";
  const jsonFeedDefaultPostTitle: string =
    Deno.env.get("JSON_FEED_DEFAULT_POST_TITLE") || "";

  // Set absolute paths for the required file-system related variables
  const postsDirectoryAbsolute = posix.join(Deno.cwd(), postsDirectory);

  // Get an array of all of the valid Markdown files in the posts directory
  const postItems = await PostsList(
    postsDirectoryAbsolute,
    urlPosts,
    jsonFeedDefaultPostTitle
  );

  // Return the 10 most recent post items from the array
  return postItems.slice(0, 10);
}
