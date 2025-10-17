import z from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const registerSchema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
  username: z
    .string()
    .min(3, "O nome de usuário deve ter pelo menos 3 caracteres")
    .max(63, "O nome de usuário deve ter no máximo 63 caracteres")
    .regex(
      /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
      "O nome de usuário deve começar e terminar com uma letra ou número e só pode conter letras minúsculas, números e hífens"
    )
    .refine((val) => !val.includes("--"), {
      message: "O nome de usuário não pode conter hífens consecutivos",
    })
    .transform((val) => val.toLowerCase()),
});
