import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { createServer } from 'vite';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', ssr: { resolve: { externalConditions: ['module-sync'] } } });
const saved = new Map();
globalThis.localStorage = { getItem: key => saved.get(key) ?? null, setItem: (key, value) => saved.set(key, value) };
function environment(search = '', languages = ['es-ES']) {
  saved.clear();
  globalThis.window = {
    location: { search, pathname: '/animepackopening', href: `http://localhost/animepackopening${search}` },
    history: { state: {}, replaceState(_state, _unused, url) { window.location.search = url.search; window.location.href = url.href; } },
  };
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { languages } });
}
try {
  const { LanguageProvider, useLanguage } = await server.ssrLoadModule('/src/Home/context/LanguageContext.jsx');
  let context;
  function Probe() { context = useLanguage(); return null; }
  function probe() { renderToStaticMarkup(React.createElement(LanguageProvider, null, React.createElement(Probe))); return context; }
  const root = new URL('../src/AnimePackOpening/', import.meta.url);
  const files = (await readdir(root)).filter(name => name.endsWith('.jsx'));
  const components = (await readdir(new URL('components/', root))).filter(name => ['AnimeHeader.jsx', 'AnimeFooter.jsx', 'CookieBanner.jsx'].includes(name));
  const keys = new Set();
  for (const path of [...files, ...components.map(name => `components/${name}`)]) {
    const source = await readFile(new URL(path, root), 'utf8');
    for (const match of source.matchAll(/\bt\("([^"]+)"\)/g)) keys.add(match[1]);
  }
  let translationKeys;
  for (const language of ['es', 'en']) {
    environment(`?lang=${language}`);
    const { t, lang } = probe();
    assert.equal(lang, language);
    const currentKeys = Object.keys(t.apo).sort();
    if (translationKeys) assert.deepEqual(currentKeys, translationKeys, 'Both dictionaries must cover the same keys');
    translationKeys = currentKeys;
    for (const key of keys) {
      assert.equal(typeof t(key), 'string', `${language}: ${key}`);
      assert.notEqual(t(key), key, `Missing ${language}: ${key}`);
      assert.equal(t(`apo.${key}`), t(key));
    }
    for (const file of files) {
      const { default: Page } = await server.ssrLoadModule(`/src/AnimePackOpening/${file}`);
      const markup = renderToStaticMarkup(React.createElement(LanguageProvider, null,
        React.createElement(MemoryRouter, null, React.createElement(Page))));
      assert.ok(markup.includes(language === 'es' ? 'Política de Privacidad' : 'Privacy Policy'), file);
      for (const key of keys) assert.ok(!markup.includes(`>${key}<`), `${file}: ${key}`);
    }
  }
  environment(); assert.equal(probe().lang, 'es');
  environment('', ['en-US']); assert.equal(probe().lang, 'en');
  environment('', ['fr-FR']); assert.equal(probe().lang, 'es');
  environment('?lang=invalid'); assert.equal(probe().lang, 'es');
  environment('?lang=en');
  probe().setLanguage('es');
  assert.equal(window.location.search, '?lang=es');
  assert.equal(probe().lang, 'es');
  window.location.search = ''; assert.equal(probe().lang, 'es');
  saved.set('language', 'en'); assert.equal(probe().lang, 'en');
  window.location.search = '?lang=es'; assert.equal(probe().lang, 'es');
  assert.ok(context.t.hero, 'Portfolio translations remain available');
  console.log(`PASS: ${keys.size} translation keys, ${files.length} pages in both languages, detection, persistence and query overrides.`);
} finally {
  await server.close();
}
