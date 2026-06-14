# Component API — Proteus DS

TypeScript interfaces y ejemplos de uso para cada componente.
La tabla de props se genera desde este archivo para la documentación del sitio.
Orden: más simples primero (Fase 1 → Fase 4, según shadcn-mapping.md).

---

## Button

**Figma:** página `166:2` · ComponentSet `175:2` (Primary) / `176:20` (Outline)  
**shadcn:** `button`  
**Ejes Figma:** Variant × Size

```tsx
import { cva, type VariantProps } from "class-variance-authority"

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-md)] text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:     "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80",
        secondary:   "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline:     "border border-border bg-transparent hover:bg-muted/50 text-foreground",
        ghost:       "hover:bg-muted/50 text-foreground",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link:        "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 rounded-[var(--radius-sm)] px-3 text-xs",
        md: "h-9 px-4 py-2",
        lg: "h-11 rounded-[var(--radius-base)] px-8 text-base",
        icon: "h-9 w-9 rounded-[var(--radius-sm)]",
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
  asChild?: boolean
}
```

**Props table:**

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `variant` | `"primary" \| "secondary" \| "outline" \| "ghost" \| "destructive" \| "link"` | `"primary"` | Estilo visual |
| `size` | `"sm" \| "md" \| "lg" \| "icon"` | `"md"` | Tamaño |
| `isLoading` | `boolean` | `false` | Muestra spinner, deshabilita el botón |
| `leftIcon` | `React.ReactNode` | — | Ícono antes del label |
| `rightIcon` | `React.ReactNode` | — | Ícono después del label |
| `asChild` | `boolean` | `false` | Renderiza como hijo (Radix Slot) |

---

## Input

**Figma:** página `331:2`  
**shadcn:** `input`  
**Ejes Figma:** State × (Size implícito en Form Field)

```tsx
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  error?: boolean
}
```

**Props table:**

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `leftIcon` | `React.ReactNode` | — | Ícono izquierdo (dentro del input) |
| `rightIcon` | `React.ReactNode` | — | Ícono derecho (dentro del input) |
| `error` | `boolean` | `false` | Estado de error (borde rojo, ring rojo) |
| `disabled` | `boolean` | `false` | Estado deshabilitado |

---

## Badge / Tag

**Figma:** Badge `311:2` · Tag (alias)  
**shadcn:** `badge`  
**Ejes Figma:** Variant

```tsx
export const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default:     "border-transparent bg-primary text-primary-foreground",
        secondary:   "border-transparent bg-secondary text-secondary-foreground",
        outline:     "border-border text-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        success:     "border-transparent bg-success-bg text-success",
        warning:     "border-transparent bg-warning-bg text-warning",
        info:        "border-transparent bg-info-bg text-info",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}
```

---

## Alert

**Figma:** página `496:19`  
**shadcn:** `alert`  
**Ejes Figma:** Status (info/success/warning/error/default)

```tsx
export const alertVariants = cva(
  "relative w-full rounded-[var(--radius-lg)] border p-4 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default:     "bg-card text-card-foreground border-border",
        info:        "border-info/30 bg-info-wash text-info [&>svg]:text-info",
        success:     "border-success/30 bg-success-wash text-success [&>svg]:text-success",
        warning:     "border-warning/30 bg-warning-wash text-warning [&>svg]:text-warning",
        destructive: "border-destructive/30 bg-destructive-wash text-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}
```

---

## Card

**Figma:** página `444:2`  
**shadcn:** `card`  
**Ejes Figma:** —

```tsx
// shadcn Card no necesita extensión de Proteus — los tokens CSS hacen el trabajo.
// bg-card, border-border, rounded-lg cubren los valores correctos.
// Exportar Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter.
```

---

## Avatar

**Figma:** página `464:2`  
**shadcn:** `avatar`  
**Ejes Figma:** Size SM/MD/LG

```tsx
export const avatarVariants = cva("relative flex shrink-0 overflow-hidden rounded-full", {
  variants: {
    size: {
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-12 w-12",
    },
  },
  defaultVariants: { size: "md" },
})

export interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> {
  src?: string
  alt?: string
  fallback?: string   // initials, ej. "JD"
}
```

---

## Checkbox

**Figma:** página `391:2`  
**shadcn:** `checkbox`  
**Ejes Figma:** Size SM/MD/LG

```tsx
export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  size?: "sm" | "md" | "lg"
  label?: string
  description?: string
}
```

---

## Switch

**Figma:** página `432:2`  
**shadcn:** `switch`  
**Ejes Figma:** —

Mismas props que shadcn Switch — no se necesita extensión.

---

## Label

**Figma:** página `265:2`  
**shadcn:** `label`  

Sin extensión — el token `text-sm font-medium text-foreground` ya aplica.

---

## Select

**Figma:** página `628:2`  
**shadcn:** `select`  

Compuesto shadcn (`Select`, `SelectTrigger`, `SelectContent`, `SelectItem`) — no requiere extensión.

---

## Dialog

**Figma:** página `640:2` · ComponentSet `1415:88` (Type=Default|Illustration)  
**shadcn:** `dialog`  
**Ejes Figma:** Type=Default | Type=Illustration

