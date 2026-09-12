import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";

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

/**
 * Find the end index of a JS array literal, respecting strings and escapes.
 * @param {string} source
 * @param {number} start Index of the opening `[`
 * @returns {number} Index of the matching `]`
 */
function findMatchingArrayEnd(source, start) {
  let depth = 0;
  let inString = false;
  let quote = "";
  let escaped = false;

  for (let i = start; i < source.length; i += 1) {
    const ch = source[i];
    if (inString) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (ch === "\\") {
        escaped = true;
        continue;
      }
      if (ch === quote) {
        inString = false;
      }
      continue;
    }
    if (ch === "\"" || ch === "'") {
      inString = true;
      quote = ch;
      continue;
    }
    if (ch === "[") {
      depth += 1;
    } else if (ch === "]") {
      depth -= 1;
      if (depth === 0) {
        return i;
      }
    }
  }

  throw new Error("Unterminated window.BLOG_POSTS array in posts-data.js.");
}

/**
 * Locate the `window.BLOG_POSTS = ...;` assignment anywhere in the file.
 * @param {string} source
 * @returns {{ assignStart: number, assignEnd: number, valueText: string }}
 */
function locateBlogPostsAssignment(source) {
  const match = source.match(/window\.BLOG_POSTS\s*=/);
  if (!match) {
    throw new Error("posts-data.js is missing a window.BLOG_POSTS assignment.");
  }

  const assignStart = match.index;
  let cursor = assignStart + match[0].length;
  while (cursor < source.length && /\s/.test(source[cursor])) {
    cursor += 1;
  }

  if (source[cursor] !== "[") {
    throw new Error("window.BLOG_POSTS must be assigned an array.");
  }

  const arrayEnd = findMatchingArrayEnd(source, cursor);
  let semicolon = arrayEnd + 1;
  while (semicolon < source.length && /\s/.test(source[semicolon]) && source[semicolon] !== ";") {
    semicolon += 1;
  }
  if (source[semicolon] !== ";") {
    throw new Error("window.BLOG_POSTS assignment must end with a semicolon.");
  }

  return {
    assignStart,
    assignEnd: semicolon,
    valueText: source.slice(cursor, arrayEnd + 1)
  };
}

async function readExistingPosts() {
  const source = await fs.readFile(dataPath, "utf8");
  const { valueText } = locateBlogPostsAssignment(source);
  return vm.runInNewContext(valueText);
}

async function writePosts(posts) {
  const source = await fs.readFile(dataPath, "utf8");
  const { assignStart, assignEnd } = locateBlogPostsAssignment(source);
  const sorted = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const replacement = `window.BLOG_POSTS = ${JSON.stringify(sorted, null, 2)};`;
  const output = source.slice(0, assignStart) + replacement + source.slice(assignEnd + 1);
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
