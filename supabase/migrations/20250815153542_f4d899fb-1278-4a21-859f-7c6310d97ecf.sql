-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

-- Create research_projects table
CREATE TABLE public.research_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create experiments table
CREATE TABLE public.experiments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  research_project_id UUID NOT NULL REFERENCES public.research_projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  methodology TEXT,
  results TEXT,
  status TEXT DEFAULT 'planning' CHECK (status IN ('planning', 'in-progress', 'completed', 'paused')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create facts table
CREATE TABLE public.facts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  research_project_id UUID NOT NULL REFERENCES public.research_projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create insights table
CREATE TABLE public.insights (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  research_project_id UUID NOT NULL REFERENCES public.research_projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create suggestions table
CREATE TABLE public.suggestions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  research_project_id UUID NOT NULL REFERENCES public.research_projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in-progress', 'implemented')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create relationship tables for linking related items
CREATE TABLE public.fact_experiments (
  fact_id UUID NOT NULL REFERENCES public.facts(id) ON DELETE CASCADE,
  experiment_id UUID NOT NULL REFERENCES public.experiments(id) ON DELETE CASCADE,
  PRIMARY KEY (fact_id, experiment_id)
);

CREATE TABLE public.insight_facts (
  insight_id UUID NOT NULL REFERENCES public.insights(id) ON DELETE CASCADE,
  fact_id UUID NOT NULL REFERENCES public.facts(id) ON DELETE CASCADE,
  PRIMARY KEY (insight_id, fact_id)
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.facts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fact_experiments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.insight_facts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Create RLS policies for research_projects
CREATE POLICY "Users can view their own research projects" 
ON public.research_projects 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own research projects" 
ON public.research_projects 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own research projects" 
ON public.research_projects 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own research projects" 
ON public.research_projects 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create RLS policies for experiments
CREATE POLICY "Users can view their own experiments" 
ON public.experiments 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own experiments" 
ON public.experiments 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own experiments" 
ON public.experiments 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own experiments" 
ON public.experiments 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create RLS policies for facts
CREATE POLICY "Users can view their own facts" 
ON public.facts 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own facts" 
ON public.facts 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own facts" 
ON public.facts 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own facts" 
ON public.facts 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create RLS policies for insights
CREATE POLICY "Users can view their own insights" 
ON public.insights 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own insights" 
ON public.insights 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own insights" 
ON public.insights 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own insights" 
ON public.insights 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create RLS policies for suggestions
CREATE POLICY "Users can view their own suggestions" 
ON public.suggestions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own suggestions" 
ON public.suggestions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own suggestions" 
ON public.suggestions 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own suggestions" 
ON public.suggestions 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create RLS policies for relationship tables
CREATE POLICY "Users can manage fact-experiment relationships for their data" 
ON public.fact_experiments 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.facts f 
    WHERE f.id = fact_id AND f.user_id = auth.uid()
  )
);

CREATE POLICY "Users can manage insight-fact relationships for their data" 
ON public.insight_facts 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.insights i 
    WHERE i.id = insight_id AND i.user_id = auth.uid()
  )
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_research_projects_updated_at
  BEFORE UPDATE ON public.research_projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_experiments_updated_at
  BEFORE UPDATE ON public.experiments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_facts_updated_at
  BEFORE UPDATE ON public.facts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_insights_updated_at
  BEFORE UPDATE ON public.insights
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_suggestions_updated_at
  BEFORE UPDATE ON public.suggestions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();