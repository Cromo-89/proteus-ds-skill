---
name: proteus-component
version: 0.9.1
description: >-
  Build component sets for ProteusDS in Figma on top of the foundations
  tokens — variant matrices (Style × Size), component properties (TEXT,
  BOOLEAN, INSTANCE_SWAP), and per-component documentation pages with a
  header (title, description, version) wrapped in the same auto-layout +
  ring-stroke frame pattern the foundations pages use. This is the SECOND
  stage of the Proteus pipeline (foundations → components → code) — every
  visual property here binds to a Semantic token that proteus-foundations
  already created; nothing new gets defined at the token layer. Use this
  skill for anything about building, editing, reviewing, or extending
  Proteus component sets in Figma — buttons, inputs, cards, badges,
  selects, etc. — even if the user does not say "components". Do NOT
  define or edit design tokens here (that's proteus-foundations) and do
  NOT generate code or Storybook here (that's proteus-code).
---

## On load

When this skill is invoked, the **very first thing** you must output — before any
explanation, question, or action — is the following splash screen, rendered exactly
as shown (preserve all spacing and box-drawing characters):

```
╭───────────────────────────────────────────────────────╮
│                                                       │
│   ┌─┐┬─┐┌─┐┌┬┐┌─┐┬ ┬┌─┐                            │
│   ├─┘├┬┘│ │ │ ├┤ │ │└─┐                            │
│   ┴  ┴└─└─┘ ┴ └─┘└─┘└─┘                            │
│                                                       │
│              C O M P O N E N T S                     │
│                                                       │
│   Design System for ProteusDS  ·  Stage 2/3           │
│   Variant Sets · Properties · Pages          v 0.9.1  │
│                                                       │
╰───────────────────────────────────────────────────────╯
```

After printing the splash, proceed normally.

---

# Proteus Component

Second stage of the Proteus DS pipeline:

```
1. proteus-foundations  ✅ COMPLETE  → tokens, variables, styles, pages, Light/Dark
2. proteus-component    ⬅️ HERE      → component sets in Figma on top of foundations
3. proteus-code         (next)       → Figma → shadcn/ui → Storybook + docs
```

Figma file: **`Ohc3OVwwd3MwI4SvIdk3EY`** (Proteus DS).

## Skill files

- `SKILL.md` — this file
- `references/token-contract.md` — authoritative token spec (naming, tiers, OKLCH, shadcn mapping)
- `tokens/` — copies of the token JSON files components bind against (`primitives.json`,
  `semantic.dark.json`, `semantic.light.json`, `typography.json`, `border.json`,
  `opacity.json`, `elevation.json`)

## Component catalog — 52 componentes en 5 categorías

Estructura de páginas en Figma (`Ohc3OVwwd3MwI4SvIdk3EY`). Cada categoría tiene su separador `↓ NOMBRE` en el panel de páginas. **Los IDs de cada componente son IDs de PÁGINA (canvas)**, verificados contra el archivo el 2026-06-11 — usarlos con `figma.getNodeByIdAsync(id)` o `setCurrentPageAsync` sin redescubrir.

| Categoría | # | Componentes (con ID de página) |
|---|---|---|
| **📝 Forms** (separador `1072:2`) | 15 | Checkbox `391:2` · Date Picker `718:2` · File Upload `706:2` · Form Field `739:2` · Input `331:2` · Number Input `711:2` · OTP Input `713:2` · Password Input `955:2` · Phone Input `956:2` · Radio `419:2` · Search `712:2` · Select `628:2` · Slider `705:2` · Switch `432:2` · Textarea `668:2` |
| **🧭 Navigation** (separador `1072:3`) | 6 | Breadcrumb `696:2` · Navbar `714:2` · Pagination `695:2` · Sidebar `736:2` · Stepper `715:2` · Tabs `726:2` |
| **🪟 Overlays** (separador `1072:4`) | 8 | Command Palette `724:2` · Context Menu `716:2` · Dialog `640:2` · Dropdown Menu `612:2` · Notification Center `747:2` · Popover `597:2` · Toast `681:2` · Tooltip `546:2` |
| **🔔 Feedback** (separador `1072:5`) | 6 | Alert `496:19` · Banner `704:2` · Empty State `697:2` · Progress `677:2` · Progress Bar `728:2` · Skeleton `678:2` |
| **🖼️ Display** (separador `1072:6`) | 17 | Accordion `533:2` · Avatar `464:2` · Avatar Group `732:2` · Badge `311:2` · Button `166:2` · Card `444:2` · Chat Message `755:2` · Chip `710:2` · Divider `744:2` · Feature Card `763:2` · Label `265:2` · List Item `707:2` · Rating `729:2` · Stat Card `708:2` · Table `644:2` · Timeline `727:2` · Toggle Group `733:2` |

Otras páginas clave: Cover `0:1` · divisor `C O M P O N E N T S` `53:756` (Context card `259:2`) · Icons `207:2` · separador `↓ T E M P L A T E S` `1086:2`.

**Truco para listar todas las páginas del archivo**: `get_metadata` sin `nodeId` puede devolver solo las páginas ya cargadas por el cliente (lazy loading). Pasar un `nodeId` inválido (e.g. `0:0`) fuerza un error cuyo mensaje incluye la lista COMPLETA de páginas con sus IDs.

## Foundations pages — extras (beyond tokens)

Páginas de referencia visual en Figma que complementan las foundations de tokens:

| Página | ID nodo | Contenido |
|---|---|---|
| `Grid & Breakpoints` | `1077:2` | 3 breakpoints (Mobile 375 · Tablet 768 · Desktop 1440) + grids dibujados con rectángulos de columna |
| `↓ T E M P L A T E S` | `1086:2` | Separador de sección |
| `Auth` | `1086:3` | Login card centrado — campo email, password, CTA primario, link registro |
| `Dashboard` | `1086:4` | Sidebar 240px + topbar 56px + 4 stat cards + chart placeholder + actividad reciente |
| `Settings` | `1086:5` | Sidebar app + nav de ajustes 220px + form card (2 cols) con campos y botón guardar |
| `Empty · Error` | `1086:6` | Dos pantallas 1440×900: Error 404 (card centrado, botones) · Estado vacío (ilustración, feature list, CTA) |
| `Dark · Light Mode` | `1091:2` | Comparación side-by-side: paleta de colores, mini shell, botones, formularios, badges y notification card en ambos modos |

**Paleta de colores usada en templates** (hardcoded, dark mode):

```js
const C = {
  bg:      { r: 0.055, g: 0.055, b: 0.085 },  // fondo de pantalla
  card:    { r: 0.10,  g: 0.10,  b: 0.14  },  // tarjetas / paneles
  sidebar: { r: 0.065, g: 0.065, b: 0.10  },  // sidebar app
  topbar:  { r: 0.07,  g: 0.07,  b: 0.105 },  // topbar
  input:   { r: 0.085, g: 0.085, b: 0.13  },  // fondo de inputs
  primary: { r: 0.34,  g: 0.29,  b: 0.72  },  // acción primaria (Indigo)
  text:    { r: 0.93,  g: 0.93,  b: 0.96  },  // texto principal
  muted:   { r: 0.52,  g: 0.52,  b: 0.62  },  // texto secundario
  border:  { r: 0.18,  g: 0.18,  b: 0.26  },  // bordes y separadores
  success: { r: 0.20,  g: 0.72,  b: 0.45  },  // éxito
  warning: { r: 0.95,  g: 0.65,  b: 0.20  },  // advertencia
  error:   { r: 0.85,  g: 0.28,  b: 0.28  },  // error
};
```

**Nota crítica para nuevas páginas**: `figma.createPage()` resuelve variables semánticas en modo Light. Usar colores hardcoded (neutral/900 = `{ r: 0.122, g: 0.122, b: 0.122 }`) y NO llamar `setExplicitVariableModeForCollection` después de fijar fills manuales.

## Version bump — checklist obligatorio

Cuando se sube la versión del skill (e.g. `0.8.0` → `0.9.0`), **todos los archivos
que referencian la versión deben actualizarse en el mismo commit**. No es válido
actualizar solo el SKILL.md.

**Archivos a actualizar para proteus-components:**

| Archivo | Qué actualizar | Ejemplo |
|---|---|---|
| `proteus-components/SKILL.md` | Frontmatter línea 3: `version: X.X.X` | `version: 0.9.0` |
| `proteus-components/SKILL.md` | Splash screen: `v X.X.X` al final de la línea de "Pages" | `v 0.9.0` |
| `README.md` (raíz del repo) | Línea `proteus-components/`: `skill vX.X.X` | `skill v0.9.0` |

**Archivos de recursos — sin versión embebida, pero deben ir en el mismo commit si cambiaron:**

| Archivo/Carpeta | Cuándo incluir en el commit |
|---|---|
| `tokens/*.json` | Si se agregaron o modificaron tokens de foundations |
| `references/token-contract.md` | Si cambió el contrato de tokens o el mapeo shadcn |
| `icons-svg/` + `icons-svg.json` | Si se agregaron o eliminaron íconos de la librería |

Todos los cambios de una versión van en **un solo commit** — no commits parciales donde el SKILL.md dice v0.9.0 pero los tokens son del v0.8.0.

**Archivos a actualizar para proteus-foundations** (cuando corresponda):

| Archivo | Qué actualizar |
|---|---|
| `proteus-foundations/SKILL.md` | Frontmatter línea 3: `version: X.X.X` |
| `README.md` (raíz del repo) | Línea `proteus-foundations/`: `skill vX.X.X` |
| `proteus-foundations/references/` | Si cambiaron las referencias de foundations |
| `proteus-foundations/assets/` | Si se actualizaron assets de foundations |

**Regla de numeración:**
- Patch (`X.X.0 → X.X.1`): correcciones o mejoras a reglas existentes sin nuevo contenido.
- Minor (`X.0.0 → X.1.0`): nuevos componentes, secciones de referencia o patrones documentados.
- Major (`0.X.X → 1.X.X`): cambio de stage o reestructuración completa del skill.

## Foundations status (read-only reference — do not modify here)

- **`Primitives`** collection (`VariableCollectionId:11:2`, 1 mode) — OKLCH ramps incl.
  `brand` = Indigo (hue 284°), spacing, radius, etc.
- **`Semantic`** collection (`VariableCollectionId:15:2`, modes Dark = `15:0` / Light = `15:1`)
  — ~40 tokens, all aliases to primitives. **Dark is the primary/default mode.**
- 13 Text Styles (Inter + JetBrains Mono) + 5 Effect Styles (elevation).
- 9 presentation pages incl. Accessibility — all validated in Light/Dark + WCAG AA.

Brand: indigo `#5649B7`. Dark → `primary = brand.700`, `primary-hover = brand.600`,
`primary-pressed = brand.800`, `ring = brand.600`. Light shifts each one step up the ramp.

Known semantic variable IDs (skip re-discovery):
- `color/primary` = `VariableID:15:16`, `color/primary-foreground` = `VariableID:15:17`
- `color/ring` = `VariableID:15:29`, `color/background-secondary` = `VariableID:15:4`
- Rest follow `color/<name>` — discover via `figma.variables.getLocalVariablesAsync('COLOR')`.

## Icon library — vector components on the "Icons" page

A **37-icon** vector library exists on its own page (`Icons`, page id `207:2`, wrapper
`207:3`): 34 built in v0.1.0 from **Material Symbols Rounded**
(`fonts.gstatic.com/s/i/.../materialsymbolsrounded/<name>/default/24px.svg`,
`viewBox="0 -960 960 960"`, single-path SVGs), más 3 agregados después: `tune` y
`done_all` (misma fuente Material) y `google` (G monocromática, fuente **Simple
Icons** — `viewBox="0 0 24 24"`, único ícono de marca del set).

**Assets locales sincronizados (2026-06-11)**: `icons-svg/` contiene los 37 archivos
SVG y `icons-svg.json` el mapa `{name: svgString}` con las 37 entradas, regenerado
desde la carpeta. Si se agrega un ícono a Figma, agregar el `.svg` a la carpeta y
regenerar el JSON en el mismo commit.

**Shape**: one `COMPONENT` per icon, named `Icon/<name>`, fixed 24×24, `fills = []`
on the component itself, internal structure `COMPONENT > clip (FRAME) > vector
(VECTOR)`. `figma.createNodeFromSvg(svg)` returns a `FRAME` wrapping a `VECTOR` —
never a bare `VECTOR` — and that `VECTOR.fills[0]` is bound to `color/foreground`
(`VariableID:15:12`). This is the **"currentColor" pattern**: default tint is
`foreground`; any consumer can rebind the vector's fill to a different semantic
color by reusing a sibling's `boundVariables.color.id` — the same technique
validated for Button's icon-placeholder tinting. **No `Size` variant axis** — one
canonical 24×24 component per icon avoids combinatorial explosion; consumers scale
the *instance* (see the `rescale()` warning below — `resize()` does NOT propagate
to children and silently breaks proportional scaling).

**Naming convention — the inner vector layer MUST be lowercase `vector`, not
`Vector`.** Per the user's direct correction (Proteus-wide convention): *"para que
los icons se vuelvan dinámicos al cambiar de colores con variables de figma...
todos deben llamarse vector con la v sin mayúscula ya que al ponerle Vector no
hace efecto lo dinámico en figma."* `createNodeFromSvg` auto-names the vector
`Vector` (capital V, Figma's default for vector shapes) — **rename it to `vector`
on every master component immediately after import**. Renaming only the 35
masters was sufficient to update all 77 existing instances (30 on Button, 47 on
Iconography) automatically — none had individual sublayer-name overrides, so they
all mirror the master. Verified: `vector.name === 'vector'` across all of them.

**Pipeline note**: `fetch()` is NOT available in the `use_figma` sandbox. SVG source
must be fetched externally (curl/Bash/WebFetch), bundled into one `{name: svgString}`
JSON map, and embedded as a JS object literal in the script's `code` string (mind the
~50,000-char cap — batch if the set grows).

**Full ID map** (skip re-discovery — all live on the `Icons` page; fetch cross-page
with `await figma.getNodeByIdAsync(id)`, which works regardless of current page):
```
home=208:4 search=208:7 settings=208:10 close=208:13 check=208:16 add=208:19
menu=208:22 notifications=208:25 person=208:28 star=208:31 favorite=208:34
edit=208:37 delete=208:40 arrow_back=208:43 arrow_forward=208:46 share=208:49
download=208:52 upload=208:55 visibility=208:58 lock=208:61 mail=208:64
calendar_today=208:67 filter_list=208:70 sort=208:73 more_vert=208:76
expand_more=208:79 chevron_right=208:82 info=208:85 warning=208:88 error=208:91
check_circle=208:94 help=208:97 logout=208:100 login=208:103 tune=224:4
done_all=1048:4 google=1102:4
```

**`INSTANCE_SWAP` is now unblocked** — Button's `icon` placeholder (a tinted frame,
flagged in v0.1.0 as "swap to `INSTANCE_SWAP` once an icon library exists") can be
upgraded to a real `INSTANCE_SWAP` component property defaulting to one of these 37
components, `preferredValues` scoped to the set.

**Migrated — ALL FOUR demo spots in Iconography**, replacing every Material Icons
Regular ligature `TEXT` glyph with a same-size `INSTANCE` of the matching vector
component (`parent.insertChild(glyphIndex, instance)` → `glyph.remove()`, preserving
labels/cards/layout untouched, and reusing each glyph's `boundVariables.color.id` so
the instance keeps the exact same semantic tint):
- `Section/CommonIcons > IconGrid` — 34 cards (the only one done in the first pass)
- `Section/SizeScale` — "home" at 5 sizes (16/20/24/32/40), all → `color/foreground`
- `Section/IconColors > ColorGrid` — 7 chips incl. **`tune`** (not in the original 34
  — fetched from the CDN and added as `Icon/tune` = `224:4`, now **35 icons** at that point;
  `done_all=1048:4` se agregó después, llevando el total a **36 icons**;
  `google=1102:4` (monochrome G, fuente Simple Icons, 2026-06-10) — total **37 icons**),
  each rebound to its chip's own semantic color (`primary`, `success-fg`,
  `warning-fg`, `destructive-fg`, `info-fg`, `foreground`, `foreground-muted`)
