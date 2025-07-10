# Todo App - TT Software Solution

A modern todo application built with Next.js, featuring a comprehensive tech stack for development and testing.

## 🌐 Live Demo

**Production:** [https://todo-app-tt-software-solution-5dud5mmyz-tofusannns-projects.vercel.app](https://todo-app-tt-software-solution-5dud5mmyz-tofusannns-projects.vercel.app)

## 🚀 Tech Stack

- **Framework:** Next.js 15 with App Router
- **UI Components:** shadcn/ui + lucide-react
- **State Management:** Redux Toolkit + RTK Query
- **API Mocking:** MSW (Mock Service Worker)
- **Testing:** Vitest + React Testing Library
- **Deployment:** Vercel
- **Styling:** Tailwind CSS
- **Language:** TypeScript

## 📁 Project Structure

```
todo-app-tt-software-solution/
├── app/                   # App Router (Next.js)
│   ├── layout.tsx
│   ├── page.tsx          # Home page
│   ├── providers.tsx     # Redux Provider
│   └── globals.css
├── components/
│   └── UI/               # UI subcomponents (shadcn/ui)
├── features/
│   └── todos/
│       ├── TodoSlice.ts  # Redux slice for UI state
│       ├── TodoAPI.ts    # RTK Query endpoints
│       └── types.ts      # TypeScript interfaces
├── mocks/
│   ├── handlers.ts       # MSW API handlers
│   └── server.ts         # MSW server setup
├── store/
│   └── index.ts          # Redux store configuration
├── src/
│   └── test/
│       ├── setup.ts      # Vitest setup
│       └── test-utils.tsx # Custom render with Redux
├── __tests__/            # Test files
├── public/               # Static assets
├── vercel.json           # Vercel deployment config
└── package.json
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd todo-app-tt-software-solution
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Testing

### Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with UI (if @vitest/ui is installed)
npm run test:ui
```

### Test Structure

- `src/test/setup.ts` - Test configuration and MSW setup
- `src/test/test-utils.tsx` - Custom render function with Redux Provider
- `__tests__/` - Test files
- `mocks/` - MSW handlers for API mocking

### Test Coverage

The project includes:

- ✅ Unit tests with Vitest
- ✅ Integration tests with React Testing Library
- ✅ API mocking with MSW
- ✅ Redux state testing
- ✅ Component testing utilities

## 🏗️ Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run test:ui` - Run tests with UI

### State Management

The app uses Redux Toolkit with RTK Query for state management:

- **Store:** `store/index.ts` - Main Redux store configuration
- **API:** `features/todos/TodoAPI.ts` - RTK Query endpoints (CRUD operations)
- **UI State:** `features/todos/TodoSlice.ts` - Local UI state management
- **Types:** `features/todos/types.ts` - TypeScript interfaces

### API Mocking

MSW is configured for development and testing:

- **Handlers:** `mocks/handlers.ts` - Mock API endpoints
- **Server:** `mocks/server.ts` - MSW server setup
- **Development:** Auto-starts in development mode

### Code Quality

- ✅ ESLint configured and passing
- ✅ TypeScript strict mode enabled
- ✅ Prettier formatting
- ✅ Import/export validation

## 🚀 Deployment

### Vercel Deployment

#### Option 1: CLI Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

#### Option 2: GitHub Integration

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on push to main branch

### Environment Variables

Create a `.env.local` file for local development:

```env
NODE_ENV=development
```

### Build Configuration

- **Framework:** Next.js 15
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Node Version:** 18+

## 📝 Features

### Core Features

- ✅ Modern UI with shadcn/ui components
- ✅ Redux Toolkit for state management
- ✅ RTK Query for data fetching and caching
- ✅ MSW for API mocking in development and tests
- ✅ Comprehensive testing setup with Vitest
- ✅ TypeScript support with strict mode
- ✅ Responsive design with Tailwind CSS
- ✅ Vercel deployment ready

### Development Features

- ✅ Hot reload with Turbopack
- ✅ ESLint code quality checks
- ✅ TypeScript type checking
- ✅ Test coverage reporting
- ✅ API mocking for offline development

### Production Features

- ✅ Optimized builds
- ✅ Static asset optimization
- ✅ Server-side rendering
- ✅ Automatic deployments
- ✅ Performance monitoring

## 🔧 Configuration Files

- `vercel.json` - Vercel deployment configuration
- `vitest.config.ts` - Vitest testing configuration
- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new features
5. Run tests (`npm test`)
6. Run linting (`npm run lint`)
7. Commit your changes (`git commit -m 'Add amazing feature'`)
8. Push to the branch (`git push origin feature/amazing-feature`)
9. Submit a pull request

### Development Guidelines

- Follow TypeScript best practices
- Write tests for new features
- Use conventional commit messages
- Ensure ESLint passes before committing
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Built with ❤️ by TT Software Solution**
