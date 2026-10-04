import {
  Trees,
  Home,
  CircleDot,
  Truck,
  Layers,
  Building2,
  type LucideIcon,
} from "lucide-react";

const registry: Record<string, LucideIcon> = {
  Trees,
  Home,
  CircleDot,
  Truck,
  Layers,
  Building2,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = registry[name];
  if (!Cmp) return null;
  return <Cmp className={className} strokeWidth={1.4} />;
}