- `FillAxisNote` (renamed from `InstallNote`) — "warning" at 20px

Verified programmatically across all 13 replacements: every instance is a real
`INSTANCE` of the right `Icon/<name>` component, correctly sized, with
`VECTOR.fills[0].boundVariables.color.id` matching the original glyph's bound
variable — 0 mismatches.

**Why this matters — the `fill` token axis**: `icon.json` already specified
`fill: 0 = "default (outlined-rounded)"`, `1 = "active/selected state"` — i.e.
**outline is the system default; filled is reserved for specific active/selected
cases**, exactly the distinction the user raised. The CDN's `/default/24px.svg`
endpoint already returns `fill 0` (outline) — confirmed by zoom-screenshotting
`home`/`star`/`favorite` as hollow strokes — so **the whole Material-sourced set
(36 of the 37 icons; `google` is a brand glyph outside the fill axis) is
already aligned with the documented default with no rework needed**. A parallel
`fill 1` (solid) icon set for active/selected states does not exist yet — flagged as
a v0.2 item (see `FillAxisNote` copy on the page, which now documents this gap).

**Stale copy fixed alongside the migration** (was written when the page still used
font-ligature placeholders, now factually wrong once real vector instances exist):
- Header description — dropped "...usan Material Icons (el set anterior...) porque
  Material Symbols Rounded todavía no está instalado en este archivo"; now states the
  samples are `Icon/<name>` vector instances at `fill 0`, ready for `INSTANCE_SWAP`.
