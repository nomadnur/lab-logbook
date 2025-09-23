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
import { ArrowLeft, FlaskConical, FileText, Lightbulb, MessageSquare, Plus, Tag } from 'lucide-react';
import { ResearchProject } from '@/components/research/ResearchProjectCard';

interface EntityWithTags {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
  status?: string;
  priority?: string;
  created_at: string;
}

export default function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<ResearchProject | null>(null);
  const [stats, setStats] = useState({
    experiments: 0,
    facts: 0,
    insights: 0,
    suggestions: 0,
  });
  const [recentItems, setRecentItems] = useState<{
    experiments: EntityWithTags[];
    facts: EntityWithTags[];
    insights: EntityWithTags[];
    suggestions: EntityWithTags[];
  }>({
    experiments: [],
    facts: [],
    insights: [],
    suggestions: [],
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

        // Fetch stats and recent items for each data type
        const [experimentsResult, factsResult, insightsResult, suggestionsResult] = await Promise.all([
          supabase.from('experiments').select('id, title, description, tags, status, created_at').eq('research_project_id', projectId).order('created_at', { ascending: false }).limit(3),
          supabase.from('facts').select('id, title, description, tags, created_at').eq('research_project_id', projectId).order('created_at', { ascending: false }).limit(3),
          supabase.from('insights').select('id, title, description, tags, created_at').eq('research_project_id', projectId).order('created_at', { ascending: false }).limit(3),
          supabase.from('suggestions').select('id, title, description, tags, status, priority, created_at').eq('research_project_id', projectId).order('created_at', { ascending: false }).limit(3),
        ]);

        // Get counts
        const [expCount, factCount, insightCount, suggestionCount] = await Promise.all([
          supabase.from('experiments').select('id', { count: 'exact' }).eq('research_project_id', projectId),
          supabase.from('facts').select('id', { count: 'exact' }).eq('research_project_id', projectId),
          supabase.from('insights').select('id', { count: 'exact' }).eq('research_project_id', projectId),
          supabase.from('suggestions').select('id', { count: 'exact' }).eq('research_project_id', projectId),
        ]);

        setStats({
          experiments: expCount.count || 0,
          facts: factCount.count || 0,
          insights: insightCount.count || 0,
          suggestions: suggestionCount.count || 0,
        });

        setRecentItems({
          experiments: experimentsResult.data || [],
          facts: factsResult.data || [],
          insights: insightsResult.data || [],
          suggestions: suggestionsResult.data || [],
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

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
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

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">{project.title}</h1>
            <Badge variant={getStatusVariant(project.status)}>
              {project.status}
            </Badge>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-muted-foreground">
                {project.description || 'No description provided'}
              </p>
              {project.problem_statement && (
                <div className="mt-3">
                  <h3 className="font-semibold text-sm">Problem Statement</h3>
                  <p className="text-sm text-muted-foreground">{project.problem_statement}</p>
                </div>
              )}
            </div>
            <div className="space-y-2">
              {project.target_audience && (
                <div>
                  <h3 className="font-semibold text-sm">Target Audience</h3>
                  <p className="text-sm text-muted-foreground">{project.target_audience}</p>
                </div>
              )}
              {project.objectives && (
                <div>
                  <h3 className="font-semibold text-sm">Objectives</h3>
                  <p className="text-sm text-muted-foreground">{project.objectives}</p>
                </div>
              )}
            </div>
          </div>
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

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Experiments */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle className="text-lg">Recent Experiments</CardTitle>
                <CardDescription>{stats.experiments} total</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/projects/${projectId}/experiments`)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentItems.experiments.length > 0 ? (
                recentItems.experiments.map((item) => (
                  <div key={item.id} className="border-b last:border-b-0 pb-3 last:pb-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                      {item.status && (
                        <Badge variant="outline" className="ml-2 text-xs">
                          {item.status}
                        </Badge>
                      )}
                    </div>
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded-md text-xs">
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                        {item.tags.length > 3 && (
                          <span className="text-xs text-muted-foreground">+{item.tags.length - 3} more</span>
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No experiments yet</p>
              )}
            </CardContent>
          </Card>

          {/* Recent Facts */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle className="text-lg">Recent Facts</CardTitle>
                <CardDescription>{stats.facts} total</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/projects/${projectId}/facts`)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentItems.facts.length > 0 ? (
                recentItems.facts.map((item) => (
                  <div key={item.id} className="border-b last:border-b-0 pb-3 last:pb-0">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded-md text-xs">
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                        {item.tags.length > 3 && (
                          <span className="text-xs text-muted-foreground">+{item.tags.length - 3} more</span>
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No facts yet</p>
              )}
            </CardContent>
          </Card>

          {/* Recent Insights */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle className="text-lg">Recent Insights</CardTitle>
                <CardDescription>{stats.insights} total</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/projects/${projectId}/insights`)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentItems.insights.length > 0 ? (
                recentItems.insights.map((item) => (
                  <div key={item.id} className="border-b last:border-b-0 pb-3 last:pb-0">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded-md text-xs">
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                        {item.tags.length > 3 && (
                          <span className="text-xs text-muted-foreground">+{item.tags.length - 3} more</span>
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No insights yet</p>
              )}
            </CardContent>
          </Card>

          {/* Recent Suggestions */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle className="text-lg">Recent Suggestions</CardTitle>
                <CardDescription>{stats.suggestions} total</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/projects/${projectId}/suggestions`)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentItems.suggestions.length > 0 ? (
                recentItems.suggestions.map((item) => (
                  <div key={item.id} className="border-b last:border-b-0 pb-3 last:pb-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-2">
                        {item.priority && (
                          <span className={`text-xs font-medium ${getPriorityColor(item.priority)}`}>
                            {item.priority}
                          </span>
                        )}
                        {item.status && (
                          <Badge variant="outline" className="text-xs">
                            {item.status}
                          </Badge>
                        )}
                      </div>
                    </div>
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded-md text-xs">
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                        {item.tags.length > 3 && (
                          <span className="text-xs text-muted-foreground">+{item.tags.length - 3} more</span>
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No suggestions yet</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}