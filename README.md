# CrashApp

Demo project showcasing Shadcn UI expertise built with React, TypeScript, and Vite.

---

## About

CrashApp uses the [Shadcn UI](https://ui.shadcn.com/) component library for extensible and accessible UI building. The project is scaffolded using **Vite** and **TypeScript** for speedy development and modern tooling. This setup is well-suited for rapid prototyping and component-driven application development.

---

## Development Stack

- **React + TypeScript + Vite**
- [Shadcn UI](https://ui.shadcn.com/)
- ESLint with recommended configs for strict, type-aware linting

---

## Project Setup & Linting

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official React plugins for Vite are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

### Expanding the ESLint configuration

If you are developing a production application, it is recommended to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])