import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Cultivation from '../pages/Cultivation';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Cultivation Page', () => {
  it('renders the main heading', () => {
    render(<Cultivation />);
    expect(screen.getByText('Our Cultivation Process')).toBeInTheDocument();
  });

  it('displays all methodology sections', () => {
    render(<Cultivation />);
    expect(screen.getByText('Light Management')).toBeInTheDocument();
    expect(screen.getByText('Precision Irrigation')).toBeInTheDocument();
    expect(screen.getByText('Climate Control')).toBeInTheDocument();
    expect(screen.getByText('Organic Practices')).toBeInTheDocument();
  });

  it('shows quality control process section', () => {
    render(<Cultivation />);
    expect(screen.getByText('Quality Control Process')).toBeInTheDocument();
    expect(screen.getByText('Testing & Analysis')).toBeInTheDocument();
    expect(screen.getByText('Climate Monitoring')).toBeInTheDocument();
    expect(screen.getByText('Harvest Care')).toBeInTheDocument();
  });

  it('displays facility highlights', () => {
    render(<Cultivation />);
    expect(screen.getByText('Our Facility')).toBeInTheDocument();
    expect(screen.getByText('State-of-the-Art Growing Facility')).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Cultivation />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
