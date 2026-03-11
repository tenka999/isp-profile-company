# Prime React Dashboard

A modern React dashboard application built with PrimeReact, offering a responsive and feature-rich UI for enterprise applications.

## Overview

This project is a complete dashboard solution with user authentication, theme customization, and a responsive layout. It provides a solid foundation for building enterprise-grade applications with a focus on developer experience and code maintainability.

## Features

- **Modern React Architecture** - Built with React 18 and Vite for fast development
- **PrimeReact Components** - Leveraging the rich UI library for consistent design
- **Responsive Layout** - Adaptive design that works on desktop and mobile
- **Authentication System** - Complete with token refresh, persistent login
- **Global Toast Notifications** - Context-based notification system
- **Theme Switching** - Support for light and dark modes
- **Route Protection** - Middleware-based authentication for protected routes
- **Path Aliases** - Simplified imports with path alias support
- **TanStack Query** - Powerful data fetching and cache management
- **Domain-Driven API** - Organized by business domain for better maintainability

## Project Structure

```
/src
├── /assets            # Static assets like images and global styles
├── /components        # Reusable UI components
├── /context           # React context providers
├── /core
│   └── /api           # API configuration with axios
├── /helpers           # Utility functions and helpers
├── /hooks             # Custom React hooks
├── /layouts           # Page layouts and structural components
├── /pages             # Application pages
│   ├── /app           # Protected app pages
│   │   └── /ui-kits   # UI component showcases
│   └── /auth          # Authentication pages
├── /routes            # Route configuration
├── /services          # Business logic and API services by domain
│   ├── /booksApi      # Books domain APIs and hooks
│   └── /usersApi      # Users domain APIs and hooks
└── /config            # Application configuration
    └── queryClient.js # TanStack Query client configuration
```

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone [repository-url]

# Navigate to project directory
cd prime-react

# Install dependencies
npm install
# or
yarn
```

### Development

```bash
# Start development server
npm run dev
# or
yarn dev
```

### Building for Production

```bash
# Build for production
npm run build
# or
yarn build
```

## Authentication Flow

The application implements a secure authentication flow with automatic token refresh:

1. User logs in to obtain access token
2. Token is securely stored
3. API requests include the token
4. When token expires (401 response):
   - Token refresh is attempted
   - Original request is retried
   - After multiple failures, user is redirected to login

## API Configuration

The application uses a custom Axios instance for API requests with advanced features:

### Base API Instance

```javascript
// src/core/api/baseApi.jsx
import axios from 'axios'
import SecureStorage from '@/helpers/SecureStorage'

const baseApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default baseApi
```

### Key Features

- **Request Interceptors**: Automatically attach authentication tokens to requests
- **Response Interceptors**: Handle common error scenarios and token refreshing
- **Token Refresh**: Automatically refresh expired tokens without disrupting user experience
- **Request Retry**: Intelligently retry failed requests after token refresh
- **Queue Management**: Queue subsequent requests during token refresh to avoid multiple refresh attempts

### Token Refresh Implementation

The token refresh logic implements:
- Per-request retry counting (up to 3 attempts)
- Request queuing during refresh
- Automatic redirection to login after maximum retries
- Proper error handling for refresh failures

This approach ensures a seamless user experience even when authentication tokens expire during active sessions.

### Data Fetching with TanStack Query

The application uses TanStack Query (React Query) for data fetching, caching, and state management:

```javascript
// src/services/booksApi/hooks.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import bookApi from './booksApi';

export const bookKeys = {
  all: ['books'],
  lists: () => [...bookKeys.all, 'list'],
  list: (filters) => [...bookKeys.lists(), { filters }],
  details: () => [...bookKeys.all, 'detail'],
  detail: (id) => [...bookKeys.details(), id],
};

export const useBooks = (params = {}, options = {}) => {
  return useQuery({
    queryKey: bookKeys.list(params),
    queryFn: () => bookApi.findMany(params),
    ...options
  });
};

// Additional query and mutation hooks
```

### API Structure

The project follows a domain-driven API organization:

```
/src
├── /services           # Service layer with business logic
│   ├── /booksApi       # Books domain
│   │   ├── booksApi.js # API endpoints
│   │   └── hooks.js    # React Query hooks
│   ├── /usersApi       # Users domain
│   └── ...             # Other domains
├── /core
│   └── /api            # Core API infrastructure
│       └── baseApi.jsx # Axios instance with interceptors
└── /config
    └── queryClient.js  # React Query client configuration
```

This structure provides:
- Domain-specific API organization
- Consistent query caching with key factories
- Automatic cache invalidation
- Separation of API calls from UI components

## Customization

### Themes

The application supports theme customization through the layout context. You can modify the theme in the layout configuration.

### Adding New Routes

Routes are defined in `src/routes.jsx` using React Router's `createBrowserRouter`. Protected routes use the `authMiddleware` for access control.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.