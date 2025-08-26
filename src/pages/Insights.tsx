import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Lightbulb } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { InsightCard } from "@/components/insights/InsightCard";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Insight } from "@/types";
import { useToast } from "@/hooks/use-toast";

const Insights = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { user } = useAuth();
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchInsights = async () => {
      if (!user || !projectId) return;

      try {
        const { data, error } = await supabase
          .from('insights')
          .select('*')
          .eq('research_project_id', projectId)
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        // Transform the data to match our Insight type
        const transformedInsights: Insight[] = (data || []).map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
        }));
        
        setInsights(transformedInsights);
      } catch (error: any) {
        toast({
          title: "Error loading insights",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, [user, projectId, toast]);

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

  const handleDeleteInsight = async (id: string) => {
    try {
      const { error } = await supabase
        .from('insights')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setInsights(insights.filter(insight => insight.id !== id));
      toast({
        title: "Insight deleted",
        description: "The insight has been removed from your knowledge base.",
        variant: "destructive",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete the insight.",
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

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader
        title="Insights"
        description="Discover and manage research insights"
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
            title={searchValue ? "No insights found" : "No insights yet"}
            description={searchValue 
              ? "Try adjusting your search terms to find what you're looking for"
              : "Start building your research knowledge base by generating insights. Use 'N' to quickly add new insights."
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