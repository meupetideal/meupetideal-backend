import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src', '!src/**/*.{spec,e2e-spec}.ts', '!src/**/*.html'],
  tsconfig: 'tsconfig.build.json',
  sourcemap: true,
});
