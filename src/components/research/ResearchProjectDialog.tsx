import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ResearchProject } from './ResearchProjectCard';

interface ResearchProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project?: ResearchProject | null;
  onSave: (project: Omit<ResearchProject, 'id' | 'created_at' | 'updated_at'>) => void;
}

export function ResearchProjectDialog({ open, onOpenChange, project, onSave }: ResearchProjectDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<string>('active');
  const [problemStatement, setProblemStatement] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [objectives, setObjectives] = useState('');
  const [background, setBackground] = useState('');

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description || '');
      setStatus(project.status);
      setProblemStatement(project.problem_statement || '');
      setTargetAudience(project.target_audience || '');
      setObjectives(project.objectives || '');
      setBackground(project.background || '');
    } else {
      setTitle('');
      setDescription('');
      setStatus('active');
      setProblemStatement('');
      setTargetAudience('');
      setObjectives('');
      setBackground('');
    }
  }, [project, open]);

  const handleSave = () => {
    if (!title.trim()) return;

    onSave({
      title: title.trim(),
      description: description.trim() || undefined,
      status,
      problem_statement: problemStatement.trim() || undefined,
      target_audience: targetAudience.trim() || undefined,
      objectives: objectives.trim() || undefined,
      background: background.trim() || undefined,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {project ? 'Edit Research Project' : 'Create New Research Project'}
          </DialogTitle>
          <DialogDescription>
            {project 
              ? 'Update your research project details.' 
              : 'Create a new research project to organize your experiments, facts, insights, and suggestions.'
            }
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter project title"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter project description (optional)"
              rows={3}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="problemStatement">Problem Statement</Label>
            <Textarea
              id="problemStatement"
              value={problemStatement}
              onChange={(e) => setProblemStatement(e.target.value)}
              placeholder="What problem does this research solve?"
              rows={2}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="targetAudience">Target Audience</Label>
            <Input
              id="targetAudience"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="Who will benefit from this research?"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="objectives">Objectives</Label>
            <Textarea
              id="objectives"
              value={objectives}
              onChange={(e) => setObjectives(e.target.value)}
              placeholder="What are the main goals of this research?"
              rows={2}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="background">Background</Label>
            <Textarea
              id="background"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              placeholder="Additional context or background information..."
              rows={2}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!title.trim()}>
            {project ? 'Update' : 'Create'} Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}