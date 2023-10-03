"use client";
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentCheckout from "./PaymentCheckout";

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHED_KEY!);

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentCheckout />
    </Elements>
  );
};

export default Payment;
