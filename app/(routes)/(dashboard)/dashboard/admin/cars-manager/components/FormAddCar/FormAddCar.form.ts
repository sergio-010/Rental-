import { z } from "zod";
export const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
    .max(50),
  cv: z.coerce
    .string()
    .min(2, { message: "La potencia debe tener al menos 2 caracteres" })
    .max(50),
  transmission: z
    .string({ required_error: "Selecciona un tipo de transmisión" })
    .min(2)
    .max(50),
  people: z
    .string({ required_error: "Selecciona la cantidad de personas" })
    .min(1),
  photo: z
    .string({ required_error: "La imagen del carro es obligatoria" })
    .min(2)
    .max(500),
  engine: z
    .string({ required_error: "Selecciona un tipo de motor" })
    .min(2)
    .max(50),
  type: z
    .string({ required_error: "Selecciona un tipo de carro" })
    .min(2)
    .max(50),
  priceDay: z.coerce
    .string({ required_error: "El precio por día es obligatorio" })
    .min(1, { message: "El precio es obligatorio" }),
  isPublish: z.boolean().default(false),
});
