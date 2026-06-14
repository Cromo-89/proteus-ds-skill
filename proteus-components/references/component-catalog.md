# Catálogo de componentes — Proteus DS

Referencia de lookup para `setCurrentPageAsync` y `getNodeByIdAsync`. Archivo Figma: `Ohc3OVwwd3MwI4SvIdk3EY`.

**Truco para listar todas las páginas del archivo**: `get_metadata` sin `nodeId` puede devolver solo las páginas ya cargadas por el cliente (lazy loading). Pasar un `nodeId` inválido (e.g. `0:0`) fuerza un error cuyo mensaje incluye la lista COMPLETA de páginas con sus IDs.

---

## Páginas por categoría (IDs de PÁGINA/canvas — verificados 2026-06-11)

| Categoría | # | Componentes (con ID de página) |
|---|---|---|
| **📝 Forms** (separador `1072:2`) | 15 | Checkbox `391:2` · Date Picker `718:2` · File Upload `706:2` · Form Field `739:2` · Input `331:2` · Number Input `711:2` · OTP Input `713:2` · Password Input `955:2` · Phone Input `956:2` · Radio `419:2` · Search `712:2` · Select `628:2` · Slider `705:2` · Switch `432:2` · Textarea `668:2` |
| **🧭 Navigation** (separador `1072:3`) | 6 | Breadcrumb `696:2` · Navbar `714:2` · Pagination `695:2` · Sidebar `736:2` · Stepper `715:2` · Tabs `726:2` |
| **🪟 Overlays** (separador `1072:4`) | 8 | Command Palette `724:2` · Context Menu `716:2` · Dialog `640:2` · Dropdown Menu `612:2` · Notification Center `747:2` · Popover `597:2` · Toast `681:2` · Tooltip `546:2` |
| **🔔 Feedback** (separador `1072:5`) | 6 | Alert `496:19` · Banner `704:2` · Empty State `697:2` · Progress `677:2` · Progress Bar `728:2` · Skeleton `678:2` |
| **🖼️ Display** (separador `1072:6`) | 17 | Accordion `533:2` · Avatar `464:2` · Avatar Group `732:2` · Badge `311:2` · Button `166:2` · Card `444:2` · Chat Message `755:2` · Chip `710:2` · Divider `744:2` · Feature Card `763:2` · Label `265:2` · List Item `707:2` · Rating `729:2` · Stat Card `708:2` · Table `644:2` · Timeline `727:2` · Toggle Group `733:2` |

Otras páginas clave: Cover `0:1` · divisor `C O M P O N E N T S` `53:756` (Context card `259:2`) · Icons `207:2` · separador `↓ T E M P L A T E S` `1086:2`.

---

## ComponentSets, ejes y properties (auditado 2026-06-11)

Los 19 formales de Stage 2 están detallados en `references/learnings.md`. Esta tabla cubre los componentes construidos después (más Tabs y Divider, que son rebuilds). Properties listadas sin tipo = TEXT.

| Componente | Set / Master | Ejes (variantes) | Properties |
|---|---|---|---|
| Date Picker | `Cell` `718:15` · `Calendar` `854:216` · `Date Picker` `857:191` | Cell: State ×6 · Calendar: View Month/Year · Picker: State Closed/Open | — |
| File Upload | `706:32` | State Default/Hover/Filled | Title · Description · Hint |
| Form Field | `Item` `947:32` | State Default/Focused/Filled/Error/Disabled | — |
| Number Input | `711:24` | State Default/Focus/Disabled | Value |
| OTP Input | `713:47` | State Default/Focus/Filled/Error | — |
| Password Input | `957:62` | Size ×3 × State ×5 (15 var.) | Placeholder · Helper Text |
| Phone Input | `958:2` | Size ×3 × State ×5 (15 var.) | Country Code · Placeholder · Helper Text |
| Search | `712:35` | State Default/Focus/Filled/Disabled | Query · Show Clear (BOOL) |
| Slider | `705:15` | State Default/Focus/Disabled | Value |
| Textarea | `668:23` | State ×5 | Placeholder · Helper Text |
| Breadcrumb | `Item` `696:13` | State Default/Active | Label |
| Navbar | `714:38` | Type Desktop/Mobile/Mobile Open | — |
| Pagination | `Item` `695:27` | Type Page/Ellipsis/Previous/Next × State ×3 (8 var.) | Label |
| Sidebar | `Item` `905:80` · `SubItem` `906:60` · `Sidebar` `909:133` | Item: Type Link/Section/Separator × HasSubItems × State ×4 (10 var.) · SubItem: State ×4 · Sidebar: Expanded/Collapsed | — |
| Stepper | `Step` `715:17` | State Pending/Active/Completed | Number · Label |
| Tabs (rebuild) | `Tab / Item` `881:23` | Type Pill/Underline × State ×4 | — |
| Command Palette | `Result` `724:15` | Type Item/Section × State Default/Hover (3 var.) | — |
| Context Menu | `Item` `716:42` | Type Default/Danger/Disabled/Separator/Submenu × State ×2 (8 var.) | Label · Shortcut |
| Notification Center | `Notification / Item` `747:18` | State Unread/Read | — |
| Toast | `681:53` | Status ×5 | Title · Description |
| Banner | `704:53` | Status ×5 | Title · Description · Show Description (BOOL) · Show Close (BOOL) |
| Empty State | master único `697:3` | — | Icon (INSTANCE_SWAP) · Title · Description · Show Action (BOOL) · Action Label |
| Progress | `934:2` | Size SM/MD/LG × Status ×4 (12 var.) | — |
| Progress Bar | `936:2` | Size ×3 × Status ×4 (12 var.) | Value |
| Skeleton | `678:8` | Shape Text/Block/Circle/Rectangle/Button | — |
| Avatar Group | `1007:47` | Size SM/MD/LG | — |
| Chat Message | `Chat / Message` `755:20` | Type Received/Sent/System | — |
| Chip | `710:29` | Type Filter/Action × State ×3 | Label |
| Divider (rebuild) | `Line` `744:13` | Orientation × Style (4 var.) | — |
| Feature Card | `Card` `763:43` | Color Purple/Green/Blue/Orange/Red | — |
| List Item | `707:35` | State ×4 | Title · Subtitle · Show Subtitle (BOOL) · Show Chevron (BOOL) |
| Rating | `Star` `729:9` | State Full/Half/Empty | — |
| Stat Card | `708:45` | Trend Neutral/Positive/Negative | Metric · Value · Period |
| Timeline | `Item` `727:35` | Type Pending/Active/Completed/Error | — |
| Toggle Group | `Item` `896:76` | Content Text/Icon/Both × State ×4 (12 var.) | — |

