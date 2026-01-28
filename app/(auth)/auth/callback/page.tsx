"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("token", token);
      // Set cookie for middleware (30 minutes = 1800 seconds to match JWT expiration)
      document.cookie = `token=${token}; path=/; max-age=1800; SameSite=Lax`;
      router.push("/workflows");
    } else {
      // Handle error or redirect to login
      router.push("/login?error=missing_token");
    }
  }, [searchParams, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">Authentication...</div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CallbackHandler />
    </Suspense>
  );
}
