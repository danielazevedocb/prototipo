import type { Metadata } from "next";
import {
  BarChart3,
  Boxes,
  FileText,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react";

import { LoginForm } from "@/app/login/_components/login-form";

export const metadata: Metadata = {
  title: "Login | Gestão de Atacado & Varejo",
  description: "Acesse o sistema de gestão de atacado e varejo.",
};

const highlights = [
  {
    icon: ShoppingCart,
    title: "Vendas centralizadas",
    description:
      "Acompanhe operações de balcão, pedidos e fluxo comercial em um único painel.",
  },
  {
    icon: Boxes,
    title: "Estoque sob controle",
    description:
      "Organize entradas, saídas e reposição com base pronta para integração com banco via Prisma.",
  },
  {
    icon: BarChart3,
    title: "Financeiro e relatórios",
    description:
      "Tenha visibilidade operacional para varejo, atacado e acompanhamento de resultados.",
  },
  {
    icon: FileText,
    title: "Processos fiscais",
    description:
      "Estruture a base para emissão, conferência e histórico documental com segurança.",
  },
];

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.10),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.12),_transparent_32%)]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-background to-muted/35" />

      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-border/70 bg-background/90 shadow-2xl shadow-black/5 backdrop-blur lg:grid-cols-[1.1fr_0.9fr]">
          <section className="flex flex-col justify-between gap-10 border-b border-border/60 bg-muted/25 p-8 sm:p-10 lg:min-h-[720px] lg:border-b-0 lg:border-r lg:p-12">
            <div className="space-y-6">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border/70 bg-background/85 px-4 py-2 text-sm text-muted-foreground shadow-sm">
                <ShieldCheck className="size-4 text-emerald-500" aria-hidden="true" />
                Ambiente corporativo seguro
              </div>

              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Gestão de Atacado & Varejo
                </p>
                <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                  Operação comercial, estoque e financeiro em um acesso simples
                  e confiável.
                </h1>
                <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                  Tela de login pronta para produção com App Router, shadcn/ui,
                  validação com React Hook Form + Zod e estrutura preparada para
                  substituir o mock por Prisma depois.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {highlights.map(({ icon: Icon, title, description }) => (
                <article
                  key={title}
                  className="rounded-2xl border border-border/60 bg-background/90 p-5 shadow-sm"
                >
                  <div className="mb-3 inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h2 className="text-base font-semibold">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
            <div className="w-full max-w-md">
              <LoginForm />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
