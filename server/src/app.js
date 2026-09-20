

import exprss from 'express';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import serverRoutes from './routes/serverRoutes.js';


const app = exprss();

app.use(exprss.json());

app.use('/api/auth', authRoutes);

app.use('/api/users', userRoutes);

app.use('/api/servers', serverRoutes);

export default app;