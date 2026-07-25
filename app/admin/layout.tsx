import { TooltipProvider } from "@/components/ui/tooltip";

/**
 * Wraps only the admin tree, never the root layout, so the public marketing
 * pages keep their existing styling. `admin-scope` supplies the default
 * border colour that shadcn components assume (see app/globals.css).
 */
export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <TooltipProvider>
      <div className="admin-scope">{children}</div>
    </TooltipProvider>
  );
}
