# Project Structure

## Root Directory
```
├── .env.local              # Environment variables
├── .eslintrc.json          # ESLint configuration
├── .prettierrc             # Prettier configuration
├── next.config.mjs         # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies and scripts
└── src/                    # Source code
```

## Source Directory Structure (`src/`)

### Core Application Files
- `middleware.ts` - Next.js middleware for route protection
- `pages/_app.tsx` - App wrapper with providers
- `pages/_document.tsx` - Custom document structure

### Directory Organization

#### `/components` - UI Components
- `commons/` - Shared/reusable components
- `constants/` - Component-level constants
- `layouts/` - Layout components (headers, footers, etc.)
- `ui/` - Basic UI components
- `views/` - Page-specific view components

#### `/config` - Configuration
- `environment.ts` - Environment variable management

#### `/hooks` - Custom React Hooks
- Custom hooks for reusable logic
- Examples: `useChangeUrl`, `useDebounce`, `useMediaHandling`

#### `/libs` - External Library Configurations
- `axios/` - HTTP client configuration

#### `/pages` - Next.js Pages (File-based Routing)
- `admin/` - Admin-only pages
- `api/` - API routes
- `auth/` - Authentication pages
- `member/` - Member-specific pages
- `index.tsx` - Homepage

#### `/providers` - React Context Providers
- `heroui-provider.tsx` - HeroUI theme provider
- `query-client-provider.tsx` - TanStack Query client

#### `/services` - API Service Layer
- Service files for different domains (auth, events, tickets, etc.)
- `endpoint.constant.ts` - API endpoint definitions
- Pattern: `[domain].service.ts`

#### `/styles` - Global Styles
- `globals.css` - Global CSS and Tailwind imports

#### `/types` - TypeScript Type Definitions
- Domain-specific type definitions
- Pattern: `[Domain].d.ts` (e.g., `Event.d.ts`, `Auth.d.ts`)

#### `/utils` - Utility Functions
- `cn.ts` - Class name utility (clsx + tailwind-merge)
- `currency.ts` - Currency formatting
- `date.ts` - Date utilities
- `tanstack-callback.ts` - TanStack Query helpers

## Naming Conventions

### Files & Directories
- **Components**: PascalCase for component files
- **Pages**: kebab-case or camelCase
- **Types**: PascalCase with `.d.ts` extension
- **Services**: camelCase with `.service.ts` suffix
- **Utils**: camelCase with descriptive names
- **Hooks**: camelCase starting with `use`

### Import Patterns
- Use `@/` alias for src directory imports
- Absolute imports preferred over relative imports
- Group imports: external libraries → internal modules → relative imports

## Architecture Patterns

### Provider Pattern
- Wrap app with multiple providers in `_app.tsx`
- Separate provider files for different concerns

### Service Layer Pattern
- Centralized API calls in service files
- Consistent error handling and response formatting

### Custom Hooks Pattern
- Extract reusable logic into custom hooks
- Co-locate related state and effects

### Type-First Development
- Define types before implementation
- Separate type definitions in `/types` directory