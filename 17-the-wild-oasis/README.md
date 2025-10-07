# The Wild Oasis

## Supabase setup

Supabase is setup with local env vars so that any project specific keys are not leaked in the public GitHub repo. They should be put into a `.env.local` file in the root of the project with the following contents:

```shell
VITE_SUPABASE_URL=<supabase_project_url> # Dashboard -> Project Settings -> Data API -> Project URL section
VITE_SUPABASE_PUBLISHABLE_KEY=<supabase_project_url> # Dashboard -> Project Settings -> API keys -> Publishable key section
SUPABASE_PROJECT_ID=luttuwzpgsetpqmlgmjx # Dashboard -> Project Settings -> General -> General settings section
```

### Supbase CLI

The Supabas CLI package is added to the dev dependencies so it should already be installed if you have installated the project dependencies. You should login with the CLI to run other commands:

```bash
npx supabase login
```

### Supabase Types

A command to generate Typescript types for the Supabase client also has been added to the package.json. For it to work properly the `.env.local` file should be present. The command should be rerun whenever the tables of the database are updated.

**SEE BELOW FOR ORIGINAL README FROM PROJECT INIT WITH VITE AS REFERENCE.**

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

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
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
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
```