- `InstallNote` → renamed `FillAxisNote`, repurposed from font-installation
  instructions (obsolete — vector components need no installed font) into a usage
  note explaining the `fill` axis and the `fill 1` gap.
- `CommonIcons` section description — dropped "...escribe el nombre exacto con la
  font family correspondiente" (ligature-era instructions); now describes the
  `INSTANCE_SWAP` connection point.

**Font-family naming resolved**: the "Material Icons Regular vs. Rounded" mismatch
flagged earlier is now moot — every icon-bearing node on the page is a vector
instance of `Icon/<name>` (Material Symbols Rounded source), no font dependency
remains anywhere on Iconography.

## The one hard rule for this tier

> **Component → Semantic for COLOR. Primitives for spacing/radius/typography
> (no Semantic equivalent exists for those — they're mode-independent).
> Never literals.**

Every fill, stroke, radius, padding, gap, font, shadow gets **bound**
(`setBoundVariable` / `setBoundVariableForPaint` / applied text style) — never a raw
hex or px. If you're about to type a number outside a `setBoundVariable*` call, stop.

**Trap, confirmed in Button v0.1.0:** `color/background*` is for page/section surfaces,
never for component fills. A primary button binds `color/primary` (fill) +
`color/primary-foreground` (label/icon) — never `color/background`.

## Token → shadcn mapping (condensed — full table in token-contract.md §4)

| Semantic token | Maps to / role |
|---|---|
| `color.foreground` / `.muted` / `.inverse` | text — primary / secondary / on-inverted |
| `color.background` / `.secondary` / `.tertiary` | page & section surfaces — not button fills |
| `color.surface.elevated`, `.card`, `.popover` (+ `-foreground`) | elevated surfaces |
| `color.primary` / `.secondary` / `.muted` / `.accent` (+ `-foreground`) | `--primary` etc. |
| `color.border` / `.border-heavy`, `color.input`, `color.ring` | `--border`, `--input`, `--ring` |
| `color.destructive/success/warning/info` `.fg` / `.bg` / `.wash` | status — **`-fg`, never `-foreground`** |

`color/destructive-foreground` (≠ `destructive-fg`) also exists — it's the correct
foreground pairing for `destructive-bg` on solid-fill elements like buttons. The
`-fg`/`-wash` trio is for status badges/banners instead — don't conflate the two.

## Workflow — one component at a time, page-per-component

Validated end-to-end with Button v0.1.0. Repeat this shape for every component:

1. **Create the page**, named after the component (e.g. `Button`).
   - Set `page.backgrounds` to the literal dark color the foundations pages use
     (`{r: 0.0518, g: 0.0518, b: 0.0518}`) — **new pages default to Figma's light
     canvas**, which makes anything bound to `color/foreground` invisible until fixed.
2. **Build the base variant** (e.g. `Variant=Primary, Size=Medium`) as an auto-layout
   component, fully bound to Semantic tokens. Screenshot and validate before scaling.
3. **Clone into the full Style × Size matrix**, `combineAsVariants`, then manually
   grid-position the children (they stack at 0,0 after combining).
4. **Add component properties** on the ComponentSet (not on individual variants):
   `Label` (TEXT), `Show Icon` (BOOLEAN) + an icon placeholder frame tinted to match
   the label color (swap to `INSTANCE_SWAP` once an icon library page exists). Wire
   with `componentPropertyReferences`.
5. **Wrap the whole page** in one auto-layout frame named after the component — same
   shape as the foundations pages: vertical, fixed width 1200, padding 48, gap 40,
   `cornerRadius` 16, fill = `color/background-secondary`, **stroke = `color/ring`**
   (1px). Inside it: `Header` (title, description, version) → `Section/<Name>` → the
   variant grid. This was retrofitted onto Button after the fact — for the next
   component, build the wrapper FIRST (see "Page wrapper" learning below).
6. **Validate**: `get_metadata` + `get_screenshot`, show the user, get explicit
   approval before starting the next component.

## Page template — estructura de referencia (medida desde Password Input v1.0.0)

Toda página de componente sigue esta estructura exacta. Los valores son los medidos
del frame real de Password Input (`957:63`) — úsalos como fuente de verdad, no
los valores de Button (que difieren en algunos detalles por haberse construido antes).

```
wrapper  FRAME  VERTICAL  w=1424 FIXED  h=AUTO
│  padding: 48 all  gap: 40  cornerRadius: 12
│  fill:   color/background-secondary  (VariableID:15:4)
│  stroke: color/ring  (VariableID:15:29)  strokeWeight: 2
│
├─ header  FRAME  VERTICAL  w=FILL  h=AUTO  gap: 12  (sin padding)
│   ├─ [nombre]   TEXT  Inter Semi Bold  30px  color/foreground      (VariableID:15:12)
│   ├─ [descripción]  TEXT  Inter Regular  16px  color/foreground-muted (VariableID:15:13)
│   │     → FILL width + textAutoResize HEIGHT  (ver receta anti-colapso)
│   └─ [versión]  TEXT  Inter Regular  12px  color/foreground-muted
│         → formato "v1.0.0"
│
├─ variants-section  FRAME  VERTICAL  w=FILL  h=AUTO  gap: 16  (sin padding)
│   ├─ [label]  TEXT  Inter Regular  12px  color/foreground-muted
│   │     → formato "Variants · {Nombre}"
│   └─ ComponentSet  (el grid de variantes)
│
└─ demo-section  FRAME  VERTICAL  w=FILL  h=AUTO  gap: 16  (sin padding)
    ├─ [label]  TEXT  Inter Regular  12px  color/foreground-muted
    │     → formato "Demo · {Descripción corta}"
    └─ demo-row  FRAME  HORIZONTAL  HUG×HUG  gap: 16
          → instancias del ComponentSet con props representativas
```

**Notas de construcción:**

- El `wrapper` mide **1424px** de ancho (no 1200 — ese era el valor original de Button,
  corregido a 1424 a partir de Input). Usar siempre 1424.
- La descripción del `header` debe seguir el patrón documentado en
  "Language conventions → Header description": caso de uso primero,
  diferenciador del Input base después.
- El `wrapper` va como único hijo de la página; `figma.currentPage.children[0]`
  siempre debe ser el `wrapper`.
- **Todos los contenedores internos (`header`, `variants-section`, `demo-section` y
  cualquier sección adicional) deben tener `primaryAxisSizingMode = 'AUTO'`
  (height HUG) para que se adapten al contenido interno.** El `wrapper` padre también
  es `AUTO` en height — así toda la página crece con el contenido sin alturas fijas
  que corten o dejen espacio vacío. Solo el ancho del `wrapper` es `FIXED` (1424px).
  La regla es: **ancho FIXED en el wrapper, todo lo demás HUG en altura.**
- Secciones adicionales (e.g. `usage-section`, `a11y-section`) se insertan
  como hermanos de `variants-section` y `demo-section`, mismo patrón: label 12px
  muted + contenido debajo, gap 16, sin padding, height HUG.
- El `strokeWeight` del `wrapper` es **2px** (no 1px como en Button).
  Verificado en Password Input, Phone Input y los últimos componentes del Stage 2.

## Progress — roadmap status as of v0.7.0

**Approved build order** (5 groups, ~19 components total incl. Button):
1. Label, Separator, Badge — ✅ **CERRADO** (3/3)
2. Input, Checkbox, Radio, Switch — ✅ **CERRADO** (4/4)
3. Card, Avatar, Alert — ✅ **CERRADO** (3/3) — Alert aprobado última, cierra el grupo
4. Tabs, Accordion, Tooltip — ✅ **CERRADO** (3/3) — Tooltip aprobado última, cierra el grupo
5. Popover, Dropdown Menu, Select, Dialog/Drawer, Table — ✅ **CERRADO** (5/5) — Table aprobado última, cierra el grupo y Stage 2

**19 componentes cerrados (Button + 18)** — Stage 2 COMPLETO. Detalle por componente:

> **Nota sobre IDs (2026-06-11)**: los IDs entre paréntesis en las entradas de abajo
> son **IDs de ComponentSet** (verificado: Label `275:2` y Badge `322:2` son los sets,
> que viven en las páginas `265:2` y `311:2` respectivamente) — NO IDs de página. Los
> IDs de página autoritativos están en el catálogo de arriba. Dos componentes de esta
> lista fueron **reemplazados** después del cierre de Stage 2 (ver sus entradas):
> Separator → Divider y Tab → Tab / Item.

- **Label** (`275:2`, 6 var. `Size×State`): primer caso donde un eje tuvo que
  ser VARIANT en vez de BOOLEAN porque cambiaba *color*, no solo visibilidad
  (`componentPropertyReferences` de tipo BOOLEAN solo puede bindear
  `visible`/`characters`/`mainComponent` — nunca un fill).
- **Separator** (`300:2`, 2 var. `Orientation`) — **⚠️ REEMPLAZADO por Divider**
  (página `744:2`, ComponentSet `Divider / Line` = `744:13`, 4 var.
  `Orientation×Style`: Horizontal Default/Label/Section + Vertical Default).
  El Separator original ya no existe en el archivo; el registro histórico de su
  construcción se conserva abajo porque la técnica de `LINE` sigue vigente:
  construido como `LINE` con
  `stroke`/`strokeWeight` bindeados — decisión basada en `scopes` de los
  tokens (`STROKE_COLOR`/`STROKE_FLOAT`), no en intuición. Técnica de
  reposicionar una `LINE` rotada (compensar el offset del bounding box tras
  `rotation = 90`).
- **Badge** (`322:2`, 5 var. `Status`): reusa el sistema de estado
  `{status}-wash`/`{status}-fg` ya tokenizado y demoado en Accesibilidad —
  decisión validada con `AskUserQuestion` para evitar un segundo lenguaje
  visual de "badge" incompatible.
- **Input** (`343:2`, 15 var. `Size×State`): estructura `input-row` +
  `helper-text` (visible solo en `State=Error`). Origen del bug de
  plataforma **INSTANCE_SWAP resetea hijos a tamaño nativo** (ver receta
  de íconos más abajo — regla definitiva).
- **Checkbox/Radio/Switch** (`397:4`/`422:2`/`435:2`, 8-10 var. `Style×State`
  cada uno): los 3 comparten el eje `Style`(Inline/Box) y la MISMA receta de
  "tarjeta seleccionable" (padding=`space/4`, radius=`radius/md`,
  fill=`color/{background|accent}`, stroke=`color/{border|primary|ring}`) —
  ya un patrón de composición consolidado, candidato a documentarse aparte
  si aparece un List Item.
- **Card** (`446:2`, componente único sin eje de variante — toda la
  apariencia vía properties `Title`/`Description`/`Show Image`/`Show Footer`):
  primer caso de **instanciar componentes existentes** (Button real) dentro
  de otro componente para footers/demos realistas, en vez de placeholders.
- **Avatar** (`469:11`, 9 var. `Size×Type` Initials/Icon/Photo + badge de
  estado vía sub-`ComponentSet` "Avatar Status" anidado): primer caso de
  **status badge superpuesto con `layoutPositioning='ABSOLUTE'`** sobre
  contenido en auto-layout, y el caso que produjo la receta definitiva de
  rescale de íconos (ver abajo).
- **Alert** (`501:12`, 5 var. eje único `Status` Neutral/Success/Warning/
  Destructive/Info — **"sistema semántico igual que Badge"**, decisión
  validada con `AskUserQuestion`): estructura `icon` + `content`(title+
  description), fondo `{status}-wash`, texto/ícono `{status}-fg`. Mapeo de
  íconos: Info→`info`, Success→`check_circle`, Warning→`warning`,
  Destructive→`error`, Neutral→`notifications`+`secondary`/`secondary-
  foreground` (mismo recurso que Badge para el estado sin par wash/fg
  dedicado). Construido íntegramente con instancias frescas + rescale antes
  de reparentar (ver receta abajo) — los 5 íconos salieron 20×20 perfectos
  a la primera. Propiedades: `Title`/`Description`(TEXT), `Show Icon`/
  `Show Description`(BOOLEAN). Demo con 4 instancias reales (`setProperties`
  para `Title#502:0`/`Description#502:6`).
- **Tabs — `Tab`** (página `523:2`, ComponentSet `525:6` — **⚠️ AMBOS IDs YA NO
  EXISTEN**: el componente fue reconstruido como **`Tab / Item`** en la página
  Tabs actual (`726:2`), ComponentSet `881:23`, 8 var. `Type×State` =
  Pill/Underline × Default/Active/Hover/Disabled, con demo de barra completa
  por cada Type. La entrada original se conserva como registro histórico:)
  3 var. eje único `State` Active/Inactive/Disabled — primer componente del Grupo 4:
  trigger `HORIZONTAL` auto-layout (padding `space/2`/`space/3`,
  `radius/sm`); Active = fondo `color/background` + `elevation/sm` +
  texto `color/foreground` (superficie elevada, mayor contraste);
  Inactive = `fills=[]` + texto `color/muted-foreground`; Disabled = igual
  que Inactive + `opacity=0.5`. Propiedad `Label`(TEXT, default "Tab").
  Esta vez `combineAsVariants` SÍ respetó el parent pedido (`figma.
  currentPage`) — aun así se movió el set al wrapper (`wrapper.
  appendChild(set)`) para igualar el patrón de Alert/Card (ComponentSet
  como hijo del wrapper, no de la página). Demo = composición `TabsList`
  realista: contenedor `HORIZONTAL` con fill `color/muted`, padding
  `space/1`, radius `radius/md`, gap `space/1`, con 3 instancias
  (`setProperties` sobre `Label#528:0`): "Resumen"(Active), "Detalles" y
  "Configuración"(ambas Inactive). Label "Demo — Tabs" como primer hijo,
  siguiendo la convención consolidada desde el inicio.
- **Accordion — `Accordion Item`** (página `533:2`, ComponentSet `539:6`,
  2 var. eje único `State` Open/Closed — segundo componente del Grupo 4):
  estructura `VERTICAL` auto-layout (ancho FIXED 560, padding vertical
  `space/4`, borde inferior `color/border`) con fila `header`(título +
  ícono `expand_more` 20×20) y `content`(texto, `visible` según estado).
  Open = ícono rotado 180°, `content.visible=true`; Closed = ícono sin
  rotar, `content.visible=false`. Propiedades `Title`/`Content`(TEXT)
  conectadas a ambas variantes (mismo colapso al default que en Alert/Tabs
  — el override real es por instancia). **Nuevo gotcha de íconos**: el
  `findOne` que busca el primer nodo con `fills` puede atrapar el `Frame`
  wrapper del ícono (que también trae fill bindeado) en vez del `vector`
  real — hay que apuntar explícitamente a `n.type === 'VECTOR'` y dejar el
  Frame transparente (`fills = []`). **Nuevo gotcha de layout**: al
  combinar variantes anchas (560px) lado a lado, el `ComponentSet` puede
  exceder el ancho de contenido del wrapper (1104 = 1200 − 2×48) y
  desbordar el padding — para componentes anchos, apilar las variantes
  VERTICALMENTE en el grid, no en fila. Demo = lista FAQ realista
  (`AccordionList`, `VERTICAL`, gap 0) con 3 instancias (`setProperties`
  sobre `Title#541:0`/`Content#541:3`): una abierta + dos cerradas. Label
  "Demo — Accordion" como primer hijo.
- **Tooltip** (`546:2`, ComponentSet `550:2`, 4 var. eje único `Position`
  Top/Bottom/Left/Right — ÚLTIMO componente del Grupo 4, lo cierra):
  cada variante = contenedor auto-layout `HUG` con dos hijos —`bubble`
  (`HORIZONTAL`, fill `color/popover`, texto `color/popover-foreground`,
  padding `space/2`/`space/3`, `radius/sm`, efecto `elevation/sm`) y
  `arrow`(`figma.createPolygon()`, 3 lados, 12×6, mismo fill que la
  burbuja). La dirección de la flecha y el orden de los hijos cambian
  según la posición: Top = `[bubble, arrow]` `VERTICAL` + `rotation=180`
  (apunta hacia abajo, al disparador debajo); Bottom = `[arrow, bubble]`
  `VERTICAL` + `rotation=0`; Left = `[bubble, arrow]` `HORIZONTAL` +
  `rotation=90`; Right = `[arrow, bubble]` `HORIZONTAL` + `rotation=-90`.
  Propiedad `Label`(TEXT). Demo = `TooltipStage` realista: burbuja Top
  flotando arriba de un botón disparador (`color/accent`/`accent-
  foreground`), conectados visualmente por la flecha. Label
  "Demo — Tooltip" como primer hijo. **Recordatorio reforzado**: el grid
  de variantes se debe armar/recalcular DESPUÉS de conectar las
  properties — el binding cambia anchos al adoptar el texto default
  (pasó en Tabs Y aquí: hubo que rearmar el grid porque "Información
  adicional" es más largo que los placeholders iniciales).
- **Popover** (página `597:2`, ComponentSet `600:10`, 4 var. eje único
  `Position` Top/Bottom/Left/Right — construido antes del grupo; el ID `605:2`
  que figuraba aquí ya no existe en el archivo).
- **Dropdown Menu** (`612:2`, ComponentSet `613:2` "Menu Item", 12 var.
  `Type×State` Default/Checkbox/Radio × Default/Hover/Disabled/Destructive):
  items HORIZONTAL con icono oculto + label FILL + shortcut oculto. Las
  variantes Checkbox/Radio incluyen un sub-indicador atom nested (swapped
  vía `instance.swapComponent(masterNode)`). Atoms creados en sus páginas:
  `Checkbox / Indicator` (`624:32`, 2 var. State=Unchecked/Checked, 16×16)
  y `Radio / Indicator` (`625:19`, 2 var., 16×16). Props: `Label`(TEXT),
  `Show Icon`(BOOLEAN), `Shortcut`(TEXT), `Show Shortcut`(BOOLEAN). Demo con
  9 items + 3 separadores mostrando los 3 tipos con estados Checked/Unchecked.
- **Select** (`628:2`, ComponentSet `630:32`, 15 var. `Size×State`
  SM/MD/LG × Default/Filled/Open/Disabled/Error): cada variante HORIZONTAL
  FIXED (w=200, h=28/36/44 por size), `color/input` fill, stroke por estado
  (`color/border`/`ring`/`destructive-fg`), text FILL bindeado a `Value`
  property, chevron `Icon/expand_more` (14/16/20px, rotation=180 en Open).
  Props: `Value`(TEXT, "Seleccionar..."), `Show Clear`(BOOLEAN). Demo con
  4 campos de formulario (Ciudad Filled, País Default, Zona horaria Error
  + helper, Moneda Disabled).
- **Dialog** (`640:2`, componente ÚNICO `640:10`, 480px FIXED × HUG height):
  VERTICAL auto-layout, fill=`color/card`, stroke=`color/border`, corners
  bindeados a `radius/lg`, effect=`elevation/lg`. Estructura: header row
  (title FILL + close btn con `Icon/close` 16px rescalado) → divider
  → body (description FILL) → divider-footer → footer (Button Outline/MD
  "Cancelar" + Button Primary/MD "Confirmar", right-aligned). Props:
  `Title`, `Description`(TEXT), `Show Description`, `Show Footer`(BOOLEAN).
- **Drawer** (`640:2`, ComponentSet `642:34`, 3 var. `Position`
  Right/Left/Bottom): Right/Left = 400×560, Bottom = 600×320. Misma
  estructura que Dialog (header + body FILL height + footer). Corners
  redondeados solo en los 2 lados "abiertos" del cajón (ej. Right →
  topLeft+bottomLeft). Props: `Title`, `Description`(TEXT), `Show
  Description`, `Show Footer`(BOOLEAN). Demo con Drawer Right
  "Configuración" + Drawer Bottom "Filtros".
- **Table / Header Cell** (página `644:2`, ComponentSet `645:6`, 3 var.
  `Sort=None/Ascending/Descending`): HORIZONTAL FIXED 200×44, fill=
  `color/muted`, bottom-border-only (`strokeBottomWeight=1`,
  strokeTop/Left/Right=0), label FILL (`text/label/sm`, `color/foreground`)
  + `Icon/sort` (16px rescalado, oculto en Sort=None, visible+coloreado en
  Asc/Desc). Prop: `Label`(TEXT). **Table / Cell** (componente único
  `644:26`, 200×44, transparent fill, bottom-border-only, content text FILL).
  Prop: `Content`(TEXT). Demo tabla 4 cols × 1 header + 4 data rows con
  alternating row background (`color/muted` en filas impares).

**Patrones nuevos consolidados en Grupo 5** (agregar a recetas):
- **`counterAxisSizingMode` NO acepta `'FILL'`** (solo `'FIXED'`|`'AUTO'`);
  para que un hijo llene el ancho de su padre auto-layout usar
  `layoutSizingHorizontal = 'FILL'`.
- **`layoutSizingHorizontal` NO acepta `'AUTO'`** (solo `'FIXED'`|`'HUG'`|`'FILL'`).
- **FILL en primary axis de auto-layout FIXED**: `body.layoutSizingVertical =
  'FILL'` llena el espacio restante entre header y footer cuando la altura
  del componente es FIXED (Drawer).
- **Per-side stroke borders**: `strokeBottomWeight=1` +
  `strokeTop/Left/Right=0` da borde solo inferior (Table cells).
- **Nested instance swap para atoms**: `parent.findOne(n => n.name ===
  'indicator').swapComponent(masterNode)` para cambiar qué variante
  de un atom nested muestra un item de lista.
- **`figma.getNodeById()` (sync) funciona para íconos cross-page** en el
  mismo script (sin `setCurrentPageAsync`) cuando el ID es conocido.

**STAGE 2 COMPLETO — 19/19 componentes cerrados (2026-06-08).**

**Gotcha confirmado de `combineAsVariants(nodes, parent)` — comportamiento
INCONSISTENTE respecto al parent**: el segundo argumento no garantiza el
parent final, y el resultado varía caso a caso. En Alert terminó anidado
en el wrapper (rompiendo su `layoutSizingHorizontal`, de 1200 fijo a 669
"hug"); en Tabs, Accordion y Tooltip terminó como hijo de la PÁGINA (no
del wrapper ni de `figma.currentPage` en el sentido esperado), por lo que
hubo que moverlo manualmente con `wrapper.appendChild(set)` las 3 veces
para igualar el patrón consolidado (ComponentSet como hijo directo del
wrapper, igual que Alert/Card). **Regla definitiva: NUNCA asumir dónde
quedó el `ComponentSet` — verificar `set.parent.id` siempre, mover con
`wrapper.appendChild(set)` si hace falta, y revisar/reparar las
dimensiones del wrapper (`wrapper.resize()`) después.**

**Patrones nuevos consolidados en este tramo** (aplican a todo componente
futuro — ver detalle completo en `Learnings from Implementation` más abajo):
1. Receta anti-colapso de texto FILL — aplicar **de entrada**, sin excepción
   (recurrió ≥3 veces en nodos distintos: description de Input, de Radio, y
   `title` de Card — no es selectiva por "tipo de nodo").
2. `page.backgrounds` — copiar desde una página de componente existente
   inmediatamente tras `figma.createPage()` (Figma no lo hereda).
3. Eje `Style`(Inline/Box) — patrón de composición reusable para cualquier
   control seleccionable futuro.
4. **Receta definitiva para escalar íconos** (reemplaza la guía anterior,
   que recomendaba — incorrectamente — evitar instancias y usar SVG
   importado): ver "Rescaling icon instances — the definitive recipe" abajo.
5. **Etiqueta de sección "Demo" — convención retroactiva (v0.6.0)**: Card,
   Avatar y Alert llevan un texto `Demo — {Componente}` (Inter Regular 12px,
   `color/foreground-muted`, primer hijo del frame `{Componente} / Demo`)
   anunciando la sección. Una auditoría de las 11 páginas de componentes
   reveló que los 8 anteriores no la tenían: 6 (Label/Badge/Input/Checkbox/
   Radio/Switch) sí tenían el frame demo pero sin título — se les agregó el
   texto retroactivamente para igualar el patrón. Button y Separator no
   tienen sección demo en absoluto (se dejaron así, por decisión del
   usuario — son los componentes más simples del set). **Para todo
   componente nuevo: el texto "Demo — {Nombre}" va SIEMPRE como primer hijo
   del frame demo, no como hermano externo** — así no se repite el hueco.
6. **Recoloreo de íconos — apuntar SIEMPRE al `VECTOR` explícito, nunca al
   primer nodo con `fills`** (descubierto en Accordion: la estructura de
   `expand_more` es `instance > Frame(con fill bindeado) > vector(con fill
   bindeado)` — un `findOne(n => n.fills)` ingenuo atrapa el `Frame`
   wrapper y deja un cuadro de color visible alrededor del glifo real).
   Filtrar por `n.type === 'VECTOR'` y dejar el `Frame` transparente
   (`fills = []`).
7. **Grid de variantes — calcular si caben ANTES de decidir fila vs.
   columna, y RE-CALCULAR después de conectar properties** (dos lecciones
   de Accordion/Tabs/Tooltip): (a) si `n×ancho + (n-1)×gap` excede el
   ancho de contenido del wrapper (`ancho_wrapper − 2×padding`), apilar
   en columna en vez de en fila — pasó con las 2 variantes de 560px de
   Accordion (1152 > 1104, desbordaba el padding); (b) conectar una
   property TEXT a `characters` cambia el texto de las variantes al valor
   default (que puede ser más largo/corto que el placeholder usado al
   armar el grid), alterando sus anchos — siempre rearmar el grid DESPUÉS
   de conectar las properties, no antes (pasó en Tabs y de nuevo en
   Tooltip).

## Plugin API patterns that matter here

(Curated from `proteus-foundations/SKILL.md` → "Learnings from Implementation",
filtered to what applies to components — see that file for the full catalogue.)

- **Ghost white fill on `createAutoLayout()` frames**: defaults to an unbound white
  fill. Every structural wrapper (`Header`, `Section/*`, grid containers) needs
  `frame.fills = []` or an explicit bind — otherwise a white rectangle appears over
  the dark canvas.
- **HUG/FILL/FIXED**: `HUG` only on an auto-layout frame itself or a TEXT child of
  one; `FILL` only on a child already parented inside an auto-layout. A `NONE`-layout
  frame inside an auto-layout parent can only be `FIXED` or `FILL`, never `HUG`.
  Build outside-in: create → parent → set sizing.
- **Corner radius** binds per-corner (`topLeftRadius`/`topRightRadius`/...), never
  as a single `cornerRadius` variable.
- **Stroke** binds color and width separately (`setBoundVariableForPaint` on
  `strokes`, `setBoundVariable('strokeWeight', ...)`); `setBoundVariableForPaint`
  returns a **new** paint — capture and reassign.
- **Text edits**: canonical recipe is load current font(s) via
  `getStyledTextSegments(['fontName'])` → `await loadFontAsync` → mutate → return IDs.
  Required even for `componentPropertyReferences` on TEXT nodes, not just `characters`.
- **Naming**: state tokens are `-fg`/`-bg`/`-wash`, never `-foreground` (that suffix
  is reserved for `primary`/`secondary`/`card`/`popover`/`muted`/`accent`).
- **Reparenting absolutely-positioned clusters**: `appendChild` does *not* preserve
  page-absolute position — it keeps the numeric `x`/`y` but reinterprets them
  relative to the new parent. Compute the cluster's bounding box first, reparent,
  then set `node.x = origX - bbox.minX` (and same for `y`) on every member.

## Learnings from Implementation — Button v0.1.0

### Variable-resolution cache can get "stuck" after bulk clone + `combineAsVariants`

After cloning 15 variants and combining them into a ComponentSet, the screenshot
showed clearly wrong colors — the ComponentSet background read as light gray and
"Primary" buttons rendered pure black — even though every `boundVariables.color`
reference checked out correctly (right variable, right ID, no explicit mode overrides
anywhere in the ancestor chain).

**Diagnosis that worked:** create a brand-new node on the same page, bind it to the
*same* variable through the *same* code path — it resolved correctly immediately.
That isolated the problem to the existing nodes' cached resolved color, not the
binding itself or the page/file mode context.

**The fix:** force Figma to recompute every bound-variable resolution on the page by
toggling its explicit variable mode for the affected collection —
`page.setExplicitVariableModeForCollection(semanticCollection, '15:1')` (Light), then
back to `'15:0'` (Dark), then reset to the collection's `defaultModeId`. This single
nudge fixed **all 15 variants at once** — proof the bindings were correct all along
and only the cached render was stale.

**Rule of thumb:** if a freshly-built variant matrix screenshots with implausible
colors but `boundVariables` reads back correctly on every node, don't start
rebinding — toggle the page's explicit variable mode for the collection (and reset
it) before assuming the bindings themselves are broken.

### Page wrapper — build it first next time

Button was built loose-on-canvas (header frame + floating ComponentSet + floating
row/column labels), then wrapped after the fact into the foundations-style frame
(`Section/Variants` → `Variant grid`). It worked, but required computing a bounding
box and manually reparenting nine nodes with adjusted coordinates. **For the next
component, create the page wrapper frame FIRST** (same recipe as workflow step 5)
and build the header + variant grid as children of it from the start — saves a whole
retrofit pass.

### Icon placeholder tinting

The `icon` placeholder frame (16×16, candidate for `INSTANCE_SWAP` once an icon
library page exists) is bound to the *same* color variable as its sibling `label`
text — read `label.fills[0].boundVariables.color.id`, fetch that variable, and reuse
it for the icon's fill. This keeps icon tint automatically consistent with text tint
across every Style variant without hand-mapping five separate token names.

### `Show Icon` → `Show Icon Left` / `Show Icon Right` (post-icon-library update)

Once the vector icon library existed, the single `Show Icon` boolean (one
left-side-only placeholder) was replaced with **two independent booleans** —
`Show Icon Left` and `Show Icon Right` — so a button can carry a leading icon, a
trailing icon, or both (e.g. "Continue →", "← Back", a dropdown trigger with a
chevron on the right). Recipe, validated across all 15 variants with 0 mismatches:

1. `componentSet.addComponentProperty('Show Icon Left', 'BOOLEAN', false)` /
   `...('Show Icon Right', 'BOOLEAN', false)` — returns the full `"Name#id"` key
   needed for `componentPropertyReferences`.
2. Per variant: rename the existing `icon` → `icon-left`, rewire
   `componentPropertyReferences = { visible: leftKey }`.
3. **Clone, then reparent, then wire — in that exact order.** `iconLeft.clone()`
   followed *immediately* by `iconRight.componentPropertyReferences = {...}` throws
   `"Can only set component property references on symbol sublayer"` — a clone is
   not yet a confirmed sublayer of the symbol until it's actually been
   `insertChild`'d into the variant. Reparent first (`variant.insertChild(labelIdx
   + 1, iconRight)`, placing it *after* `label` so the order is `icon-left → label →
   icon-right`), *then* set the reference.
4. `componentSet.deleteComponentProperty(oldKey)` — look the full key up via
   `Object.keys(componentSet.componentPropertyDefinitions).find(k =>
   k.startsWith('Show Icon#'))` rather than hardcoding the `#id` suffix.
