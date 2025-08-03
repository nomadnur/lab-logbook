import { useState } from "react";
import { FlaskConical } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/page-header";
import { ExperimentCard } from "@/components/experiments/ExperimentCard";
import { ExperimentDialog } from "@/components/experiments/ExperimentDialog";
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

      <div className="container mx-auto px-6 py-8">
        {filteredExperiments.length === 0 ? (
          <div className="text-center py-12">
            <FlaskConical className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              {searchValue ? "No experiments found" : "No experiments yet"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchValue 
                ? "Try adjusting your search terms or filters"
                : "Start building your research knowledge base by creating your first experiment"
              }
            </p>
            {!searchValue && (
              <button
                onClick={handleAddExperiment}
                className="text-primary hover:text-primary/80 font-medium"
              >
                Create your first experiment →
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
