export interface Payment {
    amount: string;
    paymentModule?: string;
    paymentToken?: string;
    paymentType?: string;
    transactionType: string;
}