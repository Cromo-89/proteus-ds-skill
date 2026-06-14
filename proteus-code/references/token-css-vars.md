# Token → CSS Variables — Proteus DS

Fuente de verdad para `styles/globals.css` y `tailwind.config.ts`.
Cada CSS variable se deriva de un token semántico de proteus-foundations.
El modo Dark es el **primario/default** de Proteus; Light invierte los valores.

> Ver token-contract.md (proteus-components) para el spec completo DTCG.

---

## globals.css — completo

```css
@import "tailwindcss";

@theme inline {
  /* ── Radius ─────────────────────────────────────────── */
  --radius-sm:   0.375rem;  /* 6px  — radius.sm */
  --radius-md:   0.5rem;    /* 8px  — radius.md */
  --radius-base: 0.625rem;  /* 10px — radius.base */
  --radius-lg:   0.75rem;   /* 12px — radius.lg */
  --radius-xl:   1rem;      /* 16px — radius.xl */
  --radius-2xl:  1.25rem;   /* 20px — radius.2xl */
  --radius-full: 9999px;    /* pill */

  /* ── Spacing (4px base grid) ────────────────────────── */
  --spacing-1:  0.25rem;   /*  4px */
  --spacing-2:  0.5rem;    /*  8px */
  --spacing-3:  0.75rem;   /* 12px */
  --spacing-4:  1rem;      /* 16px */
  --spacing-5:  1.25rem;   /* 20px */
  --spacing-6:  1.5rem;    /* 24px */
  --spacing-8:  2rem;      /* 32px */
  --spacing-10: 2.5rem;    /* 40px */
  --spacing-12: 3rem;      /* 48px */

  /* ── Typography ─────────────────────────────────────── */
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", "Fira Code", ui-monospace, monospace;

  /* Font sizes — text/label/xs → text/display */
  --text-xs:   0.75rem;    /* 12px — label/sm  */
  --text-sm:   0.8125rem;  /* 13px — body/sm   */
  --text-base: 0.875rem;   /* 14px — label/md  */
  --text-md:   1rem;       /* 16px — body/md   */
  --text-lg:   1.125rem;   /* 18px — heading/sm */
  --text-xl:   1.25rem;    /* 20px — heading/md */
  --text-2xl:  1.375rem;   /* 22px — heading/lg */
  --text-3xl:  1.875rem;   /* 30px — heading/xl */
  --text-4xl:  2.25rem;    /* 36px — display   */

  /* ── Elevation / Shadows ────────────────────────────── */
  --shadow-sm:  0 1px 2px oklch(0 0 0 / 0.20);
  --shadow-md:  0 2px 8px oklch(0 0 0 / 0.24);
  --shadow-lg:  0 4px 16px oklch(0 0 0 / 0.28);
  --shadow-xl:  0 8px 24px oklch(0 0 0 / 0.32);
  --shadow-2xl: 0 16px 48px oklch(0 0 0 / 0.40);
}

/* ── Dark mode (default) ──────────────────────────────── */
:root {
  color-scheme: dark;

  /* Surfaces */
  --background:            oklch(0.130 0.000 0);      /* neutral-950 */
  --background-secondary:  oklch(0.160 0.005 284);    /* near neutral-900 w/ brand tint */
  --background-tertiary:   oklch(0.190 0.007 284);
  --foreground:            oklch(0.985 0.000 0);      /* neutral-50 */
  --foreground-muted:      oklch(0.560 0.010 284);    /* neutral-500 w/ tint */
  --foreground-inverse:    oklch(0.130 0.000 0);      /* sobre superficies primarias */

  /* Card / elevated */
  --card:                  oklch(0.165 0.007 284);    /* panel / dialog */
  --card-foreground:       oklch(0.985 0.000 0);
  --popover:               oklch(0.165 0.007 284);
  --popover-foreground:    oklch(0.985 0.000 0);

  /* Brand — Indigo hue 284° */
  --primary:               oklch(0.450 0.180 284);    /* brand-700 */
  --primary-foreground:    oklch(0.985 0.000 0);
  --primary-hover:         oklch(0.500 0.185 284);    /* brand-600 */
  --primary-pressed:       oklch(0.400 0.175 284);    /* brand-800 */

  /* Secondary */
  --secondary:             oklch(0.220 0.010 284);
  --secondary-foreground:  oklch(0.870 0.000 0);

  /* Muted */
  --muted:                 oklch(0.190 0.007 284);
  --muted-foreground:      oklch(0.560 0.010 284);

  /* Accent */
  --accent:                oklch(0.220 0.010 284);
  --accent-foreground:     oklch(0.985 0.000 0);

  /* Lines / Borders */
  --border:                oklch(0.260 0.012 284);    /* color/border */
  --border-heavy:          oklch(0.320 0.015 284);    /* color/border-heavy */
  --input:                 oklch(0.220 0.010 284);    /* input bg */
  --ring:                  oklch(0.500 0.185 284);    /* brand-600 — focus ring */

  /* Status — Destructive */
  --destructive:           oklch(0.540 0.200 25);
  --destructive-foreground: oklch(0.985 0 0);
  --destructive-bg:        oklch(0.200 0.060 25);
  --destructive-wash:      oklch(0.160 0.030 25);

  /* Status — Success */
  --success:               oklch(0.620 0.170 145);
  --success-foreground:    oklch(0.985 0 0);
  --success-bg:            oklch(0.200 0.060 145);
  --success-wash:          oklch(0.160 0.030 145);

  /* Status — Warning */
  --warning:               oklch(0.720 0.170 75);
  --warning-foreground:    oklch(0.130 0 0);
  --warning-bg:            oklch(0.220 0.060 75);
  --warning-wash:          oklch(0.170 0.030 75);

  /* Status — Info */
  --info:                  oklch(0.580 0.170 240);
  --info-foreground:       oklch(0.985 0 0);
  --info-bg:               oklch(0.190 0.060 240);
  --info-wash:             oklch(0.155 0.030 240);

  /* Elevation surfaces */
  --surface-elevated:      oklch(0.185 0.008 284);
  --surface-overlay:       oklch(0.200 0.010 284);
}

/* ── Light mode ───────────────────────────────────────── */
.light {
  color-scheme: light;

  --background:            oklch(0.985 0.000 0);      /* neutral-50 */
  --background-secondary:  oklch(0.960 0.002 284);
  --background-tertiary:   oklch(0.940 0.004 284);
  --foreground:            oklch(0.130 0.000 0);      /* neutral-950 */
  --foreground-muted:      oklch(0.440 0.010 284);

  --card:                  oklch(1.000 0.000 0);
  --card-foreground:       oklch(0.130 0.000 0);
  --popover:               oklch(1.000 0.000 0);
  --popover-foreground:    oklch(0.130 0.000 0);

  --primary:               oklch(0.500 0.185 284);    /* brand-600 (1 step up) */
  --primary-foreground:    oklch(0.985 0.000 0);
  --primary-hover:         oklch(0.550 0.185 284);    /* brand-500 */
  --primary-pressed:       oklch(0.450 0.180 284);    /* brand-700 */

  --secondary:             oklch(0.940 0.004 284);
  --secondary-foreground:  oklch(0.230 0.010 284);
  --muted:                 oklch(0.960 0.002 284);
  --muted-foreground:      oklch(0.440 0.010 284);
  --accent:                oklch(0.940 0.004 284);
  --accent-foreground:     oklch(0.130 0.000 0);

  --border:                oklch(0.880 0.005 284);
  --border-heavy:          oklch(0.800 0.008 284);
  --input:                 oklch(0.960 0.002 284);
  --ring:                  oklch(0.550 0.185 284);    /* brand-500 */

  --destructive:           oklch(0.520 0.200 25);
  --destructive-foreground: oklch(0.985 0 0);
  --destructive-bg:        oklch(0.940 0.040 25);
  --destructive-wash:      oklch(0.965 0.020 25);

  --success:               oklch(0.520 0.160 145);
  --success-foreground:    oklch(0.985 0 0);
  --success-bg:            oklch(0.940 0.040 145);
  --success-wash:          oklch(0.965 0.020 145);

  --warning:               oklch(0.620 0.160 75);
  --warning-foreground:    oklch(0.130 0 0);
  --warning-bg:            oklch(0.960 0.040 75);
  --warning-wash:          oklch(0.975 0.020 75);

  --info:                  oklch(0.500 0.160 240);
  --info-foreground:       oklch(0.985 0 0);
  --info-bg:               oklch(0.940 0.040 240);
  --info-wash:             oklch(0.965 0.020 240);

  --surface-elevated:      oklch(0.985 0 0);
  --surface-overlay:       oklch(0.970 0.002 284);
}
```

