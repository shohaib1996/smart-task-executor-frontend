"use client";

import { Shield, CheckCircle2, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

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

interface TrustItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const trustItems: TrustItem[] = [
  {
    icon: Shield,
    title: "Human in the Loop",
    description: "Every action requires your approval before execution.",
  },
  {
    icon: CheckCircle2,
    title: "Smart Validation",
    description: "AI checks for conflicts and validates inputs automatically.",
  },
  {
    icon: Clock,
    title: "Real-time Updates",
    description: "Track workflow progress live with instant notifications.",
  },
];

export function TrustSection() {
  return (
    <section className="border-t border-[#dac3e8] dark:border-[#9163cb]/30 bg-[#dec9e9]/20 dark:bg-[#9163cb]/10 py-16">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center text-3xl font-bold text-[#6247aa] dark:text-[#e8daf0]"
        >
          Built for Trust
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6"
        >
          {trustItems.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -3 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-4 px-8 py-5 rounded-full border border-[#c19ee0] dark:border-[#9163cb] bg-background shadow-md shadow-[#d2b7e5]/20 dark:shadow-[#6247aa]/20"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d2b7e5]/40 dark:bg-[#9163cb]/40">
                <item.icon className="h-6 w-6 text-[#6247aa] dark:text-[#c19ee0]" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#6247aa] dark:text-[#d2b7e5]">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground max-w-[240px]">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
