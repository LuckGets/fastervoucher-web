import { describe, expect, it, beforeEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from '../LoginForm';
import { QueryElement, ScreenQuery } from '@/testing/test-util';

// constant data
const identifierPlaceholderText = 'Email or phone';
const passwordPlaceholderText = 'Password';

describe('Login Form', () => {
  let screenContainer: HTMLElement;
  const { container } = render(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>,
  );
  screenContainer = container;

  it('renders a form', () => {
    expect(screenContainer.querySelector(`div > form`)).toBeInTheDocument();
  });

  it('renders a login button', () => {
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  describe('Identifier input', () => {
    const mockUserKeyboard = 'john';
    let loginInput: QueryElement;
    beforeEach(() => {
      cleanup();
      render(
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>,
      );
      loginInput = screen.getByPlaceholderText(identifierPlaceholderText);
    });
    it(`should render an input which contain ${identifierPlaceholderText} placeholder text`, () => {
      expect(loginInput).toBeInTheDocument();
    });

    it('should render the user input value when user type something', async () => {
      const user = userEvent.setup();
      await user.click(loginInput);
      await user.keyboard(mockUserKeyboard);

      expect(ScreenQuery.hasInputValue(loginInput, mockUserKeyboard)).toBe(
        true,
      );
    });
  });

  describe('Password input', () => {
    let passwordInput: Element;
    const mockUserTypePassword = 'qwerty';
    beforeEach(() => {
      passwordInput = screen.getByPlaceholderText(passwordPlaceholderText);
    });
    it(`should render an input which contain ${passwordPlaceholderText} placeholder text`, () => {
      expect(passwordInput).toBeInTheDocument();
    });
    it('should render the user input value when user type something', async () => {
      const user = userEvent.setup();
      await user.click(passwordInput);
      await user.keyboard(mockUserTypePassword);

      expect(passwordInput).toHaveValue(mockUserTypePassword);
    });
  });

  describe('Show password button', () => {
    let showPasswordBtn: QueryElement;
    let passwordInput: QueryElement;

    beforeEach(() => {
      cleanup();
      render(
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>,
      );
      // Find the first button that match
      // which we expect as a show password button
      showPasswordBtn = screen.getAllByRole('button')[0];
      passwordInput = screen.getByPlaceholderText(passwordPlaceholderText);
    });

    it('has the button to show visibility of password', () => {
      const loginBtn = screen.getByRole('button', { name: /login/i });
      expect(showPasswordBtn).not.toStrictEqual(loginBtn);
    });

    it('toggle the password input type from text to password when user click', async () => {
      const user = userEvent.setup();

      expect(passwordInput).toHaveAttribute('type', 'password');
      await user.click(showPasswordBtn);
      expect(passwordInput).toHaveAttribute('type', 'text');
    });

    it('toggle the input type from password to text and back to password when user click twice', async () => {
      const user = userEvent.setup();

      expect(passwordInput).toHaveAttribute('type', 'password');
      await user.click(showPasswordBtn);
      expect(passwordInput).toHaveAttribute('type', 'text');
    });
    it('remain the same input type if user double click', async () => {
      const user = userEvent.setup();

      await user.clear(passwordInput);
      expect(passwordInput).toHaveAttribute('type', 'password');
      await user.dblClick(showPasswordBtn);
      expect(passwordInput).toHaveAttribute('type', 'password');
    });
  });

  describe.todo('Login button');
});
