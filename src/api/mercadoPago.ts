import dotenv from "dotenv";
import MercadoPagoConfig, { CardToken, Payment } from "mercadopago";

dotenv.config();

const mercadoPagoApi = new MercadoPagoConfig({
  accessToken: process.env.TEST_ENVIROMENT_KEY || "",
  options: { timeout: 5000 },
});

const paymentApi = new Payment(mercadoPagoApi);

export default paymentApi;
