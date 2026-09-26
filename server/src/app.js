

import express from 'express';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import serverRoutes from './routes/serverRoutes.js';
import metricRoutes from './routes/metricRoutes.js';


const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/users', userRoutes);

app.use('/api/servers', serverRoutes);

app.use('/api/metrics', metricRoutes);

export default app;