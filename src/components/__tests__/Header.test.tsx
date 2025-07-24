import '@testing-library/jest-dom';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from '../Header';

describe('Header', () => {
  let originalLocation: any;
  beforeEach(() => {
    originalLocation = globalThis.window.location;
    // @ts-ignore
    delete globalThis.window.location;
    // @ts-ignore
    globalThis.window.location = { href: '', assign: vi.fn() };
  });
  afterEach(() => {
    globalThis.window.location = originalLocation;
  });

  function renderHeader() {
    return render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
  }

  it('renders logo and search bar', () => {
    renderHeader();
    expect(screen.getByAltText('Mercado Libre')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Buscar productos, marcas y más...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /buscar/i })).toBeInTheDocument();
  });

  it('redirects to numbered route when searching a positive number', () => {
    renderHeader();
    const input = screen.getByPlaceholderText('Buscar productos, marcas y más...');
    const button = screen.getByRole('button', { name: /buscar/i });
    fireEvent.change(input, { target: { value: '123' } });
    fireEvent.click(button);
    expect(globalThis.window.location.href).toBe('/123');
  });

  it('does not redirect on text input', () => {
    renderHeader();
    const input = screen.getByPlaceholderText('Buscar productos, marcas y más...');
    const button = screen.getByRole('button', { name: /buscar/i });
    fireEvent.change(input, { target: { value: 'hello' } });
    fireEvent.click(button);
    expect(globalThis.window.location.href).toBe('');
  });

  it('does not redirect on empty input', () => {
    renderHeader();
    const button = screen.getByRole('button', { name: /buscar/i });
    fireEvent.click(button);
    expect(globalThis.window.location.href).toBe('');
  });

  it('does not redirect on zero or negative number', () => {
    renderHeader();
    const input = screen.getByPlaceholderText('Buscar productos, marcas y más...');
    const button = screen.getByRole('button', { name: /buscar/i });
    fireEvent.change(input, { target: { value: '0' } });
    fireEvent.click(button);
    expect(globalThis.window.location.href).toBe('');
    fireEvent.change(input, { target: { value: '-5' } });
    fireEvent.click(button);
    expect(globalThis.window.location.href).toBe('');
  });

  it('renders navigation and user/cart elements', () => {
    renderHeader();
    expect(screen.getAllByText(/Enviar a/).length).toBeGreaterThan(0);
    expect(screen.getByText('Categorías')).toBeInTheDocument();
    expect(screen.getByText('Ofertas')).toBeInTheDocument();
    expect(screen.getByText('Cupones')).toBeInTheDocument();
    expect(screen.getByText('Mis compras')).toBeInTheDocument();
    expect(screen.getByText('Favoritos')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument(); // cart count
  });
}); 