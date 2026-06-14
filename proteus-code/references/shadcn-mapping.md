# Shadcn/ui Mapping — Proteus DS

Para cada uno de los 54 componentes de Proteus, este archivo documenta:
- El primitivo de shadcn/ui que sirve de base (o "custom" si no existe)
- El comando de instalación
- Extensiones Proteus necesarias (variantes, props, estructura)

---

## Criterios de mapeo

1. **Usa shadcn si existe**: shadcn ya resuelve el accessibility layer (Radix UI) — no reimplementar.
2. **Extiende, no reemplaza**: modificar las variantes CVA del archivo generado por shadcn.
3. **Custom si no existe en shadcn**: construir desde cero sobre Radix (o HTML nativo) siguiendo el mismo patrón CVA.

---

## Tabla completa de mapeo (54 componentes)

| Proteus | shadcn/ui base | Comando | Extensiones Proteus |
|---|---|---|---|
| **Accordion** | `accordion` | `add accordion` | — |
| **Alert** | `alert` | `add alert` | Variantes: info/success/warning/error. Íconos por status. |
| **Avatar** | `avatar` | `add avatar` | Size SM/MD/LG. Fallback con initials. |
| **Avatar Group** | custom | — | Stack de Avatar con overlap, contador "+N" |
| **Badge** | `badge` | `add badge` | Variantes: default/secondary/outline/destructive/success/warning/info |
| **Banner** | custom | — | Basado en Alert pero full-width, show/hide description y close |
| **Bottom Sheet** | `sheet` | `add sheet` | `side="bottom"`, radios top=xl bottom=0, handle pill, body scroll |
| **Breadcrumb** | `breadcrumb` | `add breadcrumb` | — |
| **Button** | `button` | `add button` | Variantes: primary/secondary/outline/ghost/destructive. Icon slots left/right. |
| **Card** | `card` | `add card` | — |
| **Chat Message** | custom | — | Bubble con tipo received/sent/system, avatar, timestamp |
| **Checkbox** | `checkbox` | `add checkbox` | Tamaños SM/MD/LG. Label inline. |
| **Chip** | custom | — | Tipo filter (toggleable) / action. Estados hover/active/disabled. |
| **Command Palette** | `command` | `add command` | — |
| **Context Menu** | `context-menu` | `add context-menu` | Ítems: default/danger/disabled/separator/submenu |
| **Date Picker** | `calendar` + `popover` | `add calendar popover` | DatePicker compuesto (calendario + input trigger) |
| **Dialog** | `dialog` | `add dialog` | Variante Type=Illustration con slot de contenido |
| **Divider** | `separator` | `add separator` | Orientación H/V. Estilos: solid/dashed/dotted/text |
| **Drawer** | `drawer` | `add drawer` | Side drawer (usa vaul bajo el capó en shadcn) |
| **Dropdown Menu** | `dropdown-menu` | `add dropdown-menu` | — |
| **Empty State** | custom | — | Icon (swap) + Title + Description + CTA opcional |
| **Feature Card** | custom | — | Card con color de acento (purple/green/blue/orange/red) |
| **File Upload** | custom | — | Dropzone + lista de archivos. Estados: default/hover/filled. |
| **Form Field** | `form` | `add form` | Wrapper (react-hook-form). Label + input + error + hint. |
| **Input** | `input` | `add input` | States: default/focus/filled/error/disabled. Left/right icon slots. |
| **Kbd** | custom | — | `<kbd>` estilizado, tamaños SM/MD/LG |
| **Label** | `label` | `add label` | — |
| **List Item** | custom | — | States ×4. Slots: title/subtitle/chevron/avatar |
| **Navbar** | custom | — | Desktop/Mobile/Mobile-Open. Logo + nav links + actions |
| **Notification Center** | `sheet` + custom | `add sheet` | Panel lateral con lista de notificaciones Unread/Read |
| **Number Input** | custom | — | Input + botones +/- (Radix Number Field o custom) |
| **OTP Input** | `input-otp` | `add input-otp` | — |
| **Pagination** | `pagination` | `add pagination` | Ítems: page/ellipsis/prev/next. States ×3. |
| **Password Input** | custom | — | Input + toggle show/hide. Sizes ×3 × States ×5. |
| **Phone Input** | custom | — | Select de código de país + Input. Sizes ×3 × States ×5. |
| **Popover** | `popover` | `add popover` | — |
| **Progress** | `progress` | `add progress` | Sizes SM/MD/LG. Status: default/success/warning/error |
| **Progress Bar** | `progress` | `add progress` | Variante lineal, value prop, animación |
| **Radio** | `radio-group` | `add radio-group` | Tamaños SM/MD/LG. Inline label. |
| **Rating** | custom | — | Stars full/half/empty. ReadOnly + interactivo. |
| **Search** | custom | — | Input con ícono lupa, clear button, states ×4 |
| **Select** | `select` | `add select` | — |
| **Sidebar** | custom | — | Link/Section/Separator/Submenu ítems. Expanded/Collapsed. |
| **Skeleton** | `skeleton` | `add skeleton` | Shapes: text/block/circle/rectangle/button |
| **Slider** | `slider` | `add slider` | States ×3. Value label opcional. |
| **Stat Card** | custom | — | Metric + value + period + trend (neutral/positive/negative) |
| **Stepper** | custom | — | Steps: pending/active/completed. Número + label. |
| **Switch** | `switch` | `add switch` | — |
| **Table** | `table` | `add table` | Celdas con border bottom. Header sticky opcional. |
| **Tabs** | `tabs` | `add tabs` | Tipos: Pill/Underline. States ×4. |
| **Tag** | `badge` | `add badge` | Alias de Badge — misma base, naming alternativo para tags |
| **Textarea** | `textarea` | `add textarea` | States ×5. Placeholder + helper text. |
| **Timeline** | custom | — | Ítems: pending/active/completed/error |
| **Toast** | `sonner` | `add sonner` | Status: default/info/success/warning/error. Title + description. |
| **Toggle Group** | `toggle-group` | `add toggle-group` | Content: text/icon/both. States ×4. |
| **Tooltip** | `tooltip` | `add tooltip` | — |
| **Segmented Control** | `toggle-group` | `add toggle-group` | Variante pill, selección exclusiva |

