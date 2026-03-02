export default function DashboardPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-3xl rounded-3xl border border-border bg-card p-10 text-card-foreground shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          Dashboard
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          Login concluído com sucesso.
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
          Esta página é um placeholder para validar o redirecionamento após o
          login. O próximo passo natural é conectar a sessão mock a uma camada
          real com Prisma e autenticação persistente.
        </p>
      </div>
    </main>
  );
}
