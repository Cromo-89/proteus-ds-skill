# Page Architectures & Implementation Patterns

Diagramas de estructura y patrones de código para cada página de presentación de Proteus DS.
Cargar esta referencia cuando se necesite construir o modificar una página específica.

---

## Color page (`23:2`)

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

Token groups: Background & Surfaces (7) · Foreground & Text (6) · Brand & Interactive (10) · Borders & Focus (4) · Status (13)

---

## Typography page (`30:2`)

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
└── Section/FontFamilies  (vertical AL, gap=space/6)
    ├── Title          text/heading/md
    └── FamilyCards    (horizontal AL, gap=space/4)
        └── Card/[family] × 2  (vertical AL, padding=space/6, radius=radius/base)
            ├── family name   text/heading/sm   color/foreground
            ├── token + role  text/caption      color/foreground-muted
            └── pangram/sample  raw fontName    color/foreground
```

**Text style lookup pattern:**
```javascript
const T = {};
for (const s of figma.getLocalTextStyles()) T[s.name] = s.id;
// Usage: node.textStyleId = T['text/heading/xl'];
```

Set `textStyleId` on the node — this overrides family, size, weight, line-height, and letter-spacing in one call. Never manually set `fontName`/`fontSize` on a node bound to a style.

**Font loading for JetBrains Mono:**
```javascript
await figma.loadFontAsync({ family: "JetBrains Mono", style: "Regular" });
```
For raw text bypassing a text style (e.g. pangrams), set `node.fontName = { family: "JetBrains Mono", style: "Regular" }` and `fontSize`/`lineHeight` manually.

---

## Spacing page (`32:2`)

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
└── Section/Usage  (vertical AL, gap=space/6)
    ├── title + desc
    └── UsageGrid  (horizontal AL, WRAP, gap=space/4)
        └── UsageCard × 11  (vertical AL, 520px FIXED, padding=space/4, radius=radius/md)
            ├── token label  text/label/md  color/primary
            └── usage desc   text/body/sm   color/foreground-muted
```

**Variable-bound bar width pattern:**
```javascript
bar.resize(px, 24);                         // set initial size (from token value)
barZone.appendChild(bar);                   // append first
bar.layoutSizingHorizontal = 'FIXED';
bar.layoutSizingVertical = 'FIXED';
bar.setBoundVariable('width', V[tokenName]); // then bind
```
For `space/0` (0px), skip binding — show a "—" text node instead.

**WRAP layout for usage cards:**
```javascript
grid.layoutWrap = 'WRAP';
grid.counterAxisSpacing = 16;
bindDim(grid, 'itemSpacing', 'space/4');
```

---

## Radius + Border page (`33:2`)

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

**Stroke color and width binding:**
```javascript
node.strokes = [figma.variables.setBoundVariableForPaint(
  { type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', V['color/border']
)];
node.strokeWeight = 1;
node.strokeAlign = 'INSIDE';
node.setBoundVariable('strokeWeight', V['borderWidth/thin']);
```

Use `color/ring` (brand indigo) for focus ring stroke — not `color/border`.

**Corner radius binding — cuatro lados por separado:**
```javascript
node.setBoundVariable('topLeftRadius', V['radius/base']);
node.setBoundVariable('topRightRadius', V['radius/base']);
node.setBoundVariable('bottomLeftRadius', V['radius/base']);
node.setBoundVariable('bottomRightRadius', V['radius/base']);
```
`node.setBoundVariable('cornerRadius', ...)` solo no tiene efecto cuando `node.cornerRadius` es `figma.mixed`.

**`focusRing/offset`** — controla el gap entre el elemento y su ring; se implementa en código (CSS `outline-offset`) y no tiene binding en Figma. Mostrar como fila de documentación con texto descriptivo.

**`radius/full` (9999px)** — Figma clampa visualmente a `min(width, height) / 2`, produciendo la pill shape correcta. El binding almacena 9999 — el output de código y la referencia del token son correctos. Sin workaround necesario.

---

## Elevation page (`35:2`)

```
Page/Elevation  (vertical AL, fill=color/background, padding=space/12, gap=space/10)
├── Header
├── Divider
├── Section/Elevation  (vertical AL, gap=space/10)
│   ├── SectionHeader
│   └── ElevationShowcase  (horizontal AL, FILL, paddingBottom=96px for shadow room)
│       └── ElevationCol/[step] × 5  (vertical AL, FILL, gap=space/5, centerX)
│           ├── SurfaceZone  (vertical AL, FILL, paddingBottom=56px)
│           │   └── Specimen — rect 160×100
│           │       fill=color/surface-elevated, effectStyleId=E[tokenName]
│           │       radius bound to radius/base
│           │       [none only: thin hairline stroke color/border]
│           └── Info  (vertical AL, gap=space/1, centerX)
│               ├── token name  text/label/md  color/foreground  CENTER
│               └── spec        text/caption   color/foreground-muted  CENTER
└── Section/Usage  (vertical AL, gap=space/6) — tabla: token | spec | aplicación típica
```

