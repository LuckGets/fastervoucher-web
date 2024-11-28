import { describe, expect, test } from 'vitest';
import { paths } from '../../../config/path';
import { render, screen } from '@testing-library/react';
import GuestFooter from '../GuestFooter';
import { BrowserRouter } from 'react-router-dom';

describe('Navigation bar', () => {
  test('it should render all the links inside home page', () => {
    // Get all the path in app page.
    const homePathsArr = Object.keys(paths.app);
    const firstLinkName = homePathsArr[0];
    render(
      <BrowserRouter>
        <GuestFooter activePath={firstLinkName} />
      </BrowserRouter>,
    );
    screen.logTestingPlaygroundURL();
    const firstLink = screen.getByRole('link', { name: /home/i });
    expect(firstLink).toBeDefined();
  });
});
