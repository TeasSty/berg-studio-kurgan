// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const repo = 'berg-studio-kurgan';
const site = `https://teassty.github.io/${repo}`;

export default defineConfig({
  site,
  base: `/${repo}/`,
  integrations: [sitemap()],
  compressHTML: true,
});
