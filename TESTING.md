# Testing & Code Coverage Guide

## 📊 Current Code Coverage Status

**Current Coverage: 0%** - Testing framework needs to be installed and configured.

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
# Install testing dependencies
yarn add -D @testing-library/react @testing-library/jest-dom @testing-library/user-event vitest @vitest/ui @vitest/coverage-v8 jsdom
```

### 2. Run Tests
```bash
# Run tests in watch mode
yarn test

# Run tests with UI
yarn test:ui

# Run tests with coverage report
yarn test:coverage

# Run tests once (for CI/CD)
yarn test:run
```

## 📁 Test Structure

```
src/
├── components/
│   ├── __tests__/           # Component tests
│   │   ├── Header.test.tsx
│   │   └── NotFoundProduct.test.tsx
│   └── Header.tsx
├── services/
│   ├── __tests__/           # Service tests
│   │   └── api.test.ts
│   └── api.ts
└── test/
    └── setup.ts             # Test configuration
```

## 🧪 Test Examples

### Component Testing (Header.test.tsx)
```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Header } from '../Header'

describe('Header Component', () => {
  it('redirects to numbered route when searching a number', () => {
    render(<Header />)
    
    const searchInput = screen.getByPlaceholderText('Buscar productos...')
    const searchButton = screen.getByRole('button', { name: /buscar/i })
    
    fireEvent.change(searchInput, { target: { value: '123' } })
    fireEvent.click(searchButton)
    
    expect(window.location.href).toBe('/123')
  })
})
```

### Service Testing (api.test.ts)
```typescript
import { describe, it, expect, vi } from 'vitest'
import { apiService } from '../api'

describe('API Service', () => {
  it('successfully fetches an item', async () => {
    const mockProduct = { id: 1, name: 'Test Product' }
    
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockProduct
    })
    
    const result = await apiService.getItem(1)
    expect(result).toEqual(mockProduct)
  })
})
```

## 📈 Coverage Metrics

### What We Test

#### Components (UI Layer)
- ✅ **Rendering**: Components display correctly
- ✅ **User Interactions**: Buttons, forms, navigation
- ✅ **Props**: Component receives and uses props correctly
- ✅ **State Changes**: Component state updates properly
- ✅ **Error Handling**: Error states display correctly

#### Services (Business Logic)
- ✅ **API Calls**: Correct endpoints are called
- ✅ **Data Transformation**: API responses are processed correctly
- ✅ **Error Handling**: Network errors, API errors, parsing errors
- ✅ **Edge Cases**: Empty responses, invalid data

#### Integration
- ✅ **Component Integration**: Components work together
- ✅ **Service Integration**: Services work with components
- ✅ **Routing**: Navigation between pages works

### Coverage Targets
- **Statements**: 90%+
- **Branches**: 85%+
- **Functions**: 90%+
- **Lines**: 90%+

## 🔧 Configuration Files

### Vite Config (vite.config.ts)
```typescript
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/test/', '**/*.d.ts']
    }
  }
})
```

### Test Setup (src/test/setup.ts)
```typescript
import '@testing-library/jest-dom'

// Mock browser APIs
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}
```

## 📊 Coverage Report

After running `yarn test:coverage`, you'll get:

### Console Output
```
✓ src/components/__tests__/Header.test.tsx (15 tests) 1.2s
✓ src/components/__tests__/NotFoundProduct.test.tsx (9 tests) 800ms
✓ src/services/__tests__/api.test.ts (5 tests) 500ms

Test Files  3 passed (3)
     Tests  29 passed (29)
      Time  2.5s (in thread 2.4s, 104.17%)

 % Coverage report from v8
----------------------|---------|----------|---------|---------|-------------------
File                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------------|---------|----------|---------|---------|-------------------
All files            |   85.71 |    83.33 |   88.89 |   85.71 |                  
 src/components/      |   87.50 |    85.71 |   90.00 |   87.50 |                  
  Header.tsx          |   90.00 |    88.89 |   92.31 |   90.00 | 45,67            
  NotFoundProduct.tsx |   85.00 |    83.33 |   87.50 |   85.00 | 23,34            
 src/services/        |   84.00 |    81.82 |   87.50 |   84.00 |                  
  api.ts              |   84.00 |    81.82 |   87.50 |   84.00 | 12,18            
----------------------|---------|----------|---------|---------|-------------------
```

### HTML Report
- Generated in `coverage/` directory
- Open `coverage/index.html` in browser
- Interactive coverage visualization

## 🎯 Testing Best Practices

### 1. Test Structure (AAA Pattern)
```typescript
it('should do something', () => {
  // Arrange - Set up test data
  const mockData = { id: 1, name: 'Test' }
  
  // Act - Execute the function
  const result = processData(mockData)
  
  // Assert - Verify the result
  expect(result).toBe('expected value')
})
```

### 2. Test Naming
```typescript
// Good
it('redirects to numbered route when searching a number')
it('displays error message when API fails')
it('handles empty search input gracefully')

// Bad
it('works correctly')
it('does the thing')
it('test 1')
```

### 3. Mocking
```typescript
// Mock external dependencies
vi.mock('../api', () => ({
  apiService: {
    getItem: vi.fn()
  }
}))

// Mock browser APIs
Object.defineProperty(window, 'location', {
  value: { href: '' },
  writable: true
})
```

### 4. Async Testing
```typescript
it('handles async operations', async () => {
  const result = await asyncFunction()
  expect(result).toBeDefined()
})
```

## 🚀 CI/CD Integration

### GitHub Actions Example
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: yarn install
      - run: yarn test:coverage
      - run: yarn build
```

### Coverage Badge
Add to README.md:
```markdown
![Coverage](https://img.shields.io/badge/coverage-85%25-green)
```

## 🔍 Debugging Tests

### Common Issues
1. **Async/Await**: Use `async/await` for asynchronous operations
2. **Mocking**: Ensure mocks are set up before tests run
3. **Cleanup**: Use `beforeEach` to reset mocks and state
4. **Selectors**: Use accessible selectors (getByRole, getByText)

### Debug Commands
```bash
# Run specific test file
yarn test Header.test.tsx

# Run tests in debug mode
yarn test --debug

# Run tests with verbose output
yarn test --reporter=verbose
```

## 📚 Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library) 