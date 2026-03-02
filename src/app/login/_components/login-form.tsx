"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, UserRound } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const usernamePattern = /^[A-Za-z0-9._-]+$/;

const loginSchema = z.object({
  username: z
    .string()
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
  rememberMe: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

type LoginApiSuccess = {
  success: true;
  redirectTo: string;
  user: {
    id: string;
    name: string;
    username: string;
    role: string;
  };
};

type LoginApiError = {
  success: false;
  message: string;
};

export function LoginForm() {
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: true,
    },
    mode: "onBlur",
  });

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    resetField,
    setError,
  } = form;

  const onSubmit = handleSubmit(async (values) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = (await response.json()) as LoginApiSuccess | LoginApiError;

      if (!response.ok || !data.success) {
        const message =
          "message" in data ? data.message : "Usuário ou senha inválidos.";

        setError("root", { message });

        toast.error("Falha no login.", {
          description: message,
        });

        return;
      }

      toast.success(`Bem-vindo, ${data.user.name}.`, {
        description: "Acesso liberado. Redirecionando para o dashboard.",
      });

      resetField("password");
      router.push(data.redirectTo);
      router.refresh();
    } catch {
      const message = "Não foi possível concluir o login no momento.";

      setError("root", { message });
      toast.error("Erro de conexão.", {
        description: message,
      });
    }
  });

  return (
    <Card className="border-border/70 bg-background/95 shadow-xl shadow-black/5">
      <CardHeader className="space-y-2">
        <div className="inline-flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <UserRound className="size-5" aria-hidden="true" />
        </div>
        <CardTitle className="text-2xl tracking-tight">
          Entrar no sistema
        </CardTitle>
        <CardDescription className="text-sm leading-6">
          Faça login com seu usuário e senha para acessar o ambiente de atacado
          e varejo.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-6" onSubmit={onSubmit} noValidate>
          <div className="space-y-2">
            <Label htmlFor="username">Usuário</Label>
            <Input
              id="username"
              type="text"
              placeholder="Daniel"
              autoComplete="username"
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.username)}
              aria-describedby={errors.username ? "username-error" : undefined}
              {...register("username")}
            />
            {errors.username ? (
              <p id="username-error" className="text-sm text-destructive">
                {errors.username.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor="password">Senha</Label>
              <Link
                href="/recuperar"
                className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                Esqueci minha senha
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              autoComplete="current-password"
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "password-error" : undefined}
              {...register("password")}
            />
            {errors.password ? (
              <p id="password-error" className="text-sm text-destructive">
                {errors.password.message}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Controller
              name="rememberMe"
              control={control}
              render={({ field }) => (
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="rememberMe"
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked === true)}
                    disabled={isSubmitting}
                    aria-label="Manter conectado"
                  />
                  <Label
                    htmlFor="rememberMe"
                    className="cursor-pointer text-sm font-normal text-muted-foreground"
                  >
                    Manter conectado
                  </Label>
                </div>
              )}
            />

            <p className="text-sm text-muted-foreground">
              Use `daniel` e `123456` para o mock inicial.
            </p>
          </div>

          {errors.root?.message ? (
            <p
              role="alert"
              className="rounded-md border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive"
            >
              {errors.root.message}
            </p>
          ) : null}

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex-col items-stretch gap-5">
        <Separator />
        <div className="space-y-3 text-center text-sm">
          <p className="text-muted-foreground">
            Ainda não tem conta?{" "}
            <Link
              href="/register"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Criar conta
            </Link>
          </p>
          <p className="text-xs leading-5 text-muted-foreground">
            Esta implementação já usa uma API route real e está pronta para
            substituir o mock por Prisma depois.
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
