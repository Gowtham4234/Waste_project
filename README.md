# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/721d2d56-37ec-40f4-ba80-38cb564b1f36

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/721d2d56-37ec-40f4-ba80-38cb564b1f36) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/721d2d56-37ec-40f4-ba80-38cb564b1f36) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

---

## Backend (Option B): Node.js (Express + TypeScript) with Supabase Authentication

This repository currently contains a Vite React frontend and Supabase client integration. To add a standalone backend API, create a new server/ folder with an Express + TypeScript service that authenticates requests using Supabase JWTs and performs privileged operations with a service-role key.

High-level goals

- Keep frontend on Vite (http://localhost:8080) and expose a backend at http://localhost:8787 by default.
- Verify incoming Authorization: Bearer <access_token> using Supabase admin client.
- Enforce role-based access using claims/metadata from Supabase.
- Provide REST endpoints that wrap Supabase tables (e.g., waste_reports, user_profiles, training_modules, etc.).

1) Create the backend workspace

- Create folder: server
- Initialize Node project and install dependencies:

```powershell path=null start=null
# From the repo root
mkdir server
cd server
npm init -y

# Runtime deps
npm i express cors zod dotenv @supabase/supabase-js

# Dev deps (TypeScript + tooling)
npm i -D typescript ts-node-dev @types/express @types/cors rimraf

# Initialize tsconfig.json
npx tsc --init --rootDir src --outDir dist --esModuleInterop true --resolveJsonModule true --module commonjs --target ES2020 --moduleResolution node
```

2) Recommended server file layout

```text path=null start=null
server/
  package.json
  tsconfig.json
  .env                  # DO NOT COMMIT
  src/
    index.ts            # app bootstrap
    config.ts           # config + env parsing
    supabase.ts         # admin client factory
    auth.ts             # auth middleware
    routes/
      health.ts
      wasteReports.ts   # sample resource routes
      profiles.ts
```

3) Add npm scripts in server/package.json

```json path=null start=null
{
  "name": "gp-guardians-server",
  "version": "0.1.0",
  "type": "module",
  "main": "dist/index.js",
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
    "build": "rimraf dist && tsc",
    "start": "node dist/index.js"
  }
}
```

4) Environment variables (server/.env)

- Create server/.env with the following keys:

```ini path=null start=null
PORT=8787
# Allow Vite dev origin
CORS_ORIGIN=http://localhost:8080

# Supabase project URL and service-role key for privileged server ops
SUPABASE_URL=<your_supabase_url>
SUPABASE_SERVICE_ROLE_KEY=<your_service_role_key>
```

- In PowerShell during local dev, you typically don’t need to export these manually if you use dotenv in the app. Never commit .env.

5) Config and Supabase admin client

```ts path=null start=null
// src/config.ts
import 'dotenv/config';

export const config = {
  port: parseInt(process.env.PORT || '8787', 10),
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:8080',
  supabaseUrl: process.env.SUPABASE_URL!,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
};

if (!config.supabaseUrl || !config.supabaseServiceRoleKey) {
  throw new Error('Missing Supabase env vars. Check server/.env');
}
```

```ts path=null start=null
// src/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { config } from './config';

export const supabaseAdmin = createClient(
  config.supabaseUrl,
  config.supabaseServiceRoleKey,
  { auth: { persistSession: false } }
);
```

6) Auth middleware (validate JWT from client)

```ts path=null start=null
// src/auth.ts
import { Request, Response, NextFunction } from 'express';
import { supabaseAdmin } from './supabase';

export interface AuthedRequest extends Request {
  userId?: string;
  userRole?: string | null;
}

export async function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Missing Bearer token' });

  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data?.user) return res.status(401).json({ error: 'Invalid token' });

  req.userId = data.user.id;
  // Pull role from user metadata if you store it there
  req.userRole = (data.user.app_metadata as any)?.role ?? (data.user.user_metadata as any)?.role ?? null;
  return next();
}

export function requireRole(roles: string[]) {
  return (req: AuthedRequest, res: Response, next: NextFunction) => {
    if (!req.userRole || !roles.includes(req.userRole)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}
```

