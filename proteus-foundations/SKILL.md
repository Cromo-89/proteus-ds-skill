---
name: proteus-foundations
version: 1.11.0
description: >-
  Build the foundations of the Proteus design system (ProteusDS) in Figma: all
  design tokens — color (dark-first matte, brand indigo, vivid states), typography
  (Inter + JetBrains Mono, 20 composite styles: body/caption con variantes regular/medium/bold), spacing (4px scale), radius, elevation,
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
│   Tokens · Variables · Styles · Modes       v 1.11.0  │
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

## Skill files

- `SKILL.md` — este archivo (reglas operativas, gotchas críticos, catálogo de páginas)
- `config.json` — configuración del skill (figmaFileKey, version)
- `references/token-contract.md` — spec autoritativa de tokens (naming, tiers, OKLCH, mapeo shadcn)
- `references/foundations-pages.md` — reglas de construcción de páginas de presentación
- `references/page-architectures.md` — diagramas de arquitectura y patrones de implementación por página
- `assets/tokens/` — los 10 archivos DTCG JSON de tokens

## Token files (read these before touching Figma)

All token files live in `assets/tokens/`. Read every relevant file before creating or
editing variables. The full naming spec, tier rules, shadcn mapping, and dark-first
decision are in `references/token-contract.md`.

| File | Tier | Figma target | Notes |
|------|------|-------------|-------|
| `primitives.json` | 1 — Primitive | `Primitives` collection (single mode) | Color ramps (OKLCH), space, radius, font primitives |
| `semantic.dark.json` | 2 — Semantic | `Semantic` collection, **Dark mode (PRIMARY)** | 40 tokens; every value aliases a primitive |
| `semantic.light.json` | 2 — Semantic | `Semantic` collection, Light mode (secondary) | Same 40 names, different primitive aliases |
| `typography.json` | Composite | 20 Figma **Text Styles** | Inter sans + JetBrains Mono; body/caption con variantes regular/medium/bold; no Figma variables |
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

## How tokens become Figma variables

### Primitives collection
- One mode (name it "Value").
- Color variables: pass OKLCH string (Figma resolves it) or convert to hex/RGBA first.
- Dimension variables (space, radius, borderWidth, focusRing): FLOAT, value in px.
- Number variables (opacity, zIndex): FLOAT.
- Group names mirror token paths using `/` as separator: `color/neutral/950`, `space/4`.

### Semantic collection
- Two modes: **Dark** first (primary), then **Light**.
- Each variable is a **variable alias** pointing at its primitive — not a literal.
  `{ type: "VARIABLE_ALIAS", id: "<primitive_variable_id>" }`.
- This alias link is what makes the mode switch work.

### Smoke test
Create `Primitives` with only the neutral ramp (11 steps) and `Semantic` with 5 tokens
aliased to their primitives in both modes. Open Figma, switch modes, verify the semantic
variables show the chain icon (alias). If aliases work → continue via MCP. If only literals
are written → use Tokens Studio for the semantic sync.

## Workflow — three phases, always in order

### Phase 1 — Variable collections

1. Read all 10 token files from `assets/tokens/`. Read `references/token-contract.md` §1–6.
2. Create `Primitives` collection (single mode): color ramps → space → radius → borderWidth + focusRing → opacity.
3. Create `Semantic` collection (Dark mode first, then Light). Every variable must be a variable alias. Verify alias chain icon before proceeding. Check WCAG AA contrast in both modes.

### Phase 2 — Figma styles

4. Create 20 Text Styles from `typography.json`. Body y caption tienen variantes de peso (`/regular`, `/medium`, `/bold`); heading/label/display/code llevan peso fijo. Nombres: `text/display`, `text/heading/xl` … `text/body/md/bold`, `text/caption/regular`, `text/caption/medium`, `text/code`.
5. Create 5 Effect Styles from `elevation.json` (`elevation/none` through `elevation/xl`).

### Phase 3 — Presentation pages (one at a time, confirm before next)

Build in this order. Each page follows the template in `references/foundations-pages.md`.
Architecture diagrams and code patterns for each page are in `references/page-architectures.md`.

| # | Página | ID | Estado |
|---|---|---|---|
| 6 | Color | `23:2` | ✅ Completa |
| 7 | Typography | `30:2` | ✅ Completa |
| 8 | Spacing | `32:2` | ✅ Completa |
| 9 | Grid & Breakpoints | `1077:2` | ✅ Completa |
| 10 | Radius + Border | `33:2` | ✅ Completa |
| 11 | Elevation | `35:2` | ✅ Completa |
| 12 | Iconography | `40:2` | ✅ Completa |
| 13 | Motion · Opacity · Z-index | `49:2` | ✅ Completa |
| 14 | Accessibility | `102:2` | ✅ Completa |

