---
name: proteus-code
version: 0.11.0
description: >-
  Generate React/TypeScript component code and a documentation website for
  ProteusDS, built on Next.js 16 + Base UI + Tailwind CSS v4. Third and
  final stage of the Proteus pipeline — every component maps to a Figma source
  from proteus-components and inherits design tokens from proteus-foundations.
  Use this skill for any code output task: component implementation, RSC docs
  pages, theming setup, and building the documentation site. Icons via Material
  Icons Rounded. Do NOT design tokens here (proteus-foundations) and do NOT
  build Figma components here (proteus-components).
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
│              C  O  D  E                               │
│                                                       │
│   Design System for ProteusDS  ·  Stage 3/3           │
│   Next.js · Base UI · Tailwind · Docs       v 0.11.0  │
│                                                       │
╰───────────────────────────────────────────────────────╯
```

After printing the splash, proceed normally.

---

# Proteus Code

Third and final stage of the Proteus DS pipeline:

```
1. proteus-foundations  ✅ COMPLETE  → tokens, variables, styles, Light/Dark
2. proteus-components   ✅ COMPLETE  → 68 component sets in Figma
3. proteus-code         ✅ COMPLETE  → React/TS library + documentation site (live)
```

Figma file: **`Ohc3OVwwd3MwI4SvIdk3EY`** (Proteus DS).
Production URL: **`https://proteus-ds-web.vercel.app`**

## Skill files

- `SKILL.md` — este archivo (reglas, stack, workflow, convenciones)
- `config.json` — configuración (framework, version)
- `references/site-architecture.md` — estructura del sitio de documentación
- `references/component-api.md` — TypeScript interfaces y ejemplos de uso
- `references/token-css-vars.md` — CSS variables completas (globals.css)
- `references/shadcn-mapping.md` — mapa Proteus component → Base UI primitive
- `references/learnings.md` — decisiones, bugs y validaciones de implementación

## Tech stack

| Layer | Technology | Versión |
|---|---|---|
| Framework | Next.js App Router | 16.2.9 |
| Lenguaje | TypeScript strict | 5.x |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"`) | 4.x |
| Component primitives | Base UI (`@base-ui/react`) | latest |
| Variant helper | class-variance-authority (CVA) | latest |
| Merge helper | tailwind-merge + clsx | latest |
| Íconos | Material Icons Rounded (Google font CDN) | — |
| Docs format | Static RSC pages (TSX) + Shiki highlight | — |
| Syntax highlight | Shiki | latest |
| Package manager | npm | latest |
| Deploy | Vercel (Git-integrated) | — |

**Lo que NO usa este proyecto:**
- ❌ Lucide React — eliminado por completo; **siempre Material Icons Rounded**
- ❌ Radix UI — reemplazado por Base UI (`@base-ui/react`)
- ❌ MDX / next-mdx-remote — docs son RSC `.tsx` puras
- ❌ lib/registry.ts — navegación vive en `lib/navigation.ts`
- ❌ content/ MDX dir — no existe
- ❌ pnpm — el proyecto usa npm
- ❌ Storybook — el sitio de docs ES el Storybook

## Project structure

```
proteus-ds-web/
├── app/
│   ├── layout.tsx                 ← root layout (DM Sans, ThemeProvider, Material Icons CDN)
│   ├── globals.css                ← CSS variables dark/light + @import "tailwindcss"
│   ├── page.tsx                   ← home / landing del DS
│   ├── (docs)/
│   │   ├── layout.tsx             ← docs layout (sidebar + content area)
│   │   ├── foundations/
│   │   │   ├── colors/page.tsx
│   │   │   ├── typography/page.tsx
│   │   │   ├── spacing/page.tsx
│   │   │   ├── icons/page.tsx
│   │   │   ├── elevation/page.tsx
│   │   │   ├── radius/page.tsx
│   │   │   └── motion/page.tsx
│   │   └── components/
│   │       ├── accordion/page.tsx
│   │       ├── alert/page.tsx
│   │       └── ...               ← 68 componentes, cada uno en su carpeta
├── components/
│   ├── ui/                        ← Base UI components (shadcn pattern)
│   │   ├── icon.tsx               ← componente Icon central (Material Icons Rounded)
│   │   ├── button.tsx
│   │   └── ...                   ← un archivo por componente
│   └── docs/                      ← componentes del sitio de documentación
│       ├── component-preview.tsx  ← wrapper live preview + bloque de código
│       ├── props-table.tsx        ← tabla de props con tipos TS
│       ├── topbar.tsx             ← barra superior con logo y toggle dark/light
│       └── sidebar.tsx            ← navegación lateral (consume navigation.ts)
├── lib/
│   ├── utils.ts                   ← cn() helper (clsx + tailwind-merge)
│   ├── navigation.ts              ← estructura de navegación del sidebar (array de grupos)
│   └── highlight.ts               ← función async highlight(code) con Shiki
└── public/
```