---

## Tailwind v4 — theme extension en `tailwind.config.ts`

Con Tailwind v4, las CSS variables se exponen automáticamente vía `@theme inline`.
No se necesita un `tailwind.config.ts` por defecto — agregar solo si se necesita
plugin personalizado:

```ts
// tailwind.config.ts (solo si se necesita)
import type { Config } from "tailwindcss"

export default {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx}"],
} satisfies Config
```

Las clases `bg-primary`, `text-foreground`, `border-border`, etc. ya funcionan porque
`@theme inline` en `globals.css` las expone como variables CSS de Tailwind.

---

## Clases utilitarias frecuentes

```
Fondos:       bg-background · bg-card · bg-muted · bg-primary · bg-secondary
Texto:        text-foreground · text-muted-foreground · text-primary-foreground
Bordes:       border-border · border-border-heavy · ring-ring
Radios:       rounded-sm(6) · rounded-md(8) · rounded-base(10) · rounded-lg(12) · rounded-xl(16) · rounded-2xl(20)
Sombras:      shadow-sm · shadow-md · shadow-lg · shadow-xl · shadow-2xl
Status:       text-destructive · bg-destructive-bg · bg-success-wash · bg-warning-wash
```

---

## Tokens → CSS var cheatsheet

| Figma token | CSS variable | Tailwind class |
|---|---|---|
| `color/background` | `--background` | `bg-background` |
| `color/background-secondary` | `--background-secondary` | `bg-background-secondary` |
| `color/foreground` | `--foreground` | `text-foreground` |
| `color/foreground-muted` | `--muted-foreground` | `text-muted-foreground` |
| `color/primary` | `--primary` | `bg-primary` |
| `color/primary-foreground` | `--primary-foreground` | `text-primary-foreground` |
| `color/card` | `--card` | `bg-card` |
| `color/border` | `--border` | `border-border` |
| `color/ring` | `--ring` | `ring-ring` |
| `color/muted` | `--muted` | `bg-muted` |
| `color/destructive-fg` | `--destructive` | `text-destructive` |
| `color/destructive-bg` | `--destructive-bg` | `bg-destructive-bg` |
| `color/success-fg` | `--success` | `text-success` |
| `color/success-bg` | `--success-bg` | `bg-success-bg` |
| `color/warning-fg` | `--warning` | `text-warning` |
| `color/warning-bg` | `--warning-bg` | `bg-warning-bg` |
| `color/info-fg` | `--info` | `text-info` |
| `color/info-bg` | `--info-bg` | `bg-info-bg` |
