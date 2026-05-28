# pptx (pptxgenjs) Gotchas and QA

Read this before building or modifying a .pptx file. pptxgenjs has landmines that will silently corrupt your output.

## Setup

This skill assumes pptxgenjs is available via the same npm-global path that ships with most Claude Code environments. If you need to install:

```bash
npm install -g pptxgenjs
# Or per-project: cd /home/claude/work && npm install pptxgenjs
```

When working in a Claude Code agent with file tools, prefer reading `/mnt/skills/public/pptx/SKILL.md` and `/mnt/skills/public/pptx/pptxgenjs.md` first if they exist — they have more current API details than this file.

## Landmines

### 1. Hex colors NEVER include `#`

pptxgenjs corrupts the file (sometimes silently, sometimes with a parse error in PowerPoint) when colors include the `#` prefix.

```javascript
// WRONG — will corrupt the file
s.addShape(pres.shapes.RECTANGLE, { fill: { color: "#6652FF" } });

// CORRECT
s.addShape(pres.shapes.RECTANGLE, { fill: { color: "6652FF" } });
```

### 2. No alpha in hex colors

pptxgenjs uses a separate `opacity` (or `transparency`) property, not 8-char hex strings.

```javascript
// WRONG
fill: { color: "00000080" }

// CORRECT — pre-mix the color, or use opacity:
fill: { color: "808080" }
// Or:
fill: { color: "000000", transparency: 50 }   // 0-100
```

For "muted" text on dark backgrounds, **pre-mix a flat grey** like `8A8A86` rather than trying to apply opacity to white.

### 3. Don't reuse option objects across `addShape` calls

pptxgenjs mutates option objects in place. Reusing them causes earlier shapes to inherit later styles. Use a factory function or spread:

```javascript
// WRONG
const cardStyle = { fill: { color: "F4F4F2" }, line: { color: "F4F4F2" } };
s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 4, w: 4, h: 3, ...cardStyle });
cardStyle.fill.color = "EAEAEA";  // mutates first card too!

// CORRECT — factory or deep-copy
function cardStyle(color) {
  return { fill: { color }, line: { color } };
}
```

### 4. `rectRadius` only works with `ROUNDED_RECTANGLE`

Passing `rectRadius` to a plain `RECTANGLE` silently does nothing — the shape stays square.

```javascript
s.addShape(pres.shapes.ROUNDED_RECTANGLE, { ..., rectRadius: 0.05 });
```

For Fueled brand though, **prefer sharp corners** — rounded boxes are off-brand.

### 5. Don't use literal `"•"` unicode bullets in text

Use `bullet: true` in the text options. Putting a literal bullet character in the string creates double bullets in some PowerPoint versions.

```javascript
// WRONG
s.addText("• First item\n• Second item", { ... });

// CORRECT
s.addText([
  { text: "First item",  options: { bullet: true } },
  { text: "Second item", options: { bullet: true } }
], { ... });
```

For **Fueled hyphen-dash bullets**, use a literal `—` plus tab spacing and disable bullets — Fueled doesn't use round bullets at all:

```javascript
s.addText("—   First item", { bullet: false, ... });
```

### 6. `LAYOUT_WIDE` is 13.3 × 7.5 inches

All coordinates are in inches. A typical content area is roughly x: 0.6 to 12.7 (width 12.1), y: 0.4 to 7.1 (height 6.7). Use the foot zone (y > 7.0) sparingly.

## Visual QA loop

After building the .pptx, convert to PDF then rasterize to JPGs and view each:

```bash
cd /home/claude/work
python /mnt/skills/public/pptx/scripts/office/soffice.py --headless --convert-to pdf deck.pptx
rm -f slide-*.jpg
pdftoppm -jpeg -r 110 deck.pdf slide
# View each slide-*.jpg
```

This requires LibreOffice (`soffice`) and `pdftoppm` (from poppler-utils). Both are typically available in Claude Code agent environments.

Check for:

- **Off-canvas content** (a text frame extending past 13.3" wide)
- **Font fallback** if Aeonik isn't installed — the file should still display with Space Grotesk or system fallback
- **Text overflow** within fixed-size text frames (pptxgenjs doesn't auto-shrink)
- **Color rendering** — Fueled's Nebula `6652FF` should look vivid purple, not muddy

## One fix-and-verify cycle

Same rule as reveal.js: one fix pass, then deliver. Don't chase pixel nudges.

## When to choose pptx over reveal.js

- User explicitly asks for `.pptx` or "PowerPoint"
- Deck will be edited by someone other than the user (PowerPoint is universal)
- Deck needs to be embedded in a corporate slide library
- User mentions Google Slides → still build .pptx; Google Slides imports it cleanly

Otherwise, reveal.js is usually the better choice — sharper typography, no PowerPoint quirks, single-file deliverable.
