# Proteus Token Contract

The authoritative specification for how tokens are named, structured, and stored in the
Proteus design system. `proteus-foundations` writes tokens to match this; `proteus-component`
and `proteus-code` read tokens assuming this. Read it fully before creating or editing tokens.

## Table of contents

1. Format (DTCG)
2. The three tiers
3. Color: primitive ramps and OKLCH
4. Semantic color tokens and the shadcn mapping
5. Spacing and typography
6. Radius, elevation, motion, z-index, iconography
7. Accessibility
8. Figma materialization (collections, modes, styles)
9. Tokens Studio vs Figma MCP write
10. Validation checklist
11. Decisions to confirm with the user

---

## 1. Format (DTCG)

Tokens use the W3C Design Tokens Community Group format. A token is an object with a
`$value` and a `$type`; groups nest; references use curly-brace paths.

```json
{
  "color": {
    "neutral": {
      "950": { "$type": "color", "$value": "oklch(0.13 0 0)" }
    },
    "background": {
      "$type": "color",
      "$value": "{color.neutral.50}"
    }
  }
}
```

- `$type` is set once on a group and inherited by children where possible.
- References (`{color.neutral.50}`) are resolved by the build tool (Style Dictionary) and
  by Tokens Studio when syncing to Figma. A reference is how a semantic token borrows a
  primitive's value without copying it.
- `dimension` values use the object form `{ "value": 4, "unit": "px" }` per the current
  DTCG draft. Exact syntax can be adjusted to the Style Dictionary / Tokens Studio version
  in use, but keep one consistent form across the file.

## 2. The three tiers

| Tier | Purpose | References | Light/Dark | Figma collection |
|------|---------|-----------|------------|------------------|
| Primitive | Raw atoms, no meaning | nothing (literals) | no | `Primitives` (1 mode) |
| Semantic | Purpose-driven aliases | primitives only | **yes** | `Semantic` (Light, Dark) |
| Component | Per-component knobs | semantics only | no | usually code-only |

Rule of thumb: if you're typing a hex or a px outside the Primitive tier, stop — you want
a reference.

## 3. Color: primitive ramps and OKLCH

Author every color primitive in OKLCH: `oklch(L C H)` where L is 0–1 lightness, C is
chroma, H is hue in degrees. OKLCH gives perceptually even steps and matches the Tailwind
v4 / shadcn destination, so ramps look consistent and theme math stays predictable.

Provide a full ramp per palette, 50 → 950, with even lightness steps:

```json
"color": {
  "neutral": {
    "50":  { "$type": "color", "$value": "oklch(0.985 0 0)" },
    "100": { "$type": "color", "$value": "oklch(0.97 0 0)" },
    "200": { "$type": "color", "$value": "oklch(0.92 0 0)" },
    "300": { "$type": "color", "$value": "oklch(0.87 0 0)" },
    "400": { "$type": "color", "$value": "oklch(0.71 0 0)" },
    "500": { "$type": "color", "$value": "oklch(0.56 0 0)" },
    "600": { "$type": "color", "$value": "oklch(0.44 0 0)" },
    "700": { "$type": "color", "$value": "oklch(0.37 0 0)" },
    "800": { "$type": "color", "$value": "oklch(0.27 0 0)" },
    "900": { "$type": "color", "$value": "oklch(0.21 0 0)" },
    "950": { "$type": "color", "$value": "oklch(0.13 0 0)" }
  },
  "brand": { "...50–950 ramp, the hue of the chosen brand color..." }
}
```

At minimum the system needs: one **neutral** ramp (surfaces, text, borders), one **brand**
ramp (primary), and **status** ramps (success, warning, destructive, info). Add more only
when a real need appears.

Note on Figma: Figma variables store resolved color (RGB/hex under the hood). OKLCH is the
authoring and CSS-output space; the build tool resolves OKLCH → the form each target needs.

## 4. Semantic color tokens and the shadcn mapping

Semantic tokens are where Light and Dark diverge. Two things shape this tier:

1. **Names align to shadcn** so proteus-code maps each token to a CSS variable with no
   interpretation. Use the shadcn `X` / `X.foreground` convention — the foreground is the
   readable color *on* that surface.
2. **Granularity is modeled on Coinbase CDS.** CDS is the primary structural reference here:
   it splits a primitive ramp layer (`spectrum`) from a semantic layer (`color`) where every
   semantic token aliases a primitive, and resolves Light/Dark by swapping which primitive
   each semantic points to. Proteus mirrors that split (Primitives → Semantic) and borrows
   CDS's richer vocabulary — distinct surfaces, subtle "wash" backgrounds, line colors,
   elevation surfaces, and full status families — instead of the bare shadcn set, which is
   too thin for a real product UI.

Shadcn-core tokens map straight to CSS variables; the extended tokens (surfaces, washes,
lines, status, elevation) are Proteus additions that proteus-code exposes as extra
`@theme inline` variables.

**Foreground / text**

| Proteus token | shadcn var | Role |
|---------------|-----------|------|
| `color.foreground` | `--foreground` | default text |
| `color.foreground.muted` | — | low-emphasis text |
| `color.foreground.inverse` | — | text on inverse surfaces |

**Surfaces / background** (CDS-style depth: base, secondary, tertiary, plus elevation)

| Proteus token | shadcn var | Role |
|---------------|-----------|------|
| `color.background` | `--background` | page base |
| `color.background.secondary` | — | raised panel / subtle fill |
| `color.background.tertiary` | — | deeper fill |
| `color.background.inverse` | — | inverse surface |
| `color.surface.elevated` | — | cards/popovers above base (CDS bgElevation) |
| `color.card` / `color.card.foreground` | `--card` / `--card-foreground` | card surface + text |
| `color.popover` / `color.popover.foreground` | `--popover` / `--popover-foreground` | overlay + text |

**Brand / interaction**

| Proteus token | shadcn var | Role |
|---------------|-----------|------|
| `color.primary` / `color.primary.foreground` | `--primary` / `--primary-foreground` | brand action |
| `color.secondary` / `…foreground` | `--secondary` / `--secondary-foreground` | secondary action |
| `color.muted` / `…foreground` | `--muted` / `--muted-foreground` | low-emphasis surface/text |
| `color.accent` / `…foreground` | `--accent` / `--accent-foreground` | hover/active surface |

**Lines / borders** (CDS distinguishes weight and intent)

| Proteus token | shadcn var | Role |
|---------------|-----------|------|
| `color.border` | `--border` | default hairline |
| `color.border.heavy` | — | stronger divider (CDS bgLineHeavy) |
| `color.input` | `--input` | field border |
| `color.ring` | `--ring` | focus ring |

**Status families** — each status gets `fg` (text/icon), `bg` (solid fill), and `wash`
(subtle tinted background), following CDS's positive / positive-wash pattern.

| Proteus token group | shadcn var | Role |
|---------------------|-----------|------|
| `color.destructive` (`.fg` / `.bg` / `.wash`) | `--destructive` / `--destructive-foreground` | danger / negative |
| `color.success` (`.fg` / `.bg` / `.wash`) | — | positive |
| `color.warning` (`.fg` / `.bg` / `.wash`) | — | warning |
| `color.info` (`.fg` / `.bg` / `.wash`) | — | informational |

Each token gets a Light value and a Dark value, both as references into primitives. The
status `wash` points at the palest primitive in Light and the darkest in Dark — that's how
the same name reads as "subtle tinted background" in both modes:

```json
"color": {
  "background":            { "$type": "color", "$value": "{color.neutral.50}" },
  "background-secondary":  { "$type": "color", "$value": "{color.neutral.100}" },
  "foreground":            { "$type": "color", "$value": "{color.neutral.950}" },
  "foreground-muted":      { "$type": "color", "$value": "{color.neutral.500}" },
  "primary":               { "$type": "color", "$value": "{color.brand.700}" },
  "primary-foreground":    { "$type": "color", "$value": "{color.neutral.50}" },
  "border":                { "$type": "color", "$value": "{color.neutral.200}" },
  "ring":                  { "$type": "color", "$value": "{color.brand.600}" },
  "success-fg":            { "$type": "color", "$value": "{color.green.600}" },
  "success-bg":            { "$type": "color", "$value": "{color.green.600}" },
  "success-wash":          { "$type": "color", "$value": "{color.green.50}" }
}
```