**Applying effect styles:**
```javascript
const E = {};
for (const s of figma.getLocalEffectStyles()) E[s.name] = s.id;
surface.effectStyleId = E['elevation/md'];
```

**Shadow breathing room:** Shadows extend beyond node bounds. For elevation/xl (16px offsetY + 48px blur ≈ 64px extent), add `paddingBottom = 56` to the surface zone container and `paddingBottom = 96` to the showcase row.

**Dark shadows on dark backgrounds — doc showcase trick:**
```javascript
// Stage background: neutral/600 equiv. — sRGB ≈ 0.344
showcase.fills = [{ type: 'SOLID', color: { r: 0.344, g: 0.344, b: 0.344 } }];
// Card surfaces: neutral/500 equiv. — sRGB ≈ 0.445 (must be lighter than stage)
surface.fills = [{ type: 'SOLID', color: { r: 0.445, g: 0.445, b: 0.445 } }];
```
Add disclaimer: "El escenario usa un gris medio (neutral/600) para que las sombras sean legibles en docs."

**`elevation/none` needs visible indicator:** Add a thin hairline stroke (`color/border`) for this level only:
```javascript
if (step === 'none') {
  surface.strokes = [figma.variables.setBoundVariableForPaint(
    { type: 'SOLID', color: {r:0,g:0,b:0} }, 'color', V['color/border']
  )];
  surface.strokeWeight = 1;
  surface.strokeAlign = 'INSIDE';
}
```

**Uniform card heights:**
```javascript
for (const col of sizeShowcase.children) {
  col.layoutSizingVertical = 'FIXED';
  col.resize(col.width, 176);           // fixed height = tallest card
  col.primaryAxisAlignItems = 'CENTER';
}
```

---

## Iconography page (`40:2`)

```
Page/Iconography  (vertical AL, fill=color/background, padding=space/12, gap=space/10)
├── Header
├── InstallNote  (horizontal AL, fill=color/warning-wash, padding=space/4, radius=radius/md)
│   ├── warning icon  color/warning-fg
│   └── install instructions  text/body/sm  color/warning-fg
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
│       └── ColorChip/[token] × 7  (horizontal AL, 520px FIXED, padding=space/4, center-Y)
│           ├── icon  settings 24px  [colorToken]
│           └── Info  (vertical AL, gap=space/1)
│               ├── token name  text/label/md
│               └── usage  text/caption  color/foreground-muted
└── Section/CommonIcons  (vertical AL, gap=space/6)
    ├── title + desc
    └── IconGrid  (horizontal AL, WRAP, gap=space/2)
        └── Icon/[name] × 34  (vertical AL, 88px FIXED, padding=space/4+space/3, radius=radius/md)
            fill=color/surface-elevated, center-aligned
            ├── icon  [name] 24px  color/foreground
            └── name label  text/caption  color/foreground-muted  CENTER
```

**Icon semantic colors (7 tokens):** color/foreground, color/foreground-muted, color/primary, color/success-fg, color/warning-fg, color/destructive-fg, color/info-fg.

**Material Icons font — ligature rendering:**
```javascript
await figma.loadFontAsync({ family: "Material Icons", style: "Regular" });
const icon = figma.createText();
icon.fontName = { family: 'Material Icons', style: 'Regular' };
icon.fontSize = 24;
icon.characters = 'search'; // ligature name renders the icon
```
Do NOT use `textStyleId` on icon nodes — it overrides the font family, breaking the ligature.

**Material Symbols Rounded vs Material Icons:** Symbols Rounded (new version) is NOT installed in Figma by default. Install via "Google Fonts" plugin. Until installed, use Material Icons (Regular) as visual proxy. Always add an `InstallNote` warning card so designers know to install it.

---

## Motion · Opacity · Z-index page (`49:2`)

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
└── Section/ZIndex  (vertical AL, gap=space/6)
    ├── title + desc
    ├── ColHeader + Divider
    └── ZIndexList  (vertical AL, gap=0)
        └── [RowDivider + Row/[token]] × 8
            ├── token name  JetBrains Mono  220px FIXED  color/foreground
            ├── value       text/label/md   100px FIXED  color/primary
            └── component   text/body/sm    FILL          color/foreground-muted
```

**Opacity visualization pattern:**
```javascript
const sample = figma.createAutoLayout('HORIZONTAL');
bindColor(sample, 'color/background');
const overlay = figma.createRectangle();
bindColor(overlay, 'color/primary');
overlay.opacity = 0.08; // token value
sample.appendChild(overlay);
overlay.layoutSizingHorizontal = 'FILL';
overlay.layoutSizingVertical = 'FIXED';
```

---

## Grid & Breakpoints page (`1077:2`)

```
Page/Grid  (vertical AL, fill=color/background, padding=space/12, gap=space/10)
├── Header  (breadcrumb "Foundations · Grid & Breakpoints" + title + desc + version)
├── Breakpoints · Referencia  (section label)
│   └── BreakpointCards  (horizontal AL, gap=space/4)
│       └── Card/[bp] × 3  (vertical AL, FILL, padding=space/8)
│           ├── icon + bp name  (horizontal AL, gap=space/2)
│           ├── width display  text/heading/xl  color/primary
│           ├── range text     text/caption     color/foreground-muted
│           ├── Divider
│           ├── "Columnas" + bold value  color/foreground
│           ├── "Margen" + bold value    color/foreground
│           └── "Gutter" + bold value   color/foreground
└── Grid · Visualización de columnas  (section label)
    └── ColumnViz  (vertical AL, gap=space/6)
        └── [Mobile 375px | Tablet 768px | Desktop 1280px] column grids
