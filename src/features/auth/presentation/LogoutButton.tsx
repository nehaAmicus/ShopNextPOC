"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logoutUseCase } from "../di/server-container.ts";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    setLoading(true);

    try {
      await logoutUseCase.execute();

      router.replace("/login");
      router.refresh();
    } catch {
      alert("Unable to log out. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="rounded-lg bg-red-600 px-4 py-2 text-white"
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}
