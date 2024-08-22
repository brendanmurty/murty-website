import { assertEquals, assertNotEquals } from "@std/assert";

Deno.test("build", async (test) => {
  await test.step({
    name: "non-empty file 'public/index.html' was found",
    fn: async () => {
      try {
        const publicIndexFileContents: string = await Deno.readTextFile(
          "public/index.html"
        );

        assertNotEquals(publicIndexFileContents, "");
      } catch (_) {
        assertEquals("File not found", "");
      }
    }
  });

  await test.step({
    name: "non-empty file 'public/css/styles.min.css' was found",
    fn: async () => {
      try {
        const publicIndexFileContents: string = await Deno.readTextFile(
          "public/css/styles.min.css"
        );

        assertNotEquals(publicIndexFileContents, "");
      } catch (_) {
        assertEquals("File not found", "");
      }
    }
  });

  await test.step({
    name: "non-empty file 'public/Brendan Murty - Resume.pdf' was found",
    fn: async () => {
      try {
        const publicIndexFileContents: string = await Deno.readTextFile(
          "public/Brendan Murty - Resume.pdf"
        );

        assertNotEquals(publicIndexFileContents, "");
      } catch (_) {
        assertEquals("File not found", "");
      }
    }
  });

  await test.step({
    name: "non-empty file 'public/brendan/posts.json' was found",
    fn: async () => {
      try {
        const publicIndexFileContents: string = await Deno.readTextFile(
          "public/brendan/posts.json"
        );

        assertNotEquals(publicIndexFileContents, "");
      } catch (_) {
        assertEquals("File not found", "");
      }
    }
  });

  await test.step({
    name: "non-empty file 'public/images/brendan/brendan-2024_750.png' was found",
    fn: async () => {
      try {
        const publicIndexFileContents: string = await Deno.readTextFile(
          "public/images/brendan/brendan-2024_750.png"
        );

        assertNotEquals(publicIndexFileContents, "");
      } catch (_) {
        assertEquals("File not found", "");
      }
    }
  });

  await test.step({
    name: "non-empty file 'public/images/brendan/brendan-2024_150.webp' was found",
    fn: async () => {
      try {
        const publicIndexFileContents: string = await Deno.readTextFile(
          "public/images/brendan/brendan-2024_150.webp"
        );

        assertNotEquals(publicIndexFileContents, "");
      } catch (_) {
        assertEquals("File not found", "");
      }
    }
  });
});
