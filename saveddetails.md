# 📄 Saved Project Details (Full Specs)

This document contains all the detailed settings and configurations for the **HTML Element Styling Demo** project.

---

## 🏗 System Architecture & Configuration

### ⚡ Vite Configuration (`vite.config.ts`)
- **Plugin:** `@vitejs/plugin-react` (React 18+ optimization).
- **Base URL:** `/elementdemo/` (Ensures correct asset paths on GitHub Pages).
- **Build Mode:** Production optimized with CSS minification.

### 🌬 Tailwind CSS v4 Integration
- **Direct Import:** Tailwind v4 uses `@import "tailwindcss";` in `src/styles.css`.
- **Zero Config:** No `tailwind.config.js` or `postcss.config.js` required for modern builds.
- **Engine:** Lightning-fast styling using the new Tailwind Oxide engine.

### 🧩 Custom React Hook: `useElementStyles.ts`
- **State Management:** `useState` for tracking object of type `CSSProperties`.
- **Performance:** `useCallback` for `updateStyle` and `resetStyles` to prevent unnecessary re-renders.
- **Reactive Output:** Automatically converts numeric state (e.g., `16`) into CSS-ready strings (e.g., `"16px"`).
- **Default Properties:**
  - `color`: `#000000`
  - `backgroundColor`: `#ffffff`
  - `fontSize`: `16`
  - `padding`: `12`
  - `margin`: `8`
  - `borderWidth`: `1`
  - `borderColor`: `#e2e8f0`
  - `borderRadius`: `8`

---

## 🔧 Linting & Quality Control

### 🧹 ESLint 9 (Flat Configuration)
- **File:** `eslint.config.js`
- **Ruleset:**
  - `js.configs.recommended` (Core JavaScript)
  - `...tseslint.configs.recommended` (TypeScript specific)
  - `plugin:react-hooks/recommended` (React Hook safety)
  - `plugin:prettier/recommended` (Integrates Prettier formatting into linting)
- **Customizations:** 
  - `react-refresh/only-export-components` (Warn for fast refresh compatibility)
  - `prettier/prettier: error` (Treats formatting issues as fatal linting errors)

### ✨ Prettier Configuration (`.prettierrc`)
- `semi`: `true`
- `trailingComma`: `"all"`
- `singleQuote`: `true`
- `printWidth`: `80`
- `tabWidth`: `2`
- `endOfLine`: `"auto"` (Prevent Windows/Linux line-ending conflicts)

---

## 📦 Dependency Breakdown

### Runtime Dependencies (`dependencies`)
- `react` & `react-dom` (v18.2+): Core framework.

### Development Tools (`devDependencies`)
- **Vite & TS Tools:** `@vitejs/plugin-react`, `typescript`, `typescript-eslint`, `@types/react`, `@types/react-dom`.
- **Styling Pipeline:** `tailwindcss` (v4), `@tailwindcss/postcss`, `postcss`, `autoprefixer`.
- **Linting Engine:** `eslint` (v9), `@eslint/js`, `globals`, `eslint-config-prettier`, `eslint-plugin-prettier`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`.

---

## 🚀 Deployment Pipeline (GitHub Actions)
- **Workflow Path:** `.github/workflows/deploy.yml`
- **Triggers:** Push to `main` branch.
- **Workflow Stages:**
  1. **Checkout:** Pull source code.
  2. **Install:** `npm install --force` to handle strict peer dependency resolution.
  3. **Lint:** `npm run lint` (Must pass or deploy fails).
  4. **Build:** `npm run build` (Generates `/dist` folder).
  5. **Deploy:** Uses `actions/deploy-pages@v4` to host the `/dist` directory.

---

## 🛠 Script Commands Reference
- `npm run dev`: Start Vite development server.
- `npm run build`: Strict pipeline (Lint -> Type Check -> Build).
- `npm run lint`: Run ESLint 9 check.
- `npm run format`: Apply Prettier formatting to all files.
- `npm run preview`: Serve the production build locally.

---

## 🗂 File Structure Overview
```text
elementdemo/
├── .github/workflows/deploy.yml   # CI/CD Pipeline
├── src/
│   ├── components/
│   │   ├── ControlPanel.tsx       # Styling sidebar & CSS exporter
│   │   └── ElementPreview.tsx     # Hero element showcase
│   ├── hooks/
│   │   └── useElementStyles.ts    # Styling state logic
│   ├── App.tsx                    # Main Layout & Integration
│   ├── main.tsx                   # React Entry Point
│   └── styles.css                 # Global CSS & Tailwind Import
├── eslint.config.js               # ESLint 9 Flat Config
├── tsconfig.json                  # TypeScript Compiler Settings
├── vite.config.ts                 # Vite Environment Setup
└── README.md                      # General Documentation
```
