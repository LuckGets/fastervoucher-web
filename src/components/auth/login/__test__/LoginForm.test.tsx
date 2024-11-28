import { describe, it } from 'vitest';
import { screen, render } from '@testing-library/react';
import LoginForm from '@/components/auth/login/LoginForm';
import { BrowserRouter } from 'react-router-dom';

describe('Login Form', () => {
  it('renders a form', () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>,
    );
    screen.logTestingPlaygroundURL();
  });
});
