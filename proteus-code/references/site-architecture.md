# Site Architecture — Proteus DS Documentation

Sitio de documentación estilo shadcn/ui: sidebar fija, contenido MDX, live previews.
URL de producción: `proteus-ds.vercel.app` (TBD).

---

## Mapa completo del sitio

```
/                          ← Landing: hero + componentes highlight + quick links
├── /getting-started
│   ├── /introduction      ← Qué es Proteus DS, filosofía, pipeline
│   ├── /installation      ← pnpm setup, shadcn init, globals.css
│   └── /theming           ← Dark/Light mode, override de variables
├── /foundations
│   ├── /colors            ← Paleta primitiva + tokens semánticos (swatches interactivos)
│   ├── /typography        ← Escala de tipo, estilos de texto, font stack
│   ├── /spacing           ← Escala de espaciado, uso en Tailwind
│   ├── /icons             ← Librería de 76 íconos (búsqueda, copia de código)
│   ├── /elevation         ← Shadow scale (5 niveles)
│   ├── /radius            ← Corner radius scale
│   └── /motion            ← Timing y easing (transition tokens)
├── /components
│   ├── /accordion
│   ├── /alert
│   ├── /avatar
│   ├── /avatar-group
│   ├── /badge
│   ├── /banner
│   ├── /bottom-sheet
│   ├── /breadcrumb
│   ├── /button
│   ├── /card
│   ├── /chat-message
│   ├── /checkbox
│   ├── /chip
│   ├── /command-palette
│   ├── /context-menu
│   ├── /date-picker
│   ├── /dialog
│   ├── /divider
│   ├── /drawer
│   ├── /dropdown-menu
│   ├── /empty-state
│   ├── /feature-card
│   ├── /file-upload
│   ├── /form-field
│   ├── /input
│   ├── /kbd
│   ├── /label
│   ├── /list-item
│   ├── /navbar
│   ├── /notification-center
│   ├── /number-input
│   ├── /otp-input
│   ├── /pagination
│   ├── /password-input
│   ├── /phone-input
│   ├── /popover
│   ├── /progress
│   ├── /progress-bar
│   ├── /radio
│   ├── /rating
│   ├── /search
│   ├── /select
│   ├── /sidebar
│   ├── /skeleton
│   ├── /slider
│   ├── /stat-card
│   ├── /stepper
│   ├── /switch
│   ├── /table
│   ├── /tabs
│   ├── /tag
│   ├── /textarea
│   ├── /timeline
│   ├── /toast
│   ├── /toggle-group
│   ├── /tooltip
│   └── /segmented-control
└── /guidelines
    ├── /accessibility     ← WCAG AA checklist, focus management, ARIA
    └── /patterns          ← Patrones comunes: forms, empty states, overlays
```

---

## Navegación lateral (Sidebar)

```
GETTING STARTED
  · Introduction
  · Installation
  · Theming

FOUNDATIONS
  · Colors
  · Typography
  · Spacing
  · Icons
  · Elevation
  · Radius
  · Motion

COMPONENTS                 ← 54 componentes, por categoría

  Forms
    Checkbox · Date Picker · File Upload · Form Field · Input
    Number Input · OTP Input · Password Input · Phone Input
    Radio · Search · Select · Slider · Switch · Textarea

  Navigation
    Breadcrumb · Navbar · Pagination · Sidebar · Stepper · Tabs

  Overlays
    Bottom Sheet · Command Palette · Context Menu · Dialog
    Drawer · Dropdown Menu · Notification Center · Popover
    Toast · Tooltip

  Feedback
    Alert · Banner · Empty State · Progress · Progress Bar · Skeleton

  Display
    Accordion · Avatar · Avatar Group · Badge · Button · Card
    Chat Message · Chip · Divider · Feature Card · Kbd · Label
    List Item · Rating · Stat Card · Table · Tag · Timeline
    Toggle Group

GUIDELINES
  · Accessibility
  · Patterns
```

---

## Docs layout

```
┌─────────────────────────────────────────────────────┐
│  [Logo Proteus DS]  [Search]           [Dark/Light]  │  ← topbar 56px
├────────────────┬────────────────────────────────────┤
│                │                                     │
│  Sidebar       │  Content area                       │
│  240px FIXED   │  max-w-3xl (768px) mx-auto          │
│                │                                     │
│  (nav links    │  [Page title h1]                    │
│  con estado    │  [Description p]                    │
│  active,       │  [ComponentPreview]                 │
│  scroll        │  [Sections con h2]                  │
│  independiente)│  [PropsTable]                       │
│                │                                     │
└────────────────┴────────────────────────────────────┘
```

---

## Plantilla de página de componente (MDX)

```mdx
---
title: {Nombre}
description: {Una línea: qué hace y cuándo usarlo}
figma: https://figma.com/design/Ohc3OVwwd3MwI4SvIdk3EY?node-id={pageId}
---

## Overview

{2-3 oraciones: propósito, cuándo usar, cuándo NO usar}

<ComponentPreview name="{name}-default">
  {ejemplo más común}
</ComponentPreview>

## Installation

```bash
npx shadcn@latest add {shadcn-name}
```

## Usage

```tsx
import { {Component} } from "@/components/ui/{name}"
```

## Variants

{Para cada variante de Figma, un ComponentPreview con descripción}

## Sizes  {si aplica}

{ComponentPreview con los tamaños}

## Props

<PropsTable component="{Component}" />

## Examples

### {Caso de uso real 1}

<ComponentPreview name="{name}-{case}">
  {código del caso}
</ComponentPreview>

## Accessibility

- {Elemento HTML base}
- {ARIA attributes relevantes}
- {Manejo de teclado}
- {Nota de contraste si aplica}
```

---

## Componente `ComponentPreview`

```tsx
// components/docs/ComponentPreview.tsx
// Renderiza un live preview con tab "Preview" / "Code"
interface ComponentPreviewProps {
  name: string          // nombre del registro (lib/registry.ts)
  children: React.ReactNode  // el componente a renderizar
  className?: string
}
```

El componente:
1. Muestra `children` en un iframe/sandbox con el theme aplicado
2. Tab "Code" muestra el código fuente formateado con Shiki
3. Tiene un botón "Copy" para copiar el snippet
4. Respeta el modo Light/Dark del sitio

---

## Componente `PropsTable`

```tsx
// components/docs/PropsTable.tsx
// Genera la tabla de props desde los tipos TypeScript del componente
interface PropsTableProps {
  component: string  // nombre exacto del componente (ej. "Button")
}
```

Columnas de la tabla:
| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `variant` | `"primary" \| "outline" \| ...` | `"primary"` | Estilo visual |

La fuente de verdad es `references/component-api.md`.

---

## Registro de componentes (`lib/registry.ts`)

```ts
export type ComponentMeta = {
  name: string           // slug (ej. "button")
  title: string          // display name (ej. "Button")
  description: string    // una línea
  category: "forms" | "navigation" | "overlays" | "feedback" | "display"
  figmaPageId: string    // ID de página en Figma (ej. "166:2")
  shadcnName?: string    // nombre en shadcn/ui (ej. "button")
  status: "stable" | "beta" | "wip"
}

export const registry: ComponentMeta[] = [
  {
    name: "button",
    title: "Button",
    description: "Acción principal de la interfaz.",
    category: "display",
    figmaPageId: "166:2",
    shadcnName: "button",
    status: "stable",
  },
  // ... 53 componentes más
]
```

---

## Home page — secciones

```
1. Hero
   - Título: "Proteus Design System"
   - Subtítulo: "54 componentes. Tokens semánticos. Dark/Light nativo."
   - CTA: [Leer documentación] [Ver en Figma]

2. Stats bar
   - 54 componentes · Dark/Light mode · WCAG AA · Next.js 15

3. Component showcase
   - Grid 3×3 con los componentes más visuales (Button, Badge, Card, Alert, Input, Dialog, Toast, Avatar, Table)

4. Foundations preview
   - Swatches de la paleta de colores (semantic tokens)
   - Escala tipográfica abreviada

5. Getting started snippet
   - Bloque de código con los 3 comandos de instalación
```
