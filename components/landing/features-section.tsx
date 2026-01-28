"use client";

import { Calendar, Clock, Users, Bell } from "lucide-react";
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

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description:
      "Create events and meetings with natural language. Just say when and the AI handles the rest.",
  },
  {
    icon: Clock,
    title: "Availability Check",
    description:
      "Automatically find free slots and avoid conflicts. Smart conflict detection included.",
  },
  {
    icon: Users,
    title: "Meeting Management",
    description:
      "Schedule meetings with attendees, add descriptions, and set up video conferencing links.",
  },
  {
    icon: Bell,
    title: "Smart Reminders",
    description:
      "Set up reminders and notifications for important events. Never miss a meeting again.",
  },
];

export function FeaturesSection() {
  return (
    <section className="border-t border-[#dac3e8] dark:border-[#9163cb]/30 bg-[#dec9e9]/20 dark:bg-[#9163cb]/10 py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4 rounded-full border border-[#c19ee0] dark:border-[#9163cb] bg-[#dec9e9]/50 dark:bg-[#9163cb]/25 px-4 py-1.5 text-sm">
            <Calendar className="h-4 w-4 text-[#6247aa] dark:text-[#c19ee0]" />
            <span className="text-[#6247aa] dark:text-[#e8daf0]">
              Google Calendar Integration
            </span>
          </div>
          <h2 className="text-3xl font-bold text-[#6247aa] dark:text-[#e8daf0]">
            Powerful Calendar Features
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.2 }}
              className="rounded-lg border border-[#c19ee0] dark:border-[#9163cb] bg-background p-6 shadow-lg shadow-[#d2b7e5]/20 dark:shadow-[#6247aa]/20"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#d2b7e5]/30 dark:bg-[#9163cb]/30">
                <feature.icon className="h-6 w-6 text-[#6247aa] dark:text-[#c19ee0]" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-[#6247aa] dark:text-[#d2b7e5]">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
