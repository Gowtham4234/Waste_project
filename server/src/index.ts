import express from 'express';
import cors from 'cors';
import { config } from './config';
import { requireAuth } from './auth';
import healthRouter from './routes/health';
import wasteReportsRouter from './routes/wasteReports';
import profilesRouter from './routes/profiles';
import trainingModulesRouter from './routes/trainingModules';
import trainingProgressRouter from './routes/trainingProgress';
import workerProfilesRouter from './routes/workerProfiles';

const app = express();
app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json({ limit: '4mb' }));

app.use('/health', healthRouter);

// Protected API
app.use('/api', requireAuth, wasteReportsRouter);
app.use('/api', requireAuth, profilesRouter);
app.use('/api', requireAuth, trainingModulesRouter);
app.use('/api', requireAuth, trainingProgressRouter);
app.use('/api', requireAuth, workerProfilesRouter);

app.listen(config.port, () => {
  console.log(`[server] listening on http://localhost:${config.port}`);
});
