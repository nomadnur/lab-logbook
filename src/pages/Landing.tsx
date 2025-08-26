import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, FlaskConical, Lightbulb, TrendingUp, Zap, CheckCircle, X } from "lucide-react";
import { Link } from "react-router-dom";
import dashboardScreenshot from "@/assets/dashboard-screenshot.jpg";
import beforeAfterComparison from "@/assets/before-after-comparison.jpg";
import workflowDiagram from "@/assets/workflow-diagram.jpg";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Research Hub</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/about">
              <Button variant="ghost">About</Button>
            </Link>
            <Link to="/auth">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            From Scattered Notes to Learning Engine
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
            Turn Discovery Into
            <br />
            Connected Insights
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Research Hub transforms fragmented startup knowledge into a continuous learning engine. 
            Connect experiments, facts, insights, and decisions with traceable evidence chains.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/auth">
              <Button size="lg" className="gap-2">
                Start Building <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">4</div>
              <div className="text-sm text-muted-foreground">Connected Types</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Traceable</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">0</div>
              <div className="text-sm text-muted-foreground">Lost Insights</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">∞</div>
              <div className="text-sm text-muted-foreground">Connections</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The Fragmentation Problem</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Startup teams lose critical insights across disconnected tools
            </p>
            
            {/* Visual comparison image */}
            <div className="mb-12">
              <img 
                src={beforeAfterComparison} 
                alt="Before and after comparison showing fragmented vs organized research"
                className="rounded-lg shadow-elegant mx-auto max-w-full h-auto"
              />
            </div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Before - Enhanced visual design */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-destructive/20 to-destructive/10 rounded-lg blur"></div>
              <Card className="relative border-destructive/30 bg-background/50 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-destructive/10 rounded-lg">
                      <X className="h-5 w-5 text-destructive" />
                    </div>
                    <CardTitle className="text-destructive text-xl">Before Research Hub</CardTitle>
                  </div>
                  <CardDescription className="text-base">Fragmented knowledge, lost insights</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-destructive/5 rounded-lg">
                    <span className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm">Discovery findings don't reach delivery teams</span>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-destructive/5 rounded-lg">
                    <span className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm">Experiments aren't linked to justifying facts</span>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-destructive/5 rounded-lg">
                    <span className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm">Insights get lost; roadmaps drift from evidence</span>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-destructive/5 rounded-lg">
                    <span className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm">Decisions justified by memory and slides</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* After - Enhanced visual design */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-primary rounded-lg blur opacity-30"></div>
              <Card className="relative border-primary/30 bg-background/50 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-primary text-xl">After Research Hub</CardTitle>
                  </div>
                  <CardDescription className="text-base">Connected learning, compounding insights</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span className="text-sm">Decisions anchored to traceable facts</span>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span className="text-sm">Compounding knowledge across projects</span>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span className="text-sm">Backlog prioritized by validated insights</span>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span className="text-sm">Evidence trails from user proof to product change</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Four Components */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Four Connected Components</h2>
            <p className="text-xl text-muted-foreground mb-8">
              A simple model that connects everything you learn
            </p>
            
            {/* Dashboard screenshot */}
            <div className="mb-12">
              <img 
                src={dashboardScreenshot} 
                alt="Research Hub dashboard showing connected experiments, facts, insights, and suggestions"
                className="rounded-lg shadow-elegant mx-auto max-w-full h-auto border border-border/50"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader className="text-center">
                <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto mb-3">
                  <FlaskConical className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>🧪 Experiments</CardTitle>
                <CardDescription>Things we try</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Define hypotheses, log variants, record outcomes. Keep a history of what was tried and why.
                </p>
              </CardContent>
            </Card>

            <Card className="border-secondary/20 hover:border-secondary/40 transition-colors">
              <CardHeader className="text-center">
                <div className="p-3 bg-secondary/10 rounded-lg w-fit mx-auto mb-3">
                  <TrendingUp className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle>📊 Facts</CardTitle>
                <CardDescription>Signals we observe</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Capture atomic observations from interviews, analytics, support tickets, and usability tests.
                </p>
              </CardContent>
            </Card>

            <Card className="border-accent/20 hover:border-accent/40 transition-colors">
              <CardHeader className="text-center">
                <div className="p-3 bg-accent/10 rounded-lg w-fit mx-auto mb-3">
                  <Lightbulb className="h-8 w-8 text-accent" />
                </div>
                <CardTitle>💡 Insights</CardTitle>
                <CardDescription>Meaning we agree on</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Connect facts across sources to form clear statements that guide decisions and drive action.
                </p>
              </CardContent>
            </Card>

            <Card className="border-muted/40 hover:border-muted/60 transition-colors">
              <CardHeader className="text-center">
                <div className="p-3 bg-muted/10 rounded-lg w-fit mx-auto mb-3">
                  <Zap className="h-8 w-8 text-foreground" />
                </div>
                <CardTitle>✨ Suggestions</CardTitle>
                <CardDescription>Decisions & next actions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Turn insights into prioritized actions. Track status and keep a link back to the evidence.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Case Example */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">See It In Action</h2>
              <p className="text-xl text-muted-foreground mb-8">
                How a product manager uses Research Hub to validate a feature
              </p>
              
              {/* Workflow diagram */}
              <div className="mb-8">
                <img 
                  src={workflowDiagram} 
                  alt="Workflow diagram showing the 4-step research process"
                  className="rounded-lg mx-auto max-w-full h-auto"
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <Card className="border-l-4 border-primary">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <span className="text-sm font-bold text-primary">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Log Experiment</h3>
                      <p className="text-muted-foreground">"New onboarding checklist vs. video tutorial"</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center">
                <ArrowRight className="h-6 w-6 text-muted-foreground" />
              </div>

              <Card className="border-l-4 border-secondary">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-secondary/10 rounded-lg">
                      <span className="text-sm font-bold text-secondary">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Add Facts</h3>
                      <p className="text-muted-foreground">70% skip video; time-to-value improves with checklist</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center">
                <ArrowRight className="h-6 w-6 text-muted-foreground" />
              </div>

              <Card className="border-l-4 border-accent">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <span className="text-sm font-bold text-accent">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Derive Insight</h3>
                      <p className="text-muted-foreground">"Shorter, interactive onboarding increases trial conversion"</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center">
                <ArrowRight className="h-6 w-6 text-muted-foreground" />
              </div>

              <Card className="border-l-4 border-muted">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-muted/20 rounded-lg">
                      <span className="text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Create Suggestion</h3>
                      <p className="text-muted-foreground">"Ship guided checklist; A/B test on 20% of traffic"</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <p className="text-muted-foreground mb-4">
                Leadership sees the complete chain from evidence to action
              </p>
              <Link to="/auth">
                <Button size="lg">
                  Try It Yourself <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Build Your Learning Engine?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Start by seeding one project: import your last 3 experiments, 10 key facts, and 5 insights. 
              In one hour, your team will see the product story—grounded in evidence and ready to act.
            </p>
            <Link to="/auth">
              <Button size="lg" className="gap-2">
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <BookOpen className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">Research Hub</span>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link to="/auth" className="text-sm text-muted-foreground hover:text-foreground">
                Login
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}