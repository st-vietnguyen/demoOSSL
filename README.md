# OSS License Demo

A Vite + React demo project that automatically generates an Open Source Software (OSS) license list during the build process.

## Features

- ✨ Automatically extracts license information from production dependencies
- 📄 Generates `oss-license.json` during build
- 🎨 Modern dark-themed UI to display licenses
- 🔍 Search functionality to filter packages
- 📱 Responsive design

## How It Works

### Build-Time License Generation

This project uses **`rollup-plugin-license`** to extract license information during the build process. Here's how it works:

1. **Rollup Integration**: Vite uses Rollup under the hood for production builds. The `rollup-plugin-license` plugin hooks into Rollup's build process.

2. **Dependency Scanning**: During the build, the plugin scans all third-party dependencies that are bundled into your application.

3. **License Extraction**: For each dependency, the plugin extracts:
   - Package name and version (from `package.json`)
   - License type (from `package.json` license field)
   - Repository URL
   - Full license text (from LICENSE file in node_modules)
   - Author information
   - Package description

4. **JSON Generation**: The plugin uses a custom template function to format the extracted data as JSON and writes it to `dist/oss-license.json`.

5. **Production Dependencies Only**: By default, the plugin only includes dependencies that are part of your production bundle (not devDependencies).

### Key Configuration (vite.config.js)

```javascript
import license from 'rollup-plugin-license';

export default defineConfig({
  plugins: [
    react(),
    license({
      thirdParty: {
        includePrivate: false,
        output: {
          file: path.join(__dirname, 'dist', 'oss-license.json'),
          template(dependencies) {
            const licenseData = dependencies.map(dep => ({
              name: dep.name,
              version: dep.version,
              licenses: dep.license,
              repository: dep.repository,
              licenseText: dep.licenseText,
              author: dep.author,
              description: dep.description
            }));
            return JSON.stringify(licenseData, null, 2);
          }
        }
      }
    })
  ]
});
```

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

This runs the app in development mode using the example `src/oss-license.json` file.

### Build

```bash
pnpm build
```

This:
1. Bundles the React application
2. Automatically generates `dist/oss-license.json` with real license data
3. Outputs everything to the `dist/` directory

### Preview Production Build

```bash
pnpm preview
```

This serves the production build locally so you can see the actual generated license file in action.

## Project Structure

```
oss-license-demo/
├── dist/                    # Build output (generated)
│   ├── oss-license.json     # Generated license file
│   ├── index.html
│   └── assets/
├── src/
│   ├── App.jsx              # Main React component
│   ├── main.jsx             # React entry point
│   ├── index.css            # Styles
│   └── oss-license.json     # Example data for development
├── index.html               # HTML template
├── package.json
├── vite.config.js           # Vite + license plugin config
└── README.md
```

## Output Format

The generated `oss-license.json` contains an array of objects:

```json
[
  {
    "name": "react",
    "version": "18.2.0",
    "licenses": "MIT",
    "repository": "https://github.com/facebook/react",
    "licenseText": "MIT License\n\nCopyright (c) Meta Platforms...",
    "author": "Meta Platforms, Inc.",
    "description": "React is a JavaScript library for building user interfaces."
  }
]
```

## Technologies Used

- **Vite** - Next generation frontend build tool
- **React** - UI library
- **rollup-plugin-license** - Rollup plugin for license extraction
- **Vanilla CSS** - Styling with CSS custom properties

## License

MIT
