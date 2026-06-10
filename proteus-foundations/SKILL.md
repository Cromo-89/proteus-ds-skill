---
name: proteus-foundations
version: 1.8.0
description: >-
  Build the foundations of the Proteus design system (ProteusDS) in Figma: all
  design tokens — color (dark-first matte, brand indigo, vivid states), typography
  (Inter + JetBrains Mono, 13 composite styles), spacing (4px scale), radius, elevation,
  motion, z-index, border, opacity, and iconography (Material Symbols Rounded) — expressed
  as Figma variable collections, text styles, and effect styles with Dark (primary) and
  Light (secondary) modes, driven by 10 DTCG token files. Use this skill for anything
  about defining, editing, or materializing Proteus foundations in Figma — tokens, palette,
  scales, modes, theming — even if the user does not say "foundations". This is the FIRST
  stage of the Proteus pipeline (foundations → components → code); everything downstream
  depends on what this skill produces. Do NOT build components (proteus-component) or
  generate code (proteus-code) here.
---

## On load

When this skill is invoked, the **very first thing** you must output — before any explanation,
question, or action — is the following splash screen, rendered exactly as shown (preserve
all spacing and box-drawing characters):

```
╭───────────────────────────────────────────────────────╮
│                                                       │
│   ┌─┐┬─┐┌─┐┌┬┐┌─┐┬ ┬┌─┐                            │
│   ├─┘├┬┘│ │ │ ├┤ │ │└─┐                            │
│   ┴  ┴└─└─┘ ┴ └─┘└─┘└─┘                            │
│   ┌─┐┌─┐┬ ┬┌┐┌┌┬┐┌─┐┌┬┐┬┌─┐┌┐┌┌─┐                  │
│   ├┤ │ ││ ││││ ││├─┤ │ ││ ││││└─┐                  │
│   └  └─┘└─┘┘└┘─┴┘┴ ┴ ┴ ┴└─┘┘└┘└─┘                  │
│                                                       │
│   Design System for ProteusDS  ·  Stage 1/3           │
│   Tokens · Variables · Styles · Modes        v 1.8.0  │
│                                                       │
╰───────────────────────────────────────────────────────╯
```

After printing the splash, proceed normally.

---

# Proteus Foundations

Stage one of the three-stage Proteus pipeline:

| Stage | Skill | Responsibility |
|-------|-------|----------------|
| 1 | **proteus-foundations** | Tokens, variables, styles, Light/Dark modes — in Figma |
| 2 | proteus-component | Component sets in Figma, built on these foundations |
| 3 | proteus-code | Figma → shadcn/ui → Storybook + ProteusDS docs |

Target code stack: **shadcn/ui on Tailwind v4** (OKLCH colors, CSS variables via
`@theme inline`). The foundations are designed so the eventual code translation is
mechanical, not interpretive.

## Token files (read these before touching Figma)

All token files live in `assets/tokens/`. Read every relevant file before creating or
editing variables. The full naming spec, tier rules, shadcn mapping, and dark-first
decision are in `references/token-contract.md`. Page-building rules are in
`references/foundations-pages.md`.

| File | Tier | Figma target | Notes |
|------|------|-------------|-------|
| `primitives.json` | 1 — Primitive | `Primitives` collection (single mode) | Color ramps (OKLCH), space, radius, font primitives |
| `semantic.dark.json` | 2 — Semantic | `Semantic` collection, **Dark mode (PRIMARY)** | 40 tokens; every value aliases a primitive |
| `semantic.light.json` | 2 — Semantic | `Semantic` collection, Light mode (secondary) | Same 40 names, different primitive aliases |
| `typography.json` | Composite | 13 Figma **Text Styles** | Inter sans + JetBrains Mono; no Figma variables |
| `elevation.json` | Accessory | 5 Figma **Effect Styles** | Subtle shadows; elevation reads via surface lightness |
| `border.json` | Primitive | `Primitives` collection | borderWidth (none/thin/thick) + focusRing (width/offset) |
| `opacity.json` | Primitive | `Primitives` collection | disabled 0.4 / hover 0.08 / pressed 0.12 / scrim 0.6 |
| `icon.json` | Primitive | Documentation / code only | Material Symbols Rounded axes: wght 400, FILL 0, GRAD −25, opsz=size |
| `motion.json` | Accessory | Documentation / code only | duration (instant→slower) + easing cubicBezier |
| `zindex.json` | Accessory | Documentation / code only | Named stacking scale |

## Three-tier model

Tokens flow in one direction only — no skipping, no sideways references:

**Primitive → Semantic → Component**

- **Primitive**: raw atoms, literal values, one Figma collection, single mode.
- **Semantic**: purpose-driven aliases over primitives. The ONLY tier with two modes
  (Dark primary, Light secondary). Component sets reference semantics and get theming free.
- **Component**: per-component knobs, points at semantics. Minimal; lives mostly in code.

## Dark-first theming rule

Dark is the primary mode; Light is the secondary override. Theming lives in the semantic
tier only — a mode switch changes which primitive a semantic token points to, nothing else.

