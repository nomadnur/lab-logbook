import { useState, useEffect } from "react";
import { Lightbulb } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { InsightCard } from "@/components/insights/InsightCard";
import { dataStore } from "@/stores/dataStore";
import { Insight } from "@/types";
import { useToast } from "@/hooks/use-toast";

const Insights = () => {
  const [insights, setInsights] = useState(dataStore.getInsights());
  const [searchValue, setSearchValue] = useState("");
  const { toast } = useToast();

  const filteredInsights = insights.filter(insight =>
    insight.title.toLowerCase().includes(searchValue.toLowerCase()) ||
    insight.description.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleAddInsight = () => {
    // TODO: Implement add insight functionality
    toast({
      title: "Feature coming soon",
      description: "Insight creation will be available once Supabase is connected.",
    });
  };

  const handleEditInsight = (insight: Insight) => {
    // TODO: Implement edit insight functionality
    toast({
      title: "Feature coming soon",
      description: "Insight editing will be available once Supabase is connected.",
    });
  };

  const handleDeleteInsight = (id: string) => {
    if (dataStore.deleteInsight(id)) {
      setInsights(dataStore.getInsights());
      toast({
        title: "Insight deleted",
        description: "The insight has been removed from your research hub.",
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
        {filteredInsights.length === 0 ? (
          <EmptyState
            icon={<Lightbulb className="h-12 w-12" />}
            title={searchValue ? "No insights found" : "Start generating insights"}
            description={searchValue 
              ? "Try adjusting your search terms to find what you're looking for"
              : "Transform facts into meaningful conclusions and patterns. Use 'N' to quickly add new insights."
            }
            action={!searchValue ? {
              label: "Create your first insight",
              onClick: handleAddInsight
            } : undefined}
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredInsights.map((insight) => (
              <InsightCard
                key={insight.id}
                insight={insight}
                onEdit={handleEditInsight}
                onDelete={handleDeleteInsight}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Insights;