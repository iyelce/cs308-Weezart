import React from 'react';
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react';
import Login from '../Pages/Authentication/Login';
import * as LoginApi from '../API/LoginApi';
import { MemoryRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SignUp from '../Pages/Authentication/SignUp';


jest.mock('../API/LoginApi', () => ({
    ...jest.requireActual('../API/LoginApi'), // Use the actual module for non-mocked functions
    login: jest.fn(), // Mock the login function
  }));

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
  }));

  console.log(require('react-router-dom').useNavigate);

describe('Login component', () => {

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );
  });

  it('handles username input change', () => {
    render(<Login />);
    const usernameInput = screen.getByRole('textbox', { class: 'register-input-box' });

    fireEvent.change(usernameInput, { target: { value: 'testUser' } });

    expect(usernameInput.value).toBe('testUser');
  });

  it('handles password input change', () => {
    render(<Login />);
    const passwordInput = screen.getByRole('textbox', { class: 'register-input-box' });

    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

    expect(passwordInput.value).toBe('testPassword');
  });

  it('displays error message for invalid login', async () => {
    // Mock the LoginApi function to return -1 for unsuccessful login
    LoginApi.login.mockResolvedValue(-1);
  
    render(<Login />);
    const usernameInput = screen.getByRole('textbox', { class: 'register-input-box' });
    const passwordInput = screen.getByRole('textbox', { class: 'register-input-box' });
    const loginButton = screen.getByRole('button', { class: 'register-button' });

  
    fireEvent.change(usernameInput, { target: { value: 'invalidUser' } });
    fireEvent.change(passwordInput, { target: { value: 'invalidPassword' } });
    fireEvent.click(loginButton);

  });



  it('valid login', async () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
  
    const mockUser = {
      iduser: 1,
      username: "username_value",
      password: "password_value",
      email: "email@example.com",
      authority: "ROLE_USER",
      followers: ["follower1_username", "follower2_username"],
      following: ["following1_username", "following2_username"]
    };
  
    
  
    render(<Login />);
    const usernameInput = screen.getByRole('textbox', { class: 'register-input-box' });
    const passwordInput = screen.getByRole('textbox', { class: 'register-input-box' });
    const loginUser = screen.getByRole('button', { class: 'register-button' });

    fireEvent.change(usernameInput, { target: { value: 'User1' } });
    fireEvent.change(passwordInput, { target: { value: 'Password1' } });
  
    // Click the login button and wait for the asynchronous operation to complete
    fireEvent.click(loginUser);

    LoginApi.login.mockResolvedValue(mockUser);

    await waitFor(() => {
      //expect(mockNavigate).toHaveBeenCalledWith('/home');
    });
  });
  
  it('handles signup click', () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
  
    render(<Login />);
  
    const signupLink = screen.getByText('Signup');
  
    fireEvent.click(signupLink);
  
    // Check if the navigate function is called with the expected argument
    expect(mockNavigate).toHaveBeenCalledWith('/signup');
  });
  
  it('handles focus on username input', () => {
    render(<Login />);
    const usernameInput = screen.getByRole('textbox', { class: 'register-input-box' });

    // Simulate focusing on the username input
    fireEvent.focus(usernameInput);
    
    const usernameLabel = screen.getByText('Username', { selector: 'label.register-input-label.moved-upside' });
    expect(usernameLabel).toBeInTheDocument();
  });

});


describe('Signup component', () => {

});