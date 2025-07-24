// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { render } from '@testing-library/react';
import { Breadcrumb } from '../Breadcrumb';

describe('Breadcrumb', () => {
  it('renders without crashing', () => {
    render(<Breadcrumb categories={[]} />);
  });
}); 