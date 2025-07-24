import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { ReviewsModal } from '../ReviewsModal';

describe('ReviewsModal', () => {
  it('renders without crashing', async () => {
    render(
      <ReviewsModal
        isOpen={true}
        onClose={() => {}}
        productId={'1'}
        productTitle={'Test'}
      />
    );
    // Espera a que termine el loading (si aparece)
    await waitFor(() => {
      // No debe haber un texto 'loading' en pantalla
      expect(screen.queryByText(/loading/i)).toBeFalsy();
    });
  });
}); 