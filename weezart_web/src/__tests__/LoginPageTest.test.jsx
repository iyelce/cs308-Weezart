import React from 'react';
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react';
import Login from '../Pages/Authentication/Login';
import * as LoginApi from '../API/LoginApi';
import { MemoryRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


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

    LoginApi.login.mockResolvedValue(mockUser);
  
    render(<Login />);
    const usernameInput = screen.getByRole('textbox', { class: 'register-input-box' });
    const passwordInput = screen.getByRole('textbox', { class: 'register-input-box' });
    const loginButton = screen.getByRole('button', { class: 'register-button' });

  
    fireEvent.change(usernameInput, { target: { value: 'invalidUser' } });
    fireEvent.change(passwordInput, { target: { value: 'invalidPassword' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith("/home");
      });
  });
  
  it('handles focus on username input', () => {
    render(<Login />);
    const usernameInput = screen.getByRole('textbox', { class: 'register-input-box' });

    // Simulate focusing on the username input
    fireEvent.focus(usernameInput);
    
    const usernameLabel = screen.getByText('Username', { selector: 'label.register-input-label.moved-upside' });
    expect(usernameLabel).toBeInTheDocument();
  });

  


//     it('handles focus on password input', () => {
//     render(<Login />);
//     const passwordInput = screen.getByRole('textbox', { class: 'register-input-box' });

//     // Simulate focusing on the password input
//     fireEvent.focus(passwordInput);

//     // Check if the component state is updated accordingly
//     const passwordLabel = screen.getByText('Password', { selector: 'register-input-label' });
//     expect(passwordLabel).toBeInTheDocument();
//   });

//   it('handles blur on username input', () => {
//     render(<Login />);
//     const usernameInput = screen.getByRole('textbox', { name: 'Username' });

//     // Simulate blurring from the username input
//     fireEvent.blur(usernameInput);

//     // Check if the component state is updated accordingly
//     expect(screen.getByLabelText('Username').classList.contains('moved')).toBe(false);
//     expect(screen.getByLabelText('Username').classList.contains('moved-upside')).toBe(usernameInput.value !== '');
//   });




});
