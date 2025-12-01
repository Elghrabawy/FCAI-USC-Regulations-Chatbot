"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileTextIcon, GlobeIcon, MenuIcon, SparklesIcon, MoonIcon, SunIcon } from "lucide-react";
import type { Translation } from "@/lib/types";
import { REFERENCE_PDF } from "@/lib/constants";

interface ChatHeaderProps {
  t: Translation;
  isDark: boolean;
  onToggleSidebar: () => void;
  onToggleLanguage: () => void;
  onToggleTheme: () => void;
}

export function ChatHeader({
  t,
  isDark,
  onToggleSidebar,
  onToggleLanguage,
  onToggleTheme,
}: ChatHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="border-b bg-gradient-to-r from-background via-background to-background/95 backdrop-blur-sm px-4 py-3 sticky top-0 z-30"
    >
      <div className="flex items-center justify-between mx-auto">
        {/* Mobile Menu Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="md:hidden h-10 w-10 rounded-xl hover:bg-primary/10"
          >
            <MenuIcon className="h-5 w-5" />
          </Button>
        </motion.div>

        {/* Reference Link - Desktop */}
        <div className="flex-1 hidden md:flex justify-start text-sm text-muted-foreground items-center">
          <motion.a
            href={REFERENCE_PDF.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2.5 px-4 py-2 rounded-xl hover:bg-red-500/10 transition-all group"
            title={`${t.reference}: ${t.referenceName} (${REFERENCE_PDF.year})`}
          >
            <div className="h-8 w-8 rounded-lg bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
              <FileTextIcon className="h-4 w-4 text-red-500" />
            </div>
            <span className="font-medium group-hover:text-red-600 transition-colors">{t.reference}</span>
          </motion.a>
        </div>
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex-3 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <h1 className="md:text-md lg:text-lg xl:text-xl font-bold bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text">
              {t.title}
            </h1>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <SparklesIcon className="h-4 w-4 text-primary hidden sm:block" />
            </motion.div>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {t.subtitle}
          </p>
        </motion.div>
        
        {/* Language & Theme Toggle - Desktop */}
        <div className="flex-1 hidden md:flex justify-end gap-2">
          {/* Theme Toggle */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleTheme}
              className="h-10 w-10 rounded-xl hover:bg-primary/10 transition-all"
              title={isDark ? t.lightMode : t.darkMode}
            >
              <motion.div
                initial={false}
                animate={{ rotate: isDark ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? (
                  <SunIcon className="h-5 w-5 text-amber-500" />
                ) : (
                  <MoonIcon className="h-5 w-5 text-primary" />
                )}
              </motion.div>
            </Button>
          </motion.div>

          {/* Language Toggle */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleLanguage}
              className="gap-2.5 h-10 px-4 rounded-xl hover:bg-primary/10 transition-all group"
            >
              <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <GlobeIcon className="h-4 w-4 text-primary" />
              </div>
              <span className="font-medium">{t.langSwitch}</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