- ✅ `color.background` → `{color.neutral.950}` in Dark, `{color.neutral.50}` in Light
- ❌ A primitive or component carrying two mode values
- Brand `primary` is one step brighter in Dark (`brand.700` = `#5649B7`) than in Light
  (`brand.800`). White foreground on both.

## How tokens become Figma variables (binding strategy)

Variables are created in two collections. Follow this path:

### Primitives collection
- One mode (name it "Value").
- Color variables: set each to its resolved OKLCH value (Figma stores colors as RGBA
  internally; pass the OKLCH string and let Figma resolve it, or convert to hex for safety).
- Dimension variables (space, radius, borderWidth, focusRing): FLOAT, value in px.
- Number variables (opacity, zIndex): FLOAT.
- Group names mirror token paths using `/` as separator: `color/neutral/950`, `space/4`.

### Semantic collection
- Two modes: **Dark** first (primary), then **Light**.
- Each variable is a **variable alias** pointing at its primitive — not a literal.
  In the Figma API this is `{ type: "VARIABLE_ALIAS", id: "<primitive_variable_id>" }`.
  Via Figma MCP write-to-canvas, set the variable value as a reference to the primitive
  variable by its collection path.
- This alias link is what makes the mode switch work: flipping Dark ↔ Light updates every
  surface, text, and border that references a semantic variable.

### Smoke test (run this before building anything else)
Create the `Primitives` collection with only the neutral ramp (11 steps) and the
`Semantic` collection with 5 tokens (`color.background`, `color.foreground`,
`color.primary`, `color.border`, `color.ring`) aliased to their primitives in both modes.
Open Figma, switch modes, and verify the semantic variables show the chain icon (alias)
rather than a static color. If aliases work → continue via MCP. If only literals are
written → use Tokens Studio for the semantic sync and MCP for page building.

## Workflow — three phases, always in order

Dependencies are strict: Phase 1 must exist before Phase 2; both must exist before Phase 3.

### Phase 1 — Variable collections (functional)

1. **Read the token files.** Load all 10 files from `assets/tokens/`. Read
   `references/token-contract.md` sections 1–6 for naming rules and tier constraints.
2. **Create `Primitives` collection** (single mode).
   Order: color ramps → space → radius → borderWidth + focusRing → opacity.
   `icon.json`, `motion.json`, `zindex.json` → code/doc only, no Figma variables.
3. **Create `Semantic` collection** (Dark mode first, then Light).
   Every variable must be a variable alias — no literals. Verify alias chain icon in Figma
   before proceeding. Check WCAG AA contrast in both modes (4.5:1 body, 3:1 UI/large).

### Phase 2 — Figma styles (functional)

4. **Create 13 Text Styles** from `typography.json`. Name them to mirror token paths
   (`text/display`, `text/heading/xl` … `text/code`). These reference font primitives
   indirectly via style properties.
5. **Create 5 Effect Styles** from `elevation.json` (`elevation/none` through
   `elevation/xl`). In dark mode elevation is subtle — the surface color does most of the
   lifting.

### Phase 3 — Presentation pages (one at a time, confirm before next)

Build pages in this order. Each page is a frame built with the repeatable template in
`references/foundations-pages.md`. Every specimen is **bound** to its variable or style —
never a typed value.

6. **Color** — first and most validating. Shows primitive ramps (bound to Primitive
   variables) and the semantic token table (bound to Semantic variables). Switching modes
   here proves the alias chain works end-to-end.
7. **Typography** — specimen list using the 13 Text Styles.
8. **Spacing** — scale bars; each bar's width driven by its `space.*` variable.
9. **Radius + Border** — rounded squares and stroke-width samples, all variable-bound.
10. **Elevation** — cards using Effect Styles, showing surface lightness progression.
11. **Iconography** — Material Symbols Rounded size scale + fill 0 vs 1 comparison.
12. **Motion + Opacity + Z-index** — reference tables; these are code-only tokens so the
    page shows the named scale as a documentation artifact rather than live variable bindings.

Confirm with the user after each page before building the next.

## Hard rules

- **No raw values above the primitive tier.** No hex, no arbitrary px in semantic or
  component tokens. If a value is missing, add a primitive — don't hardcode.
- **No tier-skipping.** Semantic → primitive only. Component → semantic only.
- **Dark/Light is semantic only.** Primitives and components are mode-agnostic.
- **One scale per dimension.** Single spacing, radius, and type scale. No one-offs.
- **Semantic names are a breaking-change contract.** Rename = breaking change downstream.
- **Color in OKLCH.** Matches Tailwind v4 / shadcn and gives perceptually even ramps.
- **All variables aliased, not copied.** A semantic variable with a literal value defeats
  the entire theming architecture. Reject and rebuild.
- **Pages present, never redefine.** Every specimen is bound; pages dogfood Proteus tokens.

## Handoff

When Phase 1 and 2 are complete, the Figma file has: `Primitives` collection (single
mode), `Semantic` collection (Dark + Light with aliases), 13 Text Styles, 5 Effect Styles.
proteus-component can begin building component sets from this point.

When Phase 3 is complete, ProteusDS has a documented foundation ready for the Storybook
and documentation site that proteus-code will generate.

