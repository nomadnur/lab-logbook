import { useState, useEffect } from "react";
import { FileText } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { FactCard } from "@/components/facts/FactCard";
import { dataStore } from "@/stores/dataStore";
import { Fact } from "@/types";
import { useToast } from "@/hooks/use-toast";

const Facts = () => {
  const [facts, setFacts] = useState(dataStore.getFacts());
  const [searchValue, setSearchValue] = useState("");
  const { toast } = useToast();

  const filteredFacts = facts.filter(fact =>
    fact.title.toLowerCase().includes(searchValue.toLowerCase()) ||
    fact.description.toLowerCase().includes(searchValue.toLowerCase()) ||
    fact.category?.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleAddFact = () => {
    // TODO: Implement add fact functionality
    toast({
      title: "Feature coming soon",
      description: "Fact creation will be available once Supabase is connected.",
    });
  };

  const handleEditFact = (fact: Fact) => {
    // TODO: Implement edit fact functionality
    toast({
      title: "Feature coming soon",
      description: "Fact editing will be available once Supabase is connected.",
    });
  };

  const handleDeleteFact = (id: string) => {
    if (dataStore.deleteFact(id)) {
      setFacts(dataStore.getFacts());
      toast({
        title: "Fact deleted",
        description: "The fact has been removed from your research hub.",
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
        handleAddFact();
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
        title="Facts"
        description="Collect and organize research findings and data points"
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onAddClick={handleAddFact}
        addButtonText="New Fact"
        icon={<FileText className="h-5 w-5 text-primary-foreground" />}
      />

      <div className="container mx-auto px-6 pb-8">
        {filteredFacts.length === 0 ? (
          <EmptyState
            icon={<FileText className="h-12 w-12" />}
            title={searchValue ? "No facts found" : "Start collecting facts"}
            description={searchValue 
              ? "Try adjusting your search terms to find what you're looking for"
              : "Collect and organize research findings and data points. Use 'N' to quickly add new facts."
            }
            action={!searchValue ? {
              label: "Add your first fact",
              onClick: handleAddFact
            } : undefined}
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredFacts.map((fact) => (
              <FactCard
                key={fact.id}
                fact={fact}
                onEdit={handleEditFact}
                onDelete={handleDeleteFact}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Facts;