"use client";
import { useEffect, useState } from "react";

export default function ClientFact() {
  const [fact, setFact] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadFact() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/funfact", { cache: "no-store" });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setFact(data.fact);
    } catch (e: any) {
      setError("Could not load a fun fact.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFact();
  }, []);

  return (
    <div>
      <div className="label">Today's fun fact:</div>
      <div className="spacer" />
      {loading ? (
        <p>Thinking…</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p className="fact">{fact}</p>
      )}
      <div className="spacer" />
      <button onClick={loadFact}>New fun fact</button>
    </div>
  );
}
