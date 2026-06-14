---
name: proteus-components
version: 0.15.0
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
│   ┌─┐┬─┐┌─┐┌┬┐┌─┐┬ ┬┌─┐                              │
│   ├─┘├┬┘│ │ │ ├┤ │ │└─┐                              │
│   ┴  ┴└─└─┘ ┴ └─┘└─┘└─┘                              │
│                                                       │
│              C O M P O N E N T S                      │
│                                                       │
│   Design System for ProteusDS  ·  Stage 2/3           │
│   Variant Sets · Properties · Pages         v 0.15.0  │
│                                                       │
╰───────────────────────────────────────────────────────╯
```

After printing the splash, proceed normally.

---

# Proteus Components

Second stage of the Proteus DS pipeline:

```
1. proteus-foundations  ✅ COMPLETE  → tokens, variables, styles, pages, Light/Dark
2. proteus-component    ⬅️ HERE      → component sets in Figma on top of foundations
3. proteus-code         (next)       → Figma → shadcn/ui → Storybook + docs
```

Figma file: **`Ohc3OVwwd3MwI4SvIdk3EY`** (Proteus DS).

## Skill files

- `SKILL.md` — este archivo (reglas operativas, recetas y gotchas activos)
- `config.json` — configuración del skill (figmaFileKey, version)
- `references/component-catalog.md` — IDs de páginas, ComponentSets, ejes, properties e icon map completo
- `references/button-recipes.md` — recetas de implementación de Button v0.1.0 (variable cache, INSTANCE_SWAP, icon slots)
- `references/token-contract.md` — authoritative token spec (naming, tiers, OKLCH, shadcn mapping)
- `references/learnings.md` — registro histórico: decisiones, bugs y validaciones por componente
- `tokens/` — copies of the token JSON files components bind against (`primitives.json`,
  `semantic.dark.json`, `semantic.light.json`, `typography.json`, `border.json`,
  `opacity.json`, `elevation.json`, `icon.json`, `motion.json`, `zindex.json`)
- `icons-svg/` + `icons-svg.json` — los 37 SVG fuente de la librería de íconos

## Component catalog — 54 componentes

→ IDs de página, ComponentSets, ejes y properties en **`references/component-catalog.md`**.

Cargar ese archivo cuando necesites el ID de una página específica o los ejes/properties de un ComponentSet.

## Version bump — checklist obligatorio

Cuando se sube la versión del skill (e.g. `0.11.0` → `0.12.0`), **todos los archivos
que referencian la versión deben actualizarse en el mismo commit**. No es válido
actualizar solo el SKILL.md.

**Archivos a actualizar para proteus-components:**

| Archivo | Qué actualizar | Ejemplo |
|---|---|---|
| `proteus-components/SKILL.md` | Frontmatter línea 3: `version: X.X.X` | `version: 0.12.0` |
| `proteus-components/SKILL.md` | Splash screen: `v X.X.X` al final de la línea de "Pages" | `v 0.12.0` |
| `proteus-components/config.json` | Campo `"version"` | `"version": "0.12.0"` |
| `README.md` (raíz del repo) | Línea `proteus-components/`: `skill vX.X.X` | `skill v0.12.0` |

**Archivos de recursos — sin versión embebida, pero deben ir en el mismo commit si cambiaron:**

| Archivo/Carpeta | Cuándo incluir en el commit |
|---|---|
| `tokens/*.json` | Si se agregaron o modificaron tokens de foundations |
| `references/token-contract.md` | Si cambió el contrato de tokens o el mapeo shadcn |
| `references/learnings.md` | Si se documentó historia nueva (componente cerrado, bug, validación) |
| `references/component-catalog.md` | Si se agregaron páginas, componentes, o cambió un ID |
| `icons-svg/` + `icons-svg.json` | Si se agregaron o eliminaron íconos de la librería |

Todos los cambios de una versión van en **un solo commit** — no commits parciales.

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
- 20 Text Styles (Inter + JetBrains Mono, incl. weight variants body/caption) + 5 Effect Styles (elevation).
- 9 presentation pages incl. Accessibility — all validated in Light/Dark + WCAG AA.

Brand: indigo `#5649B7`. Dark → `primary = brand.700`, `primary-hover = brand.600`,
`primary-pressed = brand.800`, `ring = brand.600`. Light shifts each one step up the ramp.

Known semantic variable IDs (skip re-discovery):
- `color/primary` = `VariableID:15:16`, `color/primary-foreground` = `VariableID:15:17`
- `color/ring` = `VariableID:15:29`, `color/background-secondary` = `VariableID:15:4`
- Rest follow `color/<name>` — discover via `figma.variables.getLocalVariablesAsync('COLOR')`.

## Foundations pages — paleta hardcoded y regla crítica

→ IDs de páginas de templates en **`references/component-catalog.md`** §Foundations pages.

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

## Icon library — vector components on the "Icons" page

A **76-icon** vector library exists on its own page (`Icons`, page id `207:2`, wrapper
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

→ Mapa completo de IDs en **`references/component-catalog.md`** §Icon ID map.

**Nota `circle` (fill1 — sólido):** a diferencia del resto del set (fill0/outline),
`circle` usa la variante rellena de Material Symbols para diferenciarse de
`radio_button_unchecked` (que también es un círculo outline). `circle` sólido es
útil para dots de estado, indicadores de presencia y badges puntuales.

**`INSTANCE_SWAP` is now unblocked** — Button's `icon` placeholder (a tinted frame,
flagged in v0.1.0 as "swap to `INSTANCE_SWAP` once an icon library exists") can be
upgraded to a real `INSTANCE_SWAP` component property defaulting to one of these 76
components, `preferredValues` scoped to the set.

**Historial de migración de Iconography** (reemplazo de los 4 demo spots de glifos
de ligadura por instancias vectoriales, corrección del copy obsoleto y resolución
del mismatch de font-family): ver `references/learnings.md`.

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
   component, build the wrapper FIRST (see `references/button-recipes.md`).
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

- El `wrapper` estándar mide **1424px** de ancho. Normalizado el 2026-06-11: los
  31 wrappers que estaban en la "clase 1200" (1200–1400px) se redimensionaron a
  1424 con la receta de orden correcta (`counterAxisSizingMode='FIXED'` →
  `resize(1424, h)` → `primaryAxisSizingMode='AUTO'`). Los wrappers ajustados al
  contenido se dejaron intactos a propósito (Button 595, Alert 600, Label 633,
  Badge 656, Radio 689, Avatar 697, Checkbox 700, Switch 736, Tooltip 945,
  Notification Center 641, Divider 776, Chat 1099, Feature Card 1392, Empty
  State 1480, Textarea 1608, File Upload 1624, Command Palette 1648, Dialog 1688).
  Para una página nueva: 1424, salvo que el contenido pida otra cosa.
- **Gotcha del relayout post-resize**: al ensanchar un wrapper, cualquier frame
  interno en estado degenerado "hijos FILL dentro de padre HUG" colapsa a su
  ancho mínimo (~40px) y el texto envuelto dispara la altura (pasó en Banner:
  demo-col a 40px × 7110px de alto; y en List Item: list a 48px). El fix es
  poner `layoutSizingHorizontal='FILL'` en el frame colapsado, no tocar a los
  hijos. Detector validado: buscar `FRAME`s con `width < 60` que tengan hijos
  con `layoutSizingHorizontal === 'FILL'`. **Y después del fix, verificar las
  instancias que vivieron el colapso**: pueden quedar con geometría interna
  corrupta donde `absoluteRenderBounds` reporta posiciones correctas que el
  render real NO respeta — la única reparación es recrearlas
  (`createInstance` + `setProperties` + re-aplicar swaps de íconos), ver la
  receta completa en `references/learnings.md` § Normalización de anchos.
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

## Progress — Stage 2 cerrado (19/19 formales + extensiones, 52 páginas)

**Approved build order** (5 groups, ~19 components total incl. Button):
1. Label, Separator, Badge — ✅ **CERRADO** (3/3)
2. Input, Checkbox, Radio, Switch — ✅ **CERRADO** (4/4)
3. Card, Avatar, Alert — ✅ **CERRADO** (3/3) — Alert aprobado última, cierra el grupo
4. Tabs, Accordion, Tooltip — ✅ **CERRADO** (3/3) — Tooltip aprobado última, cierra el grupo
5. Popover, Dropdown Menu, Select, Dialog/Drawer, Table — ✅ **CERRADO** (5/5) — Table aprobado última, cierra el grupo y Stage 2

**19 componentes cerrados (Button + 18)** — Stage 2 COMPLETO. **El detalle
histórico por componente (decisiones, ejes, properties, bugs y demos) vive en
`references/learnings.md`.**

> **Nota sobre IDs (2026-06-11)**: los IDs entre paréntesis en las entradas de
> learnings.md son **IDs de ComponentSet** — NO IDs de página. Ver tabla
> autoritativa en `references/component-catalog.md`.

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
- **Instancias temporales/de prueba**: siempre `.remove()` en el MISMO script que
  las creó — los nodos de debug olvidados en el canvas confunden el swap picker y
  a la próxima persona que navegue el archivo (pasó en Avatar; ver learnings.md).

## Learnings from Implementation — Button v0.1.0

→ Recetas detalladas en **`references/button-recipes.md`**: variable-resolution cache,
page wrapper, icon tinting, Show Icon Left/Right, INSTANCE_SWAP wiring.

Consultarlas cuando se añadan component properties, se implemente un nuevo icon slot,
o se debuggee rendering de tokens tras un bulk clone + `combineAsVariants`.

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
create→rescale-once→reparent order; historia completa del bug en
`references/learnings.md`).

**Validación explícita de la receta** (`Icon/done_all` a 12/16/20px con
mediciones de las 3 capas internas, 2026-06-10): ver `references/learnings.md`.

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

## Auditoría de token-binding — resultado (2026-06-14)

Realizada sobre las 52 páginas de componentes + 5 templates del mismo archivo Figma.
Metodología: filtrar texto **standalone** (sin ancestro `INSTANCE`) y verificar `textStyleId`.
Los textos dentro de instancias heredan el estilo del maestro — son falsos positivos en auditoría directa.

**Resultado:**
- **Fills**: ✅ 100% bound en todas las páginas.
- **Radius**: ✅ OK — los "unbound" en templates son instancias (herencia correcta del maestro).
- **Text styles**: ❌ → ✅ **331 nodos** corregidos en 25 páginas de componentes + 4 templates.

**Patrón del problema**: textos standalone de presentación (etiquetas de eje "Small"/"Medium",
títulos de sección "Variants ·", demo labels "Demo — X") y contenido de componentes como
`"••••••••"` en PasswordInput no tenían `textStyleId`.

**Mapping size → style aplicado:**
```
fs ≤ 12 → text/label/sm     |  fs:13 → text/body/sm/regular  |  fs:14 → text/label/md
fs:15   → text/body/sm/medium |  fs:16 → text/body/md/regular  |  fs:18 → text/heading/sm
fs:22-25 → text/heading/lg   |  fs:26-33 → text/heading/xl    |  fs ≥ 34 → text/display
```
Para contenido de componentes (PasswordInput/PhoneInput): `fs:12 → caption/regular`,
`fs:14 → body/sm/regular`, `fs:16 → body/md/regular`, `fs:18 → body/lg/regular`.

**Auth template**: 3 frames standalone sin binding de radio → corregido con
`radius/xl` (16px), `radius/base` (10px), `radius/md` (8px).

**Regla para componentes futuros**: aplicar `textStyleId` a TODOS los textos
standalone antes de cerrar el componente — etiquetas de eje, demo labels, y
cualquier texto que no sea hijo de una INSTANCE.

---

## Componentes actualizados (2026-06-14)

### Dialog — variante con slot de contenido

El componente `Dialog` pasó de COMPONENT único a **ComponentSet** con eje `Type`:

| Variante | ID | Tamaño | Uso |
|---|---|---|---|
| `Type=Default` | `640:10` | 480×213 | Confirmaciones, alertas, formularios cortos |
| `Type=Illustration` | `1415:29` | 480×353 | Estados vacíos, errores, onboarding |

**Estructura de `Type=Illustration`:**
```
Dialog (COMPONENT_SET id:1415:88, Type=Default|Illustration)
  ├─ Type=Default     (COMPONENT id:640:10,  VERTICAL AUTO, r:12) — 480×213
  └─ Type=Illustration (COMPONENT id:1415:29, VERTICAL AUTO, r:12) — 480×353
       ├─ header          FRAME 480×64   (title TEXT + close-btn)
       ├─ divider         RECT  480×1
       ├─ "Empty State"   SLOT  480×220  VERTICAL AUTO   ← slot nativo Figma (id:1415:35)
       ├─ divider-footer  RECT  480×1
       └─ footer          FRAME 480×67   (2 Button instances)
```

El nodo `SLOT` es el mecanismo nativo de Figma para contenido intercambiable: en el master está vacío; cada instancia lo rellena con la ilustración + textos que correspondan. No usa INSTANCE_SWAP ni component properties — el diseñador arrastra contenido directamente al slot.

**Patrón de uso en templates (plugin API):**
```js
// 1. Crear instancia de Type=Illustration
const inst = figma.getNodeById("1415:29").createInstance();
panel.appendChild(inst);
inst.x = centerX; inst.y = centerY;

// 2. Rellenar el slot con contenido (buscar por nombre dentro de la instancia)
//    El slot acepta cualquier nodo hijo que el diseñador coloque
//    — ilustración, título, descripción, botones extra, etc.
```

**Template Empty·Error** (page `1086:6`) — estado final tras edición manual:

| Panel | Header (override) | Slot: ilustración | Slot: título | Footer |
|---|---|---|---|---|
| 404 Error | "Página no encontrada" | `Illustration/searching` | "Sin resultados" | "Limpiar filtros" |
| Empty State | "Todavía no hay proyectos" | `Illustration/searching` | "Sin resultados" | "Ver tutorial" · "+ Crear proyecto" |

Ambas tarjetas usan `Dialog/Type=Illustration` instanciado con contenido en el slot.

---

### Bottom Sheet — panel deslizable desde el fondo (v0.2.0)

Componente overlay móvil con eje `Type` (Text / Slot). Sin eje de tamaño — el body crece con el contenido; el diseñador es responsable de no superar el 80 % del viewport móvil (~675 px en iPhone 14, 844 px total).

| Variante | ComponentSet ID | Página ID | Tamaño | Uso típico |
|---|---|---|---|---|
| `Type=Text` | `1434:156` | `1433:2` | 480×256 (AUTO) | Confirmaciones, info contextual con texto |
| `Type=Slot` | `1434:156` | `1433:2` | 480×373 (body 220px fijo) | Empty states, ilustraciones, contenido rich |

**Estructura:**
```
BottomSheet (COMPONENT_SET id:1434:156, Type=Text|Slot)
  — primaryAxisSizingMode=AUTO  r: topLeft=20 topRight=20 bottom=0
  — fill = color/card  clipsContent = true

  ├─ handle-area  FRAME 480×28  HORIZONTAL CENTER  fill=transparent  [FIXED]
  │    └─ handle  RECT 40×4  r:2  fill=color/border
  ├─ header  FRAME 480×56  HORIZONTAL SPACE_BETWEEN  padding:8/16/16/20  [FIXED]
  │    ├─ title   TEXT 14px label/md color/foreground
  │    └─ close-btn  FRAME HUG (Icon/close instance 24×24)
  ├─ divider  RECT 480×1  fill=color/border  [FIXED]
  │
  ├─ [Type=Text] body  FRAME VERTICAL  AUTO  padding:20/24/20/24  gap:12  [HUG]
  │    └─ description  TEXT 13px body/sm/regular color/foreground-muted  FILL-width
  │
  ├─ [Type=Slot] "Empty State"  FRAME 480×220  VERTICAL FIXED  [FIXED]
  │    → placeholder a convertir a SLOT nativo en Figma UI (igual que Dialog)
  │    node id: 1434:137
  │
  ├─ divider-footer  RECT 480×1  fill=color/border  [FIXED]
  └─ footer  FRAME 480×67  HORIZONTAL MAX  padding:16/20/16/20  gap:8  [FIXED]
       ├─ Button Outline  (mainComp 176:20 — Cancel)
       └─ Button Primary  (mainComp 175:2  — Confirm)
```

**Component properties (cableadas):**

| Property | Key | Tipo | Nodo wired |
|---|---|---|---|
| Title | `Title#1434:0` | TEXT | `header > title` (characters) |
| Show Handle | `Show Handle#1434:3` | BOOLEAN | `handle-area` (visible) |
| Show Footer | `Show Footer#1434:6` | BOOLEAN | `footer` + `divider-footer` (visible) |

**Notas de construcción:**
- Componente VERTICAL `primaryAxisSizingMode='AUTO'` — el body en Type=Text usa `layoutSizingVertical='HUG'` (válido porque body es un frame de auto-layout). El footer y header son `layoutSizingVertical='FIXED'`.
- Type=Slot: el frame "Empty State" (`1434:137`) debe convertirse a SLOT nativo en Figma UI (mismo patrón que `Dialog/Type=Illustration` — el usuario lo hizo manualmente).
- Radios por esquina: `topLeftRadius = topRightRadius = 20`, `bottomLeft = bottomRight = 0`.
- Wrapper de página: estándar 1424px (2 variantes de 480px caben con holgura).

---

## Registro histórico

El detalle cronológico completo del Stage 2 — decisiones por componente, bugs de
plataforma con su diagnóstico, validaciones explícitas, la tarjeta de contexto de
la página divisora y las open questions resueltas — vive en
`references/learnings.md`. Consultarlo cuando se necesite el "por qué" detrás de
una regla de este archivo; las reglas mismas viven aquí.
