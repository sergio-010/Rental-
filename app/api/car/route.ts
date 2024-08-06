import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    const data = await request.json();

    if (!userId) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const car = await db.car.create({
      data: {
        ...data,
        userId,
      },
    });
    return NextResponse.json(car, { status: 201 });
  } catch (error) {
    console.log("[Car] Error: ", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
