import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Target, 
  Users, 
  Lightbulb, 
  TrendingUp, 
  Zap, 
  Shield,
  Network,
  BookOpen
} from "lucide-react";

export default function About() {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-primary rounded-2xl">
              <BookOpen className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Research Intelligence Platform
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transforming how researchers, academics, and organizations capture, connect, and discover insights from their knowledge work.
          </p>
        </div>

        {/* Problem Statement */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-destructive" />
              <CardTitle>The Problem We Solve</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Research teams and knowledge workers struggle with scattered information, disconnected insights, 
              and the inability to see patterns across their work. Traditional tools force researchers to:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">•</span>
                <span className="text-sm">Jump between multiple disconnected tools</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">•</span>
                <span className="text-sm">Lose valuable insights in silos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">•</span>
                <span className="text-sm">Struggle to connect related findings</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">•</span>
                <span className="text-sm">Miss opportunities for breakthrough discoveries</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Vision & Mission */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-warning" />
              <CardTitle>Our Vision</CardTitle>
            </div>
            <CardDescription>
              A world where every insight is connected, every pattern is discoverable, and breakthrough discoveries emerge from intelligent knowledge synthesis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto mb-3">
                  <Network className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Connected Knowledge</h3>
                <p className="text-sm text-muted-foreground">
                  Link insights, facts, and experiments to reveal hidden patterns
                </p>
              </div>
              <div className="text-center">
                <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto mb-3">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Intelligent Discovery</h3>
                <p className="text-sm text-muted-foreground">
                  AI-powered suggestions surface relevant connections and opportunities
                </p>
              </div>
              <div className="text-center">
                <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Accelerated Innovation</h3>
                <p className="text-sm text-muted-foreground">
                  Turn fragmented knowledge into breakthrough insights faster
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Target Users */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-info" />
              <CardTitle>Who We Serve</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">Academic Researchers</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    PhD students, professors, and research teams managing literature reviews, 
                    experimental data, and collaborative research projects.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">R&D Teams</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Corporate research teams, innovation labs, and product development 
                    groups tracking experiments and market insights.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">Knowledge Workers</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Consultants, analysts, and strategic planners who need to synthesize 
                    information from multiple sources into actionable insights.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">Think Tanks & NGOs</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Policy researchers, social scientists, and advocacy organizations 
                    building evidence-based arguments and reports.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Use Cases */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Key Use Cases</CardTitle>
            <CardDescription>
              Real-world scenarios where our platform creates transformative value
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold text-lg mb-2">Literature Review & Meta-Analysis</h3>
                <p className="text-muted-foreground mb-3">
                  Systematically capture findings from hundreds of papers, identify patterns, 
                  and discover research gaps that lead to novel hypotheses.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Academic Research</Badge>
                  <Badge variant="outline">Systematic Reviews</Badge>
                  <Badge variant="outline">Evidence Synthesis</Badge>
                </div>
              </div>

              <Separator />

              <div className="border-l-4 border-secondary pl-4">
                <h3 className="font-semibold text-lg mb-2">Product Development Intelligence</h3>
                <p className="text-muted-foreground mb-3">
                  Track user feedback, competitive analysis, and experimental results to 
                  inform product roadmaps and strategic decisions.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Product Management</Badge>
                  <Badge variant="outline">User Research</Badge>
                  <Badge variant="outline">Competitive Intelligence</Badge>
                </div>
              </div>

              <Separator />

              <div className="border-l-4 border-accent pl-4">
                <h3 className="font-semibold text-lg mb-2">Policy Research & Analysis</h3>
                <p className="text-muted-foreground mb-3">
                  Aggregate evidence from multiple domains to support policy recommendations 
                  and build comprehensive briefing documents.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Policy Analysis</Badge>
                  <Badge variant="outline">Government Research</Badge>
                  <Badge variant="outline">Evidence-Based Policy</Badge>
                </div>
              </div>

              <Separator />

              <div className="border-l-4 border-muted pl-4">
                <h3 className="font-semibold text-lg mb-2">Innovation Scouting</h3>
                <p className="text-muted-foreground mb-3">
                  Monitor emerging technologies, track patent landscapes, and identify 
                  partnership opportunities across industries.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Technology Scouting</Badge>
                  <Badge variant="outline">Patent Analysis</Badge>
                  <Badge variant="outline">Innovation Management</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Value Proposition */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-success" />
              <CardTitle>Why Choose Our Platform</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-1 bg-success/20 rounded-full mt-1">
                    <div className="h-2 w-2 bg-success rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-medium">Unified Knowledge Hub</h4>
                    <p className="text-sm text-muted-foreground">
                      One platform for all your research artifacts - no more tool switching
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-1 bg-success/20 rounded-full mt-1">
                    <div className="h-2 w-2 bg-success rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-medium">Intelligent Connections</h4>
                    <p className="text-sm text-muted-foreground">
                      AI-powered linking reveals hidden patterns in your knowledge
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-1 bg-success/20 rounded-full mt-1">
                    <div className="h-2 w-2 bg-success rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-medium">Collaborative Research</h4>
                    <p className="text-sm text-muted-foreground">
                      Real-time collaboration with secure access controls
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-1 bg-success/20 rounded-full mt-1">
                    <div className="h-2 w-2 bg-success rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-medium">Scalable Architecture</h4>
                    <p className="text-sm text-muted-foreground">
                      From individual researchers to enterprise teams
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-1 bg-success/20 rounded-full mt-1">
                    <div className="h-2 w-2 bg-success rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-medium">Export & Integration</h4>
                    <p className="text-sm text-muted-foreground">
                      Seamless integration with existing research workflows
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-1 bg-success/20 rounded-full mt-1">
                    <div className="h-2 w-2 bg-success rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-medium">Privacy & Security</h4>
                    <p className="text-sm text-muted-foreground">
                      Enterprise-grade security for sensitive research data
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}