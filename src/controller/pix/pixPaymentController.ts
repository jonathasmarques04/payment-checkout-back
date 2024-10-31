import { v4 as uuid } from "uuid";
import paymentApi from "../../api/mercadoPago";
import { checkPaymentStatus } from "./pixPaymentCheckController";

export async function createPixPayment(req: any, res: any) {
  const { amount, payer } = req.body;

  try {
    const payment = await paymentApi.create({
      body: {
        transaction_amount: amount,
        payment_method_id: "pix",
        payer: {
          email: payer.email,
          first_name: payer.first_name,
        },
      },
      requestOptions: { idempotencyKey: uuid() },
    });

    const pixResponse = {
        ticket_url: payment.point_of_interaction?.transaction_data?.ticket_url || '',
        qrCode: payment.point_of_interaction?.transaction_data?.qr_code || '',
        qrCodeBase64: payment.point_of_interaction?.transaction_data?.qr_code_base64 || '',
        id: payment.id
    };
    console.log(pixResponse)

    res.status(201).json(pixResponse);

    const statusCode = await checkPaymentStatus(payment.id)
    console.log("Pagamento aprovado: " + statusCode)
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: "Error creating Pix payment" });
  }
}
