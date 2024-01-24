import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import AddFriend from '../Pages/AddFriend/AddFriend';
import * as AddFriendApiModule from '../API/AddFriendApi';

// Mock the AddFriendApi module
jest.mock('../API/AddFriendApi');

describe('AddFriend component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    render(<AddFriend username="testUser" token="testToken" />);
  });

  it('handles username input change', () => {
    render(<AddFriend username="testUser" token="testToken" />);
    const usernameInput = screen.getByRole('textbox');

    fireEvent.change(usernameInput, { target: { value: 'newUsername' } });

    expect(usernameInput.value).toBe('newUsername');
  });

  it('displays "Already Following" message for ALREADY_FRIEND_ERROR', async () => {
    // Mock the AddFriendApi function to return ALREADY_FRIEND_ERROR or undefined
    AddFriendApiModule.AddFriendApi.mockResolvedValue({
      ok: false,
      status: 403,
      text: jest.fn().mockResolvedValue('ALREADY_FRIEND_ERROR'),
    });
  
    // Render the component
    render(<AddFriend username="testUser" token="testToken" />);
    const usernameInput = screen.getByRole('textbox');
    const followButton = screen.getByRole('button');
  
    // Trigger the user interaction
    fireEvent.change(usernameInput, { target: { value: 'existingUser' } });
    fireEvent.click(followButton);
  
    // Wait for the asynchronous action to complete
    await waitFor(() => {
      // Your assertion to check for 'Already Following'
      expect(screen.getByText('Already Following')).toBeInTheDocument();
    });
  });

  it('displays "User Not Found" message for USER_NOT_FOUND_ERROR', async () => {
    // Mock the AddFriendApi function to return USER_NOT_FOUND_ERROR
    AddFriendApiModule.AddFriendApi.mockResolvedValue({
      ok: false,
      status: 404,
      text: jest.fn().mockResolvedValue('USER_NOT_FOUND_ERROR'),
    });

    render(<AddFriend username="testUser" token="testToken" />);
    const usernameInput = screen.getByRole('textbox');
    const followButton = screen.getByRole('button');

    fireEvent.change(usernameInput, { target: { value: 'nonexistentUser' } });
    fireEvent.click(followButton);

    await waitFor(() => {
      expect(screen.getByText('User Not Found')).toBeInTheDocument();
    });
  });

  it('displays "Followed" message for ADD_FRIEND_SUCCESS', async () => {
    // Mock the AddFriendApi function to return ADD_FRIEND_SUCCESS
    AddFriendApiModule.AddFriendApi.mockResolvedValue({
      ok: true,
      status: 200,
      text: jest.fn().mockResolvedValue('ADD_FRIEND_SUCCESS'),
    });

    render(<AddFriend username="testUser" token="testToken" />);
    const usernameInput = screen.getByRole('textbox');
    const followButton = screen.getByRole('button');

    fireEvent.change(usernameInput, { target: { value: 'newFriend' } });
    fireEvent.click(followButton);

    await waitFor(() => {
      expect(screen.getByText('Followed')).toBeInTheDocument();
    });
  });

  it('handles unknown response correctly', async () => {
    // Mock the AddFriendApi function to return an unknown response
    AddFriendApiModule.AddFriendApi.mockResolvedValue({
      ok: false,
      status: 500,
      text: jest.fn().mockResolvedValue('UNKNOWN_RESPONSE'),
    });

    render(<AddFriend username="testUser" token="testToken" />);
    const usernameInput = screen.getByRole('textbox');
    const followButton = screen.getByRole('button');

    fireEvent.change(usernameInput, { target: { value: 'unknownUser' } });
    fireEvent.click(followButton);

    // Wait for a reasonable amount of time for potential state updates
    await waitFor(() => {}, { timeout: 500 });

    // Assert that the response label is not set and not displayed
    expect(screen.queryByText('Already Following')).toBeNull();
    expect(screen.queryByText('User Not Found')).toBeNull();
    expect(screen.queryByText('Followed')).toBeNull();
  });
});
