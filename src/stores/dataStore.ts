import { Experiment, Fact, Insight, Suggestion } from "@/types";

// Mock data store - will be replaced with Supabase later
class DataStore {
  private experiments: Experiment[] = [
    {
      id: "1",
      title: "User Interface Accessibility Study",
      description: "Comprehensive analysis of accessibility features in our current UI design, focusing on screen reader compatibility and keyboard navigation.",
      methodology: "A/B testing with 50 participants, including 15 users with disabilities. Used WCAG 2.1 guidelines as baseline.",
      results: "87% improvement in task completion rates for users with visual impairments. Identified 12 critical accessibility gaps.",
      status: "completed",
      createdAt: "2024-01-15T09:00:00Z",
      updatedAt: "2024-01-15T09:00:00Z",
    },
    {
      id: "2",
      title: "Machine Learning Model Performance Analysis",
      description: "Evaluation of different ML algorithms for predicting user behavior patterns in our research platform.",
      methodology: "Comparative analysis using Random Forest, SVM, and Neural Networks on 10,000 user interaction samples.",
      status: "in-progress",
      createdAt: "2024-01-20T14:30:00Z",
      updatedAt: "2024-01-20T14:30:00Z",
    }
  ];

  private facts: Fact[] = [
    {
      id: "1",
      title: "Screen Reader Usage Statistics",
      description: "NVDA is used by 41% of screen reader users, followed by JAWS at 40.5%. VoiceOver usage is at 12.6%.",
      category: "Accessibility",
      relatedExperiments: ["1"],
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-15T10:30:00Z",
    },
    {
      id: "2",
      title: "Color Contrast Requirements",
      description: "WCAG 2.1 AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text.",
      category: "Accessibility",
      relatedExperiments: ["1"],
      createdAt: "2024-01-15T11:00:00Z",
      updatedAt: "2024-01-15T11:00:00Z",
    }
  ];

  private insights: Insight[] = [
    {
      id: "1",
      title: "Accessibility Improvements Drive Engagement",
      description: "Users with disabilities who can successfully navigate our interface show 3x higher engagement rates and longer session durations.",
      relatedFacts: ["1", "2"],
      createdAt: "2024-01-16T09:15:00Z",
      updatedAt: "2024-01-16T09:15:00Z",
    }
  ];

  private suggestions: Suggestion[] = [
    {
      id: "1",
      title: "Implement Skip Navigation Links",
      description: "Add skip links at the top of each page to allow keyboard users to quickly jump to main content areas.",
      priority: "high",
      status: "open",
      createdAt: "2024-01-16T14:00:00Z",
      updatedAt: "2024-01-16T14:00:00Z",
    },
    {
      id: "2",
      title: "Enhance Color Contrast in Charts",
      description: "Update data visualization components to meet WCAG 2.1 AA contrast requirements for better accessibility.",
      priority: "medium",
      status: "in-progress",
      createdAt: "2024-01-17T10:30:00Z",
      updatedAt: "2024-01-17T10:30:00Z",
    }
  ];

  // Experiments
  getExperiments(): Experiment[] {
    return [...this.experiments];
  }

  addExperiment(experiment: Omit<Experiment, 'id' | 'createdAt' | 'updatedAt'>): Experiment {
    const newExperiment: Experiment = {
      ...experiment,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.experiments.push(newExperiment);
    return newExperiment;
  }

  updateExperiment(id: string, updates: Partial<Experiment>): Experiment | null {
    const index = this.experiments.findIndex(e => e.id === id);
    if (index === -1) return null;
    
    this.experiments[index] = {
      ...this.experiments[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return this.experiments[index];
  }

  deleteExperiment(id: string): boolean {
    const index = this.experiments.findIndex(e => e.id === id);
    if (index === -1) return false;
    
    this.experiments.splice(index, 1);
    return true;
  }

  // Facts
  getFacts(): Fact[] {
    return [...this.facts];
  }

  addFact(fact: Omit<Fact, 'id' | 'createdAt' | 'updatedAt'>): Fact {
    const newFact: Fact = {
      ...fact,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.facts.push(newFact);
    return newFact;
  }

  updateFact(id: string, updates: Partial<Fact>): Fact | null {
    const index = this.facts.findIndex(f => f.id === id);
    if (index === -1) return null;
    
    this.facts[index] = {
      ...this.facts[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return this.facts[index];
  }

  deleteFact(id: string): boolean {
    const index = this.facts.findIndex(f => f.id === id);
    if (index === -1) return false;
    
    this.facts.splice(index, 1);
    return true;
  }

  // Insights
  getInsights(): Insight[] {
    return [...this.insights];
  }

  addInsight(insight: Omit<Insight, 'id' | 'createdAt' | 'updatedAt'>): Insight {
    const newInsight: Insight = {
      ...insight,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.insights.push(newInsight);
    return newInsight;
  }

  updateInsight(id: string, updates: Partial<Insight>): Insight | null {
    const index = this.insights.findIndex(i => i.id === id);
    if (index === -1) return null;
    
    this.insights[index] = {
      ...this.insights[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return this.insights[index];
  }

  deleteInsight(id: string): boolean {
    const index = this.insights.findIndex(i => i.id === id);
    if (index === -1) return false;
    
    this.insights.splice(index, 1);
    return true;
  }

  // Suggestions
  getSuggestions(): Suggestion[] {
    return [...this.suggestions];
  }

  addSuggestion(suggestion: Omit<Suggestion, 'id' | 'createdAt' | 'updatedAt'>): Suggestion {
    const newSuggestion: Suggestion = {
      ...suggestion,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.suggestions.push(newSuggestion);
    return newSuggestion;
  }

  updateSuggestion(id: string, updates: Partial<Suggestion>): Suggestion | null {
    const index = this.suggestions.findIndex(s => s.id === id);
    if (index === -1) return null;
    
    this.suggestions[index] = {
      ...this.suggestions[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return this.suggestions[index];
  }

  deleteSuggestion(id: string): boolean {
    const index = this.suggestions.findIndex(s => s.id === id);
    if (index === -1) return false;
    
    this.suggestions.splice(index, 1);
    return true;
  }
}

export const dataStore = new DataStore();