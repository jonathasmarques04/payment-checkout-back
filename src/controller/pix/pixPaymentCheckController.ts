import paymentApi from "../../api/mercadoPago";


export async function checkPaymentStatus(paymentId: any, maxAttempts = 20, interval = 500): Promise<string> {
  for (let attempts = 0; attempts < maxAttempts; attempts++) {
    try {
      const statusResponse = await paymentApi.get({ id: paymentId });
      
      if (statusResponse.status === "approved") {
        console.log("approved");
        return "approved";
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
      return "error";
    }

    await new Promise(resolve => setTimeout(resolve, interval));
  }

  console.log("Timeout: Payment status check exceeded max attempts.");
  return "timeout"; 
}