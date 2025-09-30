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
