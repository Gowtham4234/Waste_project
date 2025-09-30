# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project type: Vite + React + TypeScript + Tailwind + shadcn-style UI, TanStack Query, React Router, Supabase.

Commands

- Install dependencies
  - npm i
- Start development server (Vite on port 8080)
  - npm run dev
- Build (production)
  - npm run build
- Build in development mode (useful for faster, debuggable builds)
  - npm run build:dev
- Preview production build locally
  - npm run preview
- Lint
  - npm run lint
- Tests
  - No test runner is configured in this repo (e.g., Vitest/Jest are not present). Single-test execution is not available until a test runner is added.

Important context from README

- This project was generated/managed by Lovable.
- Local development: Node.js + npm, then npm i and npm run dev.
- Publishing/deploy is handled via Lovable (Share → Publish in the Lovable UI).

High-level architecture

- Entry and bootstrapping
  - src/main.tsx mounts the React app into #root and imports global styles from index.css.
  - src/App.tsx composes application-wide providers and routing:
    - QueryClientProvider from @tanstack/react-query initialized with a QueryClient instance.
    - AuthProvider (custom) exposes Supabase-auth state and actions to the app.
    - TooltipProvider and two toaster systems for UI feedback (shadcn-style Toaster and Sonner).
    - React Router configuration with BrowserRouter, Routes, and Route components. Currently routes include:
      - / → src/pages/Index.tsx
      - Catch-all → src/pages/NotFound.tsx

- Pages and navigation
  - src/pages/Index.tsx is the landing page. It renders a marketing-style hero, feature cards, and a CTA that reveals a login selection (components/LoginSelection). It is also the place to wire in navigation to the domain dashboards if/when routes are added.
  - src/pages/NotFound.tsx shows a simple 404 page and logs the missing path.

- State and data fetching
  - TanStack Query is provided at the root (QueryClientProvider), enabling hooks like useQuery/useMutation across the app.
  - Authentication and user session state comes from src/hooks/useAuth.tsx:
    - Wraps Supabase auth; exposes user, session, loading, and actions: signUp, signIn, signOut, createWorkerProfile.
    - Persists session and listens for auth state changes.
    - Uses a toast system for UX feedback on auth operations.

- Supabase integration
  - src/integrations/supabase/client.ts initializes the Supabase client with a publishable key and URL and persists auth in localStorage. Typical import pattern:
    - import { supabase } from "@/integrations/supabase/client";
  - src/integrations/supabase/types.ts contains generated types describing the public schema (tables like training_modules, user_profiles, user_training_progress, waste_reports, worker_profiles) plus enums such as department_type, training_status, and user_role. Use these types to strongly type queries and results.

- UI components and styling
  - src/components/ui/* contains a collection of reusable, shadcn-style primitives (accordion, dialog, form, input, toast, tooltip, etc.) wired to Tailwind classes. These are intended to be the building blocks for app UIs.
  - src/components/* includes domain components for different roles and flows (e.g., LoginSelection, Public/Worker login, various dashboards like FacilityManagementDashboard, WasteCollectionDashboard, TrainingModule, etc.). These are currently not individually routed; wire them into React Router as needed.
  - TailwindCSS and utility helpers are configured; see src/lib/utils.ts and pervasive classNames across components.

- Configuration
  - Vite configuration (vite.config.ts)
    - Plugins: @vitejs/plugin-react-swc (React SWC), componentTagger in development.
    - Server: host "::" and port 8080.
    - Path alias: "@" → ./src (used throughout imports).
  - TypeScript configuration (tsconfig.json) aligns with Vite + React + TS.
  - ESLint (eslint.config.js)
    - Extends @eslint/js and typescript-eslint recommended configs for .ts/.tsx.
    - Plugins: react-hooks (recommended rules), react-refresh.
    - Rule adjustments: disables @typescript-eslint/no-unused-vars; warns for only-export-components from react-refresh.

Working effectively in this repo

- Use the @ alias for imports from src to keep paths clean (e.g., import { supabase } from "@/integrations/supabase/client").
- Wrap new data-fetching components within the existing QueryClientProvider and prefer TanStack Query patterns for async state.
- Use the AuthProvider context (useAuth()) for user/session-aware features. It already includes flows for sign-up, sign-in, sign-out, and creating worker profiles.
- To add new pages, define components in src/pages and register routes in src/App.tsx (before the catch-all "*" route).
- Prefer components from src/components/ui for consistency with existing styling and behavior; compose domain components under src/components.
