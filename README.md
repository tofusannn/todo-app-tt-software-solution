# Todo App - TT Software Solution

A modern todo application built with Next.js, featuring a comprehensive tech stack for development and testing.

## 🚀 Tech Stack

- **Framework:** Next.js 15 with App Router
- **UI Components:** shadcn/ui + lucide-react
- **State Management:** Redux Toolkit + RTK Query
- **API Mocking:** MSW (Mock Service Worker)
- **Testing:** Vitest + React Testing Library
- **Deployment:** Vercel
- **Styling:** Tailwind CSS

## 📁 Project Structure

```
todo-app/
├── app/                   # App Router (Next.js)
│   ├── layout.tsx
│   ├── page.tsx          # Home page
│   └── todo/             # Nested route if needed
├── components/
│   ├── TodoItem.tsx
│   ├── TodoForm.tsx
│   └── UI/               # UI subcomponents (e.g. Modal, Button)
├── features/
│   └── todos/
│       ├── TodoSlice.ts  # Redux slice
│       ├── TodoAPI.ts    # RTK Query / Fetch logic
│       └── types.ts
├── mocks/
│   ├── handlers.ts       # MSW handlers
│   └── server.ts
├── store/
│   └── index.ts          # Redux store setup
├── styles/
│   └── globals.css
├── public/
├── README.md
└── package.json
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

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

## 🏗️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:run` - Run tests once
- `npm run test:ui` - Run tests with UI

### State Management

The app uses Redux Toolkit with RTK Query for state management:

- **Store:** `store/index.ts`
- **API:** `features/todos/TodoAPI.ts`
- **UI State:** `features/todos/TodoSlice.ts`
- **Types:** `features/todos/types.ts`

### API Mocking

MSW is configured for development and testing:

- **Handlers:** `mocks/handlers.ts`
- **Server:** `mocks/server.ts`

## 🚀 Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on push to main branch

### Environment Variables

Create a `.env.local` file for local development:

```env
NODE_ENV=development
```

## 📝 Features

- ✅ Modern UI with shadcn/ui components
- ✅ Redux Toolkit for state management
- ✅ RTK Query for data fetching
- ✅ MSW for API mocking
- ✅ Comprehensive testing setup
- ✅ TypeScript support
- ✅ Responsive design
- ✅ Vercel deployment ready

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
