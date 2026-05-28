---
name: slide-decks
description: Build presentation decks (reveal.js HTML or PowerPoint .pptx) from notes, brain-dumps, or outlines. Use this skill whenever the user asks for slides, a deck, a presentation, a pitch, a pptx, a reveal.js deck, or wants to turn notes/bullets/outline into slides. Use it even when the user describes the format casually ("3-slide deck", "quick slides for my talk") or specifies a brand ("Fueled style", "on brand"). Use it for both create-from-scratch and refactor-from-notes flows. Do NOT use for inline conversational summaries, markdown reports, or single-image visuals — only when the deliverable is an actual slide deck file.
---

# Slide Decks

Build decks from notes. The deck is a *translation* of the user's content, not a transcription — group, name, and design with intent.

## When this triggers, do this first

1. **Clarify in one short turn** (skip any item the user has already specified):
   - **Format** — reveal.js (single HTML) or pptx?
   - **Brand** — "Fueled style, or pick a fitting palette?"
   - **Audience and duration** — 15-min engineering talk reads differently from a client pitch.
   - **Slide count** — "3-slide deck" means 3 *content* slides; a cover is additive.

2. **Read the relevant reference file** based on format:
   - reveal.js → `references/reveal-gotchas.md`
   - pptx → `references/pptx-gotchas.md`
   - Fueled brand mentioned (either format) → also `references/fueled-brand.md`

3. **Translate the notes, don't transcribe.** See the rules below.

## Content-to-slides translation

When the user dumps notes, do this:

- **Find the through-line** — the one thing they want the audience to remember.
- **Group bullets into 3 buckets**, even if they gave you 7. Three is the memorable number.
- **Name each slide by its job, not its topic.** "Mindset," "Principles," "Where it wins" — what the slide *does*, not just what it's *about*.
- **One headline per slide**, paired with a one-line subtitle. Headline carries the argument; the rest is evidence.
- **Vary layout per slide** — cards, blocks, rows. Don't repeat the same grid three times.
- **End with a takeaway band** on the last slide restating the through-line.

## Build steps

### For reveal.js

1. Copy `assets/fueled-reveal-template.html` to your working directory.
2. Replace the marked content blocks. Three layouts are pre-built: 3 cards, 2 blocks (one accent), split + takeaway. Pick which fits each slide's content.
3. If non-Fueled brand: swap the CSS custom properties at the top (`--perfect-black`, `--nebula`, etc.) for the chosen palette. Leave layout intact.
4. Save the final HTML to the user's outputs directory.
5. QA per `references/reveal-gotchas.md` (visual screenshots via Playwright).
6. One fix-and-verify cycle, then deliver.

### For pptx

1. Use `assets/fueled-pptx-starter.js` as a base.
2. Read `references/pptx-gotchas.md` first — pptxgenjs has landmines that will silently corrupt files.
3. Build slides via the `makeContentSlide` helper, adding cards/blocks via `addShape` and `addText`.
4. Save to outputs directory.
5. QA via the bash recipe in `references/pptx-gotchas.md` (PDF → JPG conversion).
6. One fix-and-verify cycle, then deliver.

## Design rules that consistently work

These apply to every deck regardless of brand:

- **One accent color, one type weight.** Biggest "designed vs AI-generated" signal.
- **Monospaced metadata strip** at the top of each content slide (slide number + section name).
- **Consistent foot** across content slides (wordmark left, deck name right). Skip on cover.
- **No decorative full-width colored bars or accent lines under titles.** Both read as AI slop.
- **Generous black/white space** beats filling every inch.
- **No em dashes in body copy** — use hyphens, periods, or restructure.
- **For Fueled work**: hyphen-dash `—` bullets, not round bullets. (See `references/fueled-brand.md`.)

## Deliverables

- Single file output per deck. reveal.js → one `.html`. pptx → one `.pptx`.
- Place in the appropriate outputs directory and call `present_files` if available.
- Brief note on what to know (font swaps, keyboard shortcuts). Don't over-explain the design.

## Watch-outs

- **Don't transcribe notes verbatim.** Always translate into 3 named slides.
- **Don't suggest Anthropic products unprompted.** Decks are about the user's content.
- **Don't auto-include speaker notes** unless asked.
- **Don't over-explain the design** in your response. The user can see it.
- **One QA cycle, then stop.** Don't chase pixel nudges.
