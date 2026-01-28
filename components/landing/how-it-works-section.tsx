"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

const steps = [
  {
    number: 1,
    title: "Describe Your Task",
    description:
      "Tell the AI what you want to accomplish in plain English. No complex setup required.",
  },
  {
    number: 2,
    title: "Review the Plan",
    description:
      "The AI breaks down your request into actionable steps. Approve, edit, or reject each action.",
  },
  {
    number: 3,
    title: "Execute & Monitor",
    description:
      "Watch your workflow execute in real-time. Get notified of progress and results instantly.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[#d2b7e5]/20 dark:bg-[#9163cb]/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center text-3xl font-bold text-[#6247aa] dark:text-[#e8daf0]"
        >
          How It Works
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-3"
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-[#6247aa] to-[#9163cb] dark:from-[#9163cb] dark:to-[#b185db] text-2xl font-bold text-white shadow-lg shadow-[#6247aa]/30 dark:shadow-[#9163cb]/30"
              >
                {step.number}
              </motion.div>
              <h3 className="mb-2 text-xl font-semibold text-[#6247aa] dark:text-[#d2b7e5]">
                {step.title}
              </h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
