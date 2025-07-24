import { describe, it, vi } from 'vitest';
// Mock de ReactDOM.createRoot
vi.mock('react-dom/client', () => {
  return {
    createRoot: vi.fn(() => ({ render: vi.fn() }))
  };
});

describe('main entry', () => {
  it('renders App without crashing', () => {
    // Importa el archivo después de hacer el mock
    require('./main');
    // Si no crashea, el test pasa
  });
}); 