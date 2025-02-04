/**
 * @jest-environment jsdom
 */
import { ArrowIcon } from "./arrow-icon";
import {render} from '@testing-library/react';

describe('ArrowIcon', () => {
  it('should render the ArrowIcon', () => {
    const { container} = render(<ArrowIcon />);
    expect(container).toBeInTheDocument();
  });

  it('should check the default prop values', () => {
    const { container } = render(<ArrowIcon />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
    expect(svg).toHaveAttribute('fill', '');
  });

  it('should check the added props prop values', () => {
    const { container } = render(
      <ArrowIcon fill="#fff" height={20} width={30} />
    );
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '30');
    expect(svg).toHaveAttribute('height', '20');
    expect(svg).toHaveAttribute('fill', '#fff');
  });
});