# Why I built Recall OS

This is the honest version of _why_ this tool exists. The README tells you what it does. This tells
you the problem I kept hitting and the small, workable thing I built to deal with it.

## The problem I kept running into

AI makes it fast to get software to a working shape. The gap shows up later: most of the _why_ — the
decisions, the constraints, the rules — lives in the chat, not in the repo. The code ships, but the
reasoning behind it doesn't come with it.

That's fine until the product reaches a shape and other people take over — a teammate, a real
engineering team, or just a fresh agent next week. They inherit the code without the context, and
have to reverse-engineer or re-decide things that were already settled. I wanted what I (or anyone,
even someone vibe-coding their way to a first version) build with AI to be able to **scale past
me**: to hand off cleanly and keep its reasoning intact.

## What I wanted instead

I didn't want a smarter model or a hosted "memory" service. I wanted something boring and
dependable: the project's decisions and rules written into **plain files that live in the repo**,
get reviewed in pull requests, and are still there next session — so I don't have to think about
context, summarizing, or re-explaining at all.

> Git tracks what changed. I wanted something that tracks why it changed.

That's all Recall OS really is: a quick, workable way to keep durable engineering memory next to
your code, and a discipline system that nudges the work to actually get written down.

## The bet: discipline, not magic

Recall OS doesn't call an AI model, hit the network, or send telemetry. Not because that's purer —
because I wanted the part that _checks_ my work to be trustworthy and free.

`recall doctor` is deliberately simple and deterministic. It doesn't judge whether your architecture
is good — it can't, and I don't want it pretending it can. It checks the boring, reliable things:
are the docs that should exist there, is a "done" claim backed by test evidence, does the memory
point at an ADR or a source file that doesn't exist anymore. Same input, same answer, every time.
I'd rather have a dumb check I can trust than a clever one I can't.

The actual thinking still comes from the agent (Claude, Codex, Cursor). Recall OS's job isn't to be
smart — it's to put the right memory in front of the agent and make the agent's work persist. So it
wires each tool with its own native mechanism: a SessionStart hook that injects a live memory map in
Claude Code, an always-apply rule for Cursor, and `AGENTS.md` (which both Codex and Cursor
auto-load) as the portable floor. The dynamic per-session map is a Claude Code bonus, not a promise
everywhere — I'd rather be honest about that than pretend one trick works in every tool. I can't
force a model to be correct, but I _can_ stop re-explaining the project every single time.

## It proposes, you decide

It's architecture-neutral on purpose. It records _your_ decisions; it never makes them for you.
Presets, `recall adopt`, and MCP capture all produce **proposed** memory that a human accepts with
`recall adr accept`. Nothing becomes "truth" silently — a proposal you can review beats a guess the
tool slipped in.

## Retrieval finds information; Recall protects decisions

People lump "memory," "AI," "context," and "retrieval" into one bucket. They aren't the same thing.

A vector memory engine — supermemory, mem0, a RAG store — does something genuinely useful: it
remembers information, retrieves the relevant pieces, and injects them into a prompt. But its source
of truth is embeddings, vectors, retrieval scores, and graph relationships. Tell it "all auth goes
through Auth0" and it can surface that sentence beautifully.

Recall's source of truth is different: files, ADRs, standards, reviews, accepted decisions. It asks
a different question about that same statement — _where_ was it accepted, _which_ ADR owns it, is it
still valid, does anything contradict it, was it reviewed? That is governance, not retrieval.

So I don't think Recall competes with vector databases. The two are complementary: Recall produces
the durable, reviewed truth, and a retrieval engine can index that truth for fast lookup. What
Recall actually competes with is **tribal knowledge, forgotten decisions, stale documentation, and
chat-history-only development** — a very different category.

That is the bet underneath the "plain files" choice: retrieval is useful, but authority has to stay
human-readable. If an embedding store disappears, the memory disappears. If a vector ranking
changes, the "truth" can shift. If an ADR lives in git, the decision still exists ten years later.

## What it catches today, and what's next

Memory decays in two ways, and they are not equally hard.

**Structural decay** is objective, and Recall already catches it: a missing ADR or module, a broken
`src/` reference, memory that points at a decision that was never accepted, an empty template, a
"done" claim with no review or evidence. Doctor can say _this is broken_ with high confidence,
because none of it requires understanding the code — only checking it.

**Semantic decay** is harder. An ADR says PostgreSQL; the team migrated to MySQL; the ADR still
exists, its references still resolve, every file is still there. Structurally everything passes.
Semantically, the memory is now lying. Recall does **not** fully catch that yet — and I'd rather say
so than pretend otherwise. A lot of "AI memory" tools imply they maintain semantic truth
automatically. They don't, because semantic truth is expensive.

Here is the part I care about: semantic judgment must **not** move into the deterministic gate. The
moment `recall doctor` needs a model to decide "do these two docs agree," it stops being trustworthy
and free. So that work lives with the agent instead — the generated `architecture-drift-review`
skill walks the memory graph (ADRs, modules, features, architecture) and asks whether they still
agree. The gate stays dumb and reliable; the model does the reading.

So the honest maturity, in order:

```txt
Create memory      → strong
Protect memory     → strong
Enforce evidence   → good
Understand memory  → early (agent-assisted, not automatic)
```

That order is deliberate. The first thing teams lose is the decision that never got written down —
not the subtle contradiction between two that did. You cannot detect a contradiction in memory that
does not exist. Get _create, protect, enforce_ right first; semantic drift detection is the next
frontier, and it belongs to the agent, not the gate.

## What it's honestly not

- Not an AI agent or an app generator. It writes memory, not your product code — and that's the
  point: it's the durable layer the agent has been missing.
- Not magic recall. It's something better for a codebase: external memory you can read, review, and
  trust, because it lives in the repo instead of a model's context.
- It won't _rubber-stamp_ your architecture as good — that judgment stays with you and the agent,
  which is exactly where it belongs. But it does help you get there: presets propose vetted,
  stack-specific defaults (Laravel, Next.js, FastAPI, and more) that you accept or reject, never
  silently. And it guarantees the reasoning is **captured, consistent, and backed by evidence** —
  the part teams almost always lose, and the part everything else builds on.

## The short version

This is a personal tool that grew up. It improves how I build software indirectly — through
discipline, not magic: decide acceptance before coding, write decisions down, keep evidence for
"done," and stop losing the reasoning to a summarized chat. If you've felt the same friction, maybe
it helps you too.
