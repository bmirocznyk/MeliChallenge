import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Test simple para App

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    // Verifica que el componente NotFoundProduct se renderiza en la ruta raíz
    expect(screen.getByText(/producto no encontrado/i)).toBeInTheDocument();
  });
}); 