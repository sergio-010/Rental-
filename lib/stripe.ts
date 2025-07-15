import Stripe from "stripe";

if (!process.env.STRIPE_API_KEY) {
  throw new Error("STRIPE_API_KEY is not defined in environment variables");
}

export const stripe = new Stripe(process.env.STRIPE_API_KEY, {
  apiVersion: "2024-06-20",
  typescript: true,
});
