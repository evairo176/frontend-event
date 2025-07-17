# Technology Stack

## Framework & Runtime
- **Next.js 15.3.4** - React framework with SSR/SSG capabilities
- **React 19.1.0** - UI library
- **TypeScript 5** - Type-safe JavaScript
- **Node.js 20+** - Runtime environment

## UI & Styling
- **HeroUI 2.7.10** - Component library (primary UI framework)
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Framer Motion 12.18.1** - Animation library
- **Lucide React** - Icon library
- **Inter Font** - Google Font integration

## State Management & Data Fetching
- **TanStack Query 5.62.8** - Server state management
- **React Hook Form 7.52.1** - Form state management
- **Axios 1.10.0** - HTTP client

## Authentication & Validation
- **NextAuth.js 4.24.11** - Authentication library
- **Yup 1.4.0** - Schema validation
- **Hookform Resolvers** - Form validation integration

## Development Tools
- **ESLint** - Code linting (Next.js core web vitals config)
- **Prettier** - Code formatting with Tailwind plugin
- **TypeScript** - Static type checking

## Build System & Commands

### Development
```bash
npm run dev          # Start development server on localhost:3000
```

### Production
```bash
npm run build        # Build for production
npm run start        # Start production server
```

### Code Quality
```bash
npm run lint         # Run ESLint checks
```

## Environment Configuration
- Uses `.env.local` for environment variables
- Environment variables accessed via `src/config/environment.ts`
- Supports Cloudinary for image hosting

## Key Dependencies Notes
- Uses `@internationalized/date` for date handling
- `clsx` and `tailwind-merge` combined in `cn()` utility for conditional classes
- `debounce` library for performance optimization
- TanStack Query DevTools available in development