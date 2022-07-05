import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';

import Home from '.';
import { AppProvider } from '../../appContext';

const mockedUsedNavigate = jest.fn();
const mockedUsedLocation = jest.fn();
const mockedUsedRoutes = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
  useLocation: () => mockedUsedLocation,
}));

jest.mock('../../supabaseClient', () => ({
  __esModule: true,
  supabase: {
    auth: {
      //signIn: jest.fn(x => ( (x.username && x.password) ? {user: {mock: 1}, session: {mock: 1}, error: null} : {user: null, session: null, error: {message: "bad login"}})),
      signIn: jest.fn(),
      signUp: jest.fn(),
    },
    rpc: () => new Promise({error: null, data: [], body: []})
  }
}));

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  Routes: () => <div />
}));

test("Welcome page is shown when not logged in", () => {
  render(<Home />);
  expect(screen.getByTestId("welcome-container")).toBeInTheDocument();
});

test("Home page is shown when logged in", () => {
  render(<AppProvider value={{session: {mock: 1}}}><Home /></AppProvider>);
  expect(screen.getByTestId("home-container")).toBeInTheDocument();
});