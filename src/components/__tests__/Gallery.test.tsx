import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { Gallery } from '../Gallery';

describe('Gallery', () => {
  it('renders without crashing', () => {
    render(
      <Gallery images={[{ id: '1', url: 'test.jpg', alt: 'Test image', width: 100, height: 100 }]} />
    );
  });
}); 