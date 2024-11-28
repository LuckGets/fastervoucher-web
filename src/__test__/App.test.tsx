import App from '../App';
import { expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

it('should return hello world', () => {
  render(<App />);

  const text = screen.getByText('Hello World');

  expect(text).toBeDefined();
});
