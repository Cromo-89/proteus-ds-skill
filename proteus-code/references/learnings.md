# Learnings — Proteus Code

Registro cronológico de decisiones de implementación, bugs de plataforma y
validaciones durante la construcción del sitio de documentación y los componentes.
Las reglas activas derivadas de estos learnings viven en `SKILL.md`.

---

## Setup inicial

### Stack confirmado (2026-06-14)

- Next.js **16.2.9** App Router (no Pages Router) — versión real; ignorar referencias a "15"
- Tailwind CSS v4 con `@import "tailwindcss"` en globals.css — no `tailwind.config.js`
- Base UI (`@base-ui/react`) como capa de primitivos — **NO Radix UI, NO shadcn/ui puro**
- npm como package manager (no pnpm)
- TypeScript strict en `tsconfig.json`
- CVA (class-variance-authority) para variantes de componentes
- **Material Icons Rounded** via Google font CDN — íconos via componente `Icon` (ver abajo)

### Stack corregido (2026-06-15) — lo que NO usa el proyecto

- ❌ Lucide React — **nunca usar**; estaba en el stack inicial pero se migró completamente
- ❌ MDX / next-mdx-remote — los docs son RSC `.tsx` puras, no MDX
- ❌ `lib/registry.ts` — la navegación vive en `lib/navigation.ts`
- ❌ `content/` dir — no existe; cada componente tiene `app/(docs)/components/[name]/page.tsx`
- ❌ Storybook — el sitio de docs es el Storybook
- ❌ `React.forwardRef` — no se usa; Base UI maneja refs internamente; componentes custom son funciones simples

### Decisiones de arquitectura

- **Docs con RSC TSX**: cada componente tiene `app/(docs)/components/[name]/page.tsx`. La función es `async` porque usa `await highlight(code)` de Shiki para colorear el snippet de código.
- **ComponentPreview**: recibe `preview={<JSX/>}`, `code={string}`, `codeHtml={string}` — NO un `name` de registro.
- **Dark first**: el modo Dark es el default del sitio. Toggle manual para Light mode.
- **Hosting**: Vercel, Git-integrated. Deploy con `vercel --prod --yes`. El archivo de link es `.vercel/repo.json` (no `project.json`).
- **i18n**: solo español. No hay multi-idioma.
- **Playground de tokens**: diferido. Sitio estático por ahora.

---

## Sistema de íconos — Material Icons Rounded

### Decisión (2026-06-15)

El proyecto usa un componente `Icon` central ubicado en `components/ui/icon.tsx`:

```tsx
import * as React from "react"

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string
  size?: 14 | 16 | 20 | 24 | 40 | 48
}

export function Icon({ name, size = 24, className, style, ...props }: IconProps) {
  return (
    <span
      className={cn("material-symbols-rounded leading-none", className)}
      style={{ fontSize: size, ...style }}
      aria-hidden="true"
      {...props}
    />
  )
}
```

`leading-none` elimina el line-height del `<span>`, que de otro modo haría que el ícono sea visualmente más alto que `size`. El ícono se dimensiona vía `font-size`, no `width`/`height` — por eso las clases Tailwind `size-4` no funcionan.

La fuente se carga en `app/layout.tsx` vía `<link>` del CDN de Google Fonts (variable font).

### Migración de Lucide React (2026-06-15)

Se migró completamente Lucide React a Material Icons Rounded en 13 archivos:
`accordion`, `breadcrumb`, `calendar`, `checkbox`, `command`, `context-menu`, `dialog`,
`dropdown-menu`, `input-otp`, `pagination`, `select`, `sheet`, `sonner`.

Equivalencias usadas:
| Lucide | Material Icons |
|---|---|
| `ChevronDownIcon` | `keyboard_arrow_down` |
| `ChevronUpIcon` | `keyboard_arrow_up` |
| `ChevronLeftIcon` / `ChevronRightIcon` | `chevron_left` / `chevron_right` |
| `CheckIcon` | `check` |
| `XIcon` | `close` |
| `SearchIcon` | `search` |
| `MoreHorizontalIcon` | `more_horiz` |
| `MinusIcon` (OTP separator) | `remove` |
| `CircleCheckIcon` | `check_circle` |
| `InfoIcon` | `info` |
| `TriangleAlertIcon` | `warning` |
| `OctagonXIcon` | `cancel` |
| `Loader2Icon animate-spin` | `progress_activity animate-spin` |

