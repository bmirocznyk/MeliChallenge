import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { NotFoundProduct } from '../NotFoundProduct';

describe('NotFoundProduct', () => {
  it('renders without crashing', () => {
    render(<NotFoundProduct />);
  });
}); 