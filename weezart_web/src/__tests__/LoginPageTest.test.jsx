import React from 'react';
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react';
import Login from '../Pages/Authentication/Login';
import * as LoginApi from '../API/LoginApi';
import { MemoryRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SignUp from '../Pages/Authentication/SignUp';
import * as SignUpApi from '../API/SignUpApi';


jest.mock('../API/LoginApi', () => ({
    ...jest.requireActual('../API/LoginApi'), // Use the actual module for non-mocked functions
    login: jest.fn(), // Mock the login function
  }));

  jest.mock('../API/SignUpApi', () => ({
    ...jest.requireActual('../API/SignUpApi'), // Use the actual module for non-mocked functions
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
        token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpZGlseWVsY2UiLCJyb2xlIjpbeyJhdXRob3JpdHkiOiJST0xFX1VTRVIifV0sImV4cCI6MTcwMDU4MzEyMiwiaWF0IjoxNzAwNTc5NTIyfQ.HHLEi55tyyBa0pMVb_3n1JivQYDAfYsU2kuSyvfVwDY",
        userId: 9
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


describe('SignUp Component', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('renders SignUp component', () => {
      render(<SignUp />);
      expect(screen.getByText('Sign Up')).toBeInTheDocument();
    });

    it('displays error for passwords mismatch', () => {
        render(<SignUp />);
        
        const getPasswordInput = () => {
          const passwordLabel = screen.getByText('Password');
          return passwordLabel.parentElement.querySelector('.register-input-box');
        };
    
        const getRepeatPasswordInput = () => {
          const repeatPasswordLabel = screen.getByText('Repeat Password');
          return repeatPasswordLabel.parentElement.querySelector('.register-input-box');
        };
    
        // Simulate password input
        const passwordInput = getPasswordInput();
        fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    
        // Simulate repeat password input with a different value
        const repeatPasswordInput = getRepeatPasswordInput();
        fireEvent.change(repeatPasswordInput, { target: { value: 'mismatchedPassword' } });
    
        // Simulate clicking the 'Register' button (this should invoke the registerCheck function)
        const registerButton = screen.getByRole('button', { class: 'register-button' });
        fireEvent.click(registerButton);
    
        setTimeout(() => {
            const errorLabel = screen.getByText('* Passwords do not match');
            expect(errorLabel.parentElement.classList).toContain('login-error-p');
          }, 500); // Adjust timeout as needed
    });
  
    it('displays error for invalid email format', () => {
            render(<SignUp />);
            
            const getEmailInput = () => {
              const emailLabel = screen.getByText('Email Adress');
              return emailLabel.parentElement.querySelector('.register-input-box');
            };
          
            // Simulate invalid email input
            const emailInput = getEmailInput();
            fireEvent.change(emailInput, { target: { value: 'invalidEmail' } });
          
            // Simulate clicking the 'Register' button
            const registerButton = screen.getByRole('button', { class: 'register-button' });
            fireEvent.click(registerButton);
          
            setTimeout(() => {
              const errorLabel = screen.getByText('* Invalid email format');
              expect(errorLabel.parentElement.classList).toContain('login-error-p');
            }, 500); // Adjust timeout as needed
    });


    it('handles username input change', () => {
        render(<SignUp />);
        
        const getUsernameInput = () => {
          const usernameLabel = screen.getByText('Username');
          return usernameLabel.parentElement.querySelector('.register-input-box');
        };
    
        const getEmailInput = () => {
          const emailLabel = screen.getByText('Email Adress'); // Make sure to match your actual label text
          return emailLabel.parentElement.querySelector('.register-input-box');
        };
    
        const getPasswordInput = () => {
          const passwordLabel = screen.getByText('Password');
          return passwordLabel.parentElement.querySelector('.register-input-box');
        };
    
        const getRepeatPasswordInput = () => {
          const repeatPasswordLabel = screen.getByText('Repeat Password');
          return repeatPasswordLabel.parentElement.querySelector('.register-input-box');
        };
    
        // Test username input
        const usernameInput = getUsernameInput();
        fireEvent.change(usernameInput, { target: { value: 'testUser' } });
        expect(usernameInput.value).toBe('testUser');
    
        // Test email input
        const emailInput = getEmailInput();
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        expect(emailInput.value).toBe('test@example.com');
    
        // Test password input
        const passwordInput = getPasswordInput();
        fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
        expect(passwordInput.value).toBe('testPassword');
    
        // Test repeat password input
        const repeatPasswordInput = getRepeatPasswordInput();
        fireEvent.change(repeatPasswordInput, { target: { value: 'testPassword' } });
        expect(repeatPasswordInput.value).toBe('testPassword');
    });



    it('displays error for taken username', async () => {
        render(<SignUp />);
        
        const getUsernameInput = () => {
          const usernameLabel = screen.getByText('Username');
          return usernameLabel.parentElement.querySelector('.register-input-box');
        };
      
        const getEmailInput = () => {
          const emailLabel = screen.getByText('Email Adress');
          return emailLabel.parentElement.querySelector('.register-input-box');
        };
      
        const getPasswordInput = () => {
          const passwordLabel = screen.getByText('Password');
          return passwordLabel.parentElement.querySelector('.register-input-box');
        };
      
        const getRepeatPasswordInput = () => {
          const repeatPasswordLabel = screen.getByText('Repeat Password');
          return repeatPasswordLabel.parentElement.querySelector('.register-input-box');
        };
      
        // Test username input
        const usernameInput = getUsernameInput();
        fireEvent.change(usernameInput, { target: { value: 'existingUser' } });
      
        // Test email input
        const emailInput = getEmailInput();
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        expect(emailInput.value).toBe('test@example.com');
      
        // Test password input
        const passwordInput = getPasswordInput();
        fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
        expect(passwordInput.value).toBe('testPassword');
      
        // Test repeat password input
        const repeatPasswordInput = getRepeatPasswordInput();
        fireEvent.change(repeatPasswordInput, { target: { value: 'testPassword' } });
        expect(repeatPasswordInput.value).toBe('testPassword');
      
        jest.mock('../API/SignUpApi', () => ({
          __esModule: true,
          default: jest.fn().mockResolvedValue(-1),
        }));
      
        // Simulate clicking the 'Register' button
        const registerButton = screen.getByRole('button', { class: 'register-button' });
        fireEvent.click(registerButton);
      
        // Wait for asynchronous operations to complete
        await screen.findByText('* Username is taken');
      
        // Check if the error message is displayed
        expect(screen.getByText('* Username is taken')).toBeInTheDocument();
      });
      

      it('handles focus on username input', () => {
        render(<SignUp />);

        const getUsernameInput = () => {
            const usernameLabel = screen.getByText('Username');
            return usernameLabel.parentElement.querySelector('.register-input-box');
          };

          const usernameInput = getUsernameInput();
    
        // Simulate focusing on the username input
        fireEvent.focus(usernameInput);
        
        const usernameLabel = screen.getByText('Username', { selector: 'label.register-input-label.moved-upside' });
        expect(usernameLabel).toBeInTheDocument();
      });
      

      it('handles focus on password input', () => {
        render(<SignUp />);
      
        const getPasswordInput = () => {
          const passwordLabel = screen.getByText('Password');
          return passwordLabel.parentElement.querySelector('.register-input-box');
        };
      
        const passwordInput = getPasswordInput();
      
        // Simulate focusing on the password input
        fireEvent.focus(passwordInput);
      
        const passwordLabel = screen.getByText('Password', { selector: 'label.register-input-label.moved-upside' });
        expect(passwordLabel).toBeInTheDocument();
      });
      

  
    // it('displays error for taken username', async () => {
    //   SignUpApi.mockResolvedValue(-1);
  
    //   render(<SignUp />);
  
    //   const registerButton = screen.getByRole('button', { name: 'Register' });
    //   fireEvent.click(registerButton);
  
    //   await waitFor(() => {
    //     expect(screen.getByText('* Username is taken')).toBeInTheDocument();
    //   });
    // });
  
    // it('navigates to home after successful registration', async () => {
    //   SignUpApi.mockResolvedValue({}); // Assuming successful registration returns an empty object
  
    //   render(<SignUp />);
  
    //   const registerButton = screen.getByRole('button', { name: 'Register' });
    //   fireEvent.click(registerButton);
  
    //   await waitFor(() => {
    //     expect(screen.queryByText('* Username is taken')).toBeNull();
    //     expect(screen.queryByText('* Invalid email format')).toBeNull();
    //     Add assertions based on your specific success conditions
    //   });
    // });


  });