"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface FeatureCardProps {
  feature: {
    name: string;
    subtitle: string;
    description: string;
    icon: React.ElementType;
    details: string[];
  };
  delay?: number;
}

const FeatureCard = ({ feature, delay = 0 }: FeatureCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-[260px] h-[260px] group [perspective:2000px]"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className={cn(
          "relative w-full h-full [transform-style:preserve-3d] transition-all duration-700",
          isFlipped
            ? "[transform:rotateY(180deg)]"
            : "[transform:rotateY(0deg)]"
        )}
      >
        {/* Front */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full",
            "[backface-visibility:hidden] [transform:rotateY(0deg)]",
            "rounded-2xl border bg-card text-card-foreground shadow-md",
            "flex flex-col items-center justify-center p-6"
          )}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
            <feature.icon className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            {feature.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {feature.subtitle}
          </p>
        </div>

        {/* Back */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full",
            "[backface-visibility:hidden] [transform:rotateY(180deg)]",
            "rounded-2xl border bg-popover text-popover-foreground shadow-md",
            "flex flex-col justify-between p-5"
          )}
        >
          <div>
            <h3 className="text-base font-semibold text-foreground">
              {feature.name}
            </h3>
            <p className="mt-2 text-xs text-muted-foreground">
              {feature.description}
            </p>
            <ul className="mt-3 space-y-1">
              {feature.details.map((detail, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-xs text-foreground"
                >
                  <ArrowRight className="h-3 w-3 text-primary" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-3 border-t border-border">
            <Link
              href="/about"
              className="text-xs font-medium text-primary hover:underline cursor-pointer"
            >
              Learn more →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
