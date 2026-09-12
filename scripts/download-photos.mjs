import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';

const base = path.resolve('public/images');
const downloads = [
  {
    url: 'https://i6.photo.2gis.com/main/branch/10/70000001094154019/common',
    dest: 'hero/specialist.jpg',
  },
  {
    url: 'https://i2.photo.2gis.com/images/profile/30258560147520554_ccca_1920x.jpg',
    dest: 'specialist/portrait.jpg',
  },
  {
    url: 'https://i2.photo.2gis.com/images/profile/30258560112014099_b992_1920x.jpg',
    dest: 'intro/cabinet.jpg',
  },
  {
    url: 'https://i5.photo.2gis.com/images/profile/30258560311960976_5908_1920x.jpg',
    dest: 'safety/cabinet.jpg',
  },
  {
    url: 'https://i7.photo.2gis.com/images/profile/30258560217188631_e284_1920x.jpg',
    dest: 'procedures/contour.jpg',
  },
  {
    url: 'https://i5.photo.2gis.com/images/profile/30258560220781874_8f3b_1920x.jpg',
    dest: 'procedures/biorev.jpg',
  },
  {
    url: 'https://i5.photo.2gis.com/images/profile/30258560336187255_9971_1920x.jpg',
    dest: 'procedures/meso.jpg',
  },
  {
    url: 'https://i8.photo.2gis.com/images/profile/30258560215738709_04b7_1920x.jpg',
    dest: 'procedures/botox.jpg',
  },
  {
    url: 'https://i3.photo.2gis.com/images/profile/30258560186450324_a349_1920x.jpg',
    dest: 'procedures/lipolytics.jpg',
  },
  {
    url: 'https://i5.photo.2gis.com/images/profile/30258560321777187_e446_1920x.jpg',
    dest: 'procedures/smas.jpg',
  },
  {
    url: 'https://i8.photo.2gis.com/images/profile/844424978321458_2e65_1920x.jpg',
    dest: 'procedures/rf.jpg',
  },
  {
    url: 'https://i8.photo.2gis.com/images/profile/30258560192543197_c67d_1920x.jpg',
    dest: 'procedures/teeth.jpg',
  },
  {
    url: 'https://i5.photo.2gis.com/images/profile/30258560317521344_bb84_1920x.jpg',
    dest: 'procedures/bleph.jpg',
  },
];

async function download(url, dest) {
  const filePath = path.join(base, dest);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0', Referer: 'https://2gis.ru/' },
  });
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  await pipeline(res.body, fs.createWriteStream(filePath));
  const size = fs.statSync(filePath).size;
  console.log(`OK ${dest} (${size} bytes)`);
}

for (const item of downloads) {
  try {
    await download(item.url, item.dest);
  } catch (err) {
    console.error(`FAIL ${item.dest}:`, err.message);
  }
}