The same *names* point at different primitives per mode, expressed as the two modes of the
Semantic collection (in Figma) or two token sets (Tokens Studio). For example `success-wash`
→ darkest primitive in Dark, palest in Light.

### Dark-first

Proteus is **dark-first**: Dark is the PRIMARY theme and Light is secondary. Concretely:

- **Dark is the base / first mode** of the Semantic collection in Figma; Light is the
  override. When a tool needs a default, Dark wins.
- The aesthetic is **matte dark**: soft charcoal surfaces (not pure black), off-white text
  (not pure white). `background` resolves to a deep-but-not-black neutral; `foreground` to
  an off-white.
- Brand reads one step brighter on dark than on light (`primary` → `brand.700` in Dark,
  which equals the reference #5649B7, vs `brand.800` in Light). The indigo is dark enough
  to carry white foreground in both modes.
- Contrast (WCAG AA) must pass in **both** modes; dark-first doesn't excuse a weaker light
  theme.

### Real token files (these supersede the old seed)

The full token set lives in `assets/tokens/`, split the way Tokens Studio themes and Figma
modes expect:

- `primitives.json` — Tier 1, one mode. Ramps (OKLCH), spacing, radius, typography.
- `semantic.dark.json` — Tier 2, PRIMARY mode. Aliases into primitives for matte dark.
- `semantic.light.json` — Tier 2, secondary mode. Identical token names, light resolution.

Both semantic files expose an identical set of names; only the referenced primitive differs.
That identity is the contract — if a name exists in one mode it must exist in the other.
(The earlier single `assets/tokens.json` was a readable seed; the `tokens/` set is the real
source of truth.)

## 5. Spacing and typography

**Spacing** — a single scale, **4px base** (0.25rem), matching Tailwind's rhythm so the
code side maps 1:1. One flat scale of `dimension` tokens, used directly (no semantic
spacing layer — the destination is Tailwind, where the numeric scale is the contract).
Components pick a `space.*` token for every padding, margin, and gap; never a typed pixel.

| Token | px | Typical use |
|-------|----|-------------|
| `space.0` | 0 | reset |
| `space.1` | 4 | hairline gaps, icon insets |
| `space.2` | 8 | tight gaps, compact padding |
| `space.3` | 12 | control inner padding |
| `space.4` | 16 | default block padding / gap |
| `space.5` | 20 | — |
| `space.6` | 24 | card padding, section gaps |
| `space.8` | 32 | block separation |
| `space.10` | 40 | — |
| `space.12` | 48 | page padding |
| `space.16` | 64 | large section spacing |
| `space.20` | 80 | hero spacing |

The scale skips odd steps above 6 (no `7`, `9`, `11`…) on purpose — fewer rungs keep
spacing decisions consistent. If a layout "needs" an in-between value, that's a signal to
snap to the nearest rung, not to add one.

(Radius now lives with the other dimensional foundations in section 6.)

**Typography** — primitives for family, size, weight, line height, letter spacing; plus the
composite **type styles** that bind in Figma as text styles.


```json
"font": {
  "family": {
    "sans": { "$type": "fontFamily", "$value": ["Inter", "system-ui", "sans-serif"] },
    "mono": { "$type": "fontFamily", "$value": ["JetBrains Mono", "monospace"] }
  },
  "size": {
    "sm":   { "$type": "dimension", "$value": { "value": 14, "unit": "px" } },
    "base": { "$type": "dimension", "$value": { "value": 16, "unit": "px" } },
    "lg":   { "$type": "dimension", "$value": { "value": 18, "unit": "px" } }
  },
  "weight": {
    "regular": { "$type": "fontWeight", "$value": 400 },
    "medium":  { "$type": "fontWeight", "$value": 500 },
    "semibold":{ "$type": "fontWeight", "$value": 600 }
  }
}
```

### Type styles (Tier 3 — composite)

Primitives alone are never applied to text. Components and pages pick a **named composite
style** that bundles family + size + weight + line-height + letter-spacing — the same
"compose, don't improvise" rule as color. These live in `assets/tokens/typography.json`
(DTCG `typography` type) and each becomes a **Figma text style**. Dark/Light does not affect
type, so there is one set (no modes).

| Style | Size | Weight | Line height | Use |
|-------|------|--------|-------------|-----|
| `text.display` | 4xl (36) | bold | tight | hero / page title |
| `text.heading.xl` | 3xl (30) | semibold | tight | section title |
| `text.heading.lg` | 2xl (24) | semibold | snug | subsection |
| `text.heading.md` | xl (20) | semibold | snug | card / block heading |
| `text.heading.sm` | lg (18) | semibold | snug | small heading |
| `text.body.lg` | lg (18) | regular | relaxed | lead paragraph |
| `text.body.md` | base (16) | regular | normal | default body |
| `text.body.sm` | sm (14) | regular | normal | secondary body |
| `text.label.lg` | base (16) | medium | snug | form / button label |
| `text.label.md` | sm (14) | medium | snug | default label |
| `text.label.sm` | xs (12) | medium | snug + wide | overline / eyebrow |
| `text.caption` | xs (12) | regular | normal | captions, helper text |
| `text.code` | sm (14) | regular (mono) | normal | inline / block code |

All styles use the `sans` family (Inter) except `text.code`, which uses `mono`
(JetBrains Mono). A style references font primitives, never literal values — change a
primitive and every style updates.

## 6. Radius, elevation, motion, z-index, iconography

**Radius** (primitive scale, in `primitives.json`) — a single corner scale, no modes:
`sm` 6, `md` 8, `base` 10, `lg` 12, `xl` 16, `full` 9999. `radius.base` maps to shadcn's
`--radius`; the others map to the derived `--radius-sm/md/lg/xl`. Components pick a radius
token, never a literal corner value.

**Elevation** (`elevation.json`) — shadow tokens `none / sm / md / lg / xl`. Dark-first
nuance: in dark mode elevation is read mostly through **surface lightness** (`background`
→ `surface-elevated`) plus a hairline `border`; the shadow is a subtle reinforcement, not
the main signal. In Figma these become **effect styles**.

**Motion** (`motion.json`) — `duration` tokens (`instant` 50 / `fast` 120 / `normal` 200 /
`slow` 320 / `slower` 500 ms) and `easing` cubic-bezier curves (`standard`, `decelerate`
for entering, `accelerate` for exiting, `linear`). Components compose them (e.g. a fade =
`duration.fast` + `easing.standard`). Mode-agnostic.

**Z-index** (`zindex.json`) — a named stacking scale (`base`, `dropdown`, `sticky`,
`overlay`, `modal`, `popover`, `toast`, `tooltip`) in steps of 100 so layered UI never
fights over order. Mode-agnostic, unitless.

**Iconography** (`icon.json`) — the icon library is **Material Symbols Rounded** (Google,
Apache-2.0 variable font). Size scale `sm` 16 / `md` 20 / `base` 24 / `lg` 32 / `xl` 40, and
four axis defaults: `weight` 400 (min 200 at 24px), `fill` 0 (1 for active/selected),
`grade` **−25** (light icons on the dark base — the dark-first default; 0 for dark-on-light),
`opticalSize` set to the rendered px. Web uses `<span class="material-symbols-rounded">`
via Google Fonts or the `material-symbols` npm package; Figma uses the Material Symbols
plugin. Components pick a size token, never a literal icon px.

**Breakpoints** — add only if the DS owns responsive behavior; not defined yet.

## 7. Accessibility

Accessibility is a foundation, not a finishing pass. The tokens above are chosen to make it
achievable; these are the rules every section and component inherits.

- **Contrast (WCAG AA).** Text and meaningful UI must pass in **both** modes: 4.5:1 for body
  text, 3:1 for large text (≥24px or 18px bold) and for UI boundaries / icons. Verify the
  semantic pairs (`foreground` on `background`, `primary-foreground` on `primary`, each
  status `fg` on its surface) in Light and Dark before sign-off. Dark-first is not an excuse
  for a weaker Light theme.
- **Focus ring.** Always visible on keyboard focus: the semantic `ring` color (brand) at
  `focusRing.width` (2px) with `focusRing.offset` (2px). Never remove focus styling; the
  offset keeps it legible on the matte base.
- **Touch target.** Interactive controls have a minimum hit area of **44×44px**, even when
  the visual is smaller (use padding or an invisible target, don't enlarge the icon).
- **Don't rely on color alone.** Status (success/warning/error/info) must pair color with an
  icon or text, so the meaning survives for color-blind users and in grayscale.
- **Reduced motion.** Honor `prefers-reduced-motion`: motion built on the `duration`/`easing`
  tokens collapses to near-zero duration (essential state changes stay, decorative movement
  stops).
- **Icon grade.** The −25 `grade` default exists for this reason — it keeps light-on-dark
  icons optically the right weight rather than looking thin.

## 8. Figma materialization

- Create two variable **collections**: `Primitives` (one mode, e.g. "Value") and
  `Semantic` (two modes: `Light`, `Dark`).
- Primitives hold the literal values. Semantic variables are set to **alias** the
  corresponding primitive — and the alias differs per mode (Light points one place, Dark
  another). This is the Figma-native expression of the theming rule.
- Spacing, radius, and number tokens become `FLOAT` variables; colors become `COLOR`
  variables; font tokens drive **text styles**; shadows drive **effect styles**.
- Group variable names with `/` to create folders that mirror the token paths
  (`color/primary/DEFAULT`).

## 9. Tokens Studio vs Figma MCP write

Two ways to get tokens from `tokens.json` into Figma:

- **Tokens Studio plugin (recommended for the token sync itself).** Purpose-built for
  DTCG ↔ Figma variables, handles modes/themes and references reliably, and round-trips.
  This is the dependable backbone for foundations.
- **Figma MCP write-to-canvas.** Lets this skill create variables/collections directly
  from the agent. Creating variables and styles is reliable; it requires a **Full or Dev
  seat on a paid Figma plan**. Good when you want the agent to drive Figma end-to-end and
  keep humans out of the plugin.

Pick one as the system of record for the sync and stay consistent. Whichever is used,
`tokens.json` remains the source of truth — Figma is a materialization of it.

## 10. Validation checklist

Run before declaring foundations done:

- [ ] Every semantic token resolves to a real primitive in **both** Light and Dark.
- [ ] No semantic or component token contains a literal value.
- [ ] No tier-skipping (semantic→primitive only; component→semantic only).
- [ ] Color ramps are continuous (no missing steps) and authored in OKLCH.
- [ ] Spacing, radius, and type each use a single continuous scale.
- [ ] Contrast passes WCAG AA in both modes (4.5:1 body text, 3:1 large text / UI edges).
- [ ] Semantic names match the shadcn mapping table exactly.
- [ ] Figma collections/modes mirror the tiers; variables alias correctly per mode.

## 11. Decisions to confirm with the user

These are placeholders in the seed file; lock them with the user (and their reference
design systems) before generating the full token set:

- **Base/neutral hue** — pure gray, or a tinted neutral (slightly warm/cool)?
- **Brand hue** — the OKLCH hue for the primary ramp.
- **Status palette** — how many (success/warning/destructive/info)?
- **Radius base** — sharp (4–6px), default (8–10px), or rounded (12px+)?
- **Type families** — Inter/system + a mono, or specific brand fonts?
- **Spacing density** — 4px base is the default; confirm vs a denser/looser system.
