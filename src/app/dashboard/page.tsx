import { requireAuth } from "@/src/lib/requireAuth";
import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";
import { UserCard } from "@/src/components/UserCard";
import AuthButton from "@/src/components/AuthButton";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await requireAuth();

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true, image: true, favoriteMovie: true }
  });

  if (!user) redirect("/");
  if (!user.favoriteMovie) redirect("/onboarding");

  return (
    <main className="container">
      <header className="row" style={{ justifyContent: "space-between" }}>
        <h1>Dashboard</h1>
        <AuthButton />
      </header>

      <UserCard name={user.name} email={user.email!} image={user.image} />

      <div className="spacer" />
      <div className="card">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div>
            <div className="label">Favorite movie:</div>
            <div>{user.favoriteMovie}</div>
          </div>
        </div>
        <div className="spacer" />
        <FunFactBlock />
      </div>
    </main>
  );
}

import { Suspense } from "react";
import ClientFact from "./_client-fact";

function FunFactBlock() {
  return (
    <Suspense fallback={<p>Loading a fun fact…</p>}>
      <ClientFact />
    </Suspense>
  );
}
