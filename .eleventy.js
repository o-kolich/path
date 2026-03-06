function slugify(input) {
  return String(input)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function toTaxonomyList(collectionApi, prefix, basePath) {
  const values = new Set();
  const posts = collectionApi.getFilteredByTag("post");

  for (const post of posts) {
    const tags = Array.isArray(post.data.tags) ? post.data.tags : [];
    for (const tag of tags) {
      if (typeof tag === "string" && tag.startsWith(prefix)) {
        values.add(tag);
      }
    }
  }

  return [...values]
    .map((key) => {
      const name = key.slice(prefix.length);
      const slug = slugify(name);
      return {
        key,
        name,
        slug,
        url: `/${basePath}/${slug}/`
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ public: "/" });

  eleventyConfig.addFilter("readableDate", (value) => {
    const date = new Date(value);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(date);
  });

  eleventyConfig.addFilter("sortNewest", (items) => {
    if (!Array.isArray(items)) {
      return [];
    }
    return [...items].sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addFilter("slugify", slugify);

  eleventyConfig.addCollection("posts", (collectionApi) =>
    collectionApi.getFilteredByTag("post").sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addCollection("tagList", (collectionApi) =>
    toTaxonomyList(collectionApi, "tag:", "tags")
  );

  eleventyConfig.addCollection("categoryList", (collectionApi) =>
    toTaxonomyList(collectionApi, "category:", "categories")
  );

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    pathPrefix: process.env.PATH_PREFIX || "/"
  };
}
