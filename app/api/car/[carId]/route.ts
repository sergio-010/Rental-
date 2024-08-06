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
    const { isPublish } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const car = await db.car.update({
      where: {
        id: carId,
        userId: userId,
      },
      data: {
        isPublish: isPublish,
      },
    });
    return NextResponse.json(car, { status: 200 });
  } catch (error) {
    console.log("[Car] Error: ", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { carId: string } }
) {
  try {
    const { userId } = auth();
    const { carId } = params;
    if (!userId) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }
    const car = await db.car.delete({
      where: {
        id: carId,
      },
    });
    return NextResponse.json(car, { status: 200 });
  } catch (error) {
    console.log("[Car] Error: ", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
