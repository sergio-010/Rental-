import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    const data = await request.json();

    console.log("[Car API] Received data:", data);
    console.log("[Car API] User ID:", userId);

    if (!userId) {
      console.log("[Car API] Not authorized - no userId");
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    if (!data.name || !data.cv || !data.photo) {
      console.log(
        "[Car API] Missing required fields:",
        !data.name ? "name" : "",
        !data.cv ? "cv" : "",
        !data.photo ? "photo" : ""
      );
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const car = await db.car.create({
      data: {
        ...data,
        userId,
      },
    });

    console.log("[Car API] Car created successfully:", car);
    return NextResponse.json(car, { status: 201 });
  } catch (error: any) {
    console.error("[Car API] Error creating car:", error);
    return NextResponse.json(
      { error: error?.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
