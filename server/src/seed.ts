import { supabaseAdmin } from './supabase';
import { config } from './config';

async function getOrCreateUser(email: string, password: string, role: string) {
  const create = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { role },
  } as any);

  if (!create.error && create.data?.user) {
    return create.data.user;
  }

  // If already exists, try to find via listUsers
  const list = await (supabaseAdmin as any).auth.admin.listUsers({ page: 1, perPage: 1000 });
  if (list.data?.users) {
    const found = list.data.users.find((u: any) => u.email?.toLowerCase() === email.toLowerCase());
    if (found) return found;
  }
  throw new Error(`Failed to ensure user ${email}: ${create.error?.message}`);
}

async function main() {
  if (!config.supabaseUrl || !config.supabaseServiceRoleKey) {
    throw new Error('Missing Supabase env. Copy server/.env.example to server/.env and fill values.');
  }

  const PUBLIC_EMAIL = process.env.SEED_PUBLIC_EMAIL || 'public@example.com';
  const PUBLIC_PASSWORD = process.env.SEED_PUBLIC_PASSWORD || 'Password123!';
  const WORKER_EMAIL = process.env.SEED_WORKER_EMAIL || 'worker@example.com';
  const WORKER_PASSWORD = process.env.SEED_WORKER_PASSWORD || 'Password123!';
  const SUPERVISOR_EMAIL = process.env.SEED_SUPERVISOR_EMAIL || 'supervisor@example.com';
  const SUPERVISOR_PASSWORD = process.env.SEED_SUPERVISOR_PASSWORD || 'Password123!';

  console.log('[seed] ensuring users...');
  const publicUser = await getOrCreateUser(PUBLIC_EMAIL, PUBLIC_PASSWORD, 'public_user');
  const workerUser = await getOrCreateUser(WORKER_EMAIL, WORKER_PASSWORD, 'worker');
  const supervisorUser = await getOrCreateUser(SUPERVISOR_EMAIL, SUPERVISOR_PASSWORD, 'supervisor');

  console.log('[seed] upserting profiles...');
  await supabaseAdmin.from('user_profiles').upsert({
    user_id: publicUser.id,
    email: PUBLIC_EMAIL,
    full_name: 'Public User',
    role: 'public_user',
    city: 'Sample City',
    pincode: '000000',
  }, { onConflict: 'user_id' });

  const workerProfileInsert = await supabaseAdmin.from('worker_profiles').upsert({
    user_id: workerUser.id,
    worker_id: 'W-1001',
    email: WORKER_EMAIL,
    full_name: 'Worker One',
    role: 'worker',
    department: 'collection',
    is_active: true,
  }, { onConflict: 'user_id' }).select('*').maybeSingle();
  if (workerProfileInsert.error) throw workerProfileInsert.error;
  const workerProfile = workerProfileInsert.data;

  console.log('[seed] inserting training modules...');
  const modules = [
    {
      title: 'Waste Segregation Basics',
      description: 'Identify dry, wet, and hazardous waste.',
      duration_minutes: 15,
      is_mandatory: true,
      order_index: 1,
      target_role: 'public_user',
      content_url: 'https://example.com/training/segregation'
    },
    {
      title: 'Safe Collection Practices',
      description: 'PPE and route planning for collection staff.',
      duration_minutes: 20,
      is_mandatory: true,
      order_index: 2,
      target_role: 'worker',
      content_url: 'https://example.com/training/collection'
    },
    {
      title: 'Monitoring & Reporting',
      description: 'Geo-tagged reporting and escalation process.',
      duration_minutes: 10,
      is_mandatory: false,
      order_index: 3,
      target_role: 'supervisor',
      content_url: 'https://example.com/training/monitoring'
    }
  ];
  const modulesResp = await supabaseAdmin.from('training_modules').insert(modules).select('*');
  if (modulesResp.error && modulesResp.error.message.includes('duplicate')) {
    console.warn('[seed] training_modules may already exist, continuing');
  } else if (modulesResp.error) {
    throw modulesResp.error;
  }

  const oneModule = (modulesResp.data && modulesResp.data[0]) || null;

  console.log('[seed] creating sample waste report...');
  const reportResp = await supabaseAdmin.from('waste_reports').insert({
    user_id: publicUser.id,
    title: 'Overflowing bin at park',
    description: 'Bin near the entrance is overflowing',
    address: 'Central Park, Sector 1',
    location_lat: 12.9716,
    location_lng: 77.5946,
    status: 'new'
  }).select('*').single();
  if (reportResp.error) throw reportResp.error;

  if (workerProfile) {
    await supabaseAdmin.from('waste_reports')
      .update({ assigned_worker_id: workerProfile.id, status: 'assigned' })
      .eq('id', reportResp.data.id);
  }

  if (oneModule) {
    console.log('[seed] creating training progress for public user...');
    const progressResp = await supabaseAdmin.from('user_training_progress').insert({
      user_id: publicUser.id,
      module_id: oneModule.id,
      status: 'in_progress',
      progress_percentage: 50,
      score: null,
    });
    if (progressResp.error) console.warn('[seed] training_progress insert warning:', progressResp.error.message);
  }

  console.log('[seed] done');
}

main().catch((e) => {
  console.error('[seed] failed:', e);
  process.exit(1);
});
