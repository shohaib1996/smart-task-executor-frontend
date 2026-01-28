"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function CtaSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-[#d2b7e5]/30 dark:bg-[#9163cb]/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[#c19ee0]/30 dark:bg-[#b185db]/20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.7, 0.5, 0.7],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-3xl font-bold text-[#6247aa] dark:text-[#e8daf0]"
        >
          Ready to Get Started?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 text-lg text-muted-foreground"
        >
          Join and start automating your tasks today.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="inline-block"
        >
          <Button
            size="lg"
            asChild
            className="bg-linear-to-r from-[#6247aa] to-[#9163cb] hover:from-[#7251b5] hover:to-[#a06cd5] dark:from-[#9163cb] dark:to-[#b185db] dark:hover:from-[#a06cd5] dark:hover:to-[#c19ee0] shadow-lg shadow-[#6247aa]/30 dark:shadow-[#9163cb]/30"
          >
            <Link href="/login">
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
