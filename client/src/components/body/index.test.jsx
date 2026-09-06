import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import Body from './index';

describe('Body', () => {
  it('renders correctly', () => {
    render(<Body />);

    expect(screen.getByText('Sample page for testing vitest')).toBeInTheDocument();
  });
});