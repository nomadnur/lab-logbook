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
            Research Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Turn scattered discovery into a continuous learning engine for startup and product teams. From fragmented notes to connected insights that power decisions.
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
              In startup and product teams, important knowledge splinters across tools: customer interviews in Notion, 
              experiments in spreadsheets, insights in slide decks, and "next steps" buried in chats. This fragmentation 
              slows validation, repeats work, and hides patterns that should inform the roadmap.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">•</span>
                <span className="text-sm">Discovery findings don't reach delivery teams</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">•</span>
                <span className="text-sm">Experiments aren't linked to justifying facts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">•</span>
                <span className="text-sm">Insights aren't reused; roadmaps drift from evidence</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">•</span>
                <span className="text-sm">Backlog items lack traceability to real signals</span>
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
              From scattered notes to a learning engine. Connect experiments, facts, insights, and suggestions into a traceable chain that powers startup validation and product decisions.
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
                    <Badge variant="secondary">Founders & Early Teams</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Startup founders validating problem/solution fit, turning customer conversations 
                    into actionable insights that guide product decisions.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">Product Managers</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    PMs aligning roadmaps with evidence, connecting user feedback to features, 
                    and building traceable decision chains from insight to implementation.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">UX Researchers & Designers</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Researchers turning interviews and usability tests into reusable insights, 
                    and designers who need the "why" behind their tasks.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">Growth & Marketing Teams</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Teams running rapid experiments, tracking conversion signals, and building 
                    evidence-based growth strategies from validated learnings.
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
                <h3 className="font-semibold text-lg mb-2">🧪 Experiment Tracking</h3>
                <p className="text-muted-foreground mb-3">
                  Define hypotheses, log variants, record outcomes, and keep a history of what was tried 
                  and why. Link experiments to the facts that justify them.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">A/B Testing</Badge>
                  <Badge variant="outline">Feature Validation</Badge>
                  <Badge variant="outline">Hypothesis Testing</Badge>
                </div>
              </div>

              <Separator />

              <div className="border-l-4 border-secondary pl-4">
                <h3 className="font-semibold text-lg mb-2">📊 Fact Collection</h3>
                <p className="text-muted-foreground mb-3">
                  Capture atomic observations from interviews, analytics, support tickets, and usability tests. 
                  Tag by topic, persona, and journey stage.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">User Interviews</Badge>
                  <Badge variant="outline">Analytics Data</Badge>
                  <Badge variant="outline">Customer Feedback</Badge>
                </div>
              </div>

              <Separator />

              <div className="border-l-4 border-accent pl-4">
                <h3 className="font-semibold text-lg mb-2">💡 Insight Generation</h3>
                <p className="text-muted-foreground mb-3">
                  Connect facts across sources to form clear statements that guide decisions. 
                  Turn patterns into actionable insights with evidence trails.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Pattern Recognition</Badge>
                  <Badge variant="outline">Evidence Synthesis</Badge>
                  <Badge variant="outline">Decision Support</Badge>
                </div>
              </div>

              <Separator />

              <div className="border-l-4 border-muted pl-4">
                <h3 className="font-semibold text-lg mb-2">✨ Suggestion Management</h3>
                <p className="text-muted-foreground mb-3">
                  Turn insights into prioritized actions; track status and keep a link back to the evidence. 
                  Build a backlog anchored in validated learning.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Feature Backlog</Badge>
                  <Badge variant="outline">Roadmap Planning</Badge>
                  <Badge variant="outline">Evidence-Based Decisions</Badge>
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
              <CardTitle>What Changes With Research Hub</CardTitle>
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
                    <h4 className="font-medium">Faster Validation</h4>
                    <p className="text-sm text-muted-foreground">
                      Shorten cycles from idea → insight → iteration with connected learning
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-1 bg-success/20 rounded-full mt-1">
                    <div className="h-2 w-2 bg-success rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-medium">Less Waste</h4>
                    <p className="text-sm text-muted-foreground">
                      Stop repeating interviews and tests; reuse evidence across projects
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-1 bg-success/20 rounded-full mt-1">
                    <div className="h-2 w-2 bg-success rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-medium">Clear Prioritization</h4>
                    <p className="text-sm text-muted-foreground">
                      Focus on actions tied to strong signals, not vibes or assumptions
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
                    <h4 className="font-medium">Credible Narratives</h4>
                    <p className="text-sm text-muted-foreground">
                      Tell the story from user proof to product change with evidence trails
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-1 bg-success/20 rounded-full mt-1">
                    <div className="h-2 w-2 bg-success rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-medium">Team Alignment</h4>
                    <p className="text-sm text-muted-foreground">
                      A single source of truth for "what we know" across the entire team
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-1 bg-success/20 rounded-full mt-1">
                    <div className="h-2 w-2 bg-success rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-medium">Compounding Learning</h4>
                    <p className="text-sm text-muted-foreground">
                      Build a repeatable learning engine that gets smarter with every insight
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