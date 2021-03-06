import { posix } from "https://deno.land/std@0.140.0/path/mod.ts";
import "https://deno.land/x/dotenv@v3.2.0/load.ts";
import { PostsList } from "./posts-list.ts";
import { JsonFeedItem } from "./types.ts";

export async function PostsLatest(): Promise<JsonFeedItem> {
  const postsDirectory: string = Deno.env.get("BLOG_POSTS_DIR") || "";
  const urlPosts: string = Deno.env.get("BLOG_POSTS_URL") || "";
  const jsonFeedDefaultPostTitle: string = Deno.env.get("JSON_FEED_DEFAULT_POST_TITLE") || "";

  // Set absolute paths for the required file-system related variables
  const postsDirectoryAbsolute = posix.join(Deno.cwd(), postsDirectory);

  // Get an array of all of the valid Markdown files in the posts directory
  const postItems = await PostsList(postsDirectoryAbsolute, urlPosts, jsonFeedDefaultPostTitle);

  // Return the most recent post item in the array
  return postItems[0];
}

