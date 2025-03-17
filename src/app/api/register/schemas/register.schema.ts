import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("Email inválido."),
  password: z.string().min(6, "Sua senha deve conter no mínimo 6 digitos."),
  passwordConfirmation: z
    .string()
    .min(6, "Sua senha deve ser igual a anterior."),
});

export type RegisterType = z.infer<typeof registerSchema>;
