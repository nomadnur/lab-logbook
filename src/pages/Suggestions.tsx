import { useState, useEffect } from "react";
import { ListChecks } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";

const Suggestions = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleAddSuggestion = () => {
    // TODO: Implement add suggestion functionality
    console.log("Add suggestion clicked");
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      if (e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        handleAddSuggestion();
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
        title="Suggestions"
        description="Track improvement recommendations and next steps"
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onAddClick={handleAddSuggestion}
        addButtonText="New Suggestion"
        icon={<ListChecks className="h-5 w-5 text-primary-foreground" />}
      />

      <div className="container mx-auto px-6 pb-8">
        <EmptyState
          icon={<ListChecks className="h-12 w-12" />}
          title="Suggestions Section"
          description="Track improvement recommendations and next steps. Use 'N' to quickly add new suggestions when this feature is ready."
          action={{
            label: "Start with Suggestions",
            onClick: handleAddSuggestion
          }}
        />
      </div>
    </Layout>
  );
};

export default Suggestions;