---

## Learnings from Implementation

Patterns and fixes discovered during the first real build of Proteus DS in Figma.
Add new entries here as the skill evolves.

### OKLCH → sRGB conversion (required for color variable creation)

Figma stores colors as RGBA (0–1). OKLCH must be converted before calling
`setValueForMode`. Embed this function in every `use_figma` call that creates color variables:

```javascript
function oklchToRgb(L, C, H) {
  const hRad = H * Math.PI / 180;
  const a_ok = C * Math.cos(hRad);
  const b_ok = C * Math.sin(hRad);
  const l_ = L + 0.3963377774 * a_ok + 0.2158037573 * b_ok;
  const m_ = L - 0.1055613458 * a_ok - 0.0638541728 * b_ok;
  const s_ = L - 0.0894841775 * a_ok - 1.2914855480 * b_ok;
  const l = l_*l_*l_, m = m_*m_*m_, s = s_*s_*s_;
  const r_lin =  4.0767416621*l - 3.3077115913*m + 0.2309699292*s;
  const g_lin = -1.2684380046*l + 2.6097574011*m - 0.3413193965*s;
  const b_lin = -0.0041960863*l - 0.7034186147*m + 1.7076147010*s;
  function gamma(c) {
    const v = Math.max(0, Math.min(1, c));
    return v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1/2.4) - 0.055;
  }
  return { r: gamma(r_lin), g: gamma(g_lin), b: gamma(b_lin), a: 1 };
}
```

For neutral colors (C=0) this reduces to a gray — the formula handles it correctly.

### Variable creation batching

The 10-operation-per-call limit applies to **canvas nodes** (frames, text, shapes).
Variable creation is lighter — up to 22 color variables or 46 float variables per call
is safe. Confirmed in production: 112 Primitive variables created across 4 calls with
zero errors.

### Semantic variable scopes by token role

Set scopes explicitly — `ALL_SCOPES` pollutes every picker. Confirmed mapping:

| Token role | Scopes |
|---|---|
| Primitive colors (raw palette) | `["ALL_FILLS", "STROKE_COLOR", "EFFECT_COLOR"]` |
| Background / surface | `["FRAME_FILL", "SHAPE_FILL"]` |
| Foreground / text | `["TEXT_FILL"]` |
| Interactive surfaces (primary, secondary, accent) | `["ALL_FILLS", "STROKE_COLOR"]` |
| Border / input | `["STROKE_COLOR"]` |
| Ring / focus | `["STROKE_COLOR", "EFFECT_COLOR"]` |
| Status fg | `["TEXT_FILL", "SHAPE_FILL"]` |
| Status bg | `["ALL_FILLS", "STROKE_COLOR"]` |
| Status wash | `["FRAME_FILL", "SHAPE_FILL"]` |
| Space | `["GAP", "WIDTH_HEIGHT"]` |
| Radius | `["CORNER_RADIUS"]` |
| Border width | `["STROKE_FLOAT"]` |
| Opacity | `["OPACITY"]` |
| Font size | `["FONT_SIZE"]` |
| Font weight | `["FONT_WEIGHT"]` |
| Line height | `["LINE_HEIGHT"]` |
| Letter spacing | `["LETTER_SPACING"]` |

### Critical token misuse: `color/background` ≠ button fill

`color/background` is the **page surface** (neutral/950 Dark, neutral/50 Light).
Using it as a button fill in Light mode = white button with white text = invisible.

Correct token pairing for each button type:

| Button | Fill | Text |
|---|---|---|
| Primary | `color/primary` | `color/primary-foreground` |
| Secondary | `color/secondary` | `color/secondary-foreground` |
| Ghost / muted | `color/muted` | `color/muted-foreground` |
| Destructive | `color/destructive-bg` | `color/destructive-foreground` |

### `color/primary-foreground` is white in both modes — by design

Both Dark and Light resolve to `neutral/50` (white). The brand indigo
(`brand.700` Dark / `brand.800` Light) is dark enough to sustain white text
with WCAG AA contrast in both modes. This is not a bug.

### Figma page creation with `use_figma`

Use `figma.createPage()` then immediately `await figma.setCurrentPageAsync(newPage)`.
Works only in design files (`figma.com/design/...`). Page resets to first page on every
new `use_figma` call — always switch explicitly at the top of each script.

### Auto-layout ordering rules (confirmed)

1. `figma.createAutoLayout('VERTICAL')` — creates with HUG on both axes
2. `node.resize(w, h)` — call BEFORE setting sizing modes (resize resets to FIXED)
3. `parent.appendChild(node)` — append to auto-layout parent FIRST
4. Then set `layoutSizingHorizontal = 'FILL'` / `layoutSizingVertical = 'HUG'`

`HUG` on the auto-layout frame itself does NOT require being inside another AL frame.
`FILL` on a child DOES require the parent to be AL and the child to be appended first.

### Padding variable binding

Set the numeric value first, then bind the variable — both are needed:

```javascript
frame.paddingTop = 12;
frame.setBoundVariable('paddingTop', spaceVar);
```

