-- Add contextual information fields to research_projects table
ALTER TABLE public.research_projects 
ADD COLUMN problem_statement TEXT,
ADD COLUMN target_audience TEXT,
ADD COLUMN objectives TEXT,
ADD COLUMN background TEXT;