function buildTaxonomyLinks(tags, prefix, basePath) {
  if (!Array.isArray(tags)) {
    return [];
  }

  return tags
    .filter((tag) => typeof tag === "string" && tag.startsWith(prefix))
    .map((tag) => {
      const name = tag.slice(prefix.length);
      const slug = name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      return {
        name,
        url: `/${basePath}/${slug}/`
      };
    });
}

export default {
  eleventyComputed: {
    taxonomyTags: (data) => buildTaxonomyLinks(data.tags, "tag:", "tags"),
    taxonomyCategories: (data) => buildTaxonomyLinks(data.tags, "category:", "categories")
  }
};
