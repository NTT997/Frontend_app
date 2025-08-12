export interface Payment {
    amount: string;
    paymentModule?: string;
    paymentToken?: string;
    paymentType?: string;
    transactionType: string;
}

export interface Card {
    cardType: string,
    ccCvv: string,
    ccExpires: string,
    ccNumber: string,
    ccOwner: string
}