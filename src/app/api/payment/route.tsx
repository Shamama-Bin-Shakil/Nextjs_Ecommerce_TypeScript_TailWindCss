import { NextResponse } from "next/server";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16",
});

export async function POST(request: Request) {
  const data = await request.json();

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: data.amount,
      currency: "gbp",
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({
      msg: "Successfull Payment",
      paymentIntent: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log(error);
  }
}