---

## Componentes sin base en shadcn — implementación custom

Para estos, la estructura base es:

```tsx
// Patrón base para custom (sin shadcn):
// 1. Radix UI si existe un primitivo adecuado (ej. ToggleGroup para Segmented Control)
// 2. HTML nativo con aria si no (ej. Feature Card → <article>)
// 3. CVA para variantes — misma estructura que los shadcn
// 4. forwardRef siempre

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const componentVariants = cva("...", {
  variants: { ... },
  defaultVariants: { ... },
})

export interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {}

export const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, ...props }, ref) => (
    <element ref={ref} className={cn(componentVariants({ ... }), className)} {...props} />
  )
)
Component.displayName = "Component"
```

---

## Orden de implementación recomendado

Empezar por los componentes más simples y con mayor uso transversal:

**Fase 1 — Átomos** (shadcn ya los tiene, extensión mínima):
Button · Badge/Tag · Input · Label · Checkbox · Radio · Switch · Textarea · Separator/Divider · Skeleton · Tooltip · Avatar

**Fase 2 — Moléculas** (shadcn base + extensión media):
Alert · Card · Select · Slider · Tabs · Accordion · Popover · Dropdown Menu · Form Field · Pagination · Progress/Progress Bar · Table · Breadcrumb

**Fase 3 — Organismos** (shadcn base + extensión mayor o custom):
Dialog · Drawer · Bottom Sheet · Toast · Command Palette · Context Menu · Notification Center · Navbar · Sidebar · Date Picker

**Fase 4 — Patrones** (100% custom):
Empty State · Feature Card · Stat Card · Chat Message · Timeline · Avatar Group · Stepper · List Item · Rating · File Upload · OTP Input · Password Input · Phone Input · Number Input · Search · Chip · Toggle Group · Segmented Control · Banner · Kbd

---

## Setup inicial (nuevo proyecto)

```bash
# 1. Crear proyecto Next.js
pnpm create next-app@latest proteus-ds-web --typescript --tailwind --app --src-dir=false

# 2. Inicializar shadcn/ui
pnpm dlx shadcn@latest init
# → style: default
# → base color: neutral
# → CSS variables: yes

# 3. Instalar dependencias extras
pnpm add class-variance-authority tailwind-merge clsx lucide-react

# 4. Instalar todos los primitivos shadcn de una vez (Fase 1 + 2)
pnpm dlx shadcn@latest add accordion alert avatar badge breadcrumb button \
  calendar card checkbox command context-menu dialog dropdown-menu form input \
  input-otp label pagination popover progress radio-group select separator \
  sheet skeleton slider sonner switch table tabs textarea toggle-group tooltip

# 5. Reemplazar globals.css con la versión Proteus (ver token-css-vars.md)
```
