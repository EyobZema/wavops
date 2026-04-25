"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: String(formData.get("email") || ""),
        password: String(formData.get("password") || ""),
      }),
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;
      setError(data?.error || "Login failed.");
      setIsSubmitting(false);
      return;
    }

    router.replace("/admin/submissions");
  }

  return (
    <div className="relative min-h-screen text-foreground">
      <main className="px-6 py-16 lg:px-10 lg:py-20">
        <div className="surface-glow mx-auto w-full max-w-md rounded-3xl border border-zinc-700/80 bg-zinc-950 p-8 text-zinc-100">
          <h1 className="section-title text-3xl font-semibold tracking-tight">
            Admin Login
          </h1>
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm font-medium">Email</span>
              <input
                name="email"
                type="email"
                required
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-zinc-500"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium">Password</span>
              <input
                name="password"
                type="password"
                required
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-zinc-500"
              />
            </label>

            {error ? <p className="text-sm text-red-400">{error}</p> : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-zinc-100 px-7 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-white disabled:opacity-70"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
