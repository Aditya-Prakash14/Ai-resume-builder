import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProUpgradeButtonProps {
  className?: string;
}

export function ProUpgradeButton({ className }: ProUpgradeButtonProps) {
  // This is a dummy component that doesn't do anything
  // It's here to satisfy imports in other components
  return (
    <Button
      variant="default"
      className={cn(
        "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white",
        className
      )}
      onClick={() => window.location.href = '/settings'}
    >
      Set API Keys
    </Button>
  );
}