> **Nota sobre IDs (2026-06-11)**: los IDs entre paréntesis en `learnings.md` son **IDs de ComponentSet**, NO de página. Dos componentes fueron reemplazados después del cierre de Stage 2: Separator → Divider (página `744:2`, set `744:13`) y Tab → Tab / Item (página `726:2`, set `881:23`).

---

## Foundations pages — IDs de templates

| Página | ID nodo | Contenido |
|---|---|---|
| `Grid & Breakpoints` | `1077:2` | 3 breakpoints (Mobile 375 · Tablet 768 · Desktop 1440) + grids dibujados con rectángulos de columna |
| `↓ T E M P L A T E S` | `1086:2` | Separador de sección |
| `Auth` | `1086:3` | Login card centrado — campo email, password, CTA primario, link registro |
| `Dashboard` | `1086:4` | Sidebar 240px + topbar 56px + 4 stat cards + chart placeholder + actividad reciente |
| `Settings` | `1086:5` | Sidebar app + nav de ajustes 220px + form card (2 cols) con campos y botón guardar |
| `Empty · Error` | `1086:6` | Dos pantallas 1440×900: Error 404 (card centrado, botones) · Estado vacío (ilustración, feature list, CTA) |
| `Dark · Light Mode` | `1091:2` | Comparación side-by-side: paleta de colores, mini shell, botones, formularios, badges y notification card en ambos modos |

---

## Icon ID map — 76 íconos

Todos viven en la página `Icons` (`207:2`). Acceso cross-page con `await figma.getNodeByIdAsync(id)` sin cambiar de página.

```
home=208:4 search=208:7 settings=208:10 close=208:13 check=208:16 add=208:19
menu=208:22 notifications=208:25 person=208:28 star=208:31 favorite=208:34
edit=208:37 delete=208:40 arrow_back=208:43 arrow_forward=208:46 share=208:49
download=208:52 upload=208:55 visibility=208:58 lock=208:61 mail=208:64
calendar_today=208:67 filter_list=208:70 sort=208:73 more_vert=208:76
expand_more=208:79 chevron_right=208:82 info=208:85 warning=208:88 error=208:91
check_circle=208:94 help=208:97 logout=208:100 login=208:103 tune=224:4
done_all=1048:4 google=1102:4
expand_less=1208:4 open_in_new=1208:7 drag_indicator=1208:10 refresh=1208:13
content_copy=1208:16 link=1208:19 bookmark=1208:22 archive=1208:25
attach_file=1208:28 undo=1208:31 redo=1208:34 chevron_left=1208:37
first_page=1208:40 last_page=1208:43 arrow_upward=1208:46 arrow_downward=1208:49
schedule=1208:52 pending=1208:55 radio_button_unchecked=1208:58
indeterminate_check_box=1208:61 circle=1208:64 send=1208:67 reply=1208:70
comment=1208:73 phone=1208:76 video_call=1208:79 image=1208:82
folder_open=1208:85 description=1208:88 play_arrow=1208:91 pause=1208:94
cloud_upload=1208:97 bar_chart=1208:100 trending_up=1208:103
trending_down=1208:106 pie_chart=1208:109 shopping_cart=1208:112
credit_card=1208:115 receipt=1208:118
```
