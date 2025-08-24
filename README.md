# Research Intelligence Platform

A modern web application for managing research projects, insights, facts, and experimental data. Built with React, TypeScript, and Supabase for seamless data management and real-time collaboration.

## Features

- **Research Projects Management**: Create, organize, and track research projects
- **Insights Discovery**: Capture and categorize key insights from your research
- **Fact Database**: Maintain a structured collection of verified facts and data points
- **Experimental Tracking**: Document and analyze experiments and their outcomes
- **Smart Suggestions**: Get AI-powered recommendations based on your research data
- **Secure Authentication**: User management and secure access control
- **Real-time Collaboration**: Share and collaborate on research with team members

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui with Radix UI primitives
- **Backend**: Supabase (PostgreSQL, Authentication, Real-time)
- **State Management**: TanStack Query for server state
- **Routing**: React Router v6
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system

## Quick Start

### Prerequisites

- Node.js 18+ and npm (recommended: use [nvm](https://github.com/nvm-sh/nvm))

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Environment Setup

The application uses Supabase for backend services. Environment variables are pre-configured for development.

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── ui/            # Base UI components (shadcn/ui)
│   ├── layout/        # Layout components (Sidebar, Header)
│   ├── experiments/   # Experiment-related components
│   ├── facts/         # Fact management components
│   ├── insights/      # Insight components
│   ├── research/      # Research project components
│   └── suggestions/   # Suggestion components
├── hooks/             # Custom React hooks
├── pages/             # Page components
├── stores/            # State management
├── types/             # TypeScript type definitions
├── lib/               # Utility functions
└── integrations/      # External service integrations
```

## Key Pages

- **Dashboard** (`/`): Overview of all research activities
- **Research Projects** (`/projects`): Manage research projects
- **Insights** (`/insights`): Browse and manage insights
- **Facts** (`/facts`): Fact database and management
- **Suggestions** (`/suggestions`): AI-powered recommendations

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

This project uses:
- ESLint for code linting
- TypeScript for type safety
- Tailwind CSS for styling with semantic design tokens
- Component-based architecture for maintainability

## Deployment

### Using Lovable

1. Visit your [Lovable Project](https://lovable.dev/projects/d78e9074-f788-4849-b01a-293bcf29d300)
2. Click "Share" → "Publish"

### Manual Deployment

Build the project and deploy the `dist` folder to your hosting provider:

```bash
npm run build
```

## Contributing

1. Create a feature branch from `main`
2. Make your changes following the existing code style
3. Test thoroughly
4. Submit a pull request

## Support

- [Lovable Documentation](https://docs.lovable.dev/)
- [Project URL](https://lovable.dev/projects/d78e9074-f788-4849-b01a-293bcf29d300)

## License

This project is private and proprietary.