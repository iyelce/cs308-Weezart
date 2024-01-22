import React from 'react';
import { render, screen,waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // Import userEvent
import MyProfile from '../Pages/Profile/MyProfile';
import UserProfileApi from '../API/UserProfileApi';
import UserPublicDataApi from '../API/UserPublicDataApi';
jest.mock('../API/UserProfileApi', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

  jest.mock('../API/UserPublicDataApi', () => ({
    __esModule: true,
    default: jest.fn(),
  }));
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
  }));
test('renders user information after fetching data', async () => {
  const mockUserData = {
    // ...mock user data
    username: 'test-username',
    email: 'test-email',
    followers: [],
    following: [],
  };
  UserProfileApi.mockResolvedValueOnce(mockUserData);

  render(<MyProfile token="test-token" userId="test-user"  username="username"/>);

  await waitFor(() => {
    // Wait for data fetching
    expect(screen.getByText(mockUserData.username)).toBeInTheDocument();
    expect(screen.getByText('Followers: 0')).toBeInTheDocument(); // Adjust for mock data
    expect(screen.getByText('Following: 0')).toBeInTheDocument(); // Adjust for mock data
  });
});

