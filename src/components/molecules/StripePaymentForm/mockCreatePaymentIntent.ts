import Stripe from "stripe";

interface MockCreatePaymentIntentProps {}

export const mockCreatePaymentIntent =
  async ({}: MockCreatePaymentIntentProps): Promise<{
    clientSecret: string;
  }> => {
    const stripe = new Stripe(
      "sk_test_51NdGTABlEwGVU7BmkVVWws9ITSxDwHoF4HKQmmESBFD6dDoAAUxwwiyhNlanLvX5HC2tS7nStuaTZaR5UaRj1If100AQUKCIIE"
    );

    const paymentIntent: Stripe.Response<Stripe.PaymentIntent> =
      await stripe.paymentIntents.create({
        amount: 2000,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });

    if (!paymentIntent.client_secret) {
      throw new Error("PaymentIntent has no client_secret");
    }

    return {
      clientSecret: paymentIntent.client_secret,
    };
  };
