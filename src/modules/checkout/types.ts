import type Stripe from "stripe";

export type ProudctMetadata = {
    stripeAccountId: string;
    id: string;
    price: number;
}

export type CheckoutSessionMetadata = {
    userId: string;
}

export type ExpandedLineItem = Stripe.LineItem & {
    price: Stripe.Price & {
        product: Stripe.Product & {
            metadata: ProudctMetadata;
        };
    };
};