### Color page architecture (Phase 3 — Color)

Confirmed structure that works in production:

```
Page/Color  (vertical AL, fill=color/background, padding=space/12, gap=space/10)
├── Header  (vertical AL, gap=space/2)
│   ├── Eyebrow       text/label/sm    color/foreground-muted
│   ├── Title         text/heading/xl  color/foreground
│   └── Description   text/body/md     color/foreground-muted
├── Divider  (rect 1px, fill=color/border, FILL width)
├── Section/PrimitiveRamps  (vertical AL, gap=space/8)
│   ├── Title + intro
│   └── Ramps  (vertical AL, gap=space/6)
│       └── Ramp/[name]  (vertical AL, gap=space/2)
│           ├── Label      text/label/md  color/foreground-muted
│           └── SwatchRow  (horizontal AL, gap=space/1)
│               └── Swatch/[step] × 11  (vertical AL)
│                   ├── Rect  56px height, FILL width, radius/md, color/[palette]/[step]
│                   └── Step  text/caption  color/foreground-muted  CENTER aligned
└── Section/SemanticTokens  (vertical AL, gap=space/6)
    ├── Title + intro
    ├── TableHeader
    └── [Group label + Divider + token rows] × 5
        └── Row  (horizontal AL, gap=space/4)
            ├── Swatch  40×40px, radius/sm, color/[semantic-token]
            ├── Info    (vertical AL — name text/label/md + usage text/caption)
            └── Alias   text/caption, 240px fixed ("Dark: … / Light: …")
```

Token groups used: Background & Surfaces (7) · Foreground & Text (6) ·
Brand & Interactive (10) · Borders & Focus (4) · Status (13)

### Spanish tone guidelines for page descriptions

Use modern, clear Spanish — avoid literal translations of English technical terms:

| Evitar | Preferir |
|---|---|
| aliases | referencias, vínculos, "apunta a" |
| apuntadores | conecta con, redirige hacia |
| orientado por propósito | con intención |
| no se copia | no duplica nada |
| fuente de verdad | todo parte de aquí |

Keep token names, property names, and code in English. Descriptions and UI copy in Spanish.

**Español neutro obligatorio** — sin voseo argentino. Usar siempre la forma de tuteo neutro:

| Voseo (evitar) | Neutro (usar) |
|---|---|
| elegís | elige |
| combinás | combina |
| abrí el plugin | abre el plugin |
| buscá | busca |
| reemplazá | reemplaza |
| escribís | escribe |
| usás | usa |

Imperativo: forma de tú sin acento (abre, busca, elige). Presente: tercera persona o infinitivo cuando sea posible.

### Text style lookup pattern (Phase 3 — Typography page)

`figma.getLocalTextStyles()` returns all 13 styles. Build a lookup map at the top of every
script that applies styles:

```javascript
const T = {};
for (const s of figma.getLocalTextStyles()) T[s.name] = s.id;
// Usage: node.textStyleId = T['text/heading/xl'];
```

Set `textStyleId` on the text node — this overrides family, size, weight, line-height, and
letter-spacing in one call. Never manually set `fontName`, `fontSize`, `lineHeight` on a
node that is bound to a style, or the style binding breaks.

### Typography page architecture (Phase 3 — Typography)

Confirmed structure that works in production:

```
Page/Typography  (vertical AL, fill=color/background, padding=space/12, gap=space/10)
├── Header  (vertical AL, gap=space/2)
│   ├── Eyebrow       text/label/sm    color/foreground-muted
│   ├── Title         text/heading/xl  color/foreground
│   └── Description   text/body/md     color/foreground-muted
├── Divider  (rect 1px, fill=color/border, FILL width)
├── Section/TypeStyles  (vertical AL, gap=space/6)
│   ├── Title          text/heading/md
│   ├── Description    text/body/md
│   ├── TableHeader    (horizontal AL, gap=space/6)
│   │   ├── "Token"    200px fixed    text/label/sm  color/foreground-muted
│   │   ├── "Muestra"  FILL           text/label/sm  color/foreground-muted
│   │   └── "Especificación" 280px   text/label/sm  color/foreground-muted
│   ├── HeaderDivider  (rect 1px, FILL)
│   └── [RowDivider + Row/[style]] × 13
│       └── Row  (horizontal AL, paddingTop/Bottom=space/5, gap=space/6)
│           ├── TokenInfo  (vertical AL, 200px fixed, gap=space/1)
│           │   ├── token name  text/label/md  color/foreground
│           │   └── spec string text/caption   color/foreground-muted
│           └── sample text  (FILL) — textStyleId = T[token]  color/foreground
└── Divider
└── Section/FontFamilies  (vertical AL, gap=space/6)
    ├── Title          text/heading/md
    └── FamilyCards    (horizontal AL, gap=space/4)
        └── Card/[family] × 2  (vertical AL, padding=space/6, radius=radius/base)
            ├── family name   text/heading/sm   color/foreground
            ├── token + role  text/caption      color/foreground-muted
            └── pangram/sample  raw fontName    color/foreground
```

### Corner radius binding — all four sides separately

