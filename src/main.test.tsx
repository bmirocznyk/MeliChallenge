import { describe, it, vi } from 'vitest';
// Mock de ReactDOM.createRoot
vi.mock('react-dom/client', () => {
  return {
    default: {
      createRoot: vi.fn(() => ({ render: vi.fn() }))
    },
    createRoot: vi.fn(() => ({ render: vi.fn() }))
  };
});

describe('main entry', () => {
  it('renders App without crashing', async () => {
    // Importa el archivo después de hacer el mock
    await import('./main.tsx');
    // Si no crashea, el test pasa
  });
}); 