import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, FlaskConical, FileText, Lightbulb, MessageSquare } from 'lucide-react';
import { ResearchProject } from '@/components/research/ResearchProjectCard';

export default function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<ResearchProject | null>(null);
  const [stats, setStats] = useState({
    experiments: 0,
    facts: 0,
    insights: 0,
    suggestions: 0,
  });
  const [loading, setLoading] = useState(true);
  
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectAndStats = async () => {
      if (!user || !projectId) return;

      try {
        // Fetch project details
        const { data: projectData, error: projectError } = await supabase
          .from('research_projects')
          .select('*')
          .eq('id', projectId)
          .eq('user_id', user.id)
          .single();

        if (projectError) throw projectError;
        setProject(projectData);

        // Fetch stats for each data type
        const [experimentsResult, factsResult, insightsResult, suggestionsResult] = await Promise.all([
          supabase.from('experiments').select('id', { count: 'exact' }).eq('research_project_id', projectId),
          supabase.from('facts').select('id', { count: 'exact' }).eq('research_project_id', projectId),
          supabase.from('insights').select('id', { count: 'exact' }).eq('research_project_id', projectId),
          supabase.from('suggestions').select('id', { count: 'exact' }).eq('research_project_id', projectId),
        ]);

        setStats({
          experiments: experimentsResult.count || 0,
          facts: factsResult.count || 0,
          insights: insightsResult.count || 0,
          suggestions: suggestionsResult.count || 0,
        });

      } catch (error: any) {
        toast({
          title: "Error loading project",
          description: error.message,
          variant: "destructive",
        });
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectAndStats();
  }, [user, projectId, navigate, toast]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">Project not found</h2>
          <p className="text-muted-foreground mt-2">The requested project could not be found.</p>
          <Button onClick={() => navigate('/')} className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </div>
      </Layout>
    );
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'completed': return 'secondary';
      case 'archived': return 'outline';
      default: return 'default';
    }
  };

  const dataTypes = [
    {
      title: 'Experiments',
      description: 'Research experiments and studies',
      count: stats.experiments,
      icon: FlaskConical,
      path: `/projects/${projectId}/experiments`,
      color: 'bg-blue-500',
    },
    {
      title: 'Facts',
      description: 'Research facts and findings',
      count: stats.facts,
      icon: FileText,
      path: `/projects/${projectId}/facts`,
      color: 'bg-green-500',
    },
    {
      title: 'Insights',
      description: 'Research insights and analysis',
      count: stats.insights,
      icon: Lightbulb,
      path: `/projects/${projectId}/insights`,
      color: 'bg-yellow-500',
    },
    {
      title: 'Suggestions',
      description: 'Research suggestions and recommendations',
      count: stats.suggestions,
      icon: MessageSquare,
      path: `/projects/${projectId}/suggestions`,
      color: 'bg-purple-500',
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">{project.title}</h1>
            <Badge variant={getStatusVariant(project.status)}>
              {project.status}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            {project.description || 'No description provided'}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {dataTypes.map((dataType) => {
            const IconComponent = dataType.icon;
            return (
              <Card 
                key={dataType.title}
                className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105"
                onClick={() => navigate(dataType.path)}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {dataType.title}
                  </CardTitle>
                  <div className={`p-2 rounded-md ${dataType.color}`}>
                    <IconComponent className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dataType.count}</div>
                  <CardDescription className="text-xs">
                    {dataType.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
            <CardDescription>
              Created on {new Date(project.created_at).toLocaleDateString()} • 
              Last updated {new Date(project.updated_at).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {project.description || 'No description provided for this project.'}
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}