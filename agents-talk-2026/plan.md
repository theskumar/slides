# Coding Agent Talk — Plan

**Format:** reveal.js single HTML
**Duration:** 15 min
**Audience:** Fueled engineers (mixed: Cursor / Claude Code / Copilot daily users)
**Brand:** Dev aesthetic (mono type, near-black bg, amber accent). May swap to Fueled later.
**Slides:** 6 total (cover + 5 content)

## Through-line

You own the whole coding workspace (editor, agent, git, terminal, tmux), not the other way around. Slow down. **Less is more.** Agents are just a loop, so every tool you add inflates the loop's context.

## Cross-cutting threads (woven across multiple slides)

- **Agent-as-loop:** An agent is a while-loop over a context window. Each tool, skill, MCP, or system-prompt addition gets shoved into that loop on every turn.
- **Bash is the surface:** LLMs are very good at the CLI. Most jobs need no extra tools beyond a shell.
- **Vendor drift:** Tools that start lean generalize as their user base grows (Claude Code is the canonical example: hidden thinking, added tools, breaks established workflows).

## Slide map

### 0. Cover

- Title: **My journey into the coding agent world**
- Subtitle: *Slow down. Own the workspace. Less is more, for you and for the agent.*
- Speaker line: `saurabh kumar / engineering, fueled` · `15 min`

### 1. Start lean. Defaults bloat the brain.

- **Headline:** Start lean. Defaults bloat the brain.
- **Caption (mono, between headline and rows):** `// an agent is just a loop. each tool you add inflates every turn.`
- **Three rows (left column):**
    - **Defaults are heavy.** Pre-loaded MCPs, skills, and system prompts cost context every turn. Most ship with assumptions that do not match your work.
    - **Lean goes far.** A small set covers most work. Learn from what others use, then build only what you need. Let the agent help refine its own setup.
    - **Bloat is sticky.** It is much harder to remove a tool you have come to trust than to never add it. Start at the floor.
- **Sandbox evidence callout (right, bordered amber):**
    - Heading: `Drop the security theater.`
    - Tag: `os-level network + file isolation`
    - Body: Once you understand the harness, OS-level sandboxing handles network and filesystem isolation. In-harness gates become rails that confuse more than they protect.
- **Takeaway:** Start with the floor. Use the agent itself to grow the setup as real gaps appear.
- **Layout:** split (rows + callout) + takeaway band

### 2. Mindset: artist, not consumer

- **Headline:** You own the tools. Not the other way around.
- **Two blocks:**
    - **Consumer pattern.** Adopt every new thing. Tools change weekly, you change with them.
        - Switch editors every quarter
        - Stack MCPs because they exist
        - Vendors generalize as they grow (Claude Code: hidden thinking, more tools, broken flow)
        - Your setup expires the day the vendor pivots
    - **Artist pattern (amber).** Compose. Keep. Tweak. Pick what works, make it bend, grow at your pace.
        - Zed + terminal + lazygit, version-controlled in dotfiles
        - pi-agent: a lean harness you can tweak (not mine)
        - tmux for parallel agents across projects
        - Tried Cursor, kept landing back here
- **Layout:** 2 blocks (consumer vs artist), accent on artist side

### 3. Context is king. Index, not library.

- **Headline:** Give the agent an index. Not a library.
- **Three rows (left column):**
    - **Index up front.** Good initial structure = best context. Agents are excellent at progressive exploration when they know where to look.
    - **Decisions in code.** CLAUDE.md, ADRs, docstrings. Capture the why. The agent finds it on the next run, so you do not re-explain.
    - **Prune ruthlessly.** Mixed context is confused context. If a skill or MCP does not earn its slot, remove it.
- **Leverage callout (right, solid amber):**
    - `>_`
    - Heading: `Structure once. Re-read forever.`
    - Tag: `CLAUDE.md / AGENTS.md`
    - Body: The agent does not need a tour every session. A small, deliberate index pays compound interest across runs.
