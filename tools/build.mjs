#!/usr/bin/env node
// Builds ./index.html — ONE self-contained offline page (≤ 1.5 MB):
//   * vendor/three.module.min.js wrapped in an IIFE (__THREE)
//   * vendor/addons/* and src/* ES modules bundled in dependency order
//   * src/style.css inlined; zero network requests, works from file://
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const rel = p => path.relative(ROOT, p);
const MAX_BYTES = 1.5 * 1024 * 1024;

function wrapThree() {
  const src = fs.readFileSync(path.join(ROOT, 'vendor/three.module.min.js'), 'utf8');
  const m = src.match(/export\s*\{([^}]*)\}\s*;?\s*$/);
  if (!m) throw new Error('vendor/three.module.min.js: export list not found');
  const body = src.slice(0, m.index);
  if (/\bimport\s*[{*(]|import\.meta/.test(body)) throw new Error('three.module.min.js has imports');
  const pairs = m[1].split(',').map(s => s.trim()).filter(Boolean).map(s => {
    const p = s.split(/\s+as\s+/);
    return p.length === 2 ? `${p[1]}:${p[0]}` : `${p[0]}:${p[0]}`;
  });
  return `const __THREE=(()=>{${body}\nreturn{${pairs.join(',')}};})();`;
}

function resolveImport(fromAbs, spec) {
  if (spec === 'three') return { builtin: '__THREE' };
  if (spec.startsWith('three/addons/')) {
    return { abs: path.join(ROOT, 'vendor/addons', spec.slice('three/addons/'.length)) };
  }
  if (spec.startsWith('.')) {
    return { abs: path.resolve(path.dirname(fromAbs), spec) };
  }
  throw new Error(`${rel(fromAbs)}: unsupported import "${spec}"`);
}

function bundle(entry) {
  const mods = new Map();
  const order = [];
  const visit = (abs, stack = []) => {
    if (mods.has(abs)) {
      if (stack.includes(abs)) throw new Error('circular import: ' + [...stack, abs].map(rel).join(' -> '));
      return mods.get(abs);
    }
    const rec = { id: `__m${mods.size}`, abs };
    mods.set(abs, rec);
    let src = fs.readFileSync(abs, 'utf8');
    const header = [];
    src = src.replace(/^import\s+([\s\S]*?)\s+from\s+['"]([^'"]+)['"];?[ \t]*$/gm, (all, what, spec) => {
      what = what.trim();
      const targetInfo = resolveImport(abs, spec);
      const target = targetInfo.builtin || visit(targetInfo.abs, [...stack, abs]).id;
      const ns = what.match(/^\*\s+as\s+(\w+)$/);
      if (ns) {
        header.push(`const ${ns[1]}=${target};`);
      } else if (/^\{[\s\S]*\}$/.test(what)) {
        const inner = what.slice(1, -1).split(',').map(s => s.trim()).filter(Boolean)
          .map(s => s.replace(/\s+as\s+/, ':')).join(',');
        header.push(`const {${inner}}=${target};`);
      } else if (/^[A-Za-z_$][\w$]*$/.test(what)) {
        header.push(`const ${what}=${target}.default;`);
      } else {
        throw new Error(`${rel(abs)}: unsupported import form "${what}"`);
      }
      return '';
    });
    if (/^\s*import\s/m.test(src)) throw new Error(`${rel(abs)}: unparsed import statement`);
    const exportsList = [];
    src = src.replace(/^export\s+default\s+/gm, () => {
      exportsList.push('default:__default');
      return 'const __default=';
    });
    src = src.replace(/^export\s+(async\s+function\*?|function\*?|class|const|let|var)\s+([A-Za-z_$][\w$]*)/gm, (all, kw, name) => {
      exportsList.push(name);
      return `${kw} ${name}`;
    });
    src = src.replace(/^export\s*\{([^}]*)\};?/gm, (all, list) => {
      for (const s of list.split(',').map(x => x.trim()).filter(Boolean)) {
        const p = s.split(/\s+as\s+/);
        exportsList.push(p.length === 2 ? `${p[1]}:${p[0]}` : p[0]);
      }
      return '';
    });
    if (/^export\s/m.test(src)) throw new Error(`${rel(abs)}: unsupported export form`);
    rec.code = `const ${rec.id}=(()=>{\n${header.join('\n')}\n${src}\nreturn{${exportsList.join(',')}};\n})();`;
    order.push(rec);
    return rec;
  };
  visit(path.resolve(entry));
  return order.map(r => `// ${rel(r.abs)}\n${r.code}`).join('\n');
}

function squeezeJS(code) {
  const out = [];
  let inDoc = false;
  for (const line of code.split('\n')) {
    const t = line.trim();
    if (inDoc) { if (t.endsWith('*/')) inDoc = false; continue; }
    if (t.startsWith('/**') || (t.startsWith('/*') && !t.includes('*/'))) { if (!t.endsWith('*/')) inDoc = true; continue; }
    if (t.startsWith('//') || t === '') continue;
    out.push(t);
  }
  return out.join('\n');
}

const squeezeCSS = css => css
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\s+/g, ' ')
  .replace(/\s*([{};:,>])\s*/g, '$1')
  .replace(/;}/g, '}')
  .trim();

const threeCode = wrapThree();
const appJS = squeezeJS(bundle(path.join(ROOT, 'src/main.js')));
for (const [re, why] of [
  [/\bfetch\s*\(/, 'fetch()'],
  [/XMLHttpRequest/, 'XMLHttpRequest'],
  [/\bimport\s*\(/, 'dynamic import'],
  [/new\s+WebSocket/, 'WebSocket'],
  [/navigator\.sendBeacon/, 'sendBeacon'],
]) {
  if (re.test(appJS)) throw new Error(`app code must not use ${why} (offline page)`);
}

const css = squeezeCSS(fs.readFileSync(path.join(ROOT, 'src/style.css'), 'utf8'));
const template = fs.readFileSync(path.join(ROOT, 'src/index.template.html'), 'utf8');
const js = `${threeCode}\n${appJS}`.replace(/<\/script/gi, '<\\/script');
const html = template
  .replace('/*__CSS__*/', () => css)
  .replace('/*__JS__*/', () => js);

if (/\/\*__CSS__\*\/|\/\*__JS__\*\//.test(html)) throw new Error('template placeholder not replaced');
if (/<(link|img|iframe|source|video|audio|script)\b[^>]*\b(src|href)\s*=\s*["']?https?:/i.test(html)) {
  throw new Error('external resource reference in HTML');
}

fs.writeFileSync(path.join(ROOT, 'index.html'), html);
const bytes = Buffer.byteLength(html);
const kb = n => `${(n / 1024).toFixed(1)} KB`;
console.log(`index.html: ${kb(bytes)} (${(bytes / (1024 * 1024)).toFixed(2)} MB) [three ${kb(threeCode.length)}, app ${kb(appJS.length)}, css ${kb(css.length)}]`);
if (bytes > MAX_BYTES) {
  console.error(`FAIL: index.html is ${bytes} bytes > 1.5 MB`);
  process.exit(1);
}
