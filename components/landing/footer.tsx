"use client";

import { Zap } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#dac3e8] dark:border-[#9163cb]/30 bg-[#dec9e9]/10 dark:bg-[#9163cb]/5">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left - Brand */}
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br from-[#6247aa] to-[#9163cb] dark:from-[#9163cb] dark:to-[#b185db]">
              <Zap className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-semibold text-[#6247aa] dark:text-[#d2b7e5]">
              Smart Task Executor
            </span>
          </Link>

          {/* Right - Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
