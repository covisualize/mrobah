import fs from "node:fs/promises";
import path from "node:path";

const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const dataPath = path.join(repoRoot, "posts-data.js");

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizePost(input) {
  const date = input.date || new Date().toISOString().slice(0, 10);
  const title = String(input.title || "").trim();
  const content = Array.isArray(input.content)
    ? input.content.map((item) => String(item).trim()).filter(Boolean)
    : String(input.content || "")
        .split(/\n+/)
        .map((item) => item.trim())
        .filter(Boolean);

  if (!title) {
    throw new Error("Post title is required.");
  }
  if (!content.length) {
    throw new Error("Post content must contain at least one paragraph.");
  }

  const baseSlug = slugify(title) || "journal-entry";
  return {
    slug: String(input.slug || `${date}-${baseSlug}`).trim(),
    title,
    date,
    theme: String(input.theme || "Other").trim(),
    readingTime: String(input.readingTime || `${Math.max(1, Math.ceil(content.join(" ").split(/\s+/).length / 190))} min`).trim(),
    mood: String(input.mood || content[1] || content[0]).trim(),
    image: String(input.image || "assets/images/desk-light.png").trim(),
    imageAlt: String(input.imageAlt || "Warm desk light beside a notebook.").trim(),
    excerpt: String(input.excerpt || content[0].slice(0, 170)).trim(),
    quote: String(input.quote || content[content.length - 1]).trim(),
    content
  };
}

async function readIncomingPayload() {
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf8").trim();
  if (!raw) {
    throw new Error("Expected JSON payload on stdin.");
  }
  return JSON.parse(raw);
}

async function readExistingPosts() {
  const source = await fs.readFile(dataPath, "utf8");
  const prefix = "window.BLOG_POSTS = ";
  const suffix = ";";
  if (!source.startsWith(prefix) || !source.trimEnd().endsWith(suffix)) {
    throw new Error("posts-data.js is not in the expected format.");
  }
  const jsonText = source.slice(prefix.length, source.lastIndexOf(suffix));
  return JSON.parse(jsonText);
}

async function writePosts(posts) {
  const sorted = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const output = `window.BLOG_POSTS = ${JSON.stringify(sorted, null, 2)};\n`;
  await fs.writeFile(dataPath, output, "utf8");
}

const payload = await readIncomingPayload();
const newPost = normalizePost(payload);
const existingPosts = await readExistingPosts();

if (existingPosts.some((post) => post.slug === newPost.slug)) {
  throw new Error(`A post with slug "${newPost.slug}" already exists.`);
}

existingPosts.unshift(newPost);
await writePosts(existingPosts);
process.stdout.write(`Added post: ${newPost.slug}\n`);
