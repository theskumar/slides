# agent-talk

15-min talk for Fueled engineers. *My journey into the coding agent world.*

Two variants of the same deck. Pick one before presenting.

## Files

- `agent-talk-dev.html` — Dev aesthetic (amber accent on near-black, Inter type).
- `agent-talk-fueled.html` — Fueled brand (Nebula purple on perfect black, Space Grotesk).
- `plan.md` — Talk plan: through-line, slide map, cross-thread placement.

## Run

Open either HTML in a browser. Reveal.js shortcuts:

| Key | Action |
| --- | --- |
| `→` `←` | Next / previous slide |
| `F` | Fullscreen |
| `ESC` | Slide overview |
| `S` | Speaker notes |
| `B` | Blackout |

## Edit

All styling lives in the `<style>` block at the top of each HTML. To recolor a variant, swap the four CSS custom properties under `:root`: `--perfect-black`, `--panel`, `--perfect-white`, `--nebula`.

## Source

Built with reveal.js 5.1.0 (CDN). No build step.