Páginas de librería (no son páginas de presentación):

| Página | ID | Descripción |
|---|---|---|
| Icons | `207:2` | 76 componentes vectoriales `Icon/<name>` 24×24 — ver proteus-components |
| Illustrations | `1213:2` | 12 ilustraciones SVG unDraw — ver proteus-components |

## System specs (verified 2026-06-14)

### Grid & Breakpoints

| Breakpoint | Viewport | Columnas | Margen | Gutter |
|---|---|---|---|---|
| Mobile | < 640px (ref: 375px) | 4 | 16px | 16px |
| Tablet | 640–1023px (ref: 768px) | 8 | 24px | 24px |
| Desktop | ≥ 1024px (ref: **1280px**) | 12 | 32px | 24px |

### Icon size axis

| Token | px | Uso típico |
|---|---|---|
| icon/xs | 16 | Etiquetas compactas, badges |
| icon/sm | 20 | Inline con texto body/sm |
| icon/md | 24 | Estándar — botones, navs, listas |
| icon/lg | 32 | Headers, acciones destacadas |
| icon/xl | 40 | Feature, hero, onboarding |

### Z-index values

| Token | Valor | Componente típico |
|---|---|---|
| zIndex/base | 0 | Contenido estático del documento |
| zIndex/dropdown | 1000 | Select menus, autocomplete |
| zIndex/sticky | 1100 | Headers fijos, sticky navbars |
| zIndex/overlay | 1200 | Backdrop semitransparente |
| zIndex/modal | 1300 | Modals, dialogs, confirmaciones |
| zIndex/popover | 1400 | Popovers, context menus, command palette |
| zIndex/toast | 1500 | Notificaciones toast, snackbars |
| zIndex/tooltip | 1600 | Tooltips — siempre encima de todo |

### Accessibility (WCAG AA — ratios verificados 2026-06-14)

| Par de tokens | Oscuro | Claro | Uso |
|---|---|---|---|
| foreground / background | 17.8:1 | 17.8:1 | Texto de cuerpo, cualquier tamaño |
| foreground-muted / background | 7.5:1 | 3.9:1 | Texto secundario; en claro evitar en texto pequeño |
| primary-foreground / primary | 6.4:1 | 9.3:1 | Texto/íconos sobre superficies primary |
| success-fg / success-wash | 3.9:1 | 3.0:1 | Status sobre wash; en claro solo texto grande/íconos |
| warning-fg / warning-wash | 7.3:1 | 6.1:1 | Status warning — ambos modos |
| destructive-fg / destructive-wash | 8.7:1 | 4.3:1 | Status destructivo |
| info-fg / info-wash | 7.5:1 | 4.0:1 | Status info |

Reglas de accesibilidad del sistema: foco siempre visible (`color/ring`, 2px width, 2px offset) · área táctil mínima 44×44px · color nunca es la única señal (siempre ícono + label) · `prefers-reduced-motion` coloca duración ≈ 0 · `icon.grade` = −25 en dark, 0 en light.

## Hard rules

- **No raw values above the primitive tier.** No hex, no arbitrary px in semantic or component tokens.
- **No tier-skipping.** Semantic → primitive only. Component → semantic only.
- **Dark/Light is semantic only.** Primitives and components are mode-agnostic.
- **One scale per dimension.** Single spacing, radius, and type scale. No one-offs.
- **Semantic names are a breaking-change contract.** Rename = breaking change downstream.
- **Color in OKLCH.** Matches Tailwind v4 / shadcn and gives perceptually even ramps.
- **All variables aliased, not copied.** A semantic variable with a literal value defeats the entire theming architecture.
- **Pages present, never redefine.** Every specimen is bound; pages dogfood Proteus tokens.

## Handoff

When Phase 1 and 2 are complete: `Primitives` collection (single mode), `Semantic` collection
(Dark + Light with aliases), 20 Text Styles, 5 Effect Styles. proteus-component can begin.

When Phase 3 is complete: ProteusDS has a documented foundation ready for the Storybook and
documentation site that proteus-code will generate.

---

## Critical gotchas

### OKLCH → sRGB conversion (embed in every color-variable script)

Figma stores colors as RGBA (0–1). OKLCH must be converted before calling `setValueForMode`:

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

### Variable creation batching

