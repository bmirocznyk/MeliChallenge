// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { render } from '@testing-library/react';
import { Gallery } from '../Gallery';

describe('Gallery', () => {
  it('renders without crashing', () => {
    render(<Gallery images={[]} />);
  });
}); 