- **Takeaway:** Context is king. But more context is not better context.
- **Layout:** split (rows + callout) + takeaway band (paired visually with slide 1)

### 4. Review > Generation

- **Headline:** The agent writes. You ship.
- **Subtitle:** Generation is cheap. Review is the bottleneck. Build the workflow around review and feedback, not around generation speed.
- **Three cards:**
    - **01 · self-review.** Read every diff before staging. Lazygit makes the pass quick. A diff you cannot review fast is a diff you cannot trust.
    - **02 · manual test.** Run it. Always. Tests catch regressions. Manual catches misunderstanding.
    - **03 · PR summary.** Lead with why. The diff already shows what. Your PR should explain context and trade-off, so the next reader (or agent) lands fast.
- **Layout:** 3 cards

### 5. Wins, leverage, anti-patterns

- **Headline:** What works. What does not.
- **Three columns:**
    - **Where it wins. Explore. Code. Chase a goal.**
        - Exploring an unknown repo (ask, do not read)
        - Writing code from a clear spec (bounded, reviewable)
        - Debugging to a desired outcome (it iterates, you judge)
    - **Leverage. A loop + bash goes far.**
        - Agents are a loop, bash is the surface (most jobs need no extra tools)
        - Have the agent write a 10-line script (better than doing it by hand)
        - Prefer terminal over desktop chat (broader surface, full toolchain)
    - **Do not. Stop adding stuff.**
        - Chase every new tool (master the basics first)
        - Bloat skills, MCPs, AGENTS.md (they muddy the context)
        - Default to the desktop chat (smaller surface, less leverage)
- **Takeaway band:** Slow down. Own the workspace. The setup is the moat.
- **Layout:** 3 columns (wins · leverage · warn-styled don't) + takeaway

## Design notes

- **Palette:** near-black `#0b0c0e` bg, panel `#131418`, bone fg `#eaeaea`, amber accent `#ffb454`. Single accent throughout.
- **Type:** Inter for display/body, JetBrains Mono for metadata, captions, and tags.
- **Meta strip:** top of each content slide: `01 / 05 · start lean` style.
- **Foot:** wordmark left (`saurabh kumar`), deck name right (`agents · 2026`). Skip on cover.
- **No em dashes** in body copy.
- **Two callout variants** to avoid duplicate visual on slides 1 and 3:
    - Slide 1 = bordered amber outline, dark panel fill (.evidence)
    - Slide 3 = solid amber fill, dark text (.leverage)

## Cross-thread placement summary

| Thread | Anchored on | Reinforced on |
| --- | --- | --- |
| Agent-as-loop | Slide 1 (caption) | Slide 5 (leverage column heading) |
| Bash is the surface | Slide 5 (leverage column) | Slide 1 (sandbox callout: less harness, more OS) |
| Vendor drift / Claude Code drift | Slide 2 (consumer pattern bullet) | Slide 5 (anti-patterns: chase every new tool) |
| Start lean / less is more | Slide 1 (whole slide) | Slide 3 (prune ruthlessly), Slide 5 (don't column) |
| Own the workspace | Slide 2 (whole slide) | Slide 5 (takeaway band) |
| Context > generation | Slide 3 (whole slide) | Slide 4 (PR summary card) |
| Review is the bottleneck | Slide 4 (whole slide) | Slide 5 (wins: chase a goal, you judge) |

## Output

- Deck: `~/Documents/agent-talk.html`
- Plan: `~/Documents/agent-talk-plan.md` (this file)

## Open items / future iteration

- May swap palette to Fueled brand later (one CSS-variable swap).
- If 15 min runs long, slide 4 (Review) is the easiest cut to merge into slide 5 (anti-patterns has overlap).
- Vendor-drift point on slide 2 is the most opinionated bullet, watch how the room reacts. Have a softer phrasing ready if a Claude Code fan pushes back.
