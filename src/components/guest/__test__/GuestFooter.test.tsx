import { describe, expect, test } from 'vitest';
import { paths } from '../../../config/path';
import { render, screen } from '@testing-library/react';
import GuestFooter from '../GuestFooter';
import { BrowserRouter } from 'react-router-dom';

describe('Navigation bar', () => {
  test('it should render all the links inside home page', () => {
    // Get all the path in app page.
    const appPathArr = Object.entries(paths.app);
    render(
      <BrowserRouter>
        <GuestFooter activePath={appPathArr[0][1].path} />
      </BrowserRouter>,
    );
    appPathArr.forEach((item) => {
      expect(screen.getByText(item[1].label)).toBeInTheDocument();
    });
  });
});
