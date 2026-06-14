# Learnings — Proteus Code

Registro cronológico de decisiones de implementación, bugs de plataforma y
validaciones durante la construcción del sitio de documentación y los componentes.
Las reglas activas derivadas de estos learnings viven en `SKILL.md`.

---

## Setup inicial

### Stack confirmado (2026-06-14)

- Next.js 15 App Router (no Pages Router)
- Tailwind CSS v4 con `@theme inline` en globals.css — no `tailwind.config.js` de color
- shadcn/ui como base de componentes — comando `npx shadcn@latest add`
- pnpm como package manager
- TypeScript strict en `tsconfig.json`
- CVA (class-variance-authority) para variantes de componentes
- Lucide React para íconos (mirror del set Proteus: 76 íconos de Material Symbols Rounded + Google)

### Decisiones de arquitectura

- **Docs con MDX**: cada componente tiene un archivo `.mdx` en `content/components/`. El sitio usa `next-mdx-remote` o el soporte nativo MDX de Next.js 15.
- **ComponentPreview**: wrapper que muestra live preview + pestaña de código. Los ejemplos se registran en `lib/registry.ts` con nombre y snippet.
- **Dark first**: el modo Dark es el default del sitio — mismo que el DS. Toggle manual para Light mode.
- **No Storybook separado**: el sitio de documentación ES el Storybook. Más simple de mantener, mismo resultado visual.

---

## Componentes implementados

*(se irá completando con decisiones y bugs por componente)*

### Button (v0.1.0)
- TODO

### Input (v0.1.0)
- TODO

---

## Bugs y resoluciones

*(registro de problemas y sus fixes)*

---

## Open questions

- [ ] ¿Hosting en Vercel o self-hosted?
- [ ] ¿Internacionalización (es/en) o solo español?
- [ ] ¿Incluir playground de tokens interactivo?
- [ ] ¿API de íconos para búsqueda y copia de SVG?
