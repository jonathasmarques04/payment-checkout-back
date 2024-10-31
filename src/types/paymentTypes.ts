export interface Payer {
    email: string;
    first_name: string;
    last_name: string;
  }
  
  export interface PaymentRequest {
    amount: number;
    payer: Payer;
  }
  
  export interface PixPaymentResponse {
    ticket_url: string;
    qrCode: string;
    qrCodeBase64: string;
    id: number;
  }