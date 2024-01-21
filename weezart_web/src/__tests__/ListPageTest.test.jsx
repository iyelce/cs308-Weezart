import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import LikedSongsList from '../Pages/Lists/LikedSongsList';

jest.mock('../../API/AddedSongsApi');

describe('LikedSongsList Component', () => {
  const props = {
    token: 'your_token',
    userId: 'your_user_id',
  };

  test('renders the component with songs', async () => {
    const mockSongs = [
      { name: 'Song1', artistsName: ['Artist1'], albumName: 'Album1', popularity: 80, duration_ms: 180000 },
      { name: 'Song2', artistsName: ['Artist2'], albumName: 'Album2', popularity: 90, duration_ms: 200000 },
    ];

    render(<LikedSongsList {...props} />);

    // Mock the fetchData function to return songs
    jest.spyOn(LikedSongsList, 'fetchData').mockResolvedValueOnce(mockSongs);

    // Trigger fetchData by simulating a click
    fireEvent.click(screen.getByText('Song Name'));

    // Wait for the state to update after the async operation (fetchData)
    await waitFor(() => {
      // Assert state changes after fetchData
      expect(LikedSongsList.songs).toEqual(mockSongs);
    });

    await waitFor(() => {
      // Assert state changes after fetchData
      expect(LikedSongsList.wholeSongResp).toEqual(mockSongs);
    });

    // Assert table rows are rendered correctly
    mockSongs.forEach((song, index) => {
      expect(screen.getByText(song.name)).toBeInTheDocument();
      expect(screen.getByText(song.artistsName.join(', '))).toBeInTheDocument();
      expect(screen.getByText(song.albumName)).toBeInTheDocument();
      // Add more assertions based on your component's structure
    });
  });

  // Add more test cases to cover other parts of the component, such as click events and API calls
});


