import { Router } from 'express';
import { supabaseAdmin } from '../supabase';
import { AuthedRequest } from '../auth';

const router = Router();

router.get('/training-progress', async (req: AuthedRequest, res) => {
  const userId = req.userId!;
  const { data, error } = await supabaseAdmin
    .from('user_training_progress')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

export default router;
