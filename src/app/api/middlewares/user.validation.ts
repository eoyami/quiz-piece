import { ZodSchema } from "zod";
import { NextResponse, NextRequest } from "next/server";

export function validateSchema<T>(schema: ZodSchema<T>, data: NextRequest) {
  const result = schema.safeParse(data);

  if (!result.success) {
    return NextResponse.json(
      {
        message: "Erro na validação",
        error: result.error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        })),
      },
      { status: 400 }
    );
  }

  return null;
}
