import { beforeAll, describe, expect, it, beforeEach } from 'vitest';
import { screen, render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from '../LoginForm';

// consistent data
const identifierPlaceholderText = 'Email or Phone';
const passwordPlaceholderText = 'Password';

describe('Login Form', () => {
  let screenContainer: HTMLElement;
  beforeAll(() => {
    const { container } = render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>,
    );
    screenContainer = container;
  });
  it('renders a form', () => {
    expect(screenContainer.querySelector(`div > form`)).toBeDefined();
  });

  describe('Identifier input', () => {
    const mockUserKeyboard = 'john';
    let loginInput: HTMLElement | Element;
    beforeEach(() => {
      loginInput = screen.getByPlaceholderText(identifierPlaceholderText);
    });
    it(`should render an input which contain ${identifierPlaceholderText} placeholder text`, () => {
      expect(loginInput).toBeDefined();
    });

    it('should render the user input value when user type something', async () => {
      const user = userEvent.setup();
      await user.click(loginInput);
      await user.keyboard(mockUserKeyboard);

      expect(screen.queryByDisplayValue(mockUserKeyboard)).toBeDefined();
    });
  });

  describe('Password input', () => {
    it(`should render an input which contain ${passwordPlaceholderText} placeholder text`, () => {
      const loginInput = screen.getByPlaceholderText(passwordPlaceholderText);
      expect(loginInput).toBeDefined();
    });
  });
});
