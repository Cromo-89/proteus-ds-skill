# Proteus Foundations Pages

How `proteus-foundations` builds the **presentation frames** for each foundations section
in Figma — the pages that *document* the system (Color, Typography, Spacing, Radius,
Elevation…). Read this before constructing any section frame. The token contract
(`references/token-contract.md`) governs the variables themselves; this file governs how
those variables are shown on the canvas.

## Two layers, don't confuse them

- **Functional layer** — the real Figma variables and styles in the `Primitives` and
  `Semantic` collections. Defined by the token contract. Its "design" is structural, not
  visual.
- **Presentation layer** — the frames on the canvas that display those tokens (swatches,
  type specimens, spacing scales, section headers). This file governs this layer.

A section page presents the tokens; it never redefines them. Every value shown must read
from the variables already created — a swatch is bound to its color variable, a spacing bar
sized by its spacing variable. If a page shows a value that no token holds, that's a bug.

## References and the division of labor

- **Atlassian Design (primary, structure).** The repeatable page anatomy and the rhythm
  between sections come from here: hero header → anatomy/specimen → token application →
  roles/scale → states (where relevant) → accessibility → related. Atlassian's token
  naming discipline (`color.property.role.emphasis.state`) also informs how we label rows.
- **Shopify Polaris (token-table pattern).** The scannable token listing inside each page —
  rows of swatch/sample + token name + resolved value + usage — follows Polaris's tidy,
  table-driven presentation.
- **Coinbase CDS (logic only).** What tokens exist and how Light/Dark resolves. Already
  encoded in the token contract; not a visual reference.

Pick Atlassian's skeleton for every page so all sections share one structure. Incoherent
section layouts are the fastest way to make a foundations doc look amateur.

## Dogfooding: pages are built from Proteus tokens

The presentation frames must themselves be built from Proteus tokens — page background uses
`color.background`, body text uses `color.foreground` / `color.foreground.muted`, all gaps
and padding come from `space.*`, headings use the type styles, surfaces use
`color.surface.elevated` and `color.border`. The documentation is itself a live demonstration
of the system. Never style a page frame with raw hex or arbitrary spacing — that breaks the
whole premise.

Visual direction: **minimal, token-driven**. Restrained chrome, generous whitespace from the
spacing scale, content in a single centered column. Let the tokens be the subject.

## The repeatable page template

Every section page is one top-level frame with **vertical auto-layout**. Structure, top to
bottom:

```
Page frame  (vertical auto-layout, fill = color.background, padding = space.12,
             item spacing = space.10, fixed width ~1200, hug height)
│
├─ Header block  (vertical auto-layout, item spacing = space.2)
│   ├─ Eyebrow / category label   (type: label, color.foreground.muted)
│   ├─ Page title                 (type: heading.xl, color.foreground)
│   └─ Description (1–2 lines)     (type: body, color.foreground.muted, max ~640w)
│
├─ Section block  (repeats; vertical auto-layout, item spacing = space.6)
│   ├─ Section subtitle           (type: heading.md, color.foreground)
│   ├─ Section intro (optional)    (type: body, color.foreground.muted)
│   └─ Specimen                    (the per-section content — see below)
│
└─ … more section blocks
```

Rules that keep every page consistent:

- **All spacing comes from `space.*` tokens** — padding, item spacing, gaps. No typed pixel
  values anywhere on a page frame.
- **Auto-layout everywhere.** Page = vertical; specimen rows = horizontal or wrap as noted.
  Nothing is free-positioned; everything hugs or fills.
- **One content width** across all section pages so they feel like one document.
- **Text uses the type styles** created from the typography tokens, never ad-hoc font
  settings.

## Per-section specimens

**Color**
- A swatch grid per ramp: horizontal auto-layout that wraps, one cell per step. Each cell is
  a small frame filled by the bound color variable, with the step label (e.g. `600`) and the
  resolved value below it in `color.foreground.muted`.
- A semantic token table (Polaris-style): rows of `swatch | token name | resolves to | usage`.
  The swatch is bound to the semantic variable so it follows the active mode.
- Show the page in both Light and Dark (two instances of the page, or rely on the mode
  switcher) so reviewers see the semantic layer flipping.

**Typography**
- A specimen list: one row per type style. Each row shows the style name, a live sample
  ("The quick brown fox" or "Ag"), and the spec (family / size / weight / line-height) pulled
  from the tokens.
- Order from largest to smallest so the scale reads as a hierarchy.

**Spacing**
- The scale visualized as bars: one row per step, a filled bar whose width equals the spacing
  value, next to the token name and the value. Increasing width down the list makes the
  rhythm legible at a glance.

**Radius**
- One sample square per radius token with that corner radius applied (bound to the radius
  variable), labeled with token name + value.

**Elevation**
- One surface card per elevation token, with the effect style applied, labeled.

## Layer naming

Layers mirror the structure so the file stays navigable and so proteus-code can later read it
predictably:

- Page frame: `Page/<Section>` (e.g. `Page/Color`).
- Header: `Header`; blocks: `Section/<name>` (e.g. `Section/SemanticTokens`).
- Specimen atoms: `Swatch/<token>`, `Specimen/Type/<style>`, `Bar/<space-token>`.

Bind, don't hardcode: a swatch's fill is the color variable, a spacing bar's width is the
spacing variable. The label text can reference the value but the visual must be the bound
token, so the page updates if a token changes.

## Build order within a page

1. Confirm the section's tokens already exist in the variable collections (this page presents
   them; it doesn't create them).
2. Build the page frame + header block from the template.
3. Add section blocks in the section's natural order (for Color: ramps → semantic tokens →
   states/accessibility note).
4. Build specimens by **binding** atoms to variables, never typing values.
5. Verify in both Light and Dark.

## Checklist

- [ ] Page frame and all blocks use vertical/horizontal auto-layout — nothing free-positioned.
- [ ] Every padding/gap is a `space.*` token; no typed pixels.
- [ ] Page chrome is built from Proteus semantic tokens (background, foreground, border…).
- [ ] Specimen visuals are **bound** to variables, not static copies of values.
- [ ] Text uses type styles generated from the typography tokens.
- [ ] Content width and header pattern match the other section pages.
- [ ] Page reads correctly in both Light and Dark.
- [ ] Layers follow the naming convention.
