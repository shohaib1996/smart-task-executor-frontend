"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect, type ComponentProps } from "react";

export function Providers({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  // Prevent hydration mismatch for theme
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Render children without theme provider during SSR/initial mount to avoid mismatch
    // Alternatively just render nothing if theme is critical
    return <>{children}</>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </QueryClientProvider>
  );
}
