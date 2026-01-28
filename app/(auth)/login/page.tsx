"use client";

import { useState } from "react";
import { GoogleLoginButton } from "@/components/auth/google-login-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Zap, Calendar, Shield, AlertTriangle, Info } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const features = [
  { icon: Calendar, text: "Google Calendar Integration" },
  { icon: Shield, text: "Secure & Private" },
];

export default function LoginPage() {
  const [showTestingModal, setShowTestingModal] = useState(true);

  const handleCloseModal = () => {
    setShowTestingModal(false);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Testing App Info Modal */}
      <Dialog open={showTestingModal} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="h-5 w-5" />
              Testing App Notice
            </DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-4 pt-2">
                <p className="text-sm text-muted-foreground">
                  This is a <strong>testing/demo application</strong>. When you sign in with Google, you may see a security warning.
                </p>

                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4 space-y-3">
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-200 flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    How to proceed:
                  </p>
                  <ol className="text-sm text-amber-700 dark:text-amber-300 space-y-2 list-decimal list-inside">
                    <li>Click <strong>&quot;Advanced&quot;</strong> (bottom left of the warning page)</li>
                    <li>Click <strong>&quot;Go to Smart Task Executor (unsafe)&quot;</strong></li>
                    <li>Allow calendar access for full functionality</li>
                  </ol>
                </div>

                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    <strong>Note:</strong> Google may send you a security alert email. This is normal for unverified apps. Your data is safe and only used for calendar integration.
                  </p>
                </div>

                <button
                  onClick={handleCloseModal}
                  className="w-full mt-2 px-4 py-2 bg-[#6247aa] hover:bg-[#6247aa]/90 text-white rounded-lg font-medium transition-colors"
                >
                  I Understand, Continue
                </button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {/* Background gradient orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[#d2b7e5]/40 dark:bg-[#9163cb]/30 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#c19ee0]/40 dark:bg-[#b185db]/30 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.4, 0.6],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[#dac3e8]/30 dark:bg-[#a06cd5]/20 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="border-[#c19ee0] dark:border-[#9163cb] shadow-xl shadow-[#d2b7e5]/20 dark:shadow-[#6247aa]/20 bg-background/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="mx-auto mb-4"
            >
              <Link href="/" className="inline-flex items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-[#6247aa] to-[#9163cb] dark:from-[#9163cb] dark:to-[#b185db] shadow-lg shadow-[#6247aa]/30 dark:shadow-[#9163cb]/30">
                  <Zap className="h-6 w-6 text-white" />
                </div>
              </Link>
            </motion.div>

            <CardTitle className="text-2xl font-bold text-[#6247aa] dark:text-[#e8daf0]">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Sign in to Smart Task Executor
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Features */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex justify-center gap-4"
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground"
                >
                  <feature.icon className="h-3.5 w-3.5 text-[#9163cb] dark:text-[#c19ee0]" />
                  <span>{feature.text}</span>
                </div>
              ))}
            </motion.div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[#dac3e8] dark:border-[#9163cb]/30" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Continue with
                </span>
              </div>
            </div>

            {/* Google Login Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="space-y-2"
            >
              <GoogleLoginButton />
              <button
                onClick={() => setShowTestingModal(true)}
                className="w-full text-xs text-muted-foreground hover:text-[#6247aa] dark:hover:text-[#c19ee0] flex items-center justify-center gap-1 transition-colors"
              >
                <AlertTriangle className="h-3 w-3" />
                See security warning guide
              </button>
            </motion.div>

            {/* Terms */}
            <p className="text-center text-xs text-muted-foreground">
              By continuing, you agree to our{" "}
              <Link
                href="#"
                className="text-[#6247aa] dark:text-[#c19ee0] hover:underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="#"
                className="text-[#6247aa] dark:text-[#c19ee0] hover:underline"
              >
                Privacy Policy
              </Link>
            </p>
          </CardContent>
        </Card>

        {/* Back to home link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="mt-6 text-center text-sm text-muted-foreground"
        >
          <Link
            href="/"
            className="text-[#6247aa] dark:text-[#c19ee0] hover:underline inline-flex items-center gap-1"
          >
            ← Back to home
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
