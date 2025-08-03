import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/ui/search-bar";
import { Plus } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onAddClick: () => void;
  addButtonText?: string;
  icon?: ReactNode;
}

export function PageHeader({
  title,
  description,
  searchValue,
  onSearchChange,
  onAddClick,
  addButtonText = "Add New",
  icon,
}: PageHeaderProps) {
  return (
    <div className="border-b border-border/50 bg-background/30 backdrop-blur-sm sticky top-0 z-30">
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
                {icon}
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-foreground">{title}</h1>
              {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
              )}
            </div>
          </div>
          
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <SearchBar
              placeholder={`Search ${title.toLowerCase()}...`}
              value={searchValue}
              onChange={onSearchChange}
              className="w-full sm:w-80"
            />
            <Button onClick={onAddClick} variant="gradient" className="shrink-0">
              <Plus className="h-4 w-4 mr-2" />
              {addButtonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}