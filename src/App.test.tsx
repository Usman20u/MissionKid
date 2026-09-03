import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { App } from './App';

describe('application foundation', () => {
  it('renders the root application content', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'MissionKid' })).toBeTruthy();
  });
});
