// import-illustrations.js
// Figma plugin script (use_figma)
// Requiere: illustrations-svg.json pegado en la variable ILLUSTRATIONS_JSON abajo
//
// Estructura creada:
//   Página "Illustrations" → wrapper FRAME VERTICAL 1424px
//     header (title, description, version, section-label)
//     grid HORIZONTAL WRAP → COMPONENT "Illustration/<slug>" por cada SVG
//
// Ejecutar DESPUÉS de generate-illustrations-json.ps1

// ─── PASO 1: Pegar el contenido de illustrations-svg.json aquí ───────────────
const ILLUSTRATIONS_JSON = {}; // reemplazar con el objeto del JSON
// ─────────────────────────────────────────────────────────────────────────────

const PRIMARY_HEX = '#5747BA'; // color/brand/700 — ya embebido en los SVGs de unDraw
const TARGET_W    = 360;       // ancho estándar por ilustración (px)
const GRID_GAP    = 32;        // espacio entre ilustraciones
const COLS        = 3;

// ── helpers ──────────────────────────────────────────────────────────────────

async function loadFonts() {
  await figma.loadFontAsync({ family: 'Inter',         style: 'Regular' });
  await figma.loadFontAsync({ family: 'Inter',         style: 'SemiBold' });
  await figma.loadFontAsync({ family: 'JetBrains Mono', style: 'Regular' });
}

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0,2),16)/255,
    g: parseInt(h.slice(2,4),16)/255,
    b: parseInt(h.slice(4,6),16)/255,
  };
}

async function getVar(name) {
  const vars = await figma.variables.getLocalVariablesAsync();
  return vars.find(v => v.name === name) || null;
}

async function bindFill(node, varName) {
  const v = await getVar(varName);
  if (!v) return;
  const paint = { type: 'SOLID', color: { r: 0, g: 0, b: 0 } };
  const bound = figma.variables.setBoundVariableForPaint(paint, 'color', v);
  node.fills = [bound];
}

async function bindStroke(node, varName) {
  const v = await getVar(varName);
  if (!v) return;
  const paint = { type: 'SOLID', color: { r: 0, g: 0, b: 0 } };
  const bound = figma.variables.setBoundVariableForPaint(paint, 'color', v);
  node.strokes = [bound];
}

// ── Crea el componente Illustration/<slug> ────────────────────────────────────

async function createIllustrationComponent(slug, svgContent) {
  // 1. Importar SVG → FRAME con paths adentro
  const svgFrame = figma.createNodeFromSvg(svgContent);
  svgFrame.name = 'art';

  // 2. Redimensionar a TARGET_W manteniendo aspect ratio
  const aspect = svgFrame.height / svgFrame.width;
  svgFrame.resize(TARGET_W, Math.round(TARGET_W * aspect));

  // 3. Envolver en COMPONENT
  const comp = figma.createComponent();
  comp.name = `Illustration/${slug}`;
  comp.resize(svgFrame.width, svgFrame.height);
  comp.clipsContent = false;
  comp.fills = [];

  comp.appendChild(svgFrame);
  svgFrame.x = 0;
  svgFrame.y = 0;

  return comp;
}

// ── Crea la página Illustrations ──────────────────────────────────────────────

