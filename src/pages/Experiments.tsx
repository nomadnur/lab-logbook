import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FlaskConical } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/page-header";
import { ExperimentCard } from "@/components/experiments/ExperimentCard";
import { ExperimentDialog } from "@/components/experiments/ExperimentDialog";
import { EmptyState } from "@/components/ui/empty-state";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Experiment } from "@/types";
import { useToast } from "@/hooks/use-toast";

const Experiments = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { user } = useAuth();
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingExperiment, setEditingExperiment] = useState<Experiment | undefined>();
  const { toast } = useToast();

  useEffect(() => {
    const fetchExperiments = async () => {
      if (!user || !projectId) return;

      try {
        const { data, error } = await supabase
          .from('experiments')
          .select('*')
          .eq('research_project_id', projectId)
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        // Transform the data to match our Experiment type
        const transformedExperiments: Experiment[] = (data || []).map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          methodology: item.methodology,
          results: item.results,
          status: item.status as "planning" | "in-progress" | "completed" | "paused",
          createdAt: item.created_at,
          updatedAt: item.updated_at,
        }));
        
        setExperiments(transformedExperiments);
      } catch (error: any) {
        toast({
          title: "Error loading experiments",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchExperiments();
  }, [user, projectId, toast]);

  const filteredExperiments = experiments.filter(experiment =>
    experiment.title.toLowerCase().includes(searchValue.toLowerCase()) ||
    experiment.description.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleAddExperiment = () => {
    setEditingExperiment(undefined);
    setDialogOpen(true);
  };

  const handleEditExperiment = (experiment: Experiment) => {
    setEditingExperiment(experiment);
    setDialogOpen(true);
  };

  const handleSaveExperiment = async (experimentData: Omit<Experiment, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!user || !projectId) return;

    try {
      if (editingExperiment) {
        const { error } = await supabase
          .from('experiments')
          .update({
            title: experimentData.title,
            description: experimentData.description,
            methodology: experimentData.methodology,
            results: experimentData.results,
            status: experimentData.status,
          })
          .eq('id', editingExperiment.id);

        if (error) throw error;

        setExperiments(experiments.map(exp => 
          exp.id === editingExperiment.id 
            ? { ...exp, ...experimentData, updatedAt: new Date().toISOString() }
            : exp
        ));
        
        toast({
          title: "Experiment updated",
          description: "Your experiment has been successfully updated.",
        });
      } else {
        const { data, error } = await supabase
          .from('experiments')
          .insert({
            title: experimentData.title,
            description: experimentData.description,
            methodology: experimentData.methodology,
            results: experimentData.results,
            status: experimentData.status,
            research_project_id: projectId,
            user_id: user.id,
          })
          .select()
          .single();

        if (error) throw error;

        const newExperiment: Experiment = {
          id: data.id,
          title: data.title,
          description: data.description,
          methodology: data.methodology,
          results: data.results,
          status: data.status as "planning" | "in-progress" | "completed" | "paused",
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        };

        setExperiments([newExperiment, ...experiments]);
        
        toast({
          title: "Experiment created",
          description: "Your new experiment has been added to the research hub.",
        });
      }
      
      setDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteExperiment = async (id: string) => {
    try {
      const { error } = await supabase
        .from('experiments')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setExperiments(experiments.filter(exp => exp.id !== id));
      toast({
        title: "Experiment deleted",
        description: "The experiment has been removed from your research hub.",
        variant: "destructive",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete the experiment.",
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
        handleAddExperiment();
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
        title="Experiments"
        description="Track and manage your research experiments"
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onAddClick={handleAddExperiment}
        addButtonText="New Experiment"
        icon={<FlaskConical className="h-5 w-5 text-primary-foreground" />}
      />

      <div className="container mx-auto px-6 pb-8">
        {filteredExperiments.length === 0 ? (
          <EmptyState
            icon={<FlaskConical className="h-12 w-12" />}
            title={searchValue ? "No experiments found" : "No experiments yet"}
            description={searchValue 
              ? "Try adjusting your search terms to find what you're looking for"
              : "Start building your research knowledge base by creating your first experiment. Use 'N' to quickly add new experiments."
            }
            action={!searchValue ? {
              label: "Create your first experiment",
              onClick: handleAddExperiment
            } : undefined}
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredExperiments.map((experiment) => (
              <ExperimentCard
                key={experiment.id}
                experiment={experiment}
                onEdit={handleEditExperiment}
                onDelete={handleDeleteExperiment}
              />
            ))}
          </div>
        )}
      </div>

      <ExperimentDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        experiment={editingExperiment}
        onSave={handleSaveExperiment}
      />
    </Layout>
  );
};

export default Experiments;