5. Validate with a **temporary instance**: `variant.createInstance()` →
   `instance.setProperties({ [leftKey]: true, [rightKey]: true, [labelKey]: '...' })`
   → `screenshot()` → `instance.remove()`. This is the only way to preview a
   boolean/property combination on the *master* component without leaving stray
   instances behind.

This pattern generalizes to any "slot" property pair (leading/trailing icon,
prefix/suffix adornment, etc.) — clone the placeholder, not the property machinery.

### Wiring `Icon Left` / `Icon Right` as real `INSTANCE_SWAP` properties

Once the icon library existed and `Show Icon Left/Right` were in place, the two
icon slots were still empty *tinted-frame placeholders* — they showed/hid but
couldn't actually display an icon. Final step: replace each placeholder FRAME
with a live `INSTANCE` of `Icon/star` (the chosen generic default — neutral,
recognizable, commonly used as a UI-kit sample icon) wired as an
`INSTANCE_SWAP` component property scoped to the full 37-icon library. Recipe,
validated across all 15 variants × 2 sides = 30 instances with 0 mismatches:

1. `componentSet.addComponentProperty('Icon Left', 'INSTANCE_SWAP', '208:31')`
   — `defaultValue` for `INSTANCE_SWAP` is a component **node ID** string (here,
   `Icon/star`'s id), not a key. Same for `'Icon Right'`.
2. `componentSet.editComponentProperty(fullKey, { preferredValues: [...] })` —
   `preferredValues` is `{ type: 'COMPONENT', key: <component.key> }[]`, using
   each icon's **`.key`** (the library key hash, available even on local/
   unpublished components — confirmed). Pass *all* 37 icons so the swap picker
   in Dev Mode/Figma shows the entire library, not just one option.
3. **Same clone/reparent/wire ordering bug applies to `createInstance()`.** A
   freshly created instance is not yet a "symbol sublayer" until it's been
   `insertChild`'d into the variant — so: `master.createInstance()` →
   `variant.insertChild(idx, instance)` → `placeholder.remove()` → *then*
   `instance.componentPropertyReferences = { visible: visKey, mainComponent:
   swapKey }`. Setting references before reparenting throws the same "Can only
   set component property references on symbol sublayer" error as the clone case.
4. Re-tint the new instance to match its variant's label, exactly like the
   placeholder-frame pattern but one level deeper: `instance.findOne(n => n.type
   === 'VECTOR')` (every `Icon/<name>` shares the identical internal layer path
   `COMPONENT > Frame > Vector`), read the label's `fills[0].boundVariables.color.id`,
   fetch the variable, `setBoundVariableForPaint` on the vector's fill. Because
   all 37 icons share that exact layer path, this tint binding **survives any
   future `INSTANCE_SWAP`** the user performs in their own files — swapping
   `Icon Left` from `star` to `arrow_back` keeps the same `Vector` fill binding.
5. Validate: `node.componentPropertyReferences.{visible,mainComponent}` match
   the expected keys, `node.mainComponent.name === 'Icon/star'`, size matches
   the Size-variant icon scale (see below), and the nested vector's bound color
   variable equals the label's. Preview via temporary instance with both swap
   properties + booleans set + screenshot + remove.

