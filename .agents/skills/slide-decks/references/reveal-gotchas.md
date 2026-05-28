# Reveal.js Gotchas and QA

Read this before building or modifying a reveal.js deck. These are bugs that cost real time the first time around.

## The three rules that consistently bite

### 1. No `vw`/`vh` units inside `.slides section`

Reveal applies a `transform: scale()` to fit a fixed canvas into the browser viewport. Viewport units (`vw`, `vh`) measure the *browser viewport*, not the scaled slide. Content sized in `vw` will silently overflow the slide box because the transform scales the *element* but not its `vw`-computed children.

**Always use `px` (or `rem` based on a fixed root font size).** Design to an explicit slide canvas:

```javascript
Reveal.initialize({
  width: 1280,
  height: 800,
  margin: 0,
  center: false,   // manage vertical layout yourself in CSS
  hash: true
});
```

Then every slide is sized in px:

```css
.slide {
  width: 1280px;
  height: 800px;
  padding: 64px 80px;
  box-sizing: border-box;
}
```

### 2. Reveal's theme CSS resets `h1/h2/h3` margins

Reveal's `black.css` (and other themes) apply `margin: 0` to headings. Custom margin classes get overridden by specificity. Pattern that works:

```css
.reveal h1, .reveal h2, .reveal h3 { margin: 0; }
.reveal .display { margin-bottom: 28px; }   /* this wins */
```

Always prefix your overrides with `.reveal` to match reveal's own selectors.

### 3. CDN may be blocked in sandboxed environments

The deliverable (the user's HTML file) should use CDN links — they work fine in the user's browser. But for **screenshot-based QA inside a sandboxed agent environment**, CDN requests may be blocked. Install reveal.js locally and make a QA-only copy:

```bash
cd /home/claude/work
npm install reveal.js@5.1.0

# Make a QA copy with local paths (keep the original on CDN)
sed -e 's|https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/dist/|node_modules/reveal.js/dist/|g' \
    deck.html > qa.html
```

The deliverable stays CDN-based; only the QA copy uses local paths.

## Visual QA via Playwright

Playwright is installed globally at `/home/claude/.npm-global/lib/node_modules/`. Use the `assets/qa-screenshot.js` script from this skill. Edit the `slides` array to match your deck (e.g., `['cover', 'slide-1', 'slide-2', 'slide-3']`), then run:

```bash
cd /home/claude/work
NODE_PATH=/home/claude/.npm-global/lib/node_modules node qa-screenshot.js
```

Each slide is written as a PNG. View them and check for:

- **Overflow** past the 1280×800 slide bounds (most common after a layout change)
- **Clipping** by reveal's control arrows (right edge near bottom)
- **Low contrast** (light grey on near-black, etc.)
- **Awkward line wraps** in headlines — usually want to widen `max-width` or drop font size
- **Foot overlapping content** — usually means a `min-height` is too aggressive

## One fix-and-verify cycle

After the first QA pass, make targeted fixes and re-screenshot once. **Then stop.** Don't chase pixel nudges across multiple cycles — diminishing returns are real and the user wants the deck, not perfection.

## Layout patterns in the template

`assets/fueled-reveal-template.html` ships with three layouts. Pick by content:

- **`.grid-3` (3 cards)** — when each item is short and parallel ("the three pillars," "three strengths")
- **`.grid-2` (2 blocks, one Nebula accent)** — when you have a contrast or paired structure ("input vs output," "before vs after")
- **`.split` (rows + accent callout + takeaway)** — when one side enumerates and the other punctuates ("here are the strengths, here's the leverage that compounds them")

Vary across slides. Three of the same layout in a row reads as monotonous.

## Useful reveal keyboard shortcuts (mention these to the user)

- Arrows — navigate
- `F` — fullscreen
- `ESC` — slide overview
- `S` — speaker notes view
- `B` — black out screen (presenter tool)
