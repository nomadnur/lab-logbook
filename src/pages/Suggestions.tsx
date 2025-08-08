import { useState, useEffect } from "react";
import { ListChecks } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { SuggestionCard } from "@/components/suggestions/SuggestionCard";
import { dataStore } from "@/stores/dataStore";
import { Suggestion } from "@/types";
import { useToast } from "@/hooks/use-toast";

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState(dataStore.getSuggestions());
  const [searchValue, setSearchValue] = useState("");
  const { toast } = useToast();

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.title.toLowerCase().includes(searchValue.toLowerCase()) ||
    suggestion.description.toLowerCase().includes(searchValue.toLowerCase()) ||
    suggestion.priority.toLowerCase().includes(searchValue.toLowerCase()) ||
    suggestion.status.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleAddSuggestion = () => {
    // TODO: Implement add suggestion functionality
    toast({
      title: "Feature coming soon",
      description: "Suggestion creation will be available once Supabase is connected.",
    });
  };

  const handleEditSuggestion = (suggestion: Suggestion) => {
    // TODO: Implement edit suggestion functionality
    toast({
      title: "Feature coming soon",
      description: "Suggestion editing will be available once Supabase is connected.",
    });
  };

  const handleDeleteSuggestion = (id: string) => {
    if (dataStore.deleteSuggestion(id)) {
      setSuggestions(dataStore.getSuggestions());
      toast({
        title: "Suggestion deleted",
        description: "The suggestion has been removed from your research hub.",
        variant: "destructive",
      });
    }
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
        {filteredSuggestions.length === 0 ? (
          <EmptyState
            icon={<ListChecks className="h-12 w-12" />}
            title={searchValue ? "No suggestions found" : "Start tracking suggestions"}
            description={searchValue 
              ? "Try adjusting your search terms to find what you're looking for"
              : "Track improvement recommendations and next steps. Use 'N' to quickly add new suggestions."
            }
            action={!searchValue ? {
              label: "Add your first suggestion",
              onClick: handleAddSuggestion
            } : undefined}
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredSuggestions.map((suggestion) => (
              <SuggestionCard
                key={suggestion.id}
                suggestion={suggestion}
                onEdit={handleEditSuggestion}
                onDelete={handleDeleteSuggestion}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Suggestions;