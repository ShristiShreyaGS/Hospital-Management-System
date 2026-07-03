import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  features: 'tests/features/**/*.feature',
  steps: 'tests/steps/**/*.js',
  outputDir: '.features-gen',   // ← add this line
});

export default defineConfig({
  testDir: '.features-gen',     // ← change this to match
  use: {
    baseURL: 'http://localhost:5173',
    headless: false,
  },
});