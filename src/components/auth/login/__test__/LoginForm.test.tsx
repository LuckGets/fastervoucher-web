import { describe, it } from 'vitest';
import { screen, render } from '@testing-library/react';
import LoginForm from '@/components/auth/login/LoginForm';

describe('Login Form', () => {
  it('renders a form', () => {
    render(<LoginForm />);
    screen.logTestingPlaygroundURL();
  });
});
