import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { carId: string } }
) {
  try {
    const { userId } = auth();
    const { carId } = params;
    const values = await request.json();

    console.log("[Car PATCH API] Received data:", values);
    console.log("[Car PATCH API] Car ID:", carId);

    if (!userId) {
      console.log("[Car PATCH API] Not authorized - no userId");
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Ensure all required fields are present
    if (!values.name || !values.cv || !values.photo) {
      console.log("[Car PATCH API] Missing required fields");
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Format values appropriately
    const formattedValues = {
      ...values,
      cv: String(values.cv),
      priceDay: String(values.priceDay),
      isPublish: values.isPublish || false,
    };

    const car = await db.car.update({
      where: {
        id: carId,
      },
      data: formattedValues,
    });

    console.log("[Car PATCH API] Car updated successfully:", car);
    return NextResponse.json(car, { status: 200 });
  } catch (error: any) {
    console.error("[Car PATCH API] Error updating car:", error);
    return NextResponse.json(
      { error: error?.message || "Algo salió mal" },
      { status: 500 }
    );
  }
}
