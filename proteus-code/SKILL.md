---
name: proteus-code
version: 0.1.0
description: >-
  Generate React/TypeScript component code and a documentation website for
  ProteusDS, built on Next.js 15 + shadcn/ui + Tailwind CSS v4. Third and
  final stage of the Proteus pipeline — every component maps to a Figma source
  from proteus-components and inherits design tokens from proteus-foundations.
  Use this skill for any code output task: component implementation, MDX docs
  pages, theming setup, shadcn/ui extension, and building the documentation
  site (Storybook-style). Do NOT design tokens here (proteus-foundations) and
  do NOT build Figma components here (proteus-components).
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
│   Next.js · shadcn/ui · Tailwind · Docs      v 0.1.0  │
│                                                       │
╰───────────────────────────────────────────────────────╯
```

After printing the splash, proceed normally.

---

# Proteus Code

Third and final stage of the Proteus DS pipeline:

```
1. proteus-foundations  ✅ COMPLETE  → tokens, variables, styles, Light/Dark
2. proteus-components   ✅ COMPLETE  → 54 component sets in Figma
3. proteus-code         ⬅️ HERE      → React/TS library + documentation site
```

Figma file: **`Ohc3OVwwd3MwI4SvIdk3EY`** (Proteus DS).

## Skill files

- `SKILL.md` — este archivo (reglas, stack, workflow, convenciones)
- `config.json` — configuración (framework, version)
- `references/site-architecture.md` — estructura del sitio de documentación
- `references/component-api.md` — TypeScript interfaces y ejemplos de uso
- `references/token-css-vars.md` — CSS variables completas (globals.css + tailwind.config)
- `references/shadcn-mapping.md` — mapa Proteus component → shadcn/ui primitive
- `references/learnings.md` — decisiones, bugs y validaciones de implementación

## Tech stack

| Layer | Technology | Versión |
|---|---|---|
| Framework | Next.js App Router | 15.x |
| Lenguaje | TypeScript strict | 5.x |
| Styling | Tailwind CSS + `@theme inline` | 4.x |
| Component primitives | shadcn/ui (Radix UI) | latest |
| Variant helper | class-variance-authority (CVA) | latest |
| Merge helper | tailwind-merge + clsx | latest |
| Íconos | Lucide React | latest |
| Docs format | MDX | 3.x |
| Syntax highlight | Shiki | latest |
| Package manager | pnpm | latest |

## Project structure

```
proteus-ds-web/
├── app/
│   ├── layout.tsx                 ← root layout (fuentes, ThemeProvider)
│   ├── page.tsx                   ← home / landing del DS
│   ├── (docs)/
│   │   ├── layout.tsx             ← docs layout (sidebar + content)
│   │   ├── foundations/
│   │   │   ├── colors/page.tsx
│   │   │   ├── typography/page.tsx
│   │   │   ├── spacing/page.tsx
│   │   │   ├── icons/page.tsx
│   │   │   └── elevation/page.tsx
│   │   └── components/
│   │       └── [slug]/page.tsx    ← página dinámica por componente
├── components/
│   ├── ui/                        ← shadcn/ui generados (no editar directamente)
│   └── docs/                      ← componentes del sitio de documentación
│       ├── ComponentPreview.tsx   ← wrapper live preview + code tab
│       ├── PropsTable.tsx         ← tabla de props desde tipos TS
│       ├── CodeBlock.tsx          ← bloque de código con Shiki
│       ├── Sidebar.tsx            ← navegación lateral del docs
│       └── ThemeToggle.tsx        ← toggle Light/Dark
├── content/
│   └── components/                ← MDX por componente
│       ├── button.mdx
│       ├── input.mdx
│       └── ...                    ← uno por cada uno de los 54 componentes
├── lib/
│   ├── utils.ts                   ← cn() helper (clsx + tailwind-merge)
│   ├── registry.ts                ← registro de todos los componentes y metadatos
│   └── tokens.ts                  ← constantes JS derivadas de los tokens
└── styles/
    └── globals.css                ← CSS variables (dark/light) + @theme inline
```

## The one hard rule for this tier

> **Nunca valores literales de color, espaciado o tipografía. Solo CSS variables.**
> `bg-[var(--primary)]` o `bg-primary` vía Tailwind mapping — nunca `bg-indigo-600`.

Cada fill, stroke, radio y tipografía en código se mapea a una CSS variable de la tabla
en `references/token-css-vars.md`. Si estás por escribir un valor numérico fuera de un
`var()` o una clase Tailwind definida en el theme, detenete.

## Naming conventions

| Tipo | Convención | Ejemplo |
|---|---|---|
| Archivos de componente | kebab-case | `button.tsx`, `form-field.tsx` |
| Componentes React | PascalCase | `Button`, `FormField` |
| Props interface | `{Component}Props` | `ButtonProps` |
| CSS class helper | CVA `cva()` | `const buttonVariants = cva(...)` |
| Slot/children | `children?: React.ReactNode` | — |
| Refs | `React.forwardRef<HTMLElement, Props>` | siempre forwardRef |
| Tests | `{Component}.test.tsx` | `button.test.tsx` |
| Stories MDX | `{component}.mdx` en `content/components/` | `button.mdx` |

## Component implementation pattern

Todo componente de Proteus DS sigue este patrón:

### 1. Shadcn base
```bash
# Instalar el primitivo shadcn/ui correspondiente
npx shadcn@latest add button
```

### 2. Extender con variantes Proteus
```tsx
// components/ui/button.tsx — generado por shadcn, extendido con variantes Proteus
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Variantes Proteus: Primary, Secondary, Outline, Ghost, Destructive
// Tamaños Proteus: sm, md (default), lg
const buttonVariants = cva(
  // base: tokens de CSS variables, nunca valores literales
  "inline-flex items-center gap-2 rounded-[var(--radius-md)] font-medium transition-colors",
  {
    variants: {
      variant: {
        primary:     "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary:   "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline:     "border border-border bg-transparent hover:bg-muted/50",
        ghost:       "hover:bg-muted/50 text-foreground",
        destructive: "bg-destructive text-destructive-foreground",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-9 px-4 text-sm",
        lg: "h-11 px-6 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, leftIcon, rightIcon, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      {isLoading ? <Spinner className="size-4" /> : children}
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  )
)
Button.displayName = "Button"
```

### 3. Props map desde Figma

Cada prop de Figma ComponentSet se traduce a prop de React:

| Tipo Figma | Tipo TypeScript | Ejemplo |
|---|---|---|
| TEXT | `string` | `label: string` |
| BOOLEAN | `boolean` | `showIcon?: boolean` |
| INSTANCE_SWAP | `React.ReactNode` | `icon?: React.ReactNode` |
| Variante (eje) | `"val1" \| "val2"` | `variant: "primary" \| "outline"` |

### 4. Barrel export

```ts
// components/ui/index.ts — exportar todo desde aquí
export { Button, type ButtonProps, buttonVariants } from "./button"
export { Input, type InputProps } from "./input"
// ... un export por componente
```

## Documentation site workflow — un componente a la vez

Para cada componente, en orden:

1. **Implementar** el componente en `components/ui/<name>.tsx`
2. **Escribir la página MDX** en `content/components/<name>.mdx`
3. **Agregar al registro** en `lib/registry.ts`
4. **Agregar a la sidebar** en `components/docs/Sidebar.tsx`
5. **Validar**: live preview funciona, props table correcta, código copiable

## MDX docs page — plantilla estándar

```mdx
---
title: Button
description: Acción principal de la interfaz. Soporta variantes, tamaños e íconos.
figma: https://figma.com/design/Ohc3OVwwd3MwI4SvIdk3EY?node-id=166:2
---

<ComponentPreview name="button-default">
  <Button>Acción</Button>
</ComponentPreview>

## Instalación

```bash
npx shadcn@latest add button
```

## Variantes

<ComponentPreview name="button-variants">
  <div className="flex gap-2 flex-wrap">
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="destructive">Destructive</Button>
  </div>
</ComponentPreview>

## Props

<PropsTable component="Button" />

## Accesibilidad

- Usa el elemento `<button>` nativo — hereda `role="button"`, focus, y teclado.
- `isLoading` deshabilita el botón y debe tener `aria-busy="true"`.
```

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
→ Mapping Proteus → shadcn en `references/shadcn-mapping.md`.
→ API por componente en `references/component-api.md`.
→ Arquitectura del sitio en `references/site-architecture.md`.

## Progress — Stage 3 en curso

```
✅ Skill creado (v0.1.0)
⬜ Setup Next.js + shadcn/ui + Tailwind v4
⬜ globals.css con CSS variables completas (dark/light)
⬜ Layout del sitio de documentación (sidebar + content)
⬜ Página home
⬜ Sección Foundations (Colors · Typography · Spacing · Icons)
⬜ Componentes (0/54 implementados)
```

El detalle de implementación por componente (decisiones, bugs, validaciones) vive en
`references/learnings.md`.
