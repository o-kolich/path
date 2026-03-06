import fs from "node:fs/promises";
import path from "node:path";

const titleArg = process.argv.slice(2).join(" ").trim();

if (!titleArg) {
  console.error("Usage: npm run new:post -- \"Post Title\"");
  process.exit(1);
}

const slug = titleArg
  .toLowerCase()
  .replace(/[^a-z0-9\s-]/g, "")
  .trim()
  .replace(/\s+/g, "-")
  .replace(/-+/g, "-");

const now = new Date();
const date = now.toISOString().slice(0, 10);
const outputPath = path.join(process.cwd(), "src", "posts", `${slug}.md`);

const content = `---
layout: layouts/post.njk
title: ${titleArg}
date: ${date}
tags:
  - post
---
Write your post here.
`;

async function run() {
  try {
    await fs.access(outputPath);
    console.error(`File already exists: ${outputPath}`);
    process.exit(1);
  } catch {
    // Missing file is expected.
  }

  await fs.writeFile(outputPath, content, "utf8");
  console.log(`Created ${outputPath}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
