import * as React from "react";
import { cn } from "@/lib/utils";

interface TileProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Adds the hover treatment used by linked tiles (border + wash, no lift). */
  interactive?: boolean;
}

const Tile = React.forwardRef<HTMLDivElement, TileProps>(
  ({ className, interactive, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border border-border bg-surface p-6 md:p-7",
        interactive &&
          "transition-[border-color,background-color] duration-200 hover:border-accent/50 hover:bg-accent-soft/25",
        className
      )}
      {...props}
    />
  )
);
Tile.displayName = "Tile";

export { Tile };
