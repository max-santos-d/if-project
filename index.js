import express from 'express';
import dotenv from 'dotenv';

import connectDatabase from './src/database/db.js';
import userRoutes from './src/routes/userRoutes.js';
import authRoutes from './src/routes/authRouters.js';
import postEventRoutes from './src/routes/eventPostRoutes.js';

dotenv.config();
connectDatabase();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/postEvent', postEventRoutes);

app.listen(port, () => {
    console.log('')
    console.log(`Servidor rodando na porta http://localhost:${port}`);
    console.log('');
});