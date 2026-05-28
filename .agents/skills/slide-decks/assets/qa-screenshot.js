// Reveal.js QA — screenshots each slide for visual review
// Usage:
//   1. Save your deck as deck.html
//   2. Make a QA copy with local reveal.js paths:
//        npm install reveal.js@5.1.0
//        sed -e 's|https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/dist/|node_modules/reveal.js/dist/|g' \
//            deck.html > qa.html
//   3. Edit the SLIDES array below to match your deck
//   4. Run:
//        NODE_PATH=/home/claude/.npm-global/lib/node_modules node qa-screenshot.js
//      (or whatever the global node_modules path is in your environment)

const { chromium } = require('playwright');
const path = require('path');

// ----- Edit per deck -----
const QA_FILE = 'qa.html';
const OUTPUT_DIR = '.';
const VIEWPORT = { width: 1440, height: 900 };
const SLIDES = ['cover', 'slide-1', 'slide-2', 'slide-3'];   // names → PNG filenames; index = reveal slide index
// -------------------------

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: VIEWPORT });
  const page = await ctx.newPage();

  const fileUrl = 'file://' + path.resolve(QA_FILE);

  for (let i = 0; i < SLIDES.length; i++) {
    await page.goto(fileUrl + '#/' + i, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);   // let web fonts settle
    const out = path.join(OUTPUT_DIR, SLIDES[i] + '.png');
    await page.screenshot({ path: out });
    console.log('captured', out);
  }

  await browser.close();
})();
