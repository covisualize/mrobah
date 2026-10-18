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
    "slug": "2026-10-18-how-i-use-codex-with-my-ai-bots",
    "title": "How I use Codex with my AI bots",
    "date": "2026-10-18",
    "theme": "Building in Public",
    "readingTime": "3 min",
    "mood": "I'm not a trained developer. I come from insurance and customer service, and I'm working on a small local trades business idea. I've still been able to build things with Codex.",
    "image": "assets/images/desk-light.png",
    "imageAlt": "Warm desk light beside a notebook.",
    "excerpt": "I'm not a trained developer. I come from insurance and customer service, and I'm working on a small local trades business idea.",
    "quote": "I want to share practical, plain-English notes for people from non-tech jobs and small local businesses who want to build simple tools with Codex. I'd rather write about what actually happened, including the bits that went wrong.",
    "content": [
      "I'm not a trained developer. I come from insurance and customer service, and I'm working on a small local trades business idea. I've still been able to build things with Codex.",
      "## The setup",
      "I run a small team of AI bots on a cloud computer:",
      "- a chief-of-staff bot that sends my requests to the right bot",
      "- a Notion task board where I drop jobs for the bots to pick up",
      "- a daily check of that board that tells me only what's waiting on me",
      "- a bot that watches my email for scams",
      "## How the bots use Codex",
      "All my bots follow one routing rule, which I wrote in shared memory. Writing goes to Claude. Any coding, scripts, data or terminal work goes to the Codex CLI, whichever bot it comes from.",
      "The bots call Codex headless with `codex exec`, so there's no chat window. Codex runs gpt-6.1-sol, which I've set as the default model in its config file.",
      "I also run Hermes, an open-source agent, on the same cloud computer. It runs on Codex through the openai-codex provider using my ChatGPT sign-in, and I talk to it over Telegram.",
      "## Before the bots",
      "I started with Codex cloud tasks straight from ChatGPT. Between September and November 2025 that produced about 16 pull requests across my GitHub repos, each linked back to a Codex task. They include landing pages, a chess game with a computer opponent, a multi-agent personal-finance demo built on the OpenAI Agents SDK, and an email-triage toolkit.",
      "A later cleanup PR removed tooling junk I'd committed by accident, like screenshots, logs and agent state files. It also added a .gitignore so it couldn't happen again.",
      "I've also used Codex when Windows broke on my laptop. It was like a handyman who explains things without jargon.",
      "One smaller experiment is a Telegram bridge that lets me poke at local Codex sessions from my phone.",
      "## The lesson",
      "One day I asked Codex to switch a landing page to a dark theme. It took four pull requests that same day, and I closed two of them without merging.",
      "I learned the hard way that a vague ask gets a vague result. I also learned that I have to check the output myself rather than assume it's right.",
      "## What's next",
      "I want to share practical, plain-English notes for people from non-tech jobs and small local businesses who want to build simple tools with Codex. I'd rather write about what actually happened, including the bits that went wrong."
    ]
  },
  {
    "slug": "2026-09-16-verification-is-the-bottleneck",
    "title": "Verification is the bottleneck",
    "date": "2026-09-16",
    "theme": "Building in Public",
    "readingTime": "1 min",
    "mood": "I just figured out the bottleneck isn’t writing the code anymore — it’s proving it.",
    "image": "assets/images/desk-light.png",
    "imageAlt": "Warm desk light beside a notebook.",
    "excerpt": "I just figured out the bottleneck isn’t writing the code anymore — it’s proving it.",
    "quote": "It reframes Code Dispatch and the software-factory loop. I’ve been optimizing routing and harness so agents produce more. The scarce seat is review — PR checks, CI babysitting, the human who still has to say ship. What I should grow next is verification throughput, not another coder.",
    "content": [
      "I just figured out the bottleneck isn’t writing the code anymore — it’s proving it.",
      "Anthropic’s own numbers: Claude authors about 80% of their code while engineers ship about 8× more. Tests went 10× and CI 25×. Generation scaled. Verification didn’t keep up.",
      "It reframes Code Dispatch and the software-factory loop. I’ve been optimizing routing and harness so agents produce more. The scarce seat is review — PR checks, CI babysitting, the human who still has to say ship. What I should grow next is verification throughput, not another coder."
    ]
  },
  {
    "slug": "2026-09-14-route-by-loop-shape",
    "title": "Route by loop shape",
    "date": "2026-09-14",
    "theme": "Building in Public",
    "readingTime": "1 min",
    "mood": "I just figured out Code Dispatch shouldn’t pick a brand — it should pick a loop shape.",
    "image": "assets/images/desk-light.png",
    "imageAlt": "Warm desk light beside a notebook.",
    "excerpt": "I just figured out Code Dispatch shouldn’t pick a brand — it should pick a loop shape.",
    "quote": "It reframes the desk I already run. Long unattended jobs → Codex where model-switch and open tooling matter. Deep reasoning and tight agent loops → Claude. Spend-split was about dollars at the same ceiling. This is about which harness is allowed to leave the room.",
    "content": [
      "I just figured out Code Dispatch shouldn’t pick a brand — it should pick a loop shape.",
      "Codex is pitching open-source / any-model; Claude Code stays closed. Devs are flipping to Codex for long unattended runs. That’s not a loyalty story. It’s an autonomy story.",
      "It reframes the desk I already run. Long unattended jobs → Codex where model-switch and open tooling matter. Deep reasoning and tight agent loops → Claude. Spend-split was about dollars at the same ceiling. This is about which harness is allowed to leave the room."
    ]
  },
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
