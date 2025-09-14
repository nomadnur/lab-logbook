-- Insert demo data for the current project using real user ID
-- First, let's insert some experiments
INSERT INTO public.experiments (id, research_project_id, user_id, title, description, methodology, results, status) VALUES
('550e8400-e29b-41d4-a716-446655440001', '08af27a7-ede9-44bb-ad81-9f4cc9a47597', '6bcae23e-6bfa-4198-b53f-1e97f5cadcca', 'User Interface Responsiveness Study', 'Analyzing how users interact with responsive design elements across different screen sizes', 'A/B testing with 200 participants using eye-tracking and click-heat mapping', 'Mobile users showed 35% higher engagement with touch-optimized buttons', 'completed'),
('550e8400-e29b-41d4-a716-446655440002', '08af27a7-ede9-44bb-ad81-9f4cc9a47597', '6bcae23e-6bfa-4198-b53f-1e97f5cadcca', 'Color Psychology in Web Design', 'Testing the impact of different color schemes on user trust and conversion rates', 'Split testing between warm vs cool color palettes over 4 weeks', 'Warm colors increased conversion by 12% but cool colors had higher trust scores', 'completed'),
('550e8400-e29b-41d4-a716-446655440003', '08af27a7-ede9-44bb-ad81-9f4cc9a47597', '6bcae23e-6bfa-4198-b53f-1e97f5cadcca', 'Navigation Menu Optimization', 'Determining the optimal number of menu items for user experience', 'User testing with varying menu complexity from 5-15 items', NULL, 'in-progress'),
('550e8400-e29b-41d4-a716-446655440004', '08af27a7-ede9-44bb-ad81-9f4cc9a47597', '6bcae23e-6bfa-4198-b53f-1e97f5cadcca', 'Loading Time Perception Study', 'How loading animations affect user perception of wait time', 'Measuring perceived vs actual loading times with different animation styles', NULL, 'planning');

-- Insert some facts
INSERT INTO public.facts (id, research_project_id, user_id, title, description, category) VALUES
('660e8400-e29b-41d4-a716-446655440001', '08af27a7-ede9-44bb-ad81-9f4cc9a47597', '6bcae23e-6bfa-4198-b53f-1e97f5cadcca', 'Mobile Traffic Dominance', 'Mobile devices account for 68% of all web traffic globally', 'User Behavior'),
('660e8400-e29b-41d4-a716-446655440002', '08af27a7-ede9-44bb-ad81-9f4cc9a47597', '6bcae23e-6bfa-4198-b53f-1e97f5cadcca', 'Attention Span Data', 'Average user attention span on web pages is 8 seconds', 'User Behavior'),
('660e8400-e29b-41d4-a716-446655440003', '08af27a7-ede9-44bb-ad81-9f4cc9a47597', '6bcae23e-6bfa-4198-b53f-1e97f5cadcca', 'Color Accessibility Standards', 'WCAG requires 4.5:1 contrast ratio for normal text accessibility', 'Design Standards'),
('660e8400-e29b-41d4-a716-446655440004', '08af27a7-ede9-44bb-ad81-9f4cc9a47597', '6bcae23e-6bfa-4198-b53f-1e97f5cadcca', 'Page Load Impact', 'Every 1 second delay in page load time reduces conversions by 7%', 'Performance'),
('660e8400-e29b-41d4-a716-446655440005', '08af27a7-ede9-44bb-ad81-9f4cc9a47597', '6bcae23e-6bfa-4198-b53f-1e97f5cadcca', 'Touch Target Size', 'Minimum recommended touch target size is 44x44 pixels for mobile', 'Mobile Design');

-- Insert some insights
INSERT INTO public.insights (id, research_project_id, user_id, title, description) VALUES
('770e8400-e29b-41d4-a716-446655440001', '08af27a7-ede9-44bb-ad81-9f4cc9a47597', '6bcae23e-6bfa-4198-b53f-1e97f5cadcca', 'Mobile-First Design Critical', 'Given that mobile traffic dominates and touch targets need specific sizing, mobile-first design approach is essential for user engagement'),
('770e8400-e29b-41d4-a716-446655440002', '08af27a7-ede9-44bb-ad81-9f4cc9a47597', '6bcae23e-6bfa-4198-b53f-1e97f5cadcca', 'Color Choice Affects Trust and Conversion', 'Color psychology experiments show that while warm colors boost conversions, cool colors build trust - suggesting different pages may need different approaches'),
('770e8400-e29b-41d4-a716-446655440003', '08af27a7-ede9-44bb-ad81-9f4cc9a47597', '6bcae23e-6bfa-4198-b53f-1e97f5cadcca', 'Performance Directly Impacts Business', 'With 8-second attention spans and 7% conversion loss per second of load time, performance optimization is a business priority, not just technical'),
('770e8400-e29b-41d4-a716-446655440004', '08af27a7-ede9-44bb-ad81-9f4cc9a47597', '6bcae23e-6bfa-4198-b53f-1e97f5cadcca', 'Accessibility Drives Better UX', 'WCAG standards for contrast ratios not only ensure accessibility but create better visual hierarchy for all users');

-- Insert some suggestions
INSERT INTO public.suggestions (id, research_project_id, user_id, title, description, priority, status) VALUES
('880e8400-e29b-41d4-a716-446655440001', '08af27a7-ede9-44bb-ad81-9f4cc9a47597', '6bcae23e-6bfa-4198-b53f-1e97f5cadcca', 'Implement Progressive Loading', 'Add skeleton screens and progressive image loading to improve perceived performance', 'high', 'open'),
('880e8400-e29b-41d4-a716-446655440002', '08af27a7-ede9-44bb-ad81-9f4cc9a47597', '6bcae23e-6bfa-4198-b53f-1e97f5cadcca', 'Create Color System Documentation', 'Document when to use warm vs cool colors based on page goals (conversion vs trust)', 'medium', 'in-progress'),
('880e8400-e29b-41d4-a716-446655440003', '08af27a7-ede9-44bb-ad81-9f4cc9a47597', '6bcae23e-6bfa-4198-b53f-1e97f5cadcca', 'Audit Touch Target Sizes', 'Review all interactive elements to ensure they meet 44px minimum requirement', 'high', 'open'),
('880e8400-e29b-41d4-a716-446655440004', '08af27a7-ede9-44bb-ad81-9f4cc9a47597', '6bcae23e-6bfa-4198-b53f-1e97f5cadcca', 'Simplify Navigation Structure', 'Based on menu optimization study, reduce main navigation to 7 key items', 'medium', 'open'),
('880e8400-e29b-41d4-a716-446655440005', '08af27a7-ede9-44bb-ad81-9f4cc9a47597', '6bcae23e-6bfa-4198-b53f-1e97f5cadcca', 'Implement Contrast Checker Tool', 'Add automated contrast checking in design system to maintain WCAG compliance', 'low', 'implemented');

-- Link some facts to experiments
INSERT INTO public.fact_experiments (fact_id, experiment_id) VALUES
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001'),
('660e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440001'),
('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440002'),
('660e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440004'),
('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003');

-- Link some facts to insights  
INSERT INTO public.insight_facts (insight_id, fact_id) VALUES
('770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001'),
('770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440005'),
('770e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440002'),
('770e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440004'),
('770e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440003');