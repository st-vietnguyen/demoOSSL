import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import license from 'rollup-plugin-license';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load only deps from package.json
const pkgJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const allowedDeps = Object.keys(pkgJson.dependencies || {});

export default defineConfig({
  plugins: [
    react(),
    license({
      thirdParty: {
        includePrivate: false,
        output: {
          file: path.join(__dirname, 'dist', 'oss-license.json'),
          template(dependencies) {
            // filter only deps declared in package.json
            const filtered = dependencies.filter(dep =>
              allowedDeps.includes(dep.name)
            );

            const licenseData = filtered.map(dep => ({
              name: dep.name || 'Unknown',
              version: dep.version || 'Unknown',
              publisher: dep.publisher || 'Unknown',
              licenseText: dep.licenseText || 'Unknown',
            }));

            return JSON.stringify(licenseData, null, 2);
          }
        }
      }
    })
  ]
});
