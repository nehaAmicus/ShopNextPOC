// It must be a Client Component and
// should offer a retry action.
//  Add global-error.tsx only if you want a custom UI for errors in the root layout itself.
// Add src/app/error.tsx for recoverable route-segment errors.

"use client";

import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  // Log errors for debugging; avoid exposing internal details to users.
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
      <h2 className="text-2xl font-bold text-gray-900">Something went wrong</h2>

      <p className="mt-3 text-gray-600">
        <p>We couldn&apos;t load this page.</p>
      </p>

      {/* Ask Next.js to retry rendering this segment */}
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-lg bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800"
      >
        Try again
      </button>
    </section>
  );
}