Figma does not accept a single `cornerRadius` variable binding when individual radii differ.
Bind each side explicitly:

```javascript
node.setBoundVariable('topLeftRadius', V['radius/base']);
node.setBoundVariable('topRightRadius', V['radius/base']);
node.setBoundVariable('bottomLeftRadius', V['radius/base']);
node.setBoundVariable('bottomRightRadius', V['radius/base']);
```

If all four are the same token, this is the correct pattern. Attempting to set
`node.setBoundVariable('cornerRadius', ...)` alone has no effect when `node.cornerRadius`
is `figma.mixed`.

### Font loading for JetBrains Mono

JetBrains Mono requires explicit `loadFontAsync` with the exact style string. Confirm
available styles with `figma.listAvailableFontsAsync()` if uncertain. Known working:

```javascript
await figma.loadFontAsync({ family: "JetBrains Mono", style: "Regular" });
```

For raw text that bypasses a text style (e.g. pangrams in the Font Families section),
set `node.fontName = { family: "JetBrains Mono", style: "Regular" }` and the
`fontSize`/`lineHeight` manually — since no text style token covers the display specimen.

### Spacing page architecture (Phase 3 — Spacing)

Confirmed structure that works in production:

```
Page/Spacing  (vertical AL, fill=color/background, padding=space/12, gap=space/10)
├── Header  (vertical AL, gap=space/2)
│   ├── Eyebrow    text/label/sm  color/foreground-muted
│   ├── Title      text/heading/xl  color/foreground
│   └── Description  text/body/md  color/foreground-muted
├── Divider  (1px rect, FILL, color/border)
├── Section/Scale  (vertical AL, gap=space/6)
│   ├── SectionHeader  (vertical AL, gap=space/2)
│   │   ├── title  text/heading/md
│   │   └── desc   text/body/md
│   ├── ColHeader  (horizontal AL, gap=space/6)
│   │   ├── "Token"  200px FIXED  text/label/sm  color/foreground-muted
│   │   ├── "Valor"   80px FIXED  text/label/sm  color/foreground-muted
│   │   └── "Barra"   FILL        text/label/sm  color/foreground-muted
│   ├── Divider
│   └── ScaleList  (vertical AL, gap=0)
│       └── [RowDivider + Bar/space/N] × 12
│           └── Row (horizontal AL, paddingTop/Bottom=space/4, gap=space/6)
│               ├── TokenName  200px FIXED  text/label/md  color/foreground
│               ├── Value       80px FIXED  text/caption   color/foreground-muted
│               └── BarZone    FILL, horizontal AL
│                   └── Bar  rect, height=24, width=px bound to space/N, fill=color/primary
│                   [space/0: "—" text instead of bar]
├── Divider
└── Section/Usage  (vertical AL, gap=space/6)
    ├── title + desc
    └── UsageGrid  (horizontal AL, WRAP, gap=space/4)
        └── UsageCard × 11  (vertical AL, 520px FIXED, padding=space/4, radius=radius/md)
            ├── token label  text/label/md  color/primary
            └── usage desc   text/body/sm   color/foreground-muted
```

### Variable-bound bar width pattern

For dimension tokens shown as bars, bind the variable AFTER appending to the parent
and setting `layoutSizingHorizontal = 'FIXED'`:

```javascript
bar.resize(px, 24);                         // set initial size (from token value)
barZone.appendChild(bar);                   // append first
bar.layoutSizingHorizontal = 'FIXED';       // must be FIXED, not FILL or HUG
bar.layoutSizingVertical = 'FIXED';
bar.setBoundVariable('width', V[tokenName]); // then bind
```

The bar's physical width = the variable's pixel value. This lets the bar update
automatically if the token changes. For `space/0` (0px), skip binding and show a
"—" text node instead — a 0px rect is invisible and confusing.

### Usage cards grid pattern (WRAP layout)

To show a responsive 2-column card grid, use `layoutWrap = 'WRAP'` on the horizontal AL:

```javascript
grid.layoutWrap = 'WRAP';
grid.counterAxisSpacing = 16; // vertical gap between rows
bindDim(grid, 'itemSpacing', 'space/4'); // horizontal gap
```

Each card is set to `FIXED` width (e.g. 520px for a ~2-col layout in 1200px frame).
Cards wrap automatically when they don't fit side-by-side.

### Elevation page architecture (Phase 3)

```
Page/Elevation  (vertical AL, fill=color/background, padding=space/12, gap=space/10)
├── Header
├── Divider
├── Section/Elevation  (vertical AL, gap=space/10)
│   ├── SectionHeader
│   └── ElevationShowcase  (horizontal AL, FILL, paddingBottom=96px for shadow room)
│       └── ElevationCol/[step] × 5  (vertical AL, FILL, gap=space/5, centerX)
│           ├── SurfaceZone  (vertical AL, FILL, paddingBottom=56px)
│           │   └── Specimen/Elevation/[step] — rect 160×100
│           │       fill=color/surface-elevated, effectStyleId=E[tokenName]
│           │       radius bound to radius/base
│           │       [none only: thin hairline stroke color/border]
│           └── Info  (vertical AL, gap=space/1, centerX)
│               ├── token name  text/label/md  color/foreground  CENTER
│               └── spec        text/caption   color/foreground-muted  CENTER
├── Divider
└── Section/Usage  (vertical AL, gap=space/6) — table: token | spec | aplicación típica
```

