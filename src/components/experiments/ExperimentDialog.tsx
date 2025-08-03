import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Experiment } from "@/types";

interface ExperimentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  experiment?: Experiment;
  onSave: (experiment: Omit<Experiment, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export function ExperimentDialog({ open, onOpenChange, experiment, onSave }: ExperimentDialogProps) {
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    methodology: string;
    results: string;
    status: 'planning' | 'in-progress' | 'completed' | 'paused';
  }>({
    title: "",
    description: "",
    methodology: "",
    results: "",
    status: "planning",
  });

  useEffect(() => {
    if (experiment) {
      setFormData({
        title: experiment.title,
        description: experiment.description,
        methodology: experiment.methodology || "",
        results: experiment.results || "",
        status: experiment.status || "planning",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        methodology: "",
        results: "",
        status: "planning",
      });
    }
  }, [experiment, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  const isEditing = !!experiment;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {isEditing ? "Edit Experiment" : "Add New Experiment"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter experiment title..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the experiment purpose and goals..."
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="methodology">Methodology</Label>
            <Textarea
              id="methodology"
              value={formData.methodology}
              onChange={(e) => setFormData({ ...formData, methodology: e.target.value })}
              placeholder="Describe the research methods and approach..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="results">Results</Label>
            <Textarea
              id="results"
              value={formData.results}
              onChange={(e) => setFormData({ ...formData, results: e.target.value })}
              placeholder="Document findings and outcomes..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="gradient">
              {isEditing ? "Update Experiment" : "Create Experiment"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}