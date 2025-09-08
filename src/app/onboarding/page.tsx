import { requireAuth } from "@/src/lib/requireAuth";
import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function OnboardingPage() {
  const session = await requireAuth();

  const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { favoriteMovie: true } });
  if (user?.favoriteMovie) redirect("/dashboard");

  return (
    <main className="container">
      <h1>Welcome!</h1>
      <p>Tell us your favorite movie (we'll use it to generate a new fun fact each time you visit).</p>
      <form action={saveMovie}>
        <input
          type="text"
          name="movie"
          placeholder="e.g., The Dark Knight"
          required
          style={{ padding: "0.6rem 0.8rem", width: "320px" }}
        />
        <div className="spacer" />
        <button type="submit">Save & Continue</button>
      </form>
    </main>
  );
}

async function saveMovie(formData: FormData) {
  "use server";
  const session = await requireAuth();
  const movie = (formData.get("movie") as string).trim();
  if (!movie) return;

  await prisma.user.update({ where: { id: session.user.id }, data: { favoriteMovie: movie } });
  return redirect("/dashboard");
}