### Applying effect styles

```javascript
// Build lookup map at start of script
const E = {};
for (const s of figma.getLocalEffectStyles()) E[s.name] = s.id;

// Apply to a node
surface.effectStyleId = E['elevation/md'];
```

Effect styles must already exist (created in Phase 2). Check with
`figma.getLocalEffectStyles()` before building the page.

### Shadow breathing room

Shadows extend beyond node bounds. For elevation/xl (16px offsetY + 48px blur ≈ 64px
shadow extent), the parent container needs explicit bottom padding or the shadow clips.
Pattern: add `paddingBottom = 56` to the surface zone container, and give the showcase
row itself `paddingBottom = 96`. No `clipsContent` override needed — auto-layout frames
don't clip by default.

### Iconography page architecture (Phase 3)

```
Page/Iconography  (vertical AL, fill=color/background, padding=space/12, gap=space/10)
├── Header
├── InstallNote  (horizontal AL, fill=color/warning-wash, padding=space/4, radius=radius/md)
│   ├── warning icon (Material Icons 20px, color/warning-foreground)
│   └── install instructions text/body/sm color/warning-foreground
├── Divider
├── Section/SizeScale  (vertical AL, gap=space/6)
│   ├── title + desc
│   └── SizeShowcase  (horizontal AL, gap=space/6)
│       └── SizeCol/[step] × 5  (vertical AL, FILL, padding=space/8+space/6, radius=radius/base)
│           fill=color/surface-elevated, center-aligned
│           ├── icon  Material Icons 16/20/24/32/40px  color/foreground
│           └── Info  (vertical AL, gap=space/1, center)
│               ├── "icon/[step] · [N]px"  text/label/md  color/foreground
│               └── usage  text/caption  color/foreground-muted
├── Divider
├── Section/IconColors  (vertical AL, gap=space/6)
│   ├── title + desc
│   └── ColorGrid  (horizontal AL, WRAP, gap=space/3, counterAxisSpacing=12)
│       └── ColorChip/[token] × 6  (horizontal AL, 520px FIXED, padding=space/4, center-Y)
│           fill=color/surface-elevated
│           ├── icon  settings 24px  [colorToken]
│           └── Info  (vertical AL, gap=space/1)
│               ├── token name  text/label/md
│               └── usage  text/caption  color/foreground-muted
├── Divider
└── Section/CommonIcons  (vertical AL, gap=space/6)
    ├── title + desc
    └── IconGrid  (horizontal AL, WRAP, gap=space/2)
        └── Icon/[name] × 34  (vertical AL, 88px FIXED, padding=space/4+space/3, radius=radius/md)
            fill=color/surface-elevated, center-aligned
            ├── icon  [name] 24px  color/foreground
            └── name label  text/caption  color/foreground-muted  CENTER
```

### Uniform card heights in horizontal AL rows

Figma does not have `counterAxisAlignItems = 'STRETCH'`. To make all cards in a horizontal
row the same height, set each card to a **fixed height** and center its content:

```javascript
// Step 1 — Calculate required height for the tallest card (e.g., paddingTop + largestIcon + gap + labels + paddingBottom)
// Step 2 — Apply to all cards
for (const col of sizeShowcase.children) {
  col.layoutSizingVertical = 'FIXED';
  col.resize(col.width, 176);             // fixed height = tallest card's natural height
  col.primaryAxisAlignItems = 'CENTER';   // content centers vertically inside the fixed height
}
```

For **WRAP grids** where label text can wrap to multiple lines, apply the same pattern
using the height that fits the worst-case (longest) label:

```javascript
cell.layoutSizingVertical = 'FIXED';
cell.resize(cell.width, 88);  // fits 2-line labels: pad16+icon24+gap8+2lines28+pad12
cell.primaryAxisAlignItems = 'CENTER';
```

Never use `primaryAxisSizingMode = 'FIXED'` alone without setting height via `resize()` —
the height won't update without the explicit resize call.

### Material Icons font — ligature rendering

Material Icons (available in Figma) and Material Symbols Rounded (not installed by default)
both use the OpenType ligature system. To render an icon:

```javascript
await figma.loadFontAsync({ family: "Material Icons", style: "Regular" });
const icon = figma.createText();
icon.fontName = { family: 'Material Icons', style: 'Regular' };
icon.fontSize = 24; // icon size in px
icon.characters = 'search'; // ligature name renders the icon
bindColor(icon, 'color/foreground');
```

Do NOT use `textStyleId` on icon nodes — the text style overrides the font family,
breaking the ligature. Set `fontName`, `fontSize`, and `fills` manually.

Common ligature names: home, search, settings, close, check, add, menu, notifications,
person, star, favorite, edit, delete, arrow_back, arrow_forward, share, download,
upload, visibility, lock, mail, filter_list, sort, more_vert, expand_more, info,
warning, error, check_circle, help, logout, login, calendar_today, chevron_right.

