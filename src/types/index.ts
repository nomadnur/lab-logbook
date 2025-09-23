export interface Experiment {
  id: string;
  title: string;
  description: string;
  methodology?: string;
  results?: string;
  status?: 'planning' | 'in-progress' | 'completed' | 'paused';
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Fact {
  id: string;
  title: string;
  description: string;
  category?: string;
  tags?: string[];
  relatedExperiments?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  relatedFacts?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in-progress' | 'implemented';
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}