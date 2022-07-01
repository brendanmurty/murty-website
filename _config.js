/**
* Lume Configuration
*
* This file defines how the Lume site build process works for this site.
* 
* More information at https://lume.land/docs/configuration/config-file/
*/

import lume from "https://deno.land/x/lume@v1.9.0/mod.ts";
import date from "https://deno.land/x/lume@v1.9.0/plugins/date.ts";
import { json2yaml } from "https://deno.land/x/json2yaml@v1.0.1/mod.ts";
import { PostsLatest } from "./src/posts-latest.ts";

// Convert the contents of ".env" in to YAML format and save it as "building/_data/site.yml".
// This allows for the Nunjucks templates to access these variables like this: {{ site.PIRSCH_ANALYTICS_SITE_CODE }}
const envFileContent = Deno.readTextFileSync("./.env");
let ymlFileContent = envFileContent.replaceAll("=", ": ");

// Add the details of the latest post to the site data
let latestPost = await PostsLatest();
latestPost = '{ "BLOG_POSTS_LATEST": ' + JSON.stringify(latestPost) + '}';
ymlFileContent += json2yaml(latestPost);

// Save the YAML file so it can be accessed by the page templates
Deno.writeTextFileSync("./building/_data/site.yml", ymlFileContent);

// Build the site using Lume
const site = lume({
  src: "./building",
  dest: "./public",
  prettyUrls: true,
  slugifyUrls: true
});

site.use(date());

export default site;
