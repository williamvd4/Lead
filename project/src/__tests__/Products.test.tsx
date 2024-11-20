import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Products from '../pages/Products';

describe('Products Page', () => {
  it('renders the main heading', () => {
    render(<Products />);
    expect(screen.getByText('Our Products')).toBeInTheDocument();
  });

  it('allows filtering by category', () => {
    render(<Products />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'flower' } });
    expect(screen.getByText('Purple Haze')).toBeInTheDocument();
    expect(screen.queryByText('Calm Gummies')).not.toBeInTheDocument();
  });

  it('allows searching products', () => {
    render(<Products />);
    const searchInput = screen.getByPlaceholderText('Search products...');
    fireEvent.change(searchInput, { target: { value: 'Blue Dream' } });
    expect(screen.getByText('Blue Dream')).toBeInTheDocument();
    expect(screen.queryByText('Purple Haze')).not.toBeInTheDocument();
  });

  it('displays product details', () => {
    render(<Products />);
    expect(screen.getByText('THC: 22%')).toBeInTheDocument();
    expect(screen.getByText('CBD: 0.1%')).toBeInTheDocument();
    expect(screen.getByText('Creative')).toBeInTheDocument();
  });
});