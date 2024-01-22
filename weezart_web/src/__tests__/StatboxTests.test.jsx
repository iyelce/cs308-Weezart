import { render, screen } from '@testing-library/react';
import Statbox from '../Pages/Analyze/Statbox';

describe('Statbox component', () => {
  it('renders with the provided props', () => {
    const title = 'Total Users';
    const subtitle = 'Active Users';
    const increase = '+10';
    
    render(<Statbox title={title} subtitle={subtitle} increase={increase} />);
    
    // Check if the component renders with the provided props
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(subtitle)).toBeInTheDocument();
    expect(screen.getByText(increase)).toBeInTheDocument();
  });

  it('applies styles correctly based on increase prop', () => {
    const title = 'Total Sales';
    const subtitle = 'Monthly Revenue';
    const increasePositive = '+$500';
    const increaseNegative = '-$200';
    
    render(<Statbox title={title} subtitle={subtitle} increase={increasePositive} />);
    
    // Check if the style is applied correctly for a positive increase
    expect(screen.getByText(increasePositive)).toHaveStyle({ color: 'rgb(61,165,138)' });

    render(<Statbox title={title} subtitle={subtitle} increase={increaseNegative} />);
    
    // Check if the style is applied correctly for a negative increase
    expect(screen.getByText(increaseNegative)).toHaveStyle({ color: 'rgb(131,47,44)' });
  });
});