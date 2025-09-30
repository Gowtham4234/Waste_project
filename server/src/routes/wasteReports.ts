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