### Motion · Opacity · Z-index page architecture (Phase 3 — last page)

These tokens are **code-only** — no Figma variable binding. All values are static.
Use `JetBrains Mono` for token names and `cubic-bezier(...)` formulas (monospace = code intent).

```
Page/Motion-Opacity-ZIndex  (vertical AL, fill=color/background, padding=space/12, gap=space/10)
├── Header
├── Divider
├── Section/Duration  (vertical AL, gap=space/6)
│   ├── title + desc
│   ├── ColHeader + Divider
│   └── DurationList  (vertical AL, gap=0)
│       └── [RowDivider + Row/[token]] × 5
│           └── Row (horizontal AL, padding=space/4, gap=space/6, centerY)
│               ├── token name  JetBrains Mono 13px  220px FIXED  color/foreground
│               ├── value       text/caption  100px FIXED  color/foreground-muted
│               └── BarZone (FILL) → Bar rect, height=16, cornerRadius=4
│                   width = round(ms/500 * 440)  fill=color/primary  FIXED
├── Divider
├── Section/Easing  (vertical AL, gap=space/6)
│   ├── title + desc
│   └── EasingGrid  (horizontal AL, gap=space/3)
│       └── EasingCard/[name] × 4  (vertical AL, FILL, padding=space/6+space/5, gap=space/3)
│           fill=color/surface-elevated  radius=radius/base
│           ├── token name  JetBrains Mono  color/primary
│           ├── formula     JetBrains Mono  color/foreground-muted
│           └── desc        text/caption   color/foreground-muted
├── Divider
├── Section/Opacity  (vertical AL, gap=space/6)
│   ├── title + desc
│   └── OpacityGrid  (horizontal AL, gap=space/3)
│       └── OpacityCard/[step] × 4  (vertical AL, FILL, padding=space/6+space/5, gap=space/4)
│           fill=color/surface-elevated  radius=radius/base
│           ├── Sample (horizontal AL, FILL, fill=color/background, radius=radius/sm)
│           │   └── Overlay rect (FILL × 48px FIXED, fill=color/primary, opacity=val)
│           ├── ValRow (horizontal AL): JetBrains Mono token (FILL) + value text/label/md (HUG)
│           └── usage  text/caption  color/foreground-muted
├── Divider
└── Section/ZIndex  (vertical AL, gap=space/6)
    ├── title + desc
    ├── ColHeader + Divider
    └── ZIndexList  (vertical AL, gap=0)
        └── [RowDivider + Row/[token]] × 8
            ├── token name  JetBrains Mono  220px FIXED  color/foreground
            ├── value       text/label/md   100px FIXED  color/primary
            └── component   text/body/sm    FILL          color/foreground-muted
```

### `appendFill` / `app` helper — guard against resize with string width

When building a reusable append helper, always type-check `w` before calling `resize()`:

```javascript
function app(parent, node, w, h) {
  parent.appendChild(node);
  if (typeof w === 'number') { node.resize(w, 10); node.layoutSizingHorizontal = 'FIXED'; }
  else node.layoutSizingHorizontal = w; // 'FILL' or 'HUG' — no resize call needed
  node.layoutSizingVertical = h || 'HUG';
}
```

Calling `node.resize('FILL', 10)` throws "Expected number, received string".

### Opacity visualization pattern

To visualize an alpha level, overlay a transparent rect on a dark background:

```javascript
// Base: dark surface
const sample = figma.createAutoLayout('HORIZONTAL');
bindColor(sample, 'color/background'); // dark canvas

// Overlay: primary color at the opacity level
const overlay = figma.createRectangle();
bindColor(overlay, 'color/primary');
overlay.opacity = 0.08; // the token value
sample.appendChild(overlay);
overlay.layoutSizingHorizontal = 'FILL';
overlay.layoutSizingVertical = 'FIXED'; // fixed height, fill width
```

This makes the opacity difference perceptually clear — hover (0.08) barely tints,
scrim (0.6) is strongly opaque.

### Status token naming — `-fg` not `-foreground`

The correct semantic token names for status foreground colors are:

| Intent | Token | Resolves (Dark) |
|---|---|---|
| Success text/icon | `color/success-fg` | green/400 |
| Warning text/icon | `color/warning-fg` | amber/400 |
| Destructive text/icon | `color/destructive-fg` | red/400 |
| Info text/icon | `color/info-fg` | blue/400 |
| Success bg | `color/success-bg` | green/500 |
| Warning bg | `color/warning-bg` | amber/500 |
| Destructive bg | `color/destructive-bg` | red/500 |
| Info bg | `color/info-bg` | blue/500 |
| Success subtle bg | `color/success-wash` | green/950 |
| Warning subtle bg | `color/warning-wash` | amber/950 |
| Destructive subtle bg | `color/destructive-wash` | red/950 |
| Info subtle bg | `color/info-wash` | blue/950 |

`color/success-foreground` / `color/warning-foreground` / `color/error-foreground` do NOT exist.
The correct suffix is always `-fg` for status foreground colors.

