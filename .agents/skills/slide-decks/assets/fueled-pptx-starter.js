// Fueled-brand pptx starter
// Usage: edit the slide-building section at the bottom, then `node fueled-pptx-starter.js`
// Requires: npm install pptxgenjs

const pptxgen = require("pptxgenjs");

// ===== Fueled brand tokens (NO # prefix — pptxgenjs corrupts files with #) =====
const BG     = "000000";   // Perfect Black
const INK    = "F5F5F1";   // Perfect White
const NEBULA = "6652FF";   // accent
const MUTED  = "8A8A86";   // pre-mixed muted text (pptxgenjs has no opacity in color strings)
const RULE   = "2A2A2A";   // hairline divider on dark bg
const SOFT   = "0F0F0F";   // very subtle card fill on dark

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";   // 13.3 x 7.5 inches
pres.author = "Fueled";
pres.title  = "Deck Title";    // TODO: replace

// ===== Helper: render a content slide head (meta strip + foot) =====
function newContentSlide({ num, section, deckName }) {
  const s = pres.addSlide();
  s.background = { color: BG };

  // Meta strip: small accent bar + mono caps
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 0.55, w: 0.04, h: 0.55,
    fill: { color: NEBULA }, line: { color: NEBULA }
  });
  s.addText(`${num} / 03`, {
    x: 0.8, y: 0.5, w: 2, h: 0.4,
    fontSize: 11, fontFace: "JetBrains Mono",
    color: NEBULA, charSpacing: 4, margin: 0
  });
  s.addText(section.toUpperCase(), {
    x: 0.8, y: 0.78, w: 4, h: 0.35,
    fontSize: 11, fontFace: "JetBrains Mono",
    color: INK, charSpacing: 6, bold: true, margin: 0
  });

  // Foot
  s.addText("fueled", {
    x: 0.6, y: 7.05, w: 2, h: 0.3,
    fontSize: 11, bold: true, fontFace: "Aeonik Medium",
    color: INK, margin: 0
  });
  s.addText(deckName.toUpperCase(), {
    x: 10.5, y: 7.05, w: 2.8, h: 0.3,
    fontSize: 9, fontFace: "JetBrains Mono",
    color: MUTED, charSpacing: 4, align: "right", margin: 0
  });

  return s;
}

// ===== Helper: add a headline with an accent word =====
function addHeadline(s, { plain, accent, x = 0.6, y = 1.4, w = 12, h = 1.4, size = 56 }) {
  s.addText([
    { text: plain + " ", options: { color: INK } },
    { text: accent,      options: { color: NEBULA } }
  ], {
    x, y, w, h,
    fontSize: size, fontFace: "Aeonik Medium", margin: 0
  });
}

// ===== Helper: render a card (Layout A) =====
function addCard(s, { x, y, w, h, tag, title, body }) {
  s.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h, fill: { color: SOFT }, line: { color: RULE, width: 1 }
  });
  s.addText(tag.toUpperCase(), {
    x: x + 0.3, y: y + 0.3, w: w - 0.6, h: 0.3,
    fontSize: 9, fontFace: "JetBrains Mono",
    color: NEBULA, charSpacing: 4, margin: 0
  });
  s.addText(title, {
    x: x + 0.3, y: y + 0.7, w: w - 0.6, h: 0.5,
    fontSize: 20, bold: true, fontFace: "Aeonik Medium",
    color: INK, margin: 0
  });
  s.addText(body, {
    x: x + 0.3, y: y + 1.25, w: w - 0.6, h: h - 1.4,
    fontSize: 13, fontFace: "Aeonik Medium",
    color: MUTED, paraSpaceAfter: 4, margin: 0
  });
}

// ===== Helper: hyphen-dash bullet list (Fueled style — no round bullets) =====
function makeFueledBullets(items, color = INK) {
  return items.map(text => ({
    text: "—   " + text,
    options: { color, bullet: false, breakLine: true }
  }));
}

// ============================================================
// BUILD YOUR DECK BELOW — edit content, keep structure
// ============================================================

