import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui/page-header';
import { ResearchProjectCard, ResearchProject } from '@/components/research/ResearchProjectCard';
import { ResearchProjectDialog } from '@/components/research/ResearchProjectDialog';
import { EmptyState } from '@/components/ui/empty-state';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, FolderOpen } from 'lucide-react';

export default function ResearchProjects() {
  const [projects, setProjects] = useState<ResearchProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ResearchProject | null>(null);
  
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const fetchProjects = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('research_projects')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading projects",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [user]);

  const handleAddProject = () => {
    setEditingProject(null);
    setDialogOpen(true);
  };

  const handleEditProject = (project: ResearchProject) => {
    setEditingProject(project);
    setDialogOpen(true);
  };

  const handleSaveProject = async (projectData: Omit<ResearchProject, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) return;

    try {
      if (editingProject) {
        const { error } = await supabase
          .from('research_projects')
          .update(projectData)
          .eq('id', editingProject.id);

        if (error) throw error;
        
        toast({
          title: "Project updated",
          description: "Your research project has been updated successfully.",
        });
      } else {
        const { error } = await supabase
          .from('research_projects')
          .insert([{
            ...projectData,
            user_id: user.id,
          }]);

        if (error) throw error;
        
        toast({
          title: "Project created",
          description: "Your new research project has been created successfully.",
        });
      }

      fetchProjects();
    } catch (error: any) {
      toast({
        title: editingProject ? "Error updating project" : "Error creating project",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('research_projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Project deleted",
        description: "The research project has been deleted successfully.",
      });

      fetchProjects();
    } catch (error: any) {
      toast({
        title: "Error deleting project",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleProjectClick = (project: ResearchProject) => {
    navigate(`/projects/${project.id}`);
  };

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
        title="Research Projects" 
        description="Manage your research projects and organize your studies"
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        onAddClick={handleAddProject}
        addButtonText="New Project"
      />

      {filteredProjects.length === 0 ? (
        <EmptyState
          icon={<FolderOpen className="h-12 w-12" />}
          title={searchQuery ? "No projects found" : "No research projects yet"}
          description={
            searchQuery 
              ? "Try adjusting your search terms to find projects."
              : "Create your first research project to start organizing your research work."
          }
          action={!searchQuery ? {
            label: "Create Project",
            onClick: handleAddProject
          } : undefined}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ResearchProjectCard
              key={project.id}
              project={project}
              onEdit={handleEditProject}
              onDelete={handleDeleteProject}
              onClick={handleProjectClick}
            />
          ))}
        </div>
      )}

      <ResearchProjectDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        project={editingProject}
        onSave={handleSaveProject}
      />
    </Layout>
  );
}