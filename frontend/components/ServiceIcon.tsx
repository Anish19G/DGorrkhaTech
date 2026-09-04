import {
  BarChart3,
  Cloud,
  Code2,
  Globe,
  Lightbulb,
  Smartphone,
  Wrench,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  BarChart3,
  Cloud,
  Code2,
  Globe,
  Lightbulb,
  Smartphone,
};

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name] || Wrench;
  return <Icon className={className} />;
}