const DECK_NAME = "DECK NAME · SECTION";   // TODO: replace

// ----- Cover (optional — delete if not needed) -----
const cover = pres.addSlide();
cover.background = { color: BG };
cover.addShape(pres.shapes.RECTANGLE, {
  x: 0.6, y: 0.55, w: 0.04, h: 0.55,
  fill: { color: NEBULA }, line: { color: NEBULA }
});
cover.addText("EYEBROW · LABEL", {
  x: 0.8, y: 0.55, w: 4, h: 0.4,
  fontSize: 11, fontFace: "JetBrains Mono",
  color: NEBULA, charSpacing: 5, bold: true, margin: 0
});
cover.addText([
  { text: "Deck ",  options: { color: INK } },
  { text: "title.", options: { color: NEBULA } }
], {
  x: 0.6, y: 2.5, w: 12, h: 2,
  fontSize: 88, fontFace: "Aeonik Medium", margin: 0
});
cover.addText("One-line subtitle or description.", {
  x: 0.6, y: 4.7, w: 11, h: 0.6,
  fontSize: 22, fontFace: "Aeonik Medium", color: MUTED, margin: 0
});

// ----- Slide 1: Layout A (3 cards) -----
const s1 = newContentSlide({ num: "01", section: "Section name", deckName: DECK_NAME });
addHeadline(s1, { plain: "Headline", accent: "word.", size: 64 });
s1.addText("One-line argument or framing.", {
  x: 0.6, y: 2.5, w: 11, h: 0.5,
  fontSize: 18, fontFace: "Aeonik Medium", color: MUTED, margin: 0
});
addCard(s1, { x: 0.6,  y: 3.4, w: 4.0, h: 3.2,
  tag: "01 · TAG", title: "Card title", body: "Body text, ~2 sentences max." });
addCard(s1, { x: 4.75, y: 3.4, w: 4.0, h: 3.2,
  tag: "02 · TAG", title: "Card title", body: "Body text, ~2 sentences max." });
addCard(s1, { x: 8.9,  y: 3.4, w: 4.0, h: 3.2,
  tag: "03 · TAG", title: "Card title", body: "Body text, ~2 sentences max." });

// ----- Slide 2: Layout B (2 blocks, one accent) -----
const s2 = newContentSlide({ num: "02", section: "Section name", deckName: DECK_NAME });
addHeadline(s2, { plain: "Two-part headline", accent: "payoff.", size: 48 });

// Block 1 (dark with border)
s2.addShape(pres.shapes.RECTANGLE, {
  x: 0.6, y: 3.0, w: 6.0, h: 4.0,
  fill: { color: BG }, line: { color: RULE, width: 1 }
});
s2.addText("01 · LABEL", {
  x: 0.85, y: 3.25, w: 5.5, h: 0.4,
  fontSize: 11, fontFace: "JetBrains Mono", color: NEBULA, charSpacing: 5, bold: true, margin: 0
});
s2.addText("Block title.", {
  x: 0.85, y: 3.75, w: 5.5, h: 0.6,
  fontSize: 28, bold: true, fontFace: "Aeonik Medium", color: INK, margin: 0
});
s2.addText("One-line restatement of the point.", {
  x: 0.85, y: 4.35, w: 5.5, h: 0.4,
  fontSize: 13, fontFace: "Aeonik Medium", color: MUTED, margin: 0
});
s2.addText(makeFueledBullets([
  "Supporting point one",
  "Supporting point two",
  "Supporting point three",
  "Supporting point four"
]), {
  x: 0.85, y: 4.85, w: 5.5, h: 1.9,
  fontSize: 13, fontFace: "Aeonik Medium", paraSpaceAfter: 6, margin: 0
});

