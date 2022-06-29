import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';

import Home from '.';
import { AppProvider } from '../../appContext';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

test("Welcome page is shown when not logged in", () => {
  render(<Home />);
  expect(screen.getByTestId("welcome-container")).toBeInTheDocument();
});

test("Home page is shown when logged in", () => {
  render(<AppProvider value={{session: {mock: 1}}}><Home /></AppProvider>);
  expect(screen.getByTestId("home-container")).toBeInTheDocument();
});