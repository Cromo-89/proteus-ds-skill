# Button v0.1.0 — Recetas de implementación

Registro de las recetas descubiertas durante la implementación de Button. Aplican a cualquier componente que use INSTANCE_SWAP, icon slots, o bulk clone + combineAsVariants.

---

## Variable-resolution cache — puede quedar "stuck" tras bulk clone + `combineAsVariants`

Después de clonar 15 variantes y combinarlas en un ComponentSet, el screenshot mostraba colores incorrectos — el fondo del ComponentSet como gris claro y los botones "Primary" en negro puro — aunque `boundVariables.color` apuntaba correctamente a las variables correctas (ID correcto, sin overrides en la cadena de ancestros).

**Diagnóstico**: crear un nodo nuevo en la misma página y bindear la misma variable con el mismo código → resolvía correctamente. Eso aisló el problema al caché de color renderizado de los nodos existentes, no al binding ni al modo del archivo.

**Fix**: forzar que Figma recompute todas las resoluciones de variables en la página toggleando el modo explícito de la colección afectada:
```js
page.setExplicitVariableModeForCollection(semanticCollection, '15:1'); // Light
// luego back:
page.setExplicitVariableModeForCollection(semanticCollection, '15:0'); // Dark
// luego reset al default:
page.setExplicitVariableModeForCollection(semanticCollection, semanticCollection.defaultModeId);
```
Este único toggle arregló las 15 variantes de golpe — los bindings siempre fueron correctos, solo el render cacheado estaba stale.

**Regla**: si una matriz recién construida muestra colores implausibles pero `boundVariables` lee correctamente en todos los nodos, no re-bindear — togglear el modo explícito de la colección antes de asumir que los bindings están rotos.

---

## Page wrapper — construirlo primero

Button se construyó suelto en el canvas (header frame + ComponentSet flotante + labels de filas) y se wrappe después. Funcionó pero requirió calcular bounding boxes y reparentar nueve nodos con coordenadas ajustadas.

**Para el próximo componente**: crear el page wrapper PRIMERO (receta del Workflow step 5) y construir el header + variant grid como hijos desde el inicio. Ahorra un pase completo de retrofit.

---

## Icon placeholder tinting

El frame `icon` placeholder (16×16) se bindea al mismo color variable que el texto hermano `label` — leer `label.fills[0].boundVariables.color.id`, obtener esa variable, y reusar para el fill del icon. Esto mantiene el tinte del icono automáticamente consistente con el texto en cada variante de Style sin mapear manualmente 5 nombres de token.

---

## `Show Icon` → `Show Icon Left` / `Show Icon Right`

Una vez que existía la librería de íconos vectoriales, el único boolean `Show Icon` (un placeholder solo izquierda) se reemplazó con **dos booleans independientes** — `Show Icon Left` y `Show Icon Right` — para que un botón pueda tener ícono líder, ícono trailer, o ambos.

Receta validada en las 15 variantes × 2 lados sin errores:

1. `componentSet.addComponentProperty('Show Icon Left', 'BOOLEAN', false)` — retorna la key completa `"Name#id"` necesaria para `componentPropertyReferences`.
2. Por variante: renombrar el `icon` existente → `icon-left`, rewirear `componentPropertyReferences = { visible: leftKey }`.
3. **Clonar → reparentar → wirear — en ese orden exacto.** `iconLeft.clone()` seguido de `iconRight.componentPropertyReferences = {...}` tira `"Can only set component property references on symbol sublayer"` — un clone no es sublayer del symbol hasta que haya sido `insertChild`'d en la variante. Reparentar primero (`variant.insertChild(labelIdx + 1, iconRight)`), *después* setear la referencia.
4. `componentSet.deleteComponentProperty(oldKey)` — buscar la key via `Object.keys(componentSet.componentPropertyDefinitions).find(k => k.startsWith('Show Icon#'))` en vez de hardcodear el sufijo `#id`.
5. Validar con **instancia temporal**: `variant.createInstance()` → `instance.setProperties({...})` → `screenshot()` → `instance.remove()`.

Este patrón generaliza a cualquier par de "slots" (prefix/suffix, leading/trailing) — clonar el placeholder, no el machinery de properties.

---

## Wiring `Icon Left` / `Icon Right` como `INSTANCE_SWAP` reales

Una vez que los booleans `Show Icon Left/Right` existían, los slots seguían siendo frames tintados vacíos — se mostraban/ocultaban pero no podían mostrar íconos reales. Paso final: reemplazar cada placeholder FRAME con una `INSTANCE` viva de `Icon/star` wireable como `INSTANCE_SWAP`.

Receta validada en las 15 variantes × 2 lados = 30 instancias sin errores:

1. `componentSet.addComponentProperty('Icon Left', 'INSTANCE_SWAP', '208:31')` — `defaultValue` para INSTANCE_SWAP es un **node ID** string (el ID de `Icon/star`), no una key.
2. `componentSet.editComponentProperty(fullKey, { preferredValues: [...] })` — `preferredValues` es `{ type: 'COMPONENT', key: <component.key> }[]`, usando el **`.key`** de cada ícono (el hash de librería, disponible incluso en componentes locales no publicados).
3. **El mismo bug de clone/reparent/wire aplica a `createInstance()`.** Una instancia recién creada no es "symbol sublayer" hasta que haya sido `insertChild`'d en la variante — setear referencias antes de reparentar tira el mismo error. Orden: `master.createInstance()` → `variant.insertChild(idx, instance)` → `placeholder.remove()` → *luego* `instance.componentPropertyReferences = { visible: visKey, mainComponent: swapKey }`.
4. Re-tintear la nueva instancia para que coincida con su variante: `instance.findOne(n => n.type === 'VECTOR')` (todos los `Icon/<name>` comparten la estructura `COMPONENT > Frame > Vector`), leer el `fills[0].boundVariables.color.id` del label, obtener la variable, `setBoundVariableForPaint` en el fill del vector. Este tinte **sobrevive cualquier futuro INSTANCE_SWAP** — cambiar `Icon Left` de `star` a `arrow_back` mantiene el mismo binding de fill en el Vector.
5. Validar: `node.componentPropertyReferences.{visible,mainComponent}` coincidan con las keys esperadas, `node.mainComponent.name === 'Icon/star'`, tamaño matches la escala del Size-variant (Small=16 / Medium=20 / Large=24 px).

Property set final de `Button`: `Label` (TEXT), `Show Icon Left` / `Show Icon Right` (BOOLEAN), `Icon Left` / `Icon Right` (INSTANCE_SWAP, default `Icon/star`, scoped a los 37 íconos), `Variant` / `Size` (VARIANT) — 15 variantes, wirings end-to-end desde boolean visibility hasta instancias de íconos vectoriales auto-tintados y swappables.
