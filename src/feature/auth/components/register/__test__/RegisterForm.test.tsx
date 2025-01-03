import { cleanup, render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import RegisterForm from '../RegisterForm';

import userEvent from '@testing-library/user-event';

describe('Register form', () => {
  // render for the pre-screen test.
  const { container } = render(<RegisterForm />);
  it('should render form', () => {
    expect(container.querySelector('form')).toBeInTheDocument();
  });

  it('should render 5 type of input', () => {
    expect(container.querySelectorAll('input').length).toEqual(5);
  });

  it('should render create account button', () => {
    expect(
      screen.getByRole('button', { name: /Create Account/i }),
    ).toBeInTheDocument();
  });

  describe('Email input box', () => {
    // CONSTANT
    const emailPlaceHolderText = 'Email';
    const mockUserInput = 'john@mail.com';

    beforeEach(() => {
      cleanup();
      render(<RegisterForm />);
    });

    it('should have an input contain "Email" placeholder text', () => {
      expect(
        screen.getByPlaceholderText(emailPlaceHolderText),
      ).toBeInTheDocument();
    });

    it("should receive and render the value of the user's input", async () => {
      const emailInput = screen.getByPlaceholderText(emailPlaceHolderText);
      const user = userEvent.setup();
      await user.click(emailInput);
      await user.type(emailInput, mockUserInput);

      expect(emailInput).toHaveValue(mockUserInput);
    });
  });

  describe.todo('Phone number input box');
});
