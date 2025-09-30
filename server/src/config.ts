import 'dotenv/config';

export const config = {
  port: parseInt(process.env.PORT || '8787', 10),
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:8080',
  supabaseUrl: process.env.SUPABASE_URL || '',
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
};

if (!config.supabaseUrl || !config.supabaseServiceRoleKey) {
  console.warn('[server] Missing Supabase env vars. API will not work until you configure server/.env');
}
