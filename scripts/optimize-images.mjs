import { readdir, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, basename, join } from 'node:path';
import sharp from 'sharp';

const SRC = 'public/fotky/originals';
const OUT = 'public/fotky';
const DEFAULT_WIDTHS = [640, 1280, 1920];
const HERO_WIDTHS = [1280, 1920, 2560];
const QUALITY = 78;

const sanitize = (name) =>
  name
    .toLowerCase()
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

const isImage = (f) => /\.(jpe?g|png)$/i.test(f);

async function main() {
  if (!existsSync(SRC)) {
    console.error(`Zdrojový priečinok neexistuje: ${SRC}`);
    process.exit(1);
  }
  await mkdir(OUT, { recursive: true });

  const files = (await readdir(SRC)).filter(isImage);
  if (files.length === 0) {
    console.log('Žiadne obrázky na spracovanie.');
    return;
  }

  let total = 0;
  for (const file of files) {
    const src = join(SRC, file);
    const base = sanitize(basename(file));
    const widths = base === 'hero-kamen' ? HERO_WIDTHS : DEFAULT_WIDTHS;

    const img = sharp(src, { failOn: 'none' });
    const meta = await img.metadata();
    console.log(`\n→ ${file}  (${meta.width}×${meta.height}, ${(meta.size / 1024 / 1024).toFixed(2)} MB)`);

    for (const w of widths) {
      const out = join(OUT, `${base}-${w}.webp`);
      const info = await sharp(src)
        .rotate()
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 5 })
        .toFile(out);
      console.log(`   ${out}  ${(info.size / 1024).toFixed(0)} KB`);
      total += info.size;
    }
  }
  console.log(`\nHotovo. Celkový výstup: ${(total / 1024 / 1024).toFixed(2)} MB`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
