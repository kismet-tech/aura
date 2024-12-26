import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";

const stripePromise = loadStripe(
  "pk_test_51NdGTABlEwGVU7BmYL2rnuHlTmQI5tWAm3WbBX1ZS0NMAdn3L8HJ3mhsKLsljPZlWJbXMOonCD927nHZDllxc4Yj00eYImKl5K"
);

export interface InnerStripePaymentFormProps {
  paymentSuccessChildren: React.ReactNode;
  onPaymentSuccess?: () => void;
}

function InnerStripePaymentForm({
  paymentSuccessChildren,
  onPaymentSuccess,
}: InnerStripePaymentFormProps): React.JSX.Element {
  const stripe = useStripe();
  const elements = useElements();

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage("");
    setPaymentSuccess(false);

    // Confirm the payment on the client.
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      // The return_url is where Stripe will redirect the user after a successful payment.
      // For local testing, you can use something like 'http://localhost:3000/thanks'.
      confirmParams: {
        return_url: "https://example.com/payment-success",
      },
      redirect: "if_required",
    });

    if (error) {
      // If there's an error (e.g., invalid card, incomplete info), display it
      setErrorMessage(error.message || "");
      setIsProcessing(false);
      return;
    }

    // If we get here, there's no `error`.
    // Check if `paymentIntent` is already succeeded
    if (paymentIntent && paymentIntent.status === "succeeded") {
      setPaymentSuccess(true);
      if (onPaymentSuccess) {
        onPaymentSuccess();
      }
    }

    setIsProcessing(false);
  };

  // If payment is successful, we can show a success message
  if (paymentSuccess) {
    return <>{paymentSuccessChildren}</>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe || isProcessing}>
        {isProcessing ? "Processing…" : "Pay Now"}
      </button>
      {errorMessage && (
        <div style={{ color: "red", marginTop: "8px" }}>{errorMessage}</div>
      )}
    </form>
  );
}

export interface StripePaymentFormProps {
  paymentSuccessChildren: React.ReactNode;
  onPaymentSuccess?: () => void;
  getStripePaymentIntent: ({}: {}) => Promise<{ clientSecret: string }>;
}

export function StripePaymentForm({
  paymentSuccessChildren,
  onPaymentSuccess,
  getStripePaymentIntent,
}: StripePaymentFormProps): React.JSX.Element {
  const [paymentIntentClientSecret, setPaymentIntentClientSecret] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    async function loadPaymentIntentClientSecret() {
      const { clientSecret } = await getStripePaymentIntent({});
      setPaymentIntentClientSecret(clientSecret);
    }

    loadPaymentIntentClientSecret();
  }, []);

  if (!paymentIntentClientSecret) {
    return <></>;
  } else {
    const elementsOptions: StripeElementsOptions = {
      clientSecret: paymentIntentClientSecret,
      appearance: {
        theme: "stripe", // or 'night' or a custom config
      },
    };

    return (
      <Elements stripe={stripePromise} options={elementsOptions}>
        <InnerStripePaymentForm
          paymentSuccessChildren={paymentSuccessChildren}
          onPaymentSuccess={onPaymentSuccess}
        />
      </Elements>
    );
  }
}
