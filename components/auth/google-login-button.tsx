"use client";

import { Button } from "@/components/ui/button";
import { authApi } from "@/lib/api/auth";
import { useState } from "react";

export function GoogleLoginButton() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const { auth_url } = await authApi.getGoogleAuthUrl();
      window.location.href = auth_url;
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleLogin} disabled={loading} className="w-full">
      {loading ? "Connecting..." : "Continue with Google"}
    </Button>
  );
}
