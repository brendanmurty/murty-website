/**
 * Lume Configuration
 *
 * This file defines how the Lume site build process works for this site.
 *
 * More information at https://lume.land/docs/configuration/config-file/
 */

import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import sitemap from "lume/plugins/sitemap.ts";
import nunjucks from "lume/plugins/nunjucks.ts";

// Build the site using Lume
const site = lume({
  src: "./build",
  dest: "./docs",
  prettyUrls: true
});

site.use(nunjucks());
site.use(date());
site.use(sitemap());

export default site;
