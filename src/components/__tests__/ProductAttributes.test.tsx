import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { ProductAttributes } from '../ProductAttributes';

describe('ProductAttributes', () => {
  it('renders without crashing', () => {
    render(<ProductAttributes attributes={[]} />);
  });
}); 