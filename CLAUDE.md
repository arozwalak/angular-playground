# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Angular SSR application with NgRx Signals for state management. Uses standalone components, zoneless change detection, and modern Angular patterns.

## Key Commands

```bash
# Development
npm start          # Start dev server at http://localhost:4200
npm run build      # Build for production
npm run watch      # Build in watch mode for development
npm run test       # Run unit tests with Karma
npm run serve:ssr:angular  # Serve SSR build

# Angular CLI
ng generate component component-name  # Generate new component
ng generate --help                    # List all available schematics
```

## Architecture

### State Management
- **NgRx Signals** for reactive state management
- **AppStore** (`src/app/store/app.store.ts`) - Global application state
- **AuthStore** (`src/app/auth/store/auth.store.ts`) - Authentication state
- Stores use `signalStore` with `providedIn: 'root'` pattern

### Routing Structure
- **Lazy-loaded components** throughout
- **Auth guard** (`src/app/guards/auth-guard.ts`) for route protection
- Routes defined in `src/app/app.routes.ts`
- SSR support via `src/app/app.routes.server.ts`

### Key Directories
- `src/app/auth/` - Authentication module with login component
- `src/app/main/` - Main application component (default route)
- `src/app/models/` - TypeScript interfaces (User model)
- `src/app/guards/` - Route guards
- `src/app/store/` - Global state management

### Configuration
- **Zoneless change detection** enabled in `app.config.ts`
- **SSR enabled** with hydration support
- **Prettier** configured with 100 char width, single quotes
- **SCSS** for styling (configured in angular.json)

### Technologies
- Angular 20.2.0 with standalone components
- NgRx Signals 20.0.1
- Express 5.1.0 for SSR
- TypeScript 5.9.2
- Karma/Jasmine for testing