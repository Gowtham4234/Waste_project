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
