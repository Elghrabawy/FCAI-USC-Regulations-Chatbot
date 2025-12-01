"use client";

import type { Translation } from "@/lib/types";

interface WelcomeScreenProps {
  t: Translation;
  isRTL: boolean;
}

export function WelcomeScreen({ t, isRTL }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-20">
      <div className="text-6xl mb-4">🤖</div>
      <h2 className="text-2xl font-semibold mb-2">{t.welcome}</h2>
      <p className="text-muted-foreground max-w-md mb-6">
        {t.welcomeDesc}
      </p>
      <div className="bg-secondary/50 rounded-lg p-4 max-w-md">
        <p className="text-sm text-primary mb-2">{t.examplesTitle}</p>
        <ul className={`text-sm text-muted-foreground space-y-1 ${isRTL ? "text-right" : "text-left"}`}>
          {t.examples.map((example, index) => (
            <li key={index}>• {example}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
