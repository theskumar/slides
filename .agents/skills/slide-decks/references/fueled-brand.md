# Fueled Brand Reference

Cached from Notion `Core Brand Assets` (ID `1e54dccd-9d8b-8073-aa10-e4846e3123be`). Refetch from Notion if you suspect tokens have changed; otherwise rely on these.

## Color tokens

| Token | Hex | Role |
|---|---|---|
| Perfect Black | `#000000` | Primary background |
| Perfect White | `#F5F5F1` | Primary text (warm, not pure white) |
| Nebula | `#6652FF` | Single dominant accent |
| Tech Grey | `#EAEAEA` | Secondary |
| Cryo | `#00A6FF` | Secondary, sparingly |
| Solar | `#FF52B7` | Secondary, sparingly |
| Nova | `#FBBC09` | Secondary, sparingly |

**Use one accent dominantly (Nebula).** The other secondary colors are for system states, charts, or rare punctuation — not for general slide decoration.

## Typography

- **Primary**: Aeonik Medium. One weight only. The single-weight constraint is intentional and on-brand.
- **Web fallback**: Space Grotesk Medium. Close geometric character.
- **Monospaced**: JetBrains Mono or Roboto Mono — used for meta strips, slide numbers, code, and small caps labels.
- **Body text size on a 1280×800 reveal slide**: 16px for cards, 22px for subtitles, 36–88px for headlines.

## Bullets

Fueled uses **hyphen-dashes** (`—`), not round bullets. In CSS:

```css
ul li::before {
  content: "—";
  color: var(--nebula);  /* or white on accent backgrounds */
}
```

Round bullets are off-brand. So are numbered lists unless ordering is meaningful.

## Iconography

- **Font Awesome 6 Sharp** is the canonical icon set.
- For reveal/HTML, an inline SVG lightning bolt glyph is included in the reveal template — it's a geometric stand-in, not the actual logo file.

## Voice

The brand voice is "bold and modern," with "clarity and contrast" as foundational principles. Translated to deck design:

- Generous black space
- Single accent (Nebula) doing all the heavy color lifting
- One type weight, period
- Sharp corners on cards/blocks; no soft rounded boxes
- Resist gradients, decorative bars, multiple accent colors

## Em dashes

The user prefers no em dashes in body copy. Use hyphens, periods, or restructure the sentence. (This is a user preference, not a brand rule — but applies across all their work.)

## When you need the real logo

If the user provides logo files (e.g., from Drive), use them. Otherwise, the inline SVG bolt in the reveal template is a respectful geometric placeholder. Do not attempt to reproduce the actual Fueled logo from memory.
