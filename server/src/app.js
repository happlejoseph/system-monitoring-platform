

import exprss from 'express';
import authRoutes from './routes/authRoutes.js';


const app = exprss();

app.use(exprss.json());

app.use('/api/auth', authRoutes);

export default app;