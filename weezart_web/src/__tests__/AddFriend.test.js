import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import AddFriend from '../Pages/AddFriend/AddFriend';
import * as AddFriendApiModule from '../API/AddFriendApi';

// Mock the AddFriendApi module
jest.mock('../API/AddFriendApi');

describe('AddFriend component', () => {
  it('renders without crashing', () => {
    render(<AddFriend username="testUser" token="testToken" />);
  });

  it('handles username input change', () => {
    render(<AddFriend username="testUser" token="testToken" />);
    const usernameInput = screen.getByRole('textbox');

    fireEvent.change(usernameInput, { target: { value: 'newUsername' } });

    expect(usernameInput.value).toBe('newUsername');
  });

  it('displays error message for already friend error', async () => {
    // Mock the AddFriendApi function to return ALREADY_FRIEND_ERROR
    AddFriendApiModule.AddFriendApi.mockRejectedValue({
      ok: false,
      status: 403, // or any other appropriate status code
      text: jest.fn().mockResolvedValue('ALREADY_FRIEND_ERROR'),
    });

    render(<AddFriend username="testUser" token="testToken" />);
    const usernameInput = screen.getByRole('textbox');
    const followButton = screen.getByRole('button');

    fireEvent.change(usernameInput, { target: { value: 'existingUser' } });
    fireEvent.click(followButton);

    await waitFor(() => {
      expect(screen.getByText('Already Following')).toBeInTheDocument();
    });
  });
});
