import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { carId, priceDay, startDate, endDate, carName } = await req.json();

    console.log("[Checkout API] Received data:", {
      carId,
      priceDay,
      startDate,
      endDate,
      carName,
    });

    if (!userId) {
      console.log("[Checkout API] Unauthorized - no userId");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!carId || !priceDay || !startDate || !endDate || !carName) {
      console.log("[Checkout API] Missing required fields");
      return new NextResponse("All fields are required", { status: 400 });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const numberOfDays = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Convertir a número y asegurar que sea válido
    const priceDayNum = Number(priceDay);
    if (isNaN(priceDayNum) || priceDayNum <= 0) {
      console.error("[Checkout API] Invalid price:", priceDay);
      return new NextResponse("Invalid price", { status: 400 });
    }

    const totalAmount = priceDayNum * numberOfDays;
    const totalAmountStripe = priceDayNum * 100 * numberOfDays;

    console.log("[Checkout API] Calculated amounts:", {
      priceDayNum,
      numberOfDays,
      totalAmount,
      totalAmountStripe,
    });

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          product_data: {
            name: carName,
          },
          unit_amount: totalAmountStripe,
        },
      },
    ];

    const order = await db.order.create({
      data: {
        carId,
        carName: carName,
        userId: userId,
        status: "confirmed",
        totalAmount: totalAmount.toString(),
        orderDate: startDate,
        orderEndDate: endDate,
      },
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${process.env.NEXT_PUBLIC_FRONTED_STORE_URL}/order-confirmation`,
      cancel_url: `${process.env.NEXT_PUBLIC_FRONTED_STORE_URL}/order-error`,
      metadata: {
        order_id: order.id,
        car_id: carId,
        startDate,
        endDate,
        numberOfDays,
      },
    });

    return NextResponse.json(
      { url: session.url },
      {
        headers: corsHeaders,
      }
    );
  } catch (error: any) {
    console.error("[Checkout API] Error creating checkout session:", error);
    return NextResponse.json(
      { error: error?.message || "Error al procesar el pago" },
      { status: 500, headers: corsHeaders }
    );
  }
}
