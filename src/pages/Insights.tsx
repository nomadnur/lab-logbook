import { useState, useEffect } from "react";
import { Lightbulb } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";

const Insights = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleAddInsight = () => {
    // TODO: Implement add insight functionality
    console.log("Add insight clicked");
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      if (e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        handleAddInsight();
      }
      
      if (e.key === '/' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement;
        searchInput?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Layout>
      <PageHeader
        title="Insights"
        description="Transform facts into meaningful conclusions and patterns"
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onAddClick={handleAddInsight}
        addButtonText="New Insight"
        icon={<Lightbulb className="h-5 w-5 text-primary-foreground" />}
      />

      <div className="container mx-auto px-6 pb-8">
        <EmptyState
          icon={<Lightbulb className="h-12 w-12" />}
          title="Insights Section"
          description="Transform facts into meaningful conclusions and patterns. Use 'N' to quickly add new insights when this feature is ready."
          action={{
            label: "Explore Insights",
            onClick: handleAddInsight
          }}
        />
      </div>
    </Layout>
  );
};

export default Insights;