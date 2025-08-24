import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  FlaskConical, 
  FileText, 
  Lightbulb, 
  ListChecks, 
  Menu, 
  X,
  Search,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Projects", href: "/", icon: FlaskConical },
  { name: "Facts", href: "/facts", icon: FileText },
  { name: "Insights", href: "/insights", icon: Lightbulb },
  { name: "Suggestions", href: "/suggestions", icon: ListChecks },
  { name: "About", href: "/about", icon: Info },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 md:hidden"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "w-64 h-full bg-gradient-card border-r border-border transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:z-0",
          isOpen ? "fixed left-0 top-0 z-40 translate-x-0" : "fixed left-0 top-0 z-40 -translate-x-full md:relative"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center gap-3 px-6 border-b border-border">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <Search className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Research Hub</h1>
              <p className="text-xs text-muted-foreground">Knowledge Management</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 p-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-elegant"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-card"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className="rounded-lg bg-gradient-subtle p-3">
              <p className="text-xs font-medium text-foreground">Research Platform</p>
              <p className="text-xs text-muted-foreground">
                Organize • Connect • Discover
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}