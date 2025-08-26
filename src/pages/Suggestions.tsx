import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ListChecks } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { SuggestionCard } from "@/components/suggestions/SuggestionCard";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Suggestion } from "@/types";
import { useToast } from "@/hooks/use-toast";

const Suggestions = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { user } = useAuth();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!user || !projectId) return;

      try {
        const { data, error } = await supabase
          .from('suggestions')
          .select('*')
          .eq('research_project_id', projectId)
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        // Transform the data to match our Suggestion type
        const transformedSuggestions: Suggestion[] = (data || []).map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          priority: item.priority as "low" | "medium" | "high",
          status: item.status as "open" | "in-progress" | "implemented",
          createdAt: item.created_at,
          updatedAt: item.updated_at,
        }));
        
        setSuggestions(transformedSuggestions);
      } catch (error: any) {
        toast({
          title: "Error loading suggestions",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [user, projectId, toast]);

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

  const handleDeleteSuggestion = async (id: string) => {
    try {
      const { error } = await supabase
        .from('suggestions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setSuggestions(suggestions.filter(suggestion => suggestion.id !== id));
      toast({
        title: "Suggestion deleted",
        description: "The suggestion has been removed from your knowledge base.",
        variant: "destructive",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete the suggestion.",
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
        title="Suggestions"
        description="Track and prioritize research suggestions"
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
            title={searchValue ? "No suggestions found" : "No suggestions yet"}
            description={searchValue 
              ? "Try adjusting your search terms to find what you're looking for"
              : "Start building your research knowledge base by tracking suggestions. Use 'N' to quickly add new suggestions."
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