Canvas nodes: 10 operations per call. Variables are lighter — up to 22 color variables or 46 float variables per call is safe. Confirmed: 112 Primitive variables across 4 calls with zero errors.

### Semantic variable scopes (set explicitly — `ALL_SCOPES` pollutes every picker)

| Token role | Scopes |
|---|---|
| Primitive colors | `["ALL_FILLS", "STROKE_COLOR", "EFFECT_COLOR"]` |
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

`color/background` is the page surface (neutral/950 Dark, neutral/50 Light). Using it as a button fill in Light = white button with white text = invisible.

| Button | Fill | Text |
|---|---|---|
| Primary | `color/primary` | `color/primary-foreground` |
| Secondary | `color/secondary` | `color/secondary-foreground` |
| Ghost / muted | `color/muted` | `color/muted-foreground` |
| Destructive | `color/destructive-bg` | `color/destructive-foreground` |

### `color/primary-foreground` is white in both modes — by design

Both Dark and Light resolve to `neutral/50` (white). Brand indigo is dark enough for WCAG AA in both modes. Not a bug.

### Figma page creation

Use `figma.createPage()` then immediately `await figma.setCurrentPageAsync(newPage)`. Page context resets to the first page on every new `use_figma` call — always switch explicitly at the top of each script.

### Auto-layout ordering rules

1. `figma.createAutoLayout('VERTICAL')` — creates with HUG on both axes
2. `node.resize(w, h)` — call BEFORE setting sizing modes (resize resets to FIXED)
3. `parent.appendChild(node)` — append to auto-layout parent FIRST
4. Then set `layoutSizingHorizontal = 'FILL'` / `layoutSizingVertical = 'HUG'`

`HUG` on the auto-layout frame itself does NOT require being inside another AL frame.
`FILL` on a child DOES require the parent to be AL and the child to be appended first.

### Padding variable binding

Set the numeric value first, then bind:
```javascript
frame.paddingTop = 12;
frame.setBoundVariable('paddingTop', spaceVar);
```

### Status token naming — `-fg` not `-foreground`

| Intent | Token correcto |
|---|---|
| Success text/icon | `color/success-fg` |
| Warning text/icon | `color/warning-fg` |
| Destructive text/icon | `color/destructive-fg` |
| Info text/icon | `color/info-fg` |
| Success bg | `color/success-bg` |
| Success subtle bg | `color/success-wash` |

`color/success-foreground` / `color/warning-foreground` / `color/error-foreground` NO existen.
Sufijo `-fg` siempre para foreground de estado.

### `opacity/*` variables no se pueden bindear al `opacity` de un nodo en Figma

`setBoundVariable("opacity", variable)` aparentemente acepta el binding, pero Figma resuelve el valor en escala 0–100 (no 0–1): una variable con valor `0.4` produce opacidad visual `0.4%` en lugar de `40%`. Los tokens de opacidad son **exclusivos para código** — no los bindees a nodos de presentación en Figma.

En las páginas de foundations, los overlays de la sección Opacidad usan valores hardcodeados directamente en la propiedad `node.opacity` (0.4, 0.08, 0.12, 0.6). Eso es correcto por diseño.

### `setBoundVariable("cornerRadius")` expande a las 4 esquinas

Llamar a `node.setBoundVariable("cornerRadius", variable)` vincula la variable con éxito, pero Figma la almacena bajo las claves individuales `topLeftRadius`, `topRightRadius`, `bottomLeftRadius`, `bottomRightRadius` — **no** bajo `cornerRadius`. Al auditar bindings de radio, verificar con:

```javascript
const bv = node.boundVariables;
const radiusBound = bv && (bv.cornerRadius || bv.topLeftRadius);
```

### Warning wash is near-black in dark mode

`color/warning-wash` → `amber/950` = rgb(43,21,0) en dark. Siempre paiear con `color/warning-fg` (amber/400). Nunca usar `-wash` con texto blanco.

### Language conventions — español neutro (no voseo)

Token names, property names y código en inglés. Descriptions y UI copy en español neutro — sin voseo argentino.

| Evitar (voseo) | Usar (neutro) |
|---|---|
| elegís / combinás | elige / combina |
| abrí el plugin | abre el plugin |
| buscá / reemplazá | busca / reemplaza |
| usás / escribís | usa / escribe |

Imperativo: forma de tú sin acento (abre, busca, elige). Presente: tercera persona o infinitivo cuando sea posible.

→ Diagramas de arquitectura y patrones de código por página: **`references/page-architectures.md`**