## Hard rules

### 1. Sin valores literales de color

> **Nunca valores literales de color, espaciado o tipografía. Solo CSS variables.**
> `bg-primary` o `text-foreground` vía Tailwind mapping — nunca `bg-indigo-600`.

Cada fill, stroke, radio y tipografía en código se mapea a una CSS variable de la tabla
en `references/token-css-vars.md`. Si estás por escribir un valor numérico de color
fuera de un `var()` o una clase Tailwind del tema, detenete.

### 2. Íconos siempre Material Icons Rounded

```tsx
// ✅ CORRECTO — siempre usar el componente Icon
import { Icon } from "@/components/ui/icon"
<Icon name="check_circle" size={16} />

// ❌ NUNCA — Lucide React no existe en este proyecto
import { CheckCircle } from "lucide-react"
```

El componente `Icon` renderiza `<span className="material-symbols-rounded leading-none">` con
`fontSize: size` como estilo inline. Tamaños válidos: `14 | 16 | 20 | 24 | 40 | 48`.

### 3. Focus ring estándar DS

Todo elemento interactivo usa:
```
focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:border-ring
```

### 4. Disabled estándar DS

```
disabled:opacity-50 disabled:cursor-not-allowed
```
Para primitivos Base UI que usan `data-disabled` en lugar de el atributo HTML:
```
data-disabled:opacity-50 data-disabled:pointer-events-none
```

### 5. Error/invalid estándar DS

```
aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20
```

## Naming conventions

| Tipo | Convención | Ejemplo |
|---|---|---|
| Archivos de componente | kebab-case | `button.tsx`, `form-field.tsx` |
| Componentes React | PascalCase | `Button`, `FormField` |
| Props interface | `{Component}Props` | `ButtonProps` |
| CSS class helper | CVA `cva()` | `const buttonVariants = cva(...)` |
| Slot attribute | `data-slot="..."` en root element | `data-slot="button"` |
| Tests | `{Component}.test.tsx` | `button.test.tsx` |
| Docs page | `app/(docs)/components/{name}/page.tsx` | `app/(docs)/components/button/page.tsx` |

**Sin `React.forwardRef`** — los componentes son funciones simples. Base UI maneja refs internamente en sus primitivos. Los componentes custom no necesitan forwardRef.

## Component implementation pattern

### 1. Estructura base (componente custom sin primitivo Base UI)

```tsx
// components/ui/badge.tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:     "bg-primary text-primary-foreground",
        secondary:   "bg-secondary text-secondary-foreground",
        outline:     "border border-border text-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        success:     "bg-success-bg text-success",
        warning:     "bg-warning-bg text-warning",
        info:        "bg-info-bg text-info",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}
```

### 2. Con primitivo Base UI

```tsx
// components/ui/select.tsx — Base UI primitivo
"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"

const Select = SelectPrimitive.Root

function SelectTrigger({ className, children, ...props }: SelectPrimitive.Trigger.Props) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        "flex w-fit items-center gap-1.5 rounded-lg border border-input bg-transparent py-2 px-2.5 text-sm",
        "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        render={<Icon name="keyboard_arrow_down" size={16} className="pointer-events-none text-muted-foreground shrink-0" />}
      />
    </SelectPrimitive.Trigger>
  )
}

function SelectItem({ className, children, ...props }: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default items-center gap-1.5 rounded-lg py-1.5 pr-8 pl-1.5 text-sm",
        "focus:bg-accent data-disabled:opacity-50 data-disabled:pointer-events-none",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        render={<span className="absolute right-2 flex size-4 items-center justify-center" />}
      >
        <Icon name="check" size={14} />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}
```

### 3. Íconos — patrón accordion (rotación vs dos íconos)

Para expandir/colapsar: usar **un solo ícono que rota**, no dos íconos hidden/shown:

```tsx
<Icon
  name="expand_more"
  size={16}
  className="pointer-events-none shrink-0 transition-transform duration-200
             group-aria-expanded/accordion-trigger:rotate-180"
/>
```

### 4. Docs page — plantilla estándar (RSC, async)

```tsx
// app/(docs)/components/button/page.tsx
import type { Metadata } from "next"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import { highlight } from "@/lib/highlight"

export const metadata: Metadata = { title: "Button" }

const defaultCode = `<Button>Acción</Button>`

export default async function ButtonPage() {
  const defaultHtml = await highlight(defaultCode)

  return (
    <article className="space-y-10">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge className="bg-success-bg text-success border-transparent rounded-full">Stable</Badge>
          <a
            href="https://www.figma.com/design/Ohc3OVwwd3MwI4SvIdk3EY"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <Icon name="open_in_new" size={14} />
            Ver en Figma
          </a>
        </div>
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Button</h1>
          <p className="mt-3 text-lg text-muted-foreground leading-relaxed">
            Acción principal de la interfaz.
          </p>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">Default</h2>
        <ComponentPreview
          preview={<Button>Acción</Button>}
          codeHtml={defaultHtml}
          code={defaultCode}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">Props</h2>
        <PropsTable props={[
          { name: "variant", type: '"default" | "secondary" | "outline" | "ghost" | "destructive"', defaultValue: '"default"', description: "Estilo visual del botón." },
          { name: "size", type: '"default" | "sm" | "lg" | "icon"', defaultValue: '"default"', description: "Tamaño del botón." },
        ]} />
      </section>
    </article>
  )
}
```

**Claves del patrón de docs:**
- La función es `async` — necesita `await highlight(code)` para Shiki
- `code` es la string del snippet (aparece en el tab "Code")
- `codeHtml` es el HTML ya coloreado que devuelve `highlight()`
- `preview` es el JSX en vivo que se muestra en el tab "Preview"
- Cada sección tiene `<h2>` + `<ComponentPreview>` o `<PropsTable>`

## Documentation site workflow — un componente a la vez

Para cada componente nuevo:

1. **Implementar** el componente en `components/ui/<name>.tsx`
2. **Crear la página docs** en `app/(docs)/components/<name>/page.tsx`
3. **Agregar a la navegación** en `lib/navigation.ts`
4. **Validar**: live preview funciona, props table correcta, código copiable

## Version bump — checklist obligatorio

**Archivos a actualizar para proteus-code:**

| Archivo | Qué actualizar |
|---|---|
| `proteus-code/SKILL.md` | Frontmatter `version: X.X.X` |
| `proteus-code/SKILL.md` | Splash `v X.X.X` |
| `proteus-code/config.json` | Campo `"version"` |
| `README.md` (raíz) | Línea `proteus-code/`: `skill vX.X.X` |

**Regla de numeración:**
- Patch: correcciones o ajustes a componentes existentes.
- Minor: cada nuevo componente implementado o sección de docs añadida.
- Major: cambio de framework o reestructuración del site.

Todos los archivos modificados de una versión van en **un solo commit**.

## Foundations status — reference tokens (read-only)

Semantic variable IDs conocidos (skip re-discovery):
- `color/primary` = `VariableID:15:16` → `--primary` en CSS
- `color/primary-foreground` = `VariableID:15:17` → `--primary-foreground`
- `color/ring` = `VariableID:15:29` → `--ring`
- `color/background-secondary` = `VariableID:15:4` → `--background-secondary`
- `color/card` = `VariableID:15:8` → `--card`
- `color/foreground` = `VariableID:15:12` → `--foreground`
- `color/foreground-muted` = `VariableID:15:13` → `--muted-foreground`
- `color/border` = `VariableID:15:26` → `--border`

→ CSS variables completas en `references/token-css-vars.md`.
→ Mapping Proteus → Base UI en `references/shadcn-mapping.md`.
→ API por componente en `references/component-api.md`.
→ Arquitectura del sitio en `references/site-architecture.md`.

## Progress — Stage 3 completo

```
✅ Setup Next.js 16 + Base UI + Tailwind v4
✅ globals.css con CSS variables completas (dark/light, OKLCH)
✅ Layout del sitio de documentación (sidebar + topbar + content)
✅ Página home (hero, stats, component showcase, foundations preview)
✅ Foundations (Colors · Typography · Spacing · Icons · Elevation · Radius · Motion)
✅ Componentes (68/68 implementados — ver lista completa en site-architecture.md)
✅ Audit pass (focus rings, icon migration Lucide→Material, SelectItem radius/padding)
✅ Deploy en Vercel (https://proteus-ds-web.vercel.app, 85 páginas estáticas)
```

El detalle de implementación por componente (decisiones, bugs, validaciones) vive en
`references/learnings.md`.