```tsx
// Type=Default → Dialog estándar de shadcn
// Type=Illustration → Dialog con slot de ilustración en el body

export interface DialogIllustrationProps {
  illustration?: React.ReactNode  // slot — cualquier contenido
  title?: string
  description?: string
  footer?: React.ReactNode
}
```

---

## Bottom Sheet

**Figma:** página `1433:2` · ComponentSet `1434:156` (Type=Text|Slot)  
**shadcn:** `sheet` (side="bottom")  
**Ejes Figma:** Type=Text | Type=Slot

```tsx
export interface BottomSheetProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
  showHandle?: boolean    // default true — handle pill en la parte superior
  showFooter?: boolean    // default true — footer con botones
  children?: React.ReactNode
  // Regla de diseño: altura total ≤ 80% del viewport (max ~675px en iPhone 14)
}
```

---

## Toast

**Figma:** página `681:2`  
**shadcn:** `sonner` (Toaster de Sonner)  
**Ejes Figma:** Status ×5

```tsx
// API de Sonner:
import { toast } from "sonner"

toast("Mensaje")
toast.success("Guardado correctamente", { description: "Los cambios se han aplicado." })
toast.error("Error al guardar")
toast.warning("Sin conexión — los cambios se guardarán al reconectar")
toast.info("Actualización disponible")
```

---

## Form Field

**Figma:** página `739:2` · ComponentSet `947:32`  
**shadcn:** `form` (react-hook-form)  
**Ejes Figma:** State Default/Focused/Filled/Error/Disabled

```tsx
// Wrapper composable:
export interface FormFieldProps {
  label?: string
  description?: string  // helper text bajo el input
  error?: string        // mensaje de error (muestra el estado error)
  required?: boolean
  children: React.ReactNode  // el input/select/etc.
}
```

---

## Table

**Figma:** página `644:2`  
**shadcn:** `table`  

Sin extensión — shadcn Table ya tiene la estructura correcta.
Agregar sticky header con `position: sticky; top: 0; z-index: 1` si se necesita.

---

## Skeleton

**Figma:** página `678:2`  
**shadcn:** `skeleton`  
**Ejes Figma:** Shape text/block/circle/rectangle/button

```tsx
export const skeletonVariants = cva("animate-pulse rounded-md bg-muted", {
  variants: {
    shape: {
      text:      "h-4 w-full",
      block:     "h-24 w-full",
      circle:    "h-10 w-10 rounded-full",
      rectangle: "h-32 w-full",
      button:    "h-9 w-24",
    },
  },
  defaultVariants: { shape: "text" },
})
```

---

## Tooltip

**Figma:** página `546:2`  
**shadcn:** `tooltip`  

Sin extensión — shadcn Tooltip mapea directamente.

---

## Progress / Progress Bar

**Figma:** Progress `677:2` · Progress Bar `728:2`  
**shadcn:** `progress`  
**Ejes Figma:** Size SM/MD/LG × Status ×4

```tsx
export interface ProgressProps {
  value: number          // 0-100
  size?: "sm" | "md" | "lg"
  status?: "default" | "success" | "warning" | "error"
  showLabel?: boolean
}
```

---

## Empty State

**Figma:** página `697:2` · master `697:3`  
**shadcn:** custom  
**Props Figma:** Icon (INSTANCE_SWAP) · Title · Description · Show Action (BOOL) · Action Label

```tsx
export interface EmptyStateProps {
  icon?: React.ReactNode       // INSTANCE_SWAP en Figma
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
    variant?: "primary" | "outline"
  }
  className?: string
}
```

---

## Accordion

**Figma:** página `533:2`  
**shadcn:** `accordion`  

Sin extensión — shadcn Accordion usa Radix y mapea directo.

---

## Tabs

**Figma:** página `726:2` · ComponentSet `881:23` (Tab / Item)  
**shadcn:** `tabs`  
**Ejes Figma:** Type Pill/Underline × State ×4

```tsx
export const tabsListVariants = cva("inline-flex items-center", {
  variants: {
    type: {
      pill:      "rounded-[var(--radius-lg)] bg-muted p-1",
      underline: "border-b border-border rounded-none bg-transparent p-0",
    },
  },
  defaultVariants: { type: "pill" },
})
```

---

## Drawer

**Figma:** página `1201:2`  
**shadcn:** `drawer` (vaul)  
**Notas:** Body con FILL height entre header fijo y footer fijo.

```tsx
// shadcn Drawer usa Vaul (vaul.emilkowalski.pl)
// Configurar desde="bottom" para el patrón de Proteus
export interface DrawerProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
  description?: string
  children?: React.ReactNode  // body content
  footer?: React.ReactNode
}
```

---

## Nota sobre componentes pendientes

Los 54 componentes siguen el mismo patrón. Para cada uno pendiente de documentar:
1. Ver la sección correspondiente en `shadcn-mapping.md` para el shadcn base
2. Inferir las props desde los `Ejes` y `Properties` en `references/component-catalog.md` de proteus-components
3. Documentar aquí tras la primera implementación
