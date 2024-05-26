import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('')
    console.log(`Servidor rodando na porta http://localhost:${port}`);
    console.log('');
});