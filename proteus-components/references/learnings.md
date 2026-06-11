# Proteus Components — Learnings & registro histórico

Registro histórico del Stage 2: decisiones de diseño, bugs encontrados y
validaciones, componente por componente. Movido desde `SKILL.md` en v0.10.0
para mantener el skill operativo y compacto. **Las recetas definitivas viven
en `SKILL.md`** — este archivo es el "por qué" y el "cómo se llegó".

## Iconography — historial de migración (glifos de fuente → instancias vectoriales)

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

## Stage 2 — detalle histórico por componente (19 cerrados, 2026-06-08)

Los IDs entre paréntesis son IDs de **ComponentSet** (los IDs de página están en
el catálogo de SKILL.md). Separator y Tab fueron REEMPLAZADOS después del cierre
(ver las notas en cada entrada).

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


## Button — bug del tamaño de ícono por variante Size (historia completa)

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

> **Actualización 2026-06-11**: las stats de la tarjeta (`259:47`) se corrigieron a
> `52 componentes · 5 categorías · 37 íconos · 4 templates` (frames renombrados
> `Stat/componentes·categorías·íconos·templates`) — los conteos de la era Button
> v0.1.0 habían quedado congelados mientras el archivo crecía a 52 componentes.

**Generalizes**: any future divider/cover card that should match an existing
one's polish — clone the whole frame cross-page in one hop via `clone()` +
`getNodeByIdAsync`, then only touch the text layer. Don't rebuild decorative art.


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

## Auditoría de extensiones — v0.11.0 (2026-06-11)

Pasada combinada sobre las 35 páginas de extensión (lectura dirigida vía
`use_figma` con `page.loadAsync()` — sin `setCurrentPageAsync`, lo que permite
auditar 12 páginas por script en vez de una):

- **52 frames genéricos `Frame` renombrados** en 18 páginas según el template
  (`header` / `variants-section[-N]` / `demo-section[-N]`), clasificados por
  heurística: primer hijo del wrapper = header; label "Variants…" = variants;
  label "Demo…" = demo; con ComponentSet adentro = variants.
- **32 descripciones de header reescritas** al patrón obligatorio "Úsalo [caso
  de uso]. [Diferenciador/estructura]" — solo Password Input, Phone Input y
  Notification Center ya cumplían. Verificado con screenshot (Date Picker):
  el texto refluye bien, layout intacto.
- **Anchos de wrapper medidos** (pendiente de normalizar): 1200 (mayoría),
  1424 (Password/Phone), y outliers 641 (Notification Center), 776 (Divider),
  1099 (Chat), 1212 (Timeline), 1216 (Navbar), 1392 (Feature Card), 1400 (Form
  Field), 1480 (Empty State), 1608 (Textarea), 1624 (File Upload), 1648
  (Command Palette).
- La tabla operativa resultante (set IDs, ejes, properties de los 35) vive en
  SKILL.md → "Extensiones — ComponentSets, ejes y properties".

**Técnica nueva validada — `page.loadAsync()` para trabajo multi-página:**
carga el contenido de una página SIN cambiarla a current. Permite leer Y
MUTAR (renames, `characters` con fuente cargada) decenas de páginas en un
solo script, evitando la regla "un `setCurrentPageAsync` por invocación".
Validado en 3 scripts de lectura (35 páginas), 2 de renombrado (18 páginas)
y 4 de reescritura de texto (32 páginas) — 0 errores.

## Normalización de anchos de wrapper — v0.11.1 (2026-06-11)

31 wrappers en "clase 1200" (1200/1212/1216/1400px) redimensionados a 1424px
(decisión del usuario: normalizar solo esa clase, dejar los content-fitted).
Formales: Card (1216), Accordion, Popover, Dropdown Menu, Select, Table (1200).
Extensiones: los 25 restantes incl. Navbar (1216), Timeline (1212), Form Field (1400).

**Bug expuesto (preexistente) — frames colapsados por FILL-dentro-de-HUG:**
en Banner, `demo-col` (hijo de demo-section) era HUG de ancho con 5 instancias
FILL adentro → colapsado a 40px, con cada Banner envolviendo el texto a ~1800px
de alto (página de 7919px). En List Item, el frame `list` igual (48px, items de
600px de alto). Fix: `layoutSizingHorizontal='FILL'` en el frame colapsado →
Banner 74px de alto, items 344×66, wrappers a 1189/1163px. Un escaneo del mismo
patrón en las 52 páginas (FRAME width<60 con hijos FILL + TEXT width<40 con >8
chars) salió LIMPIO — eran los únicos dos casos.

**Las instancias que vivieron el colapso quedan con geometría interna CORRUPTA
— y `absoluteRenderBounds` MIENTE sobre ellas:** tras des-colapsar los frames,
4 de 5 banners (y los 6 list items) seguían renderizando el ícono líder cortado
en el borde izquierdo, fuera de su posición. Diagnóstico engañoso: la API
reportaba TODO correcto — `x=20`, `absoluteBoundingBox` y hasta
`absoluteRenderBounds` (x=188, dentro del banner) — pero el render real (tanto
`get_screenshot` como `node.screenshot()` in-app) mostraba el glifo ~30px fuera.
Ni el nudge de visibilidad ni `contentsOnly:true` lo arreglan. **Primera
hipótesis (equivocada): "screenshot del servidor desfasado" — descartada porque
`node.screenshot()` renderiza desde el archivo vivo y mostraba lo mismo.**

**Receta de reparación (la misma de Button: nunca parchear geometría corrupta):
recrear las instancias desde cero.** Por cada instancia rota: leer
`mainComponent` (preserva la variante) y `componentProperties` (filtrar las
`type==='VARIANT'`), `master.createInstance()` → `insertChild(idx, fresh)` →
`old.remove()` → `layoutSizingHorizontal='FILL'` → `setProperties(props)`.
Bonus: las instancias recreadas recuperaron subtítulos/descripciones que las
corruptas ni siquiera renderizaban.

**Gotcha de slots de ícono en List Item**: el slot líder se llama `icon`
(minúscula — `swapComponent` sobre él), el trailing se llama `Icon/chevron_right`.
Un `findOne(n => n.name.startsWith('Icon/'))` atrapa el CHEVRON, no el líder
(pasó: 5 chevrons swapeados por error, restaurados con `Icon/chevron_right` =
`208:82`). Los swaps de ícono NO son component properties en List Item — son
`swapComponent` directo sobre el sublayer, así que al recrear la instancia se
pierden y hay que re-aplicarlos (Cuenta=person, Notificaciones=notifications,
Privacidad=visibility, Apariencia=tune, Seguridad=lock).
