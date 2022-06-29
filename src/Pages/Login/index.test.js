import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '.';
import { Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { supabase } from '../../supabaseClient';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('../../supabaseClient', () => ({
  __esModule: true,
  supabase: {
    auth: {
      //signIn: jest.fn(x => ( (x.username && x.password) ? {user: {mock: 1}, session: {mock: 1}, error: null} : {user: null, session: null, error: {message: "bad login"}})),
      signIn: jest.fn(),
      signUp: jest.fn(),
    }
  }
}));

jest.useFakeTimers();

test("Login has needed components", async () => {
  render(<Login />);
  expect(screen.getByLabelText("E-mail")).toBeInTheDocument();
  expect(screen.getByLabelText("Password")).toBeInTheDocument();
  expect(screen.queryByLabelText("Password Check")).not.toBeInTheDocument();
  expect(screen.getByRole("button", {name: "log in"})).toBeInTheDocument();
}); 

test("Register has needed components", async () => {
  render(<Login />);
  act(() => {
    screen.getByText(/No account?/).click();
  });
  expect(screen.getByLabelText("E-mail")).toBeInTheDocument();
  expect(screen.getByLabelText("Password")).toBeInTheDocument();
  expect(await screen.findByLabelText("Password Check")).toBeInTheDocument();
  expect(await screen.findByRole("button", {name: "register"})).toBeInTheDocument();
});

test("Can log in correctly", async () => {
  render(<Login />);
  supabase.auth.signIn
    .mockReturnValueOnce({user: {}, session: {}, error: null})
    .mockReturnValueOnce({user: null, session: null, error: {message: "Invalid login"}});
  act(() => {
    screen.getByRole("button", {name: "log in"}).click();
  });
  expect(await screen.findByText(/logged in/)).toBeInTheDocument();
  act(() => {
    screen.getByRole("button", {name: "log in"}).click();
  });
  expect(await screen.findByText(/Invalid login/)).toBeInTheDocument();
});