```

**Breakpoint spec** (verificada en Figma 2026-06-14):

| Breakpoint | Viewport | Columnas | Margen | Gutter |
|---|---|---|---|---|
| Mobile | < 640px (ref: 375px) | 4 | 16px | 16px |
| Tablet | 640–1023px (ref: 768px) | 8 | 24px | 24px |
| Desktop | ≥ 1024px (ref: 1280px) | 12 | 32px | 24px |

---

## Accessibility page (`102:2`)

```
Page/Accessibility  (vertical AL, fill=color/background, padding=space/12, gap=space/10)
├── Header  (breadcrumb "Foundations · Accesibilidad" + title + desc)
├── Section/Contrast  (vertical AL, gap=space/6)
│   ├── title + desc (WCAG AA: 4.5:1 body text, 3:1 large/UI elements)
│   └── ContrastTable  (vertical AL, gap=0)
│       └── [Row/[pair]] × 7  (token pair | contrast dark · light | recommended use)
├── Section/FocusVisible  (vertical AL, gap=space/6)
│   ├── title + desc
│   └── FocusDemo  (horizontal AL, gap=space/4)
│       └── [Button normal | Button con foco]
├── Section/TouchArea  (vertical AL, gap=space/6)
│   ├── title + desc (mínimo 44×44px, lograr con padding o impact area invisible)
│   └── TouchDemo  (20px icon inside 44×44 area visual)
├── Section/ColorMeaning  (vertical AL, gap=space/6)
│   ├── title + desc (estados siempre con icono + label, no solo color)
│   └── ColorBadges  (horizontal AL) → [Éxito | Advertencia | Error | Información]
└── Section/ReducedMotion  (vertical AL, gap=space/6)
    ├── title + desc
    └── RuleCards  (horizontal AL, gap=space/4)
        ├── Card/prefers-reduced-motion  → duración ≈ 0, decorativo se detiene
        └── Card/icon.grade  → grade −25 dark (oscuro sobre claro), 0 en light
```

**Contraste verificado (WCAG AA) — ratios medidos en Figma 2026-06-14:**

| Par de tokens | Contraste oscuro | Contraste claro | Uso recomendado |
|---|---|---|---|
| foreground / background | 17.8:1 | 17.8:1 | Texto de cuerpo, cualquier tamaño |
| foreground-muted / background | 7.5:1 | 3.9:1 | Texto secundario; en claro evitar para texto pequeño |
| primary-foreground / primary | 6.4:1 | 9.3:1 | Texto e íconos sobre superficies primary |
| success-fg / success-wash | 3.9:1 | 3.0:1 | Status sobre wash; en claro, solo texto grande/íconos |
| warning-fg / warning-wash | 7.3:1 | 6.1:1 | Status warning — ambos modos |
| destructive-fg / destructive-wash | 8.7:1 | 4.3:1 | Status destructivo; en claro, solo texto grande |
| info-fg / info-wash | 7.5:1 | 4.0:1 | Status info; en claro, solo texto grande |

**Reglas de accesibilidad del sistema:**
- Focus ring: `color/ring`, grosor `focusRing/width` (2px), separación `focusRing/offset` (2px) — nunca suprimir outline
- Área táctil mínima: **44×44px** — lograr con padding o invisible hit area; nunca agrandar el ícono solo para cumplir
- Color no es la única señal: estados (éxito/error/warning/info) siempre con ícono + etiqueta de texto explícita
- `prefers-reduced-motion`: con tokens de duration/easing, la duración colapsa a casi 0 — movimiento decorativo se detiene; cambios de estado esenciales se mantienen
- `icon.grade`: Material Symbols grade **−25** por defecto (oscuro sobre claro) en dark mode; **0** en light mode (claro sobre oscuro)

---

## Utility patterns

### `appendFill` helper — guard contra resize con string width

```javascript
function app(parent, node, w, h) {
  parent.appendChild(node);
  if (typeof w === 'number') { node.resize(w, 10); node.layoutSizingHorizontal = 'FIXED'; }
  else node.layoutSizingHorizontal = w; // 'FILL' o 'HUG'
  node.layoutSizingVertical = h || 'HUG';
}
```
`node.resize('FILL', 10)` tira "Expected number, received string".

### Uniform card heights in horizontal AL rows

```javascript
for (const col of showcase.children) {
  col.layoutSizingVertical = 'FIXED';
  col.resize(col.width, 176);           // fixed height = tallest card's natural height
  col.primaryAxisAlignItems = 'CENTER'; // content centers vertically
}
```
Para WRAP grids con labels que pueden hacer wrap, calcular height que ajuste el peor caso (label más largo).
