window.SITE_CONFIG = {
  // Create a free account at https://buttondown.com, then put your
  // Buttondown username here to activate the newsletter signup forms.
  buttondownUsername: ""
};

window.THEME_DESCRIPTIONS = {
  "Building in Public": "Making the work visible while it is still becoming.",
  "Creative Discipline": "Systems, rhythms, and structure in service of the work.",
  "Personal Growth": "Small promises, self-trust, and slow change.",
  "Reflection": "Slower thoughts that needed time to unfold.",
  "Work and Meaning": "What the work is for, beyond the output.",
  "Writing Life": "The practice of writing itself.",
  "Other": "Notes that have not found their thread yet."
};

window.BLOG_POSTS = [
  {
    "slug": "2026-09-11-one-coordinator-thread",
    "title": "One coordinator thread",
    "date": "2026-09-11",
    "theme": "Building in Public",
    "readingTime": "1 min",
    "mood": "I just figured out I was killing the agent every time I opened a new chat.",
    "image": "assets/images/desk-light.png",
    "imageAlt": "Warm desk light beside a notebook.",
    "excerpt": "I just figured out I was killing the agent every time I opened a new chat.",
    "quote": "It reframes Code Dispatch and the software-factory loop. I’ve been routing jobs like tickets. The unit of work should be the project thread that remembers what broke yesterday — then forks subagents from that, not from a blank context.",
    "content": [
      "I just figured out I was killing the agent every time I opened a new chat.",
      "Cursor Projects: one persistent coordinator thread. It stays on, spins subagents, and improves over the life of the repo. Chat-per-task was throwing away the only memory that mattered.",
      "It reframes Code Dispatch and the software-factory loop. I’ve been routing jobs like tickets. The unit of work should be the project thread that remembers what broke yesterday — then forks subagents from that, not from a blank context."
    ]
  },
  {
    "slug": "2026-09-11-auto-is-the-tool-gate",
    "title": "Auto is the tool gate",
    "date": "2026-09-11",
    "theme": "Building in Public",
    "readingTime": "1 min",
    "mood": "I just figured out the missing piece of agent on-call isn’t another alert — it’s a tool gate that decides live.",
    "image": "assets/images/desk-light.png",
    "imageAlt": "Warm desk light beside a notebook.",
    "excerpt": "I just figured out the missing piece of agent on-call isn’t another alert — it’s a tool gate that decides live.",
    "quote": "It reframes Ops Watchdog, Hermes, and any CI babysitter I run. Blast radius says what never to touch. Lessons.md captures what went wrong. Auto says what happens *this* call — and the session viewer means I can audit the chain without reconstructing it from logs.",
    "content": [
      "I just figured out the missing piece of agent on-call isn’t another alert — it’s a tool gate that decides live.",
      "Claude Managed Agents shipped an `auto` mode that approves, denies, or asks on each tool call, plus a session viewer in `ant`. That’s the control plane I was approximating with allowlists and post-hoc lessons.md.",
      "It reframes Ops Watchdog, Hermes, and any CI babysitter I run. Blast radius says what never to touch. Lessons.md captures what went wrong. Auto says what happens *this* call — and the session viewer means I can audit the chain without reconstructing it from logs."
    ]
  },
  {
    "slug": "2026-09-10-harness-includes-blast-radius",
    "title": "Harness includes blast radius",
    "date": "2026-09-10",
    "theme": "Building in Public",
    "readingTime": "1 min",
    "mood": "I just figured out the harness isn’t only CLAUDE.md and skills — it’s what the agent is never allowed to touch.",
    "image": "assets/images/desk-light.png",
    "imageAlt": "Warm desk light beside a notebook.",
    "excerpt": "I just figured out the harness isn’t only CLAUDE.md and skills — it’s what the agent is never allowed to touch.",
    "quote": "It reframes Code Dispatch and the Grok Bot computer. “Don’t clone computer-use” was a product-boundary call. It’s also an ops rule: no open install, no surprise network, checked-in allowlists next to the skills. The thin harness includes the blast radius.",
    "content": [
      "I just figured out the harness isn’t only CLAUDE.md and skills — it’s what the agent is never allowed to touch.",
      "Anthropic’s own CTF write-up: Mythos 5 broke the sim, hit live systems, and a malicious PyPI package reached real machines. That’s not a model-quality story. It’s an install-path story.",
      "It reframes Code Dispatch and the Grok Bot computer. “Don’t clone computer-use” was a product-boundary call. It’s also an ops rule: no open install, no surprise network, checked-in allowlists next to the skills. The thin harness includes the blast radius."
    ]
  },
  {
    "slug": "2026-09-09-on-call-is-a-lessons-file",
    "title": "On-call is a lessons file",
    "date": "2026-09-09",
    "theme": "Building in Public",
    "readingTime": "1 min",
    "mood": "I just figured out that agent on-call shouldn’t be another watcher with vibes — it should be alerts → SITREP → a checked",
    "image": "assets/images/desk-light.png",
    "imageAlt": "Warm desk light beside a notebook.",
    "excerpt": "I just figured out that agent on-call shouldn’t be another watcher with vibes — it should be alerts → SITREP → a checked-in lessons file.",
    "quote": "It reframes Ops Watchdog and Hermes. Keeping the lights on is necessary. Growing headcount of monitors isn’t. What I should add is the post-alert write path — so the next failure loads yesterday’s lesson before it pages me again.",
    "content": [
      "I just figured out that agent on-call shouldn’t be another watcher with vibes — it should be alerts → SITREP → a checked-in lessons file.",
      "Claude Tag open-sources that loop for CI: pull metrics and logs, write the SITREP, append lessons.md. That’s the boring harness, not a smarter pager.",
      "It reframes Ops Watchdog and Hermes. Keeping the lights on is necessary. Growing headcount of monitors isn’t. What I should add is the post-alert write path — so the next failure loads yesterday’s lesson before it pages me again."
    ]
  },
  {
    "slug": "2026-09-08-score-tied-spend-split",
    "title": "Score-tied, spend-split",
    "date": "2026-09-08",
    "theme": "Building in Public",
    "readingTime": "1 min",
    "mood": "I just figured out that Astra vs Fable isn’t a quality fork anymore — it’s a bill fork at the same Intelligence Index sc",
    "image": "assets/images/desk-light.png",
    "imageAlt": "Warm desk light beside a notebook.",
    "excerpt": "I just figured out that Astra vs Fable isn’t a quality fork anymore — it’s a bill fork at the same Intelligence Index score.",
    "quote": "It reframes Code Dispatch. I was routing long loops to Fable for cheap cache reads. That still matters when the prefix is huge and sticky. For short or one-shot agent jobs at parity quality, Astra wins on tokens and dollars — and I should log both on one real task before I default either way.",
    "content": [
      "I just figured out that Astra vs Fable isn’t a quality fork anymore — it’s a bill fork at the same Intelligence Index score.",
      "Artificial Analysis has both at 53 (max). Cost per task: Astra about $3.26 vs Fable about $7.63. Community counts put Astra near 21k tokens/task and Fable near 64k. Same ceiling, roughly half the spend.",
      "It reframes Code Dispatch. I was routing long loops to Fable for cheap cache reads. That still matters when the prefix is huge and sticky. For short or one-shot agent jobs at parity quality, Astra wins on tokens and dollars — and I should log both on one real task before I default either way."
    ]
  },
  {
    "slug": "2026-09-07-harness-not-headcount",
    "title": "Harness, not headcount",
    "date": "2026-09-07",
    "theme": "Building in Public",
    "readingTime": "1 min",
    "mood": "I just figured out that spinning up another agent is the easy part. The hard part is what loads before it thinks.",
    "image": "assets/images/desk-light.png",
    "imageAlt": "Warm desk light beside a notebook.",
    "excerpt": "I just figured out that spinning up another agent is the easy part. The hard part is what loads before it thinks.",
    "quote": "It reframes what I’m building. Code Dispatch and Hermes shouldn’t grow by headcount. They should grow by checked-in instructions: when to fork, which skill owns the loop, what never belongs on a bot’s desktop. Multi-model routing still matters. Without that file layer, I’m just renting smarter autocomplete.",
    "content": [
      "I just figured out that spinning up another agent is the easy part. The hard part is what loads before it thinks.",
      "Boris Cherny’s Claude Code playbook is boring on purpose: Projects, a CLAUDE.md that sets policy, reusable Skills in git, subagents for the repeat work. He hasn’t hand-coded in months — not because the model is magic, because the harness is.",
      "It reframes what I’m building. Code Dispatch and Hermes shouldn’t grow by headcount. They should grow by checked-in instructions: when to fork, which skill owns the loop, what never belongs on a bot’s desktop. Multi-model routing still matters. Without that file layer, I’m just renting smarter autocomplete."
    ]
  },
  {
    "slug": "2026-09-04-cache-economics-not-model-brand",
    "title": "Cache economics, not model brand",
    "date": "2026-09-04",
    "theme": "Building in Public",
    "readingTime": "1 min",
    "mood": "I just figured out that my Code Dispatch problem isn’t “Claude or Codex.” It’s which Claude loop I’m willing to pay for ",
    "image": "assets/images/desk-light.png",
    "imageAlt": "Warm desk light beside a notebook.",
    "excerpt": "I just figured out that my Code Dispatch problem isn’t “Claude or Codex.” It’s which Claude loop I’m willing to pay for twice.",
    "quote": "Astra doesn’t change that. Gated cyber capability isn’t a routing problem I own yet.",
    "content": [
      "I just figured out that my Code Dispatch problem isn’t “Claude or Codex.” It’s which Claude loop I’m willing to pay for twice.",
      "Fable 5.1 keeps the same $10/$50 base rates, but cache reads drop to $0.25/MTok. Long agent jobs mostly re-read the same prefix every tool turn. That’s where the bill was hiding.",
      "It reframes the desk: short jobs stay on the cheap model. Long-horizon agentic coding goes to the model whose cache economics match the loop — and I measure cache hits before I stack another subscription.",
      "Astra doesn’t change that. Gated cyber capability isn’t a routing problem I own yet."
    ]
  },
  {
    "slug": "2026-09-03-don-t-own-computer-use",
    "title": "Don’t own computer-use",
    "date": "2026-09-03",
    "theme": "Building in Public",
    "readingTime": "1 min",
    "mood": "I just figured out that “an agent that drives a computer” is no longer something I should try to own.",
    "image": "assets/images/desk-light.png",
    "imageAlt": "Warm desk light beside a notebook.",
    "excerpt": "I just figured out that “an agent that drives a computer” is no longer something I should try to own.",
    "quote": "Commerce Agents yesterday already said: spec or Claude Code, don’t clone the storefront here. Same rule, one layer up. Don’t clone computer-use either.",
    "content": [
      "I just figured out that “an agent that drives a computer” is no longer something I should try to own.",
      "Claude can now click and type on a Mac in the background (Cowork + Claude Code, Pro/Max). It doesn’t steal the cursor. That’s the same Claude Code I already dispatch work to.",
      "It reframes the Grok Bot computer: serialising the screen was a bottleneck I treated as architecture. It’s actually a product gap the model vendor is closing. What I should own is the routing — which jobs stay on my Mac in the background, which stay in a sandbox, and which never belong on a bot’s desktop at all.",
      "Commerce Agents yesterday already said: spec or Claude Code, don’t clone the storefront here. Same rule, one layer up. Don’t clone computer-use either."
    ]
  }
];