Final property set on `Button` after this pass: `Label` (TEXT), `Show Icon Left`
/ `Show Icon Right` (BOOLEAN), `Icon Left` / `Icon Right` (INSTANCE_SWAP, default
`Icon/star`, scoped to all 37 icons), `Variant` / `Size` (VARIANT) — 15 variants,
fully wired end-to-end from boolean visibility through to swappable, auto-tinted
vector icon instances.

### Bug fix — icon size must scale with the `Size` variant, not be hardcoded

First pass after the `INSTANCE_SWAP` wiring hardcoded every `icon-left`/
`icon-right` instance at 16×16, copied straight from the original placeholder
frame's fixed size. The user caught it visually ("el icon no se está ajustando
al tamaño correspondiente al button") — on `Large` (46px tall, 16px label) a
16px icon reads as too small relative to the text; `icon.json`'s contract is
explicit: *"Components pick a size token, never a literal icon px"* and defines
the scale `sm` 16 / `md` 20 / `base` 24 / `lg` 32 / `xl` 40.

**Fix — pair the icon size token to the `Size` variant** (mirrors how
`labelFontSize` already scales 12/14/16 across Small/Medium/Large):

| `Size` variant | label font size | button height | icon size token | icon px |
|---|---|---|---|---|
| Small  | 12 | 24 | `sm`   | 16 |
| Medium | 14 | 35 | `md`   | 20 |
| Large  | 16 | 46 | `base` | 24 |

