// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { render } from '@testing-library/react';
import { ReviewsModal } from '../ReviewsModal';

describe('ReviewsModal', () => {
  it('renders without crashing', () => {
    render(<ReviewsModal reviews={[]} onClose={() => {}} />);
  });
}); 