7) Basic server bootstrap with CORS and routes

```ts path=null start=null
// src/index.ts
import express from 'express';
import cors from 'cors';
import { config } from './config';
import { requireAuth } from './auth';
import healthRouter from './routes/health';
import wasteReportsRouter from './routes/wasteReports';
import profilesRouter from './routes/profiles';

const app = express();
app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json({ limit: '2mb' }));

app.use('/health', healthRouter);
app.use('/api', requireAuth, wasteReportsRouter);
app.use('/api', requireAuth, profilesRouter);

app.listen(config.port, () => {
  console.log(`[server] listening on http://localhost:${config.port}`);
});
```

8) Example routes

```ts path=null start=null
// src/routes/health.ts
import { Router } from 'express';

const router = Router();
router.get('/', (_req, res) => res.json({ status: 'ok' }));
export default router;
```

```ts path=null start=null
// src/routes/wasteReports.ts
import { Router } from 'express';
import { supabaseAdmin } from '../supabase';
import { AuthedRequest, requireRole } from '../auth';

const router = Router();

// Create a waste report (any authenticated user)
router.post('/waste-reports', async (req: AuthedRequest, res) => {
  const userId = req.userId!;
  const { title, description, image_url, address, location_lat, location_lng } = req.body || {};
  const { data, error } = await supabaseAdmin
    .from('waste_reports')
    .insert([{ user_id: userId, title, description, image_url, address, location_lat, location_lng, status: 'new' }])
    .select('*')
    .single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// List current user's reports
router.get('/waste-reports', async (req: AuthedRequest, res) => {
  const userId = req.userId!;
  const { data, error } = await supabaseAdmin
    .from('waste_reports')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Assign a report to a worker (supervisor/admin only)
router.post('/waste-reports/:id/assign', requireRole(['supervisor', 'admin']), async (req, res) => {
  const { id } = req.params;
  const { assigned_worker_id } = req.body || {};
  const { data, error } = await supabaseAdmin
    .from('waste_reports')
    .update({ assigned_worker_id, status: 'assigned' })
    .eq('id', id)
    .select('*')
    .single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

export default router;
```

```ts path=null start=null
// src/routes/profiles.ts
import { Router } from 'express';
import { supabaseAdmin } from '../supabase';
import { AuthedRequest } from '../auth';

const router = Router();

router.get('/profile', async (req: AuthedRequest, res) => {
  const userId = req.userId!;
  const { data, error } = await supabaseAdmin
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

export default router;
```

9) Running locally (Windows PowerShell)

- Start the frontend in one terminal from repo root:

```powershell path=null start=null
npm run dev
```

- Start the backend in another terminal:

```powershell path=null start=null
cd server
# .env will be loaded automatically by dotenv in src/config.ts
npm run dev
```

- Health check:

```powershell path=null start=null
curl http://localhost:8787/health
```

10) Calling the backend from the frontend

- Use the Supabase session access_token from the browser and send it as a Bearer token to your backend. Example fetch:

```ts path=null start=null
// Example inside a React component or TanStack Query
const token = (await supabase.auth.getSession()).data.session?.access_token;
const res = await fetch('http://localhost:8787/api/waste-reports', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ title: 'Illegal dumping', description: 'Near park entrance' }),
});
```

Notes

- Never expose the service-role key in the frontend. It belongs only on the server (.env).
- The auth middleware relies on Supabase-admin getUser(token), which validates the JWT and returns the user. Ensure your frontend is using Supabase auth flows (already implemented in src/hooks/useAuth.tsx).
- Adjust role checks to align with your project’s user metadata (see src/integrations/supabase/types.ts enums and your onboarding flows).
