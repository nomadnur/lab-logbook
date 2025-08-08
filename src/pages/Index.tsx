import { useState, useEffect } from "react";
import { FlaskConical } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/page-header";
import { ExperimentCard } from "@/components/experiments/ExperimentCard";
import { ExperimentDialog } from "@/components/experiments/ExperimentDialog";
import { EmptyState } from "@/components/ui/empty-state";
import { dataStore } from "@/stores/dataStore";
import { Experiment } from "@/types";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [experiments, setExperiments] = useState(dataStore.getExperiments());
  const [searchValue, setSearchValue] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingExperiment, setEditingExperiment] = useState<Experiment | undefined>();
  const { toast } = useToast();

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

  const handleSaveExperiment = (experimentData: Omit<Experiment, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingExperiment) {
      const updated = dataStore.updateExperiment(editingExperiment.id, experimentData);
      if (updated) {
        setExperiments(dataStore.getExperiments());
        toast({
          title: "Experiment updated",
          description: "Your experiment has been successfully updated.",
        });
      }
    } else {
      dataStore.addExperiment(experimentData);
      setExperiments(dataStore.getExperiments());
      toast({
        title: "Experiment created",
        description: "Your new experiment has been added to the research hub.",
      });
    }
  };

  const handleDeleteExperiment = (id: string) => {
    if (dataStore.deleteExperiment(id)) {
      setExperiments(dataStore.getExperiments());
      toast({
        title: "Experiment deleted",
        description: "The experiment has been removed from your research hub.",
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

export default Index;
