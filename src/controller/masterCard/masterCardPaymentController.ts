import { v4 as uuid } from "uuid";
import paymentApi from "../../api/mercadoPago";

export async function createMasterCardPayment(req: any, res: any) {
  const {
    token,
    paymentMethodId,
    installments,
    issuerId,
    transactionAmount,
    description,
    payer,
  } = req.body;

  try {
    const paymentMasterCard = await paymentApi.create({
      body: {
        transaction_amount: transactionAmount,
        token,
        description,
        installments,
        payment_method_id: paymentMethodId,
        issuer_id: issuerId,
        payer: {
          email: payer.email,
          identification: {
            type: payer.identification.type,
            number: payer.identification.number,
          },
        },
      },
      requestOptions: {
        idempotencyKey: uuid(),
      },
    });

    const paymentResponse = {
      ticket_url:
        paymentMasterCard.point_of_interaction?.transaction_data?.ticket_url ||
        "",
      qrCode:
        paymentMasterCard.point_of_interaction?.transaction_data?.qr_code || "",
      qrCodeBase64:
        paymentMasterCard.point_of_interaction?.transaction_data
          ?.qr_code_base64 || "",
      id: paymentMasterCard.id,
    };
    console.log(paymentResponse);

    res.status(201).json(paymentResponse);
  } catch (error: any) {
    console.error("Error creating payment:", error?.response?.data || error);
    res.status(500).json({
      error: "Error creating payment",
      details: error?.response || "No additional error details available",
    });
  }
}
