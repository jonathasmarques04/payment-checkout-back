// src/app.ts
import express from 'express';
import cors from 'cors'

import { createPixPayment } from './controller/pix/pixPaymentController';
import { createMasterCardPayment } from './controller/masterCard/masterCardPaymentController';

const app = express();
app.use(express.json());
app.use(cors({
  origin: '*'
}))

// Passar a função diretamente como middleware
app.post('/create-pix-payment', createPixPayment);
app.post('/create-mastercard-payment', createMasterCardPayment);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});