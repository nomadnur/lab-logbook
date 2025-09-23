-- Add tags column to all main entities for taxonomy system
ALTER TABLE public.experiments ADD COLUMN tags TEXT[];
ALTER TABLE public.facts ADD COLUMN tags TEXT[];
ALTER TABLE public.insights ADD COLUMN tags TEXT[];
ALTER TABLE public.suggestions ADD COLUMN tags TEXT[];

-- Add indexes for better performance on tag searches
CREATE INDEX idx_experiments_tags ON public.experiments USING GIN(tags);
CREATE INDEX idx_facts_tags ON public.facts USING GIN(tags);
CREATE INDEX idx_insights_tags ON public.insights USING GIN(tags);
CREATE INDEX idx_suggestions_tags ON public.suggestions USING GIN(tags);

-- Create a table for managing project relationships (many-to-many)
CREATE TABLE public.entity_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  entity_type TEXT NOT NULL, -- 'experiment', 'fact', 'insight', 'suggestion'
  entity_id UUID NOT NULL,
  research_project_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT entity_projects_research_project_id_fkey 
    FOREIGN KEY (research_project_id) 
    REFERENCES public.research_projects(id) 
    ON DELETE CASCADE
);

-- Enable RLS on entity_projects table
ALTER TABLE public.entity_projects ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for entity_projects
CREATE POLICY "Users can manage entity-project relationships for their data" 
ON public.entity_projects 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.research_projects rp 
    WHERE rp.id = entity_projects.research_project_id 
    AND rp.user_id = auth.uid()
  )
);

-- Add unique constraint to prevent duplicate relationships
CREATE UNIQUE INDEX idx_entity_projects_unique 
ON public.entity_projects(entity_type, entity_id, research_project_id);

-- Add example data for the existing project
INSERT INTO public.experiments (research_project_id, user_id, title, description, methodology, results, status, tags) VALUES
(
  '08af27a7-ede9-44bb-ad81-9f4cc9a47597',
  (SELECT user_id FROM public.research_projects WHERE id = '08af27a7-ede9-44bb-ad81-9f4cc9a47597'),
  'Coffee & Focus Study',
  'Testing whether moderate caffeine intake improves short-term focus in morning tasks for knowledge workers.',
  'Randomized controlled trial with 20 participants over 2 weeks. Half received 200mg caffeine, half received placebo.',
  'Avg. 15% faster response in caffeine group vs control over 5 trials. Task completion time decreased by 9% in caffeine condition.',
  'completed',
  ARRAY['user-research', 'productivity', 'trial-A']
),
(
  '08af27a7-ede9-44bb-ad81-9f4cc9a47597',
  (SELECT user_id FROM public.research_projects WHERE id = '08af27a7-ede9-44bb-ad81-9f4cc9a47597'),
  'Sleep Quality Assessment',
  'Measuring impact of caffeine timing on next-day alertness and sleep quality.',
  'Daily sleep quality surveys and cognitive performance tests.',
  'No significant difference reported for morning-only intake.',
  'in-progress',
  ARRAY['sleep-research', 'follow-up', 'self-report']
);

INSERT INTO public.facts (research_project_id, user_id, title, description, category, tags) VALUES
(
  '08af27a7-ede9-44bb-ad81-9f4cc9a47597',
  (SELECT user_id FROM public.research_projects WHERE id = '08af27a7-ede9-44bb-ad81-9f4cc9a47597'),
  'Reaction Times Improved',
  'Avg. 15% faster response in caffeine group vs control over 5 trials.',
  'performance-metric',
  ARRAY['metric', 'trial-A', 'performance']
),
(
  '08af27a7-ede9-44bb-ad81-9f4cc9a47597',
  (SELECT user_id FROM public.research_projects WHERE id = '08af27a7-ede9-44bb-ad81-9f4cc9a47597'),
  'Task Completion Efficiency',
  'Mean task completion time decreased by 9% in caffeine condition.',
  'performance-metric',
  ARRAY['metric', 'productivity', 'efficiency']
),
(
  '08af27a7-ede9-44bb-ad81-9f4cc9a47597',
  (SELECT user_id FROM public.research_projects WHERE id = '08af27a7-ede9-44bb-ad81-9f4cc9a47597'),
  'Reported Side Effects',
  '2 of 10 participants noted jitteriness at 200mg dose.',
  'user-feedback',
  ARRAY['observation', 'dose-200', 'user-pain-point']
),
(
  '08af27a7-ede9-44bb-ad81-9f4cc9a47597',
  (SELECT user_id FROM public.research_projects WHERE id = '08af27a7-ede9-44bb-ad81-9f4cc9a47597'),
  'Sleep Quality Next Day',
  'No significant difference reported for morning-only intake.',
  'sleep-data',
  ARRAY['self-report', 'follow-up', 'sleep-quality']
);

INSERT INTO public.insights (research_project_id, user_id, title, description, tags) VALUES
(
  '08af27a7-ede9-44bb-ad81-9f4cc9a47597',
  (SELECT user_id FROM public.research_projects WHERE id = '08af27a7-ede9-44bb-ad81-9f4cc9a47597'),
  'Optimal Dosage Range',
  '200mg appears effective for focus improvement without significant sleep disruption when consumed before 10am.',
  ARRAY['data-insight', 'dosage-optimization', 'timing']
),
(
  '08af27a7-ede9-44bb-ad81-9f4cc9a47597',
  (SELECT user_id FROM public.research_projects WHERE id = '08af27a7-ede9-44bb-ad81-9f4cc9a47597'),
  'Individual Sensitivity Variation',
  'Participants with higher baseline caffeine tolerance showed less improvement, suggesting adaptation effects.',
  ARRAY['user-journey-insight', 'individual-differences', 'adaptation']
),
(
  '08af27a7-ede9-44bb-ad81-9f4cc9a47597',
  (SELECT user_id FROM public.research_projects WHERE id = '08af27a7-ede9-44bb-ad81-9f4cc9a47597'),
  'Morning Task Performance Peak',
  'Greatest improvement observed in first 2-3 hours post-consumption, declining thereafter.',
  ARRAY['timing-insight', 'performance-curve', 'productivity']
);

INSERT INTO public.suggestions (research_project_id, user_id, title, description, priority, status, tags) VALUES
(
  '08af27a7-ede9-44bb-ad81-9f4cc9a47597',
  (SELECT user_id FROM public.research_projects WHERE id = '08af27a7-ede9-44bb-ad81-9f4cc9a47597'),
  'Add decaf control group',
  'Compare against placebo effect with decaf coffee to isolate caffeine benefits.',
  'high',
  'open',
  ARRAY['methodology-improvement', 'team-input', 'control-group']
),
(
  '08af27a7-ede9-44bb-ad81-9f4cc9a47597',
  (SELECT user_id FROM public.research_projects WHERE id = '08af27a7-ede9-44bb-ad81-9f4cc9a47597'),
  'Track weekly performance',
  'Observe sustainability of effect over longer periods.',
  'medium',
  'in-progress',
  ARRAY['long-term-study', 'sustainability', 'tracking']
),
(
  '08af27a7-ede9-44bb-ad81-9f4cc9a47597',
  (SELECT user_id FROM public.research_projects WHERE id = '08af27a7-ede9-44bb-ad81-9f4cc9a47597'),
  'Log individual sensitivity',
  'Capture dose-response curve for personalization.',
  'low',
  'open',
  ARRAY['personalization', 'data-collection', 'individual-tracking']
);