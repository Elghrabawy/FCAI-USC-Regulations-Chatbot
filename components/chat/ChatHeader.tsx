"use client";

import { Button } from "@/components/ui/button";
import { FileTextIcon, GlobeIcon, MenuIcon } from "lucide-react";
import type { Translation } from "@/lib/types";
import { REFERENCE_PDF } from "@/lib/constants";

interface ChatHeaderProps {
  t: Translation;
  onToggleSidebar: () => void;
  onToggleLanguage: () => void;
}

export function ChatHeader({
  t,
  onToggleSidebar,
  onToggleLanguage,
}: ChatHeaderProps) {
  return (
    <header className="border-b px-4 py-3">
      <div className="flex items-center justify-between mx-auto">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="md:hidden"
        >
          <MenuIcon className="h-5 w-5" />
        </Button>

        <div className="flex-1 hidden md:flex justify-start text-sm text-muted-foreground items-center">
          <a
            href={REFERENCE_PDF.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-primary transition-colors px-3 py-1.5 rounded-md hover:bg-accent"
            title={`${t.reference}: ${t.referenceName} (${REFERENCE_PDF.year})`}
          >
            <FileTextIcon className="h-4 w-4 text-red-500" />
            <span>{t.reference}</span>
          </a>
        </div>
        
        <div className="flex-3 text-center">
          <h1 className="md:text-md lg:text-lg xl:text-xl font-semibold">
            {t.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t.subtitle}
          </p>
        </div>
        
        <div className="flex-1 hidden md:flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleLanguage}
            className="gap-2"
          >
            <GlobeIcon className="h-4 w-4" />
            {t.langSwitch}
          </Button>
        </div>
      </div>
    </header>
  );
}