**First attempt used `instance.resize(px, px)` — WRONG, and a second user catch
caught it**: the API docs are explicit that `resize()` *"will not cause its
children to resize... Children of the node are never resized, even if those
children have constraints."* The instance's outer bounding box changed (16/20/24
as reported by `.width/.height`), but the nested `Frame`/`Vector` stayed frozen
at the master's native 24×24, and `clipsContent: false` let it overflow/render
at full 24px regardless of the supposed variant size — so on `Small` (a 24px-tall
button!) the icon rendered at its native 24×24, visually dwarfing the button.
The user caught this too: *"el tamaño de icon left y right es muy grande con la
relación de tamaño de button en su variante S o M"*.

**Correct fix — `instance.rescale(scale)`, not `resize()`.** `rescale` is *"the
equivalent of using the Scale Tool from the toolbar"* — it proportionally scales
the node **and all its children** together. Recipe (applied by recreating the
instances cleanly rather than patching the already-broken ones, to avoid
compounding bad geometry):
```js
const fresh = starComponent.createInstance();   // native 24×24, correct internal proportions
variant.insertChild(idx, fresh);
const scale = targetPx / 24;                    // 16/24, 20/24, or 24/24
if (scale !== 1) fresh.rescale(scale);          // scales Frame + Vector together
fresh.componentPropertyReferences = { visible: visKey, mainComponent: swapKey };
// ...then re-tint the nested Vector as before
```
Validated 30/30 (15 variants × 2 sides) — including a `frame.width === instance.width`
check that would have caught the original bug immediately. **Lesson: when an
icon/instance must render at a non-native size, always reach for `rescale()`.
`resize()` is for layout containers whose children reflow (auto-layout, text);
it is the wrong tool for "shrink this whole graphic uniformly," and the
visual symptom (content overflowing a too-small box) can be subtle in a
thumbnail-scale screenshot — verify by comparing the instance's box against
its first non-auto-layout child's box.**

**Note on the Small variant's "tight" look**: at `Size=Small` the gap between
icon and label can look like an overlap in a screenshot — it isn't. Measured
node positions confirm a clean 4px `itemSpacing` gap on both sides
(`icon-left` ends at x=28, `label` starts at x=32; `label` ends at x=87,
`icon-right` starts at x=91). The illusion comes from the chosen generic icon
(`star`)'s pointed silhouette sitting close to the glyph at small sizes with
`Small`'s intentionally tighter spacing (4px vs. 8px on Medium/Large) — a
pre-existing density choice, not a layout defect. **Lesson: when validating
icon/text proximity from a screenshot, measure `x`/`width` of the actual
nodes — pointed or asymmetric icon glyphs can visually read as touching text
that is, numerically, cleanly spaced.**

## Rescaling icon instances — the definitive recipe (supersedes earlier guidance)

Across Input, Checkbox, and Avatar, three *different-looking* icon-scaling
problems turned out to be **two separate platform behaviors** that earlier
passes conflated into one wrong "just avoid instancing icons" rule. Sorting
them out, with the user's help, produced the rule that actually holds:

