import AuthButton from "@/src/components/AuthButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  if (session?.user) redirect("/dashboard");

  return (
    <main className="container">
      <h1>Movie Fun Facts</h1>
      <p>Sign in with Google to get a personalized fun fact about your favorite movie.</p>
      <AuthButton />
    </main>
  );
}
