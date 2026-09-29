

import express from 'express';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import serverRoutes from './routes/serverRoutes.js';
import metricRoutes from './routes/metricRoutes.js';
import alertRoutes from './routes/alertRoutes.js';
import auditLogRoutes from './routes/auditLogRoutes.js';


const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/users', userRoutes);

app.use('/api/servers', serverRoutes);

app.use('/api/metrics', metricRoutes);

app.use('/api/alerts', alertRoutes);

app.use('/api/audit-logs', auditLogRoutes);

export default app;