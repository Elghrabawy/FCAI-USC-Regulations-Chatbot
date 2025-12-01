"use client";

import { motion } from "framer-motion";
import { BotIcon, SparklesIcon, BookOpenIcon, GraduationCapIcon, HelpCircleIcon } from "lucide-react";
import type { Translation } from "@/lib/types";

interface WelcomeScreenProps {
  t: Translation;
  isRTL: boolean;
  onExampleClick?: (example: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const floatAnimation = {
  y: [-5, 5, -5],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const exampleIcons = [GraduationCapIcon, BookOpenIcon, HelpCircleIcon, SparklesIcon];

export function WelcomeScreen({ t, isRTL, onExampleClick }: WelcomeScreenProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center h-full text-center py-12 px-4"
    >
      {/* Animated Robot Icon */}
      <motion.div
        variants={itemVariants}
        animate={floatAnimation}
        className="relative mb-6"
      >
        <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent flex items-center justify-center shadow-lg shadow-primary/10">
          <BotIcon className="h-12 w-12 text-primary" />
        </div>
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center"
        >
          <SparklesIcon className="h-3 w-3 text-white" />
        </motion.div>
      </motion.div>

      {/* Welcome Text */}
      <motion.h2
        variants={itemVariants}
        className="text-3xl font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text"
      >
        {t.welcome}
      </motion.h2>
      
      <motion.p
        variants={itemVariants}
        className="text-muted-foreground max-w-lg mb-8 text-base leading-relaxed"
      >
        {t.welcomeDesc}
      </motion.p>

      {/* Example Questions */}
      <motion.div
        variants={itemVariants}
        className="w-full max-w-2xl"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
          <span className="text-sm font-medium text-muted-foreground px-3">
            {t.examplesTitle}
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {t.examples.map((example, index) => {
            const IconComponent = exampleIcons[index % exampleIcons.length];
            return (
              <motion.button
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onExampleClick?.(example)}
                className={`
                  group flex items-center gap-3 p-4 rounded-xl
                  bg-gradient-to-r from-secondary/80 to-secondary/40
                  hover:from-primary/15 hover:to-primary/5
                  border border-border/50 hover:border-primary/30
                  transition-all duration-300 cursor-pointer
                  ${isRTL ? "text-right flex-row-reverse" : "text-left"}
                `}
              >
                <div className="h-10 w-10 rounded-lg bg-background/80 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                  <IconComponent className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors line-clamp-2">
                  {example}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1 }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div className="absolute top-1/4 left-1/4 h-64 w-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-48 w-48 bg-primary/5 rounded-full blur-3xl" />
      </motion.div>
    </motion.div>
  );
}
