"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authApi } from "@/lib/api/auth";

function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleAuth = async () => {
      const token = searchParams.get("token");
      if (token) {
        localStorage.setItem("token", token);
        // Set cookie for middleware (30 minutes = 1800 seconds to match JWT expiration)
        document.cookie = `token=${token}; path=/; max-age=1800; SameSite=Lax`;

        // Update user's timezone based on device timezone
        try {
          const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          await authApi.updateTimezone(timezone);
        } catch (error) {
          // Don't block login if timezone update fails
          console.error("Failed to update timezone:", error);
        }

        router.push("/workflows");
      } else {
        // Handle error or redirect to login
        router.push("/login?error=missing_token");
      }
    };

    handleAuth();
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
