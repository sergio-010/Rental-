import { db } from "@/lib/db";
import { Car } from "@prisma/client";

interface Props {
  isPublish: boolean;
}
export const getAllCars = async (
  props: Props
): Promise<{ data: Car[] | null; error: string | null }> => {
  const { isPublish = true } = props;
  try {
    const cars = await db.car.findMany({
      where: {
        isPublish: isPublish,
      },
      orderBy: {
        createdAT: "desc",
      },
    });
    return {
      data: cars,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      error: "Something went wrong",
    };
  }
};
