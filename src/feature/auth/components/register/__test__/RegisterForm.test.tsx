import { cleanup, render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import RegisterForm from '../RegisterForm';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('RegisterForm', () => {
  const renderWithRouter = (ui: React.ReactNode) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  beforeEach(() => {
    cleanup();
    renderWithRouter(<RegisterForm />);
  });

  it('should render 5 input fields', () => {
    expect(screen.getAllByRole('textbox').length).toBe(3);
    expect(screen.getAllByPlaceholderText(/password/i).length).toBe(2);
  });

  it('should render the create account button', () => {
    expect(
      screen.getByRole('button', { name: /Create Account/i }),
    ).toBeInTheDocument();
  });

  describe('Email input box', () => {
    const emailPlaceholder = 'Email';
    const mockUserInput = 'john@mail.com';

    it('should display an input with "Email" as placeholder text', () => {
      expect(screen.getByPlaceholderText(emailPlaceholder)).toBeInTheDocument();
    });

    it("should update its value based on user's input", async () => {
      const emailInput = screen.getByPlaceholderText(emailPlaceholder);
      const user = userEvent.setup();
      await user.type(emailInput, mockUserInput);

      expect(emailInput).toHaveValue(mockUserInput);
    });
  });

  describe('Phone number input box', () => {
    const phonePlaceholder = 'Phone number';
    const mockUserInput = '0123456789';

    it('should display an input with "Phone number" as placeholder text', () => {
      expect(screen.getByPlaceholderText(phonePlaceholder)).toBeInTheDocument();
    });

    it("should update its value based on user's input", async () => {
      const phoneInput = screen.getByPlaceholderText(phonePlaceholder);
      const user = userEvent.setup();
      await user.type(phoneInput, mockUserInput);

      expect(phoneInput).toHaveValue(mockUserInput);
    });
  });
});