async function buildPage(components) {
  // Crear nueva página o reusar existente
  let page = figma.root.children.find(p => p.name === 'Illustrations');
  if (!page) {
    page = figma.createPage();
    page.name = 'Illustrations';
  }
  await figma.setCurrentPageAsync(page);
  // Limpiar página si ya tiene contenido
  for (const ch of [...page.children]) ch.remove();

  // ── Wrapper principal (mismo template que otras páginas) ──────────────────
  const wrapper = figma.createFrame();
  wrapper.name = 'Illustrations';
  wrapper.layoutMode = 'VERTICAL';
  wrapper.primaryAxisSizingMode = 'AUTO';
  wrapper.counterAxisSizingMode = 'FIXED';
  wrapper.resize(1424, 100);
  wrapper.primaryAxisSizingMode = 'AUTO';
  wrapper.paddingTop = wrapper.paddingBottom = 48;
  wrapper.paddingLeft = wrapper.paddingRight = 48;
  wrapper.itemSpacing = 40;
  wrapper.cornerRadius = 12;
  wrapper.x = 0;
  wrapper.y = 0;
  await bindFill(wrapper, 'color/background-secondary');
  await bindStroke(wrapper, 'color/ring');
  wrapper.strokeWeight = 2;
  wrapper.strokeAlign = 'INSIDE';
  page.appendChild(wrapper);

  // ── Header ────────────────────────────────────────────────────────────────
  const header = figma.createAutoLayout('VERTICAL', { itemSpacing: 8, name: 'header' });
  header.fills = [];
  header.counterAxisSizingMode = 'FIXED';
  header.layoutSizingHorizontal = 'FILL';
  header.primaryAxisSizingMode = 'AUTO';
  wrapper.appendChild(header);

  // Title
  const title = figma.createText();
  title.name = 'title';
  title.fontName = { family: 'Inter', style: 'SemiBold' };
  title.fontSize = 32;
  title.characters = 'Illustrations';
  await bindFill(title, 'color/foreground');
  header.appendChild(title);

  // Description
  const desc = figma.createText();
  desc.name = 'description';
  desc.fontName = { family: 'Inter', style: 'Regular' };
  desc.fontSize = 16;
  desc.characters = `Pack de ${components.length} ilustraciones SVG basadas en unDraw con estilo flat y color primario del DS (#5747BA). Cada ilustración es un componente independiente de ${TARGET_W}px de ancho, lista para usar en empty states, errores, onboarding y pantallas de autenticación.`;
  await bindFill(desc, 'color/foreground-muted');
  header.appendChild(desc);

  // Version badge
  const version = figma.createText();
  version.name = 'version';
  version.fontName = { family: 'JetBrains Mono', style: 'Regular' };
  version.fontSize = 12;
  version.characters = 'v1.0.0';
  await bindFill(version, 'color/foreground-muted');
  header.appendChild(version);

  // ── Divider ───────────────────────────────────────────────────────────────
  const divider = figma.createLine();
  divider.name = 'divider';
  divider.resize(1328, 0);
  await bindStroke(divider, 'color/ring');
  divider.strokeWeight = 1;
  wrapper.appendChild(divider);

  // ── Section label ─────────────────────────────────────────────────────────
  const label = figma.createText();
  label.name = 'section-label';
  label.fontName = { family: 'JetBrains Mono', style: 'Regular' };
  label.fontSize = 12;
  label.characters = `PACK · ${components.length} ILUSTRACIONES`;
  await bindFill(label, 'color/foreground-muted');
  wrapper.appendChild(label);

  // ── Grid de componentes ───────────────────────────────────────────────────
  const gridW = COLS * TARGET_W + (COLS - 1) * GRID_GAP;
  const grid = figma.createFrame();
  grid.name = 'grid';
  grid.layoutMode = 'HORIZONTAL';
  grid.layoutWrap = 'WRAP';
  grid.primaryAxisSizingMode = 'FIXED';
  grid.counterAxisSizingMode = 'AUTO';
  grid.resize(gridW, 100);
  grid.primaryAxisSizingMode = 'FIXED';
  grid.itemSpacing = GRID_GAP;
  grid.counterAxisSpacing = GRID_GAP;
  grid.fills = [];
  wrapper.appendChild(grid);

  // Agregar cada componente al grid como instancia
  for (const comp of components) {
    const instance = comp.createInstance();
    grid.appendChild(instance);
  }

  return { pageId: page.id, wrapperId: wrapper.id, count: components.length };
}

// ── MAIN ─────────────────────────────────────────────────────────────────────

await loadFonts();

const slugs = Object.keys(ILLUSTRATIONS_JSON);
if (slugs.length === 0) return { error: 'ILLUSTRATIONS_JSON está vacío — pega el contenido del JSON primero' };

// Necesitamos una página temporal para crear los componentes antes de la página final
// Los componentes se crean en la página actual y luego se mueve
const tempPage = figma.root.children[0];
await figma.setCurrentPageAsync(tempPage);

const components = [];
const createdIds = [];

for (const slug of slugs) {
  const comp = await createIllustrationComponent(slug, ILLUSTRATIONS_JSON[slug]);
  tempPage.appendChild(comp);
  components.push(comp);
  createdIds.push(comp.id);
}

const result = await buildPage(components);

// Mover componentes a la página de Illustrations (fuera del wrapper, son la fuente)
const illustPage = figma.root.children.find(p => p.name === 'Illustrations');
await figma.setCurrentPageAsync(illustPage);
for (const comp of components) {
  illustPage.appendChild(comp);
  comp.x = -5000; // fuera del viewport — solo están como fuente de instancias
  comp.y = 0;
}

return {
  ...result,
  createdComponentIds: createdIds,
};
