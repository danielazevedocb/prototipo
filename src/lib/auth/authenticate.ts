import { z } from "zod";

const usernamePattern = /^[A-Za-z0-9._-]+$/;

const credentialsSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "Informe o usuário.")
    .min(3, "O usuário deve ter pelo menos 3 caracteres.")
    .regex(
      usernamePattern,
      "Use apenas letras, números, ponto, underline e hífen.",
    ),
  password: z
    .string()
    .min(1, "Informe a senha.")
    .min(6, "A senha deve ter pelo menos 6 caracteres."),
  rememberMe: z.coerce.boolean().default(false),
});

type CredentialsInput = {
  username?: unknown;
  password?: unknown;
  rememberMe?: unknown;
};

type AuthenticatedUser = {
  id: string;
  name: string;
  username: string;
  role: string;
};

type AuthSuccess = {
  success: true;
  sessionToken: string;
  rememberMe: boolean;
  user: AuthenticatedUser;
};

type AuthFailure = {
  success: false;
  status: 400 | 401;
  message: string;
};

type AuthResult = AuthSuccess | AuthFailure;

const mockUser = {
  id: "user_daniel",
  name: "Daniel",
  username: "daniel",
  role: "admin",
  password: "123456",
} as const;

export async function authenticateUser(
  input: CredentialsInput,
): Promise<AuthResult> {
  const parsed = credentialsSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      status: 400,
      message: parsed.error.issues[0]?.message ?? "Dados inválidos.",
    };
  }

  const { username, password, rememberMe } = parsed.data;

  await new Promise((resolve) => setTimeout(resolve, 900));

  // TODO: substituir mock por Prisma.
  // Exemplo futuro:
  // 1. buscar usuário por username com Prisma
  // 2. comparar hash da senha com bcrypt/argon2
  // 3. retornar sessão/token real
  const normalizedUsername = username.toLowerCase();

  if (
    normalizedUsername !== mockUser.username ||
    password !== mockUser.password
  ) {
    return {
      success: false,
      status: 401,
      message: "Usuário ou senha inválidos.",
    };
  }

  // TODO: substituir este token mock por Auth.js/NextAuth ou JWT assinado.
  // Em produção, prefira cookie httpOnly com sessão validada no servidor.
  return {
    success: true,
    rememberMe,
    sessionToken: `mock-session-${crypto.randomUUID()}`,
    user: {
      id: mockUser.id,
      name: mockUser.name,
      username: mockUser.username,
      role: mockUser.role,
    },
  };
}