### Warning wash is near-black in dark mode — pair with `-fg` text

`color/warning-wash` resolves to `amber/950` = rgb(43,21,0) in dark mode. Always pair it
with `color/warning-fg` (amber/400) for text/icons on top. Never use `-wash` with white text.

The `-wash` tokens are intentionally near-black subtle backgrounds for status banners in dark mode.

### Material Symbols Rounded vs Material Icons

Material Symbols Rounded (the new version) is NOT installed in Figma by default.
Install via the "Google Fonts" Figma plugin. Until installed, use Material Icons (Regular)
as a visual proxy — same ligature system, slightly different icon style. Always add an
`InstallNote` warning card to the Iconography page so designers know to install it.

### Dark shadows on dark backgrounds — documentation showcase trick

Black shadows (30–45% opacity) are nearly invisible on dark semantic backgrounds
(`color/background` = neutral/950 ≈ sRGB 0.06). For the elevation showcase in docs,
use hardcoded mid-grey fills — NOT token-bound — so shadows read clearly:

```javascript
// Stage background: neutral/600 equiv. — oklch(0.48 0 0) → sRGB ≈ 0.344
showcase.fills = [{ type: 'SOLID', color: { r: 0.344, g: 0.344, b: 0.344 } }];

// Card surfaces: neutral/500 equiv. — oklch(0.58 0 0) → sRGB ≈ 0.445
// Must be LIGHTER than stage so cards appear to float
surface.fills = [{ type: 'SOLID', color: { r: 0.445, g: 0.445, b: 0.445 } }];
```

Why this works: shadow at 45% opacity on stage {0.344} → visible area = 0.344×0.55 = 0.189,
difference = 0.155 — clearly perceptible. Always add a disclaimer note below the showcase:
"El escenario usa un gris medio (neutral/600) para que las sombras sean legibles en docs."

### `elevation/none` needs a visible indicator

`elevation/none` has a transparent shadow (alpha=0). On a dark background, the surface
is invisible without a fallback. Add a thin hairline stroke (`color/border`) for this
level only so the card outline is visible:

```javascript
if (step === 'none') {
  surface.strokes = [figma.variables.setBoundVariableForPaint(
    { type: 'SOLID', color: {r:0,g:0,b:0} }, 'color', V['color/border']
  )];
  surface.strokeWeight = 1;
  surface.strokeAlign = 'INSIDE';
}
```

### Radius + Border page architecture (Phase 3)

```
Page/Radius-Border  (vertical AL, fill=color/background, padding=space/12, gap=space/10)
├── Header
├── Divider
├── Section/Radius  (vertical AL, gap=space/8)
│   ├── SectionHeader
│   └── RadiusGrid  (horizontal AL, WRAP, gap=space/4, counterAxisSpacing=16)
│       └── Specimen/Radius/[step] × 6  (vertical AL, 170px FIXED, padding=space/6)
│           ├── Sample rect  (FILL × HUG, border=color/border, radius bound to token)
│           ├── Accent rect  (FILL × 4px, fill=color/primary, radius bound to token)
│           └── Info  (vertical AL, gap=space/1)
│               ├── token name  text/label/md  color/foreground
│               └── px value    text/caption   color/foreground-muted
├── Divider
└── Section/Border  (vertical AL, gap=space/6)
    ├── SectionHeader
    ├── ColHeader + Divider
    └── BorderList  (vertical AL, gap=0)
        └── [RowDivider + Row/[token]] × 5
            └── Row (horizontal AL, paddingTop/Bottom=space/5, gap=space/6, centerY)
                ├── TokenName  220px FIXED  text/label/md
                ├── Value       80px FIXED  text/caption  color/foreground-muted
                ├── SampleZone  FILL  → rect 160×40 with strokeWeight bound to token
                └── Usage      320px FIXED  text/caption  color/foreground-muted
```

### Stroke color and width binding

```javascript
// Bind stroke color via setBoundVariableForPaint
node.strokes = [figma.variables.setBoundVariableForPaint(
  { type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', V['color/border']
)];
// Set initial weight, then bind the variable
node.strokeWeight = 1;
node.strokeAlign = 'INSIDE';
node.setBoundVariable('strokeWeight', V['borderWidth/thin']);
```

Use `color/ring` (brand indigo) for focus ring stroke — not `color/border`.

### `focusRing/offset` — no visual binding possible

The `focusRing/offset` token controls the gap between an element and its focus ring.
This is implemented in code (CSS `outline-offset`) and cannot be replicated in Figma
variables. Show it as a labeled row with description text; no sample needed.

### Radius/full (9999px) clamps visually

When `radius/full` (9999px) is bound to a rect, Figma visually clamps to
`min(width, height) / 2`, producing the correct pill shape. The variable binding
still stores 9999 — code output and token reference remain correct. No workaround needed.

### `color/surface-elevated` for card backgrounds

Card/surface frames use `color/surface-elevated` (not `color/surface` or `color/background`).
`color/surface-elevated` sits one step above the page background — visible in Dark mode as
a subtle lift, and adapts correctly in Light mode. Never use raw fills for card surfaces.
