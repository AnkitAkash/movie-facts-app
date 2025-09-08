import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import OpenAI from "openai";
import Groq from "groq-sdk";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const movie = session.user.favoriteMovie;
  if (!movie) {
    return NextResponse.json({ error: "No favorite movie set" }, { status: 400 });
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const prompt = `Give ONE quirky, spoiler-free fun fact about the movie "${movie}". Keep it under 45 words.`;

  try {
    // Try OpenAI first
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a concise movie trivia assistant." },
        { role: "user", content: prompt }
      ],
      temperature: 0.9,
      max_tokens: 90
    });

    const fact = completion.choices[0]?.message?.content?.trim() || "No fact found.";
    return NextResponse.json({ fact });

  } catch (err) {
    console.error("⚠️ OpenAI failed, falling back to Groq:", err.message);

    // Fallback → Groq LLM
    try {
      const groqRes = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant", // you can swap with another Groq model
        messages: [
          { role: "system", content: "You are a concise movie trivia assistant." },
          { role: "user", content: prompt }
        ],
        temperature: 0.9,
        max_tokens: 90,
      });

      const fact = groqRes.choices[0]?.message?.content?.trim() || "Could not generate a fun fact.";
      return NextResponse.json({ fact });

    } catch (groqErr) {
      console.error("❌ Groq also failed:", groqErr.message);
      return NextResponse.json({ error: "Both providers failed" }, { status: 500 });
    }
  }
}