// Block 2 (Nebula accent)
s2.addShape(pres.shapes.RECTANGLE, {
  x: 6.7, y: 3.0, w: 6.0, h: 4.0,
  fill: { color: NEBULA }, line: { color: NEBULA }
});
s2.addText("02 · LABEL", {
  x: 6.95, y: 3.25, w: 5.5, h: 0.4,
  fontSize: 11, fontFace: "JetBrains Mono", color: INK, charSpacing: 5, bold: true, margin: 0
});
s2.addText("Block title.", {
  x: 6.95, y: 3.75, w: 5.5, h: 0.6,
  fontSize: 28, bold: true, fontFace: "Aeonik Medium", color: INK, margin: 0
});
s2.addText("One-line restatement of the point.", {
  x: 6.95, y: 4.35, w: 5.5, h: 0.4,
  fontSize: 13, fontFace: "Aeonik Medium", color: "DDDDDD", margin: 0
});
s2.addText(makeFueledBullets([
  "Supporting point one",
  "Supporting point two",
  "Supporting point three",
  "Supporting point four"
], INK), {
  x: 6.95, y: 4.85, w: 5.5, h: 1.9,
  fontSize: 13, fontFace: "Aeonik Medium", paraSpaceAfter: 6, margin: 0
});

// ----- Slide 3: Layout C (rows + accent callout + takeaway) -----
const s3 = newContentSlide({ num: "03", section: "Section name", deckName: DECK_NAME });
addHeadline(s3, { plain: "Two-part headline.", accent: "Punchline.", size: 40 });

// Three rows
const rowY = 3.0, rowH = 1.0;
["Row label", "Row label", "Row label"].forEach((label, i) => {
  const y = rowY + i * rowH;
  s3.addText(label, {
    x: 0.6, y: y + 0.1, w: 2.5, h: 0.6,
    fontSize: 20, bold: true, fontFace: "Aeonik Medium", color: INK, margin: 0
  });
  s3.addText("One-line description of this item.", {
    x: 3.2, y: y + 0.15, w: 4.5, h: 0.7,
    fontSize: 12, fontFace: "Aeonik Medium", color: MUTED, margin: 0
  });
  if (i < 2) {
    s3.addShape(pres.shapes.LINE, {
      x: 0.6, y: y + rowH - 0.05, w: 7.2, h: 0,
      line: { color: RULE, width: 1 }
    });
  }
});

// Accent callout on the right
s3.addShape(pres.shapes.RECTANGLE, {
  x: 8.4, y: 3.0, w: 4.3, h: 3.0,
  fill: { color: NEBULA }, line: { color: NEBULA }
});
s3.addText("CALLOUT", {
  x: 8.65, y: 3.25, w: 3.8, h: 0.4,
  fontSize: 11, fontFace: "JetBrains Mono", color: INK, charSpacing: 5, bold: true, margin: 0
});
s3.addText("Big idea", {
  x: 8.65, y: 3.85, w: 3.8, h: 0.7,
  fontSize: 28, bold: true, fontFace: "Aeonik Medium", color: INK, margin: 0
});
s3.addText("One paragraph supporting the callout, ~2 sentences.", {
  x: 8.65, y: 5.0, w: 3.8, h: 1.0,
  fontSize: 12, fontFace: "Aeonik Medium", color: "F5F5F1", margin: 0
});

// Takeaway band at the bottom
s3.addShape(pres.shapes.RECTANGLE, {
  x: 0.6, y: 6.3, w: 12.1, h: 0.6,
  fill: { color: SOFT }, line: { color: SOFT }
});
s3.addShape(pres.shapes.RECTANGLE, {
  x: 0.6, y: 6.3, w: 0.05, h: 0.6,
  fill: { color: NEBULA }, line: { color: NEBULA }
});
s3.addText([
  { text: "The takeaway: ", options: { color: NEBULA, bold: true } },
  { text: "one sentence restating the through-line of the whole deck.", options: { color: INK } }
], {
  x: 0.85, y: 6.35, w: 11.7, h: 0.5,
  fontSize: 14, fontFace: "Aeonik Medium", valign: "middle", margin: 0
});

// ===== Write the file =====
pres.writeFile({ fileName: "/mnt/user-data/outputs/deck.pptx" })
  .then(name => console.log("Wrote:", name))
  .catch(err => console.error("Error:", err));