**Behavior A — `INSTANCE_SWAP` resets children to the new master's native
size (Input's bug, confirmed, still true):** if a slot is exposed as a
swappable `INSTANCE_SWAP` property, *any* `rescale()`/`resize()` you apply
gets discarded the moment someone picks a different master from the swap
picker — Figma reparents the new master's content at *its* native 24×24,
ignoring the outer instance's already-adjusted size. Not fixable via
`constraints` (Figma blocks "This property cannot be overridden in an
instance"). **Rule: never rescale a swappable `INSTANCE_SWAP` slot — leave
it at native 24×24** (Input absorbs a small constant ~2px overflow instead).

**Behavior B — fixed/decorative icon instances rescale perfectly, IF you
follow the right call order (Avatar's "bug", which wasn't one):** building
Avatar's `Type=Icon` variants, `rescale()` appeared to leave the inner
`Frame` wrapper stuck at 24×24 — but that diagnosis came from calling
`resize()` then `rescale()` repeatedly on the *same* already-mutated
instance and reading back stale/compounded transforms. A from-scratch
control test proved the API works fine:

```js
const inst = master.createInstance();
figma.currentPage.appendChild(inst);   // park it OUTSIDE the target auto-layout
inst.x = 3000; inst.y = 3000;           // away from other content
inst.rescale(targetPx / 24);            // ONE call, on a never-touched instance
// → instance, inner Frame, AND vector all land at the exact proportional size
targetFrame.appendChild(inst);          // reparent only after rescaling
```

Verified end to end on Avatar's 3 `Icon` variants (16/20/24px): `instWH ===
frameWH`, `mainComponent.key` still pointed at the library's `Icon/person`
in all three (a real, swap-connected instance — not a detached import), and
the rendered glyph was crisp and proportional at every size.

**Rule, corrected**: `rescale()` on an icon instance is **safe and precise**
when (a) the slot is a fixed/decorative one — never exposed as
`INSTANCE_SWAP` — and (b) you call it **exactly once**, on a **freshly
created, not-yet-reparented, never-before-mutated** instance, **before**
appending it to its final (often auto-layout) parent. Chaining
`resize()`+`rescale()`, or re-rescaling an instance you already touched,
produces inconsistent compounded transforms that look like a platform bug
but aren't. **This replaces the earlier (wrong) recommendation to import a
detached SVG instead of instancing** — that workaround sacrifices the
library connection for nothing; the user correctly rejected it
("necesito que sean los iconos de la libreria") and pointed at Button's
`Icon Left`/`Icon Right` as proof the instance+rescale technique already
worked elsewhere in the file (it does — Button uses the identical
create→rescale-once→reparent order, see "Bug fix — icon size must scale
with the `Size` variant" above).

### Validación — `Icon/done_all` a 3 tamaños (prueba explícita, 2026-06-10)

Se crearon 3 instancias de `Icon/done_all` (`1048:4`) con `rescale()` siguiendo
la receta exacta, se midieron las 3 capas internas y se verificó visualmente:

```
targetPx | INSTANCE  | Frame (inner) | vector (glyph) | fill bound
---------|-----------|---------------|----------------|------------------
  12px   |  12 × 12  |   12 × 12     |   11 × 6       | VariableID:15:12 ✓
  16px   |  16 × 16  |   16 × 16     |   14 × 7       | VariableID:15:12 ✓
  20px   |  20 × 20  |   20 × 20     |   18 × 9       | VariableID:15:12 ✓
```

**Conclusión verificada:**
- `rescale()` propaga a TODOS los hijos — INSTANCE + Frame interno + vector
  alcanzan exactamente el tamaño objetivo. `resize()` solo cambiaría el
  bounding box de la INSTANCE dejando Frame y vector en 24×24 nativo.
- El binding `color/foreground` sobrevive al rescale en los 3 casos.
- La estructura `COMPONENT > clip (clipsContent=true) > vector` NO causa
  el problema de escalado — el frame `clip` escala junto con todo. El problema
  de escalado siempre fue usar `resize()` en vez de `rescale()`.
- Receta mínima validada:

```js
const inst = master.createInstance();   // freshly created
inst.rescale(targetPx / 24);            // ONE call, BEFORE reparenting
parentFrame.appendChild(inst);          // reparent after rescale
// No resize(), no segundo rescale(), no mutaciones previas.
```

## Section-divider context card — "C O M P O N E N T S" page

Mirroring the "F O U N D A T I O N S" divider page in the foundations file, the
"C O M P O N E N T S" page (`53:756`) now carries a `Context` intro card
(`259:2`) explaining what this stage is. **Built by cloning, not recreating**:
the foundations card (`Context` = `162:11` on page `53:757`) has an elaborate
hand-built decorative background (`bg` GROUP — gradient ellipse + ~30 concentric
rings/scattered dots, all bound to brand-purple variables) that would be
wasteful and error-prone to rebuild from scratch. Recipe:

1. Switch to the **target** page first: `await figma.setCurrentPageAsync(componentsPage)`.
2. Fetch the source frame **cross-page** (no second page switch):
   `const sourceCtx = await figma.getNodeByIdAsync('162:11')`.
3. `const clone = sourceCtx.clone()` — `FrameNode.clone()` *"by default, the
   duplicate will be parented under `figma.currentPage`"* — confirmed this
   means the **target** page when source and target differ, landing the clone
   directly where you want it in a single script. No `appendChild` needed.
4. Re-point text via the canonical recipe (`getStyledTextSegments(['fontName'])`
   → dedupe → `loadFontAsync` per unique font → mutate): eyebrow
   (`"PROTEUS DS · STAGE 2 / 3"`), title (`"Components"`), description, and
   the 4 `StatsRow` number/label pairs (also renamed each `Stat/<old>` frame to
   `Stat/<new-label>` to keep the naming convention coherent).
5. Page background already matched the dark convention
   (`{r:0.122,g:0.122,b:0.122}`, same as Foundations) — no fix needed, but
   always check (`page.backgrounds[0]` vs. the reference page) since *"new
   pages default to Figma's light canvas"*.

Final copy — eyebrow `PROTEUS DS · STAGE 2 / 3`, title `Components`, description
*"La capa donde las foundations cobran forma de interfaz..."* (explains that
components are bound to semantic tokens, expose variants/properties, and lean on
the vector icon library — "lo que ves aquí es exactamente lo que tu código va a
renderizar"), stats `1 componente · 15 variantes · 7 properties · 35 íconos`
(real counts as of this pass — Button's full property set + the icon library).

**Generalizes**: any future divider/cover card that should match an existing
one's polish — clone the whole frame cross-page in one hop via `clone()` +
`getNodeByIdAsync`, then only touch the text layer. Don't rebuild decorative art.

## Language conventions (if the component carries visible copy)

Neutral Spanish, no voseo — "elige" not "elegís", "abre" not "abrí". Token names,
properties, and code stay in English; descriptions and UI copy in clear, modern,
neutral Spanish. Caught and fixed in Button v0.1.0: a "Ghost" → "Tertiary" naming
drift (the description still named the old variant after a rename) and an "Elegí"
voseo slip — copy that references variant names or uses verb conjugations needs a
final pass against the *actual built* variant names before validation.

### Header description — estructura obligatoria

La descripción del `header` de cada página de componente debe responder **primero**
la pregunta del diseñador ("¿cuándo lo uso?") y **después** explicar la estructura.
El patrón validado en Password Input y Phone Input (v0.8.0):

```
Úsalo [caso de uso principal — dónde y cuándo].
Extiende [componente base] con [diferenciadores concretos].
```

- **Incorrecto** — describe qué tiene el componente, no para qué sirve:
  *"Campo de contraseña con candado y toggle de visibilidad. Extiende la estructura
  del Input del DS con íconos lock y visibility integrados."*
- **Correcto** — caso de uso primero, diferenciador después:
  *"Úsalo en formularios de login, registro o cambio de contraseña — cualquier flujo
  donde el usuario deba ingresar una credencial confidencial. Extiende el Input base
  con un ícono lock fijo a la izquierda y un toggle de visibilidad a la derecha que
  alterna entre texto enmascarado (••••) y legible, sin necesidad de construir esa
  lógica fuera del DS."*

Si el componente no extiende uno existente, el segundo bloque describe su rol en el
sistema: *"Úsalo para [caso de uso]. Es el único componente del DS que [valor único]."*

## Open questions — status update (v0.5.0)

1. **Variant explosion — RESOLVED, pattern validated 4× since**: 2 axes
   (`Size×State`, `Style×State`) stays ≤15 and is now the default shape.
   `Style`(Inline/Box) emerged as a *reusable* second axis across Checkbox/
   Radio/Switch — propose it proactively for any future selectable control
   rather than waiting for the user to ask.
2. **`State` as a modeling axis — RESOLVED, it IS a variant axis**: every
   selection control (Input, Checkbox, Radio, Switch) models
   `State`(Default/Filled/Focus/Error/Disabled, trimmed per component) as
   part of the variant matrix, paired with `Style`. Foundations'
   Accessibility page remains the source of truth for the *focus-ring*
   visual spec that these `State=Focus` variants implement.
3. **Component-level knobs — still open, unchanged**: heights/paddings per
   size still ride on Primitive spacing/radius tokens; no dedicated
   `Component` collection exists. Still deferred to `proteus-code`.
4. **NEW — icon scaling, now closed**: see "Rescaling icon instances — the
   definitive recipe" above. Two distinct platform behaviors (INSTANCE_SWAP
   reset vs. safe fixed-instance rescale) are now fully disambiguated with a
   validated recipe for each — no longer an open question.
5. **NEW — stray debug nodes on canvas**: while iterating on Avatar's icon
   fix, three throwaway test instances (`createInstance()` parked at
   `x=2000/3000` for isolated testing) were left on the page after the
   script returned, surfaced only when the user noticed the swap picker
   showing a confusing extra "Avatar" entry. **Always `.remove()` temporary/
   probe instances in the SAME script that created them** — don't rely on a
   later cleanup pass; a `return` that "looks done" can still leave
   canvas litter that confuses the next person navigating the file.
