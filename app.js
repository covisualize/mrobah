(function () {
  "use strict";

  var posts = Array.isArray(window.BLOG_POSTS) ? window.BLOG_POSTS.slice() : [];
  posts.sort(function (a, b) {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  var page = document.body.getAttribute("data-page") || "";

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatDate(dateValue) {
    var parsed = new Date(dateValue);
    if (Number.isNaN(parsed.getTime())) {
      return dateValue;
    }
    return parsed.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  }

  function formatDateTime(dateValue) {
    var parsed = new Date(dateValue);
    if (Number.isNaN(parsed.getTime())) {
      return dateValue;
    }
    return parsed.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  function uniqueThemes(list) {
    var map = {};
    list.forEach(function (post) {
      map[post.theme] = true;
    });
    return Object.keys(map).sort();
  }

  function getBySlug(slug) {
    for (var i = 0; i < posts.length; i += 1) {
      if (posts[i].slug === slug) {
        return posts[i];
      }
    }
    return null;
  }

  function activateNav(navValue) {
    var navLinks = document.querySelectorAll("[data-nav]");
    navLinks.forEach(function (link) {
      if (link.getAttribute("data-nav") === navValue) {
        link.classList.add("is-active");
      } else {
        link.classList.remove("is-active");
      }
    });
  }

  function initNavToggle() {
    var navToggle = document.getElementById("navToggle");
    var navMenu = document.getElementById("navMenu");
    if (!navToggle || !navMenu) {
      return;
    }

    navToggle.addEventListener("click", function () {
      var isOpen = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  function postCardTemplate(post) {
    return (
      '<article class="entry-card">' +
      '<a class="entry-card-media" href="post.html?slug=' +
      encodeURIComponent(post.slug) +
      '">' +
      '<img src="' +
      escapeHtml(post.image || "") +
      '" alt="' +
      escapeHtml(post.imageAlt || post.title) +
      '" loading="lazy" />' +
      "</a>" +
      '<div class="entry-card-body">' +
      '<div class="meta-line"><span class="tag">' +
      escapeHtml(post.theme) +
      "</span><span>" +
      escapeHtml(formatDate(post.date)) +
      "</span><span>" +
      escapeHtml(post.readingTime || "") +
      "</span></div>" +
      "<h3>" +
      escapeHtml(post.title) +
      "</h3>" +
      '<p class="entry-mood">' +
      escapeHtml(post.mood || "") +
      "</p>" +
      "<p>" +
      escapeHtml(post.excerpt) +
      "</p>" +
      '<a class="entry-link" href="post.html?slug=' +
      encodeURIComponent(post.slug) +
      '">Read entry</a>' +
      "</div>" +
      "</article>"
    );
  }

  function miniEntryTemplate(post) {
    return (
      '<a class="mini-entry" href="post.html?slug=' +
      encodeURIComponent(post.slug) +
      '">' +
      '<img src="' +
      escapeHtml(post.image || "") +
      '" alt="' +
      escapeHtml(post.imageAlt || post.title) +
      '" loading="lazy" />' +
      '<div class="mini-entry-copy">' +
      '<span class="mini-entry-date">' +
      escapeHtml(formatDate(post.date)) +
      "</span>" +
      "<strong>" +
      escapeHtml(post.title) +
      "</strong>" +
      "<p>" +
      escapeHtml(post.excerpt) +
      "</p>" +
      "</div>" +
      "</a>"
    );
  }

  function themeButtonTemplate(theme, isActive) {
    return (
      '<button class="tag-filter' +
      (isActive ? " is-active" : "") +
      '" type="button" data-theme="' +
      escapeHtml(theme) +
      '">' +
      escapeHtml(theme) +
      "</button>"
    );
  }

  function initHomePage() {
    activateNav("home");

    var featuredNode = document.getElementById("featuredEntry");
    var entriesNode = document.getElementById("entriesList");
    var countNode = document.getElementById("resultsCount");
    var searchInput = document.getElementById("searchInput");
    var filtersNode = document.getElementById("themeFilters");
    var noteStreamNode = document.getElementById("noteStream");

    if (!featuredNode || !entriesNode || !countNode || !searchInput || !filtersNode || !noteStreamNode) {
      return;
    }

    var state = {
      query: "",
      theme: "All"
    };

    function renderFeatured(post) {
      if (!post) {
        featuredNode.innerHTML = '<div class="empty-state">No entries available yet.</div>';
        return;
      }

      featuredNode.innerHTML =
        '<article class="featured-entry">' +
        '<div class="featured-entry-copy">' +
        '<p class="eyebrow-note">Latest diary note</p>' +
        "<h2>" +
        escapeHtml(post.title) +
        "</h2>" +
        "<p>" +
        escapeHtml(post.excerpt) +
        "</p>" +
        '<div class="meta-line"><span class="tag">' +
        escapeHtml(post.theme) +
        "</span><span>" +
        escapeHtml(formatDate(post.date)) +
        "</span><span>" +
        escapeHtml(post.readingTime || "") +
        "</span></div>" +
        '<div class="featured-links">' +
        '<a class="button-link accent" href="post.html?slug=' +
        encodeURIComponent(post.slug) +
        '">Open today\'s note</a>' +
        '<span class="scribble-line">' +
        escapeHtml(post.mood || "") +
        "</span>" +
        "</div>" +
        "</div>" +
        '<div class="featured-entry-media">' +
        '<img src="' +
        escapeHtml(post.image || "") +
        '" alt="' +
        escapeHtml(post.imageAlt || post.title) +
        '" />' +
        "</div>" +
        "</article>";
    }

    function filterPosts() {
      var query = state.query.trim().toLowerCase();
      var theme = state.theme;

      return posts.filter(function (post) {
        var queryMatch =
          !query ||
          post.title.toLowerCase().indexOf(query) > -1 ||
          post.excerpt.toLowerCase().indexOf(query) > -1 ||
          post.content.join(" ").toLowerCase().indexOf(query) > -1 ||
          (post.mood || "").toLowerCase().indexOf(query) > -1;
        var themeMatch = theme === "All" || post.theme === theme;
        return queryMatch && themeMatch;
      });
    }

    function renderFilters() {
      var themes = ["All"].concat(uniqueThemes(posts));
      filtersNode.innerHTML = themes
        .map(function (theme) {
          return themeButtonTemplate(theme, state.theme === theme);
        })
        .join("");

      filtersNode.querySelectorAll("button").forEach(function (button) {
        button.addEventListener("click", function () {
          state.theme = button.getAttribute("data-theme") || "All";
          renderFilters();
          renderEntries();
        });
      });
    }

    function renderEntries() {
      var filtered = filterPosts();
      countNode.textContent = filtered.length + (filtered.length === 1 ? " entry" : " entries");

      if (!filtered.length) {
        entriesNode.innerHTML =
          '<div class="empty-state">No entries match this search yet. Try another theme or keyword.</div>';
        return;
      }

      entriesNode.innerHTML = filtered.map(postCardTemplate).join("");
    }

    function renderNoteStream() {
      noteStreamNode.innerHTML = posts
        .slice(1, 4)
        .map(function (post, index) {
          return (
            '<article class="note-card note-tone-' +
            String((index % 3) + 1) +
            '">' +
            '<span class="note-date">' +
            escapeHtml(formatDate(post.date)) +
            "</span>" +
            "<h3>" +
            escapeHtml(post.title) +
            "</h3>" +
            "<p>" +
            escapeHtml(post.mood || post.excerpt) +
            "</p>" +
            '<a class="inline-link" href="post.html?slug=' +
            encodeURIComponent(post.slug) +
            '">Keep reading</a>' +
            "</article>"
          );
        })
        .join("");
    }

    renderFeatured(posts[0]);
    renderFilters();
    renderEntries();
    renderNoteStream();

    searchInput.addEventListener("input", function () {
      state.query = searchInput.value || "";
      renderEntries();
    });
  }

  function initArchivePage() {
    activateNav("archive");

    var filterNode = document.getElementById("archiveFilters");
    var archiveNode = document.getElementById("archiveGroups");
    var archiveInfo = document.getElementById("archiveInfo");
    var archiveHighlights = document.getElementById("archiveHighlights");
    if (!filterNode || !archiveNode || !archiveInfo || !archiveHighlights) {
      return;
    }

    var params = new URLSearchParams(window.location.search);
    var initialTheme = params.get("theme");
    var themeList = uniqueThemes(posts);
    var state = {
      theme: initialTheme && themeList.indexOf(initialTheme) > -1 ? initialTheme : "All"
    };

    function updateQuery(theme) {
      var nextParams = new URLSearchParams(window.location.search);
      if (theme === "All") {
        nextParams.delete("theme");
      } else {
        nextParams.set("theme", theme);
      }
      var next = window.location.pathname + (nextParams.toString() ? "?" + nextParams.toString() : "");
      window.history.replaceState({}, "", next);
    }

    function renderArchiveFilters() {
      var themes = ["All"].concat(themeList);
      filterNode.innerHTML = themes
        .map(function (theme) {
          return themeButtonTemplate(theme, state.theme === theme);
        })
        .join("");

      filterNode.querySelectorAll("button").forEach(function (button) {
        button.addEventListener("click", function () {
          state.theme = button.getAttribute("data-theme") || "All";
          updateQuery(state.theme);
          renderArchiveFilters();
          renderArchiveGroups();
        });
      });
    }

    function renderArchiveHighlights() {
      archiveHighlights.innerHTML = posts
        .slice(0, 3)
        .map(function (post) {
          return miniEntryTemplate(post);
        })
        .join("");
    }

    function renderArchiveGroups() {
      var list = state.theme === "All" ? themeList : [state.theme];
      archiveInfo.textContent =
        state.theme === "All"
          ? "Browsing every emotional thread."
          : 'Browsing "' + state.theme + '" notes.';

      if (!list.length) {
        archiveNode.innerHTML = '<div class="empty-state">No themes available yet.</div>';
        return;
      }

      archiveNode.innerHTML = list
        .map(function (theme) {
          var themedPosts = posts.filter(function (post) {
            return post.theme === theme;
          });

          if (!themedPosts.length) {
            return "";
          }

          return (
            '<section class="archive-group">' +
            '<div class="archive-group-header">' +
            "<h3>" +
            escapeHtml(theme) +
            "</h3>" +
            "<p>" +
            escapeHtml(themedPosts[0].mood || themedPosts[0].excerpt) +
            "</p>" +
            "</div>" +
            '<div class="entry-list">' +
            themedPosts.map(postCardTemplate).join("") +
            "</div>" +
            "</section>"
          );
        })
        .join("");
    }

    renderArchiveFilters();
    renderArchiveHighlights();
    renderArchiveGroups();
  }

  function initPostPage() {
    activateNav("post");

    var postNode = document.getElementById("postArticle");
    var relatedNode = document.getElementById("relatedEntries");
    var commentsNode = document.getElementById("commentsList");
    var commentForm = document.getElementById("commentForm");
    var navNode = document.getElementById("postNav");
    var sidebarCard = document.getElementById("postSidebarCard");

    if (!postNode || !relatedNode || !commentsNode || !commentForm || !navNode || !sidebarCard) {
      return;
    }

    var params = new URLSearchParams(window.location.search);
    var slug = params.get("slug");
    var currentPost = slug ? getBySlug(slug) : posts[0];
    if (!currentPost && posts.length) {
      currentPost = posts[0];
    }

    if (!currentPost) {
      postNode.innerHTML = '<div class="empty-state">No post is available right now.</div>';
      return;
    }

    document.title = currentPost.title + " - Faded Film Notebook";

    var bodyContent = currentPost.content
      .map(function (paragraph) {
        return "<p>" + escapeHtml(paragraph) + "</p>";
      })
      .join("");
    var quoteBlock = currentPost.quote
      ? '<blockquote class="pull-quote">' + escapeHtml(currentPost.quote) + "</blockquote>"
      : "";

    postNode.innerHTML =
      '<div class="post-hero-media"><img src="' +
      escapeHtml(currentPost.image || "") +
      '" alt="' +
      escapeHtml(currentPost.imageAlt || currentPost.title) +
      '" /></div>' +
      '<header class="post-header">' +
      '<div class="meta-line"><span class="tag">' +
      escapeHtml(currentPost.theme) +
      "</span><span>" +
      escapeHtml(formatDate(currentPost.date)) +
      "</span><span>" +
      escapeHtml(currentPost.readingTime || "") +
      "</span></div>" +
      "<h1>" +
      escapeHtml(currentPost.title) +
      "</h1>" +
      '<p class="entry-mood post-mood">' +
      escapeHtml(currentPost.mood || "") +
      "</p>" +
      "<p>" +
      escapeHtml(currentPost.excerpt) +
      "</p>" +
      "</header>" +
      '<hr class="divider" />' +
      '<article class="post-body">' +
      bodyContent +
      quoteBlock +
      "</article>" +
      '<hr class="divider" />' +
      '<p><a class="inline-link" href="archive.html?theme=' +
      encodeURIComponent(currentPost.theme) +
      '">More entries in ' +
      escapeHtml(currentPost.theme) +
      "</a></p>";

    sidebarCard.innerHTML =
      '<img src="' +
      escapeHtml(currentPost.image || "") +
      '" alt="' +
      escapeHtml(currentPost.imageAlt || currentPost.title) +
      '" />' +
      '<div class="sidebar-note">' +
      "<span>From the margin</span>" +
      "<p>" +
      escapeHtml(currentPost.quote || currentPost.mood || currentPost.excerpt) +
      "</p>" +
      "</div>";

    var related = posts
      .filter(function (post) {
        return post.theme === currentPost.theme && post.slug !== currentPost.slug;
      })
      .slice(0, 3);

    relatedNode.innerHTML = related.length
      ? related.map(miniEntryTemplate).join("")
      : '<div class="empty-state">No related entries yet for this theme.</div>';

    var currentIndex = posts.findIndex(function (post) {
      return post.slug === currentPost.slug;
    });
    var newer = currentIndex > 0 ? posts[currentIndex - 1] : null;
    var older = currentIndex > -1 && currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

    navNode.innerHTML =
      '<div class="post-nav-grid">' +
      (newer
        ? '<a class="nav-card" href="post.html?slug=' +
          encodeURIComponent(newer.slug) +
          '"><span>Newer</span><strong>' +
          escapeHtml(newer.title) +
          "</strong></a>"
        : '<span class="nav-card is-empty"></span>') +
      (older
        ? '<a class="nav-card" href="post.html?slug=' +
          encodeURIComponent(older.slug) +
          '"><span>Older</span><strong>' +
          escapeHtml(older.title) +
          "</strong></a>"
        : '<span class="nav-card is-empty"></span>') +
      "</div>";

    var storageKey = "faded-film-comments:" + currentPost.slug;

    function readComments() {
      try {
        var raw = window.localStorage.getItem(storageKey);
        return raw ? JSON.parse(raw) : [];
      } catch (error) {
        return [];
      }
    }

    function writeComments(items) {
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(items));
      } catch (error) {
        // Ignore storage write failures to avoid blocking post usage.
      }
    }

    function renderComments() {
      var comments = readComments();
      if (!comments.length) {
        commentsNode.innerHTML =
          '<li class="empty-state">No comments yet. Start the first thoughtful reply.</li>';
        return;
      }

      commentsNode.innerHTML = comments
        .map(function (comment) {
          return (
            "<li>" +
            '<div class="comment-meta">' +
            "<strong>" +
            escapeHtml(comment.name || "Anonymous Reader") +
            "</strong>" +
            "<span>" +
            escapeHtml(formatDate(comment.createdAt)) +
            "</span>" +
            "</div>" +
            "<p>" +
            escapeHtml(comment.message || "") +
            "</p>" +
            "</li>"
          );
        })
        .join("");
    }

    commentForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var nameInput = document.getElementById("commentName");
      var messageInput = document.getElementById("commentMessage");
      var name = nameInput ? nameInput.value.trim() : "";
      var message = messageInput ? messageInput.value.trim() : "";

      if (!message) {
        messageInput.focus();
        return;
      }

      var comments = readComments();
      comments.unshift({
        name: name || "Anonymous Reader",
        message: message,
        createdAt: new Date().toISOString()
      });
      writeComments(comments);
      commentForm.reset();
      renderComments();
    });

    renderComments();
  }

  function initStudioPage() {
    activateNav("studio");

    var titleInput = document.getElementById("draftTitle");
    var themeInput = document.getElementById("draftTheme");
    var bodyInput = document.getElementById("draftBody");
    var wordCountNode = document.getElementById("draftWordCount");
    var readTimeNode = document.getElementById("draftReadTime");
    var statusNode = document.getElementById("draftStatus");
    var promptListNode = document.getElementById("promptList");
    var saveButton = document.getElementById("saveDraftBtn");
    var clearButton = document.getElementById("clearDraftBtn");
    var exportButton = document.getElementById("exportDraftBtn");
    var previewTitleNode = document.getElementById("draftPreviewTitle");
    var previewThemeNode = document.getElementById("draftPreviewTheme");
    var previewBodyNode = document.getElementById("draftPreviewBody");

    if (
      !titleInput ||
      !themeInput ||
      !bodyInput ||
      !wordCountNode ||
      !readTimeNode ||
      !statusNode ||
      !promptListNode ||
      !saveButton ||
      !clearButton ||
      !exportButton ||
      !previewTitleNode ||
      !previewThemeNode ||
      !previewBodyNode
    ) {
      return;
    }

    var prompts = [
      "What did I survive today that no one else noticed?",
      "Where did I feel most like myself in the last 24 hours?",
      "What boundary protected my peace this week?",
      "What emotion keeps returning, and what might it be asking for?",
      "If I could write one gentle sentence to yesterday's self, what would it be?",
      "What ordinary moment quietly proved I am healing?"
    ];
    var storageKey = "faded-film-draft:v1";
    var autoSaveTimer = null;

    function computeWordCount(text) {
      var cleaned = (text || "").trim();
      if (!cleaned) {
        return 0;
      }
      return cleaned.split(/\s+/).filter(Boolean).length;
    }

    function computeReadTime(words) {
      if (words <= 0) {
        return "0 min";
      }
      return Math.max(1, Math.ceil(words / 190)) + " min";
    }

    function setStatus(message) {
      statusNode.textContent = message;
    }

    function updateMetrics() {
      var words = computeWordCount(bodyInput.value);
      wordCountNode.textContent = String(words);
      readTimeNode.textContent = computeReadTime(words);
    }

    function updatePreview() {
      var trimmedBody = bodyInput.value.trim();
      var previewText = trimmedBody
        ? trimmedBody.split(/\n+/).slice(0, 3).join("\n\n")
        : "Begin with the sentence you have been postponing. The preview will settle here as you write.";
      previewTitleNode.textContent = titleInput.value.trim() || "Untitled entry";
      previewThemeNode.textContent = themeInput.value || "Transitions";
      previewBodyNode.textContent = previewText;
    }

    function readDraft() {
      try {
        var raw = window.localStorage.getItem(storageKey);
        return raw ? JSON.parse(raw) : null;
      } catch (error) {
        return null;
      }
    }

    function writeDraft(draft) {
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(draft));
      } catch (error) {
        // Ignore storage failures so writing remains uninterrupted.
      }
    }

    function currentDraft() {
      return {
        title: titleInput.value.trim(),
        theme: themeInput.value,
        body: bodyInput.value,
        savedAt: new Date().toISOString()
      };
    }

    function saveDraft(source) {
      var draft = currentDraft();
      writeDraft(draft);
      setStatus(
        "Saved " +
          (source === "auto" ? "automatically" : "manually") +
          " at " +
          formatDateTime(draft.savedAt)
      );
    }

    function scheduleAutoSave() {
      if (autoSaveTimer) {
        window.clearTimeout(autoSaveTimer);
      }
      autoSaveTimer = window.setTimeout(function () {
        saveDraft("auto");
      }, 700);
    }

    function loadDraft() {
      var existing = readDraft();
      if (!existing) {
        setStatus("No local draft saved yet.");
        updateMetrics();
        updatePreview();
        return;
      }

      titleInput.value = existing.title || "";
      themeInput.value = existing.theme || "Transitions";
      bodyInput.value = existing.body || "";
      updateMetrics();
      updatePreview();
      setStatus("Loaded local draft from " + formatDateTime(existing.savedAt));
    }

    function sanitizeFileName(value) {
      var base = (value || "faded-film-entry")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      return base || "faded-film-entry";
    }

    function exportDraft() {
      var draft = currentDraft();
      var payload =
        "Title: " +
        (draft.title || "Untitled Entry") +
        "\n" +
        "Theme: " +
        (draft.theme || "Other") +
        "\n" +
        "Saved: " +
        formatDateTime(draft.savedAt) +
        "\n\n" +
        draft.body;
      var blob = new Blob([payload], { type: "text/plain;charset=utf-8" });
      var objectUrl = window.URL.createObjectURL(blob);
      var link = document.createElement("a");
      link.href = objectUrl;
      link.download = sanitizeFileName(draft.title) + ".txt";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(objectUrl);
      setStatus("Exported draft file at " + formatDateTime(draft.savedAt));
    }

    function insertPromptText(promptText) {
      var snippet = "Prompt: " + promptText + "\n\n";
      var startPos = bodyInput.selectionStart || 0;
      var endPos = bodyInput.selectionEnd || startPos;
      var before = bodyInput.value.slice(0, startPos);
      var after = bodyInput.value.slice(endPos);
      bodyInput.value = before + snippet + after;
      bodyInput.focus();
      var cursorPos = before.length + snippet.length;
      bodyInput.setSelectionRange(cursorPos, cursorPos);
      updateMetrics();
      updatePreview();
      scheduleAutoSave();
      setStatus("Prompt inserted. Keep writing from the first honest sentence.");
    }

    function renderPrompts() {
      promptListNode.innerHTML = prompts
        .map(function (prompt, index) {
          return (
            '<article class="prompt-card-mini">' +
            "<p>" +
            escapeHtml(prompt) +
            "</p>" +
            '<button type="button" data-prompt-index="' +
            String(index) +
            '">Use prompt</button>' +
            "</article>"
          );
        })
        .join("");

      promptListNode.querySelectorAll("[data-prompt-index]").forEach(function (button) {
        button.addEventListener("click", function () {
          var promptIndex = Number(button.getAttribute("data-prompt-index"));
          if (!Number.isNaN(promptIndex) && prompts[promptIndex]) {
            insertPromptText(prompts[promptIndex]);
          }
        });
      });
    }

    titleInput.addEventListener("input", function () {
      updatePreview();
      scheduleAutoSave();
    });
    themeInput.addEventListener("change", function () {
      updatePreview();
      scheduleAutoSave();
    });
    bodyInput.addEventListener("input", function () {
      updateMetrics();
      updatePreview();
      scheduleAutoSave();
    });

    saveButton.addEventListener("click", function () {
      saveDraft("manual");
    });

    clearButton.addEventListener("click", function () {
      var confirmed = window.confirm("Clear the current draft and remove local saved content?");
      if (!confirmed) {
        return;
      }
      titleInput.value = "";
      themeInput.value = "Transitions";
      bodyInput.value = "";
      window.localStorage.removeItem(storageKey);
      updateMetrics();
      updatePreview();
      setStatus("Draft cleared. Start again when ready.");
    });

    exportButton.addEventListener("click", function () {
      if (!bodyInput.value.trim()) {
        bodyInput.focus();
        setStatus("Add some text first, then export.");
        return;
      }
      exportDraft();
    });

    renderPrompts();
    loadDraft();
  }

  function initAboutPage() {
    activateNav("about");
  }

  initNavToggle();

  if (page === "home") {
    initHomePage();
  } else if (page === "archive") {
    initArchivePage();
  } else if (page === "post") {
    initPostPage();
  } else if (page === "studio") {
    initStudioPage();
  } else if (page === "about") {
    initAboutPage();
  }
})();
