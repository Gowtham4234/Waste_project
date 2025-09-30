import { Router } from 'express';
import { supabaseAdmin } from '../supabase';

const router = Router();

router.get('/training-modules', async (_req, res) => {
  const { data, error } = await supabaseAdmin
    .from('training_modules')
    .select('*')
    .order('order_index', { ascending: true });
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

router.get('/training-modules/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabaseAdmin
    .from('training_modules')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

export default router;
