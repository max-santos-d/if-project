import express from 'express';
import dotenv from 'dotenv';

import connectDatabase from './src/database/db.js';
import userRoutes from './src/routes/userRoutes.js';
import authRoutes from './src/routes/authRouters.js';
import postEventRoutes from './src/routes/eventPostRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/postEvent', postEventRoutes);

connectDatabase()
    .then(() => {
        app.listen(port, () => console.log(`Servidor rodando na porta http://localhost:${port}`))
    })
    .catch(err => console.log(err))
    .finally( console.log());