---

## Audit de componentes (2026-06-15)

### Focus rings

El estándar DS es `ring-3` (no `ring-1` ni `ring-2`):
```
focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:border-ring
```

Archivos corregidos:
- `chip.tsx`: dismiss button `ring-1 ring-ring` → `ring-3 ring-ring/50`; main chip `ring-2` → `ring-3`
- `rating.tsx`: star button `ring-2 ring-ring` → `ring-3 ring-ring/50`

### SelectItem — padding y radio

- `py-1` (4px) era demasiado compacto → corregido a `py-1.5` (6px)
- `rounded-md` era menos redondeado que el DS → corregido a `rounded-lg`
- `SelectLabel` también: `py-1` → `py-1.5` + `font-medium`

### InputGroup — alineación de inline addons

**Problema**: los inline addons (left/right) mostraban 2px de gap con el borde al centrar.

**Causa**: la clase base de `InputGroupAddon` incluía `py-1.5`, haciendo que el addon midiera
28px en un InputGroup de 32px. Con `items-center` en el padre, quedaba descentrado 2px.

**Fix**: quitar `py-1.5` del string base de CVA en `input-group.tsx`. Sin `py-1.5`, el addon
adopta la altura del contenido y el `items-center` del padre lo centra perfectamente.
Los block addons (`block-start`/`block-end`) tienen `pt-2`/`pb-2` explícitos en sus variantes — no se ven afectados.

### Stat Card — tamaño de ícono de tendencia

El ícono de trend estaba a `size={14}`, visualmente inconsistente. Corregido a `size={16}`.

### Bottom Sheet — botones del footer

Los botones del footer tenían `h-8` (32px), por debajo del mínimo de touch target mobile (44px).
Corregido a `h-11` (44px) con `className="flex-1 h-11"`.

### Accordion — patrón de ícono

Reemplazado el par de íconos hidden/shown (`ChevronDown` + `ChevronUp`) por **un solo ícono
que rota 180°** usando `group-aria-expanded/accordion-trigger:rotate-180`.
Más limpio, un solo nodo DOM, sin lógica de condición.

---

## Bugs y resoluciones

### `**:data-[slot=...]` no aplica `size-4` a Icon span

`size-4` en Tailwind setea `width` y `height`. El componente `Icon` se dimensiona por
`font-size` (vía estilo inline), no por `width/height`. La clase no tiene efecto.

**Fix**: usar siempre la prop `size={N}` directamente en `<Icon>` y NO intentar overridear
el tamaño vía clases Tailwind que apliquen `width`/`height`.

### Calendar Chevron no acepta spread de props SVG

El componente `Chevron` original del DayPicker recibía `...props` para pasarlos a Lucide
(que acepta props SVG). El componente `Icon` no acepta props HTML arbitrarios.

**Fix**: no hacer spread `{...props}` en el Chevron del Calendar. Solo usar `orientation`
para elegir el nombre del ícono. Los handlers de click están en el botón wrapper del nav,
no en el ícono.

### Edit tool — "File has not been read yet"

Si el contexto se compacta, el Edit tool pierde el registro de qué archivos se han leído.

**Fix**: siempre hacer un Read del archivo antes de editar en una sesión nueva, aunque
se haya leído en contexto anterior.

---

## Open questions — resueltas

- [x] ¿Hosting en Vercel o self-hosted? → **Vercel**, Git-integrated, ya deployado
- [x] ¿Internacionalización (es/en) o solo español? → **Solo español** (neutro latinoamericano)
- [x] ¿Incluir playground de tokens interactivo? → **Diferido**, estático por ahora
- [x] ¿API de íconos para búsqueda y copia de SVG? → La página `/foundations/icons` ya muestra la librería; búsqueda interactiva diferida
