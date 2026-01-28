"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const floatingVariants = {
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

export function HeroSection() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  // Gradient colors based on theme
  const gradientColors = isDark
    ? "linear-gradient(90deg, #b185db, #c19ee0, #d2b7e5, #b185db)"
    : "linear-gradient(90deg, #6247aa, #9163cb, #b185db, #6247aa)";

  return (
    <section className="relative container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      {/* Animated background gradient orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-[#d2b7e5]/40 dark:bg-[#9163cb]/40 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-[#c19ee0]/40 dark:bg-[#b185db]/35 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.8, 0.5, 0.8],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[#dac3e8]/30 dark:bg-[#a06cd5]/25 blur-3xl"
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
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        <motion.div
          variants={itemVariants}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c19ee0] dark:border-[#9163cb] bg-[#dec9e9]/50 dark:bg-[#9163cb]/25 px-4 py-1.5 text-sm"
        >
          <motion.div variants={floatingVariants} animate="animate">
            <Sparkles className="h-4 w-4 text-[#6247aa] dark:text-[#c19ee0]" />
          </motion.div>
          <span className="text-[#6247aa] dark:text-[#e8daf0]">
            AI-Powered Task Automation
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="mb-6 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
        >
          Automate Your Tasks with{" "}
          <motion.span
            className="inline-block pb-2"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundImage: gradientColors,
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Natural Language
          </motion.span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl mx-auto"
        >
          Simply describe what you need done in plain English. Our AI agent
          plans and executes multi-step workflows across your Google Calendar -
          with your approval at every step.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-4 sm:flex-row justify-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button size="lg" asChild className="group">
              <Link href="/login">
                Start Automating
                <motion.span
                  className="inline-block ml-2"
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button size="lg" variant="outline" asChild>
              <Link href="/workflows">View Demo</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Example prompt */}
        <motion.div
          variants={itemVariants}
          className="mt-12 w-full max-w-2xl rounded-lg border border-[#c19ee0] dark:border-[#9163cb] bg-[#dec9e9]/30 dark:bg-[#9163cb]/20 p-4 mx-auto"
        >
          <p className="mb-2 text-sm text-muted-foreground">
            Try something like:
          </p>
          <motion.p
            className="font-mono text-sm text-[#6247aa] dark:text-[#e8daf0]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            &quot;Schedule a meeting with john@company.com next Friday at 2pm and
            send him a reminder email&quot;
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Decorative floating elements */}
      <motion.div
        className="absolute top-20 right-20 w-3 h-3 rounded-full bg-[#9163cb] dark:bg-[#b185db]"
        animate={{
          y: [-10, 10, -10],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-32 left-16 w-2 h-2 rounded-full bg-[#a06cd5] dark:bg-[#c19ee0]"
        animate={{
          y: [10, -10, 10],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
      <motion.div
        className="absolute top-40 left-32 w-4 h-4 rounded-full bg-[#b185db] dark:bg-[#9163cb]"
        animate={{
          y: [-8, 8, -8],
          x: [-4, 4, -4],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </section>
  );
}
