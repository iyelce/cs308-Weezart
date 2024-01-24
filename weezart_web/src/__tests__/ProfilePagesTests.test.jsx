import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route } from 'react-router-dom';
import FollowersList from '../Pages/Profile/FollowersList';
import { Routes } from 'react-router-dom';
import FollowingList from '../Pages/Profile/FollowingList';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({
      state: { followers: [] },
    }),
  }));


describe('FollowersList Component', () => {

    const mockFollowers = ['follower1', 'follower2', 'follower3'];

    it('renders without crashing', () => {
        render(
          <MemoryRouter initialEntries={['followers']} initialIndex={0}>
            <FollowersList followers={mockFollowers} />
          </MemoryRouter>
        );
      
        const profileContainer = screen.getByRole('div', { name: 'Followers' }); // Use 'div' as the role
        expect(profileContainer).toBeInTheDocument();
      });

  it('navigates to the correct friendProfile page when a follower is clicked (using Link)', () => {
    render(
      <MemoryRouter initialEntries={['/followers']} initialIndex={0}>
        <Route path="/followers">
          <FollowersList followers={mockFollowers} />
        </Route>
        <Route path="/friendProfile/:follower">
          <div data-testid="friend-profile-page">Friend Profile Page</div>
        </Route>
      </MemoryRouter>
    );

    // Simulate a click event on the first follower using Link
    fireEvent.click(screen.getByTestId('follower-link-0'));

    // Check if the navigation to the correct friendProfile page occurred
    expect(screen.getByTestId('friend-profile-page')).toBeInTheDocument();
  });
});


describe('FollowingList Component', () => {
    const mockFollowing = ['following1', 'following2', 'following3'];
  
    it('renders without crashing', () => {
      render(
        <MemoryRouter initialEntries={['followings']} initialIndex={0}>
          <FollowingList followingInfo={mockFollowing} />
        </MemoryRouter>
      );
  
      const profileContainer = screen.getByRole('div', { name: 'Followings' });
      expect(profileContainer).toBeInTheDocument();
    });
  
    it('navigates to the correct friendProfile page when a following is clicked (using Link)', () => {
      render(
        <MemoryRouter initialEntries={['/followings']} initialIndex={0}>
          <Route path="/followings">
            <FollowingList followingInfo={mockFollowing} />
          </Route>
          <Route path="/friendProfile/:followingItem">
            <div data-testid="friend-profile-page">Friend Profile Page</div>
          </Route>
        </MemoryRouter>
      );
  
      // Simulate a click event on the first following using Link
      fireEvent.click(screen.getByTestId('following-link-0'));
  
      // Check if the navigation to the correct friendProfile page occurred
      expect(screen.getByTestId('friend-profile-page')).toBeInTheDocument();
    });
  });
