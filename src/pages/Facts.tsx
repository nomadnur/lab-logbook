import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FileText } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { FactCard } from "@/components/facts/FactCard";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Fact } from "@/types";
import { useToast } from "@/hooks/use-toast";

const Facts = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { user } = useAuth();
  const [facts, setFacts] = useState<Fact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchFacts = async () => {
      if (!user || !projectId) return;

      try {
        const { data, error } = await supabase
          .from('facts')
          .select('*')
          .eq('research_project_id', projectId)
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        // Transform the data to match our Fact type
        const transformedFacts: Fact[] = (data || []).map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          category: item.category,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
        }));
        
        setFacts(transformedFacts);
      } catch (error: any) {
        toast({
          title: "Error loading facts",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFacts();
  }, [user, projectId, toast]);

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

  const handleDeleteFact = async (id: string) => {
    try {
      const { error } = await supabase
        .from('facts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setFacts(facts.filter(fact => fact.id !== id));
      toast({
        title: "Fact deleted",
        description: "The fact has been removed from your knowledge base.",
        variant: "destructive",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete the fact.",
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
        title="Facts"
        description="Organize and manage your research facts"
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
            title={searchValue ? "No facts found" : "No facts yet"}
            description={searchValue 
              ? "Try adjusting your search terms to find what you're looking for"
              : "Start building your research knowledge base by collecting facts. Use 'N' to quickly add new facts."
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