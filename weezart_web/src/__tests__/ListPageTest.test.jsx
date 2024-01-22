import React from 'react';
import { render, screen, fireEvent, waitFor ,act } from '@testing-library/react';
import LikedSongsList from '../Pages/Lists/LikedSongsList';
import AddedSongsApi from '../API/AddedSongsApi';
import LikedArtistsList from '../Pages/Lists/LikedArtists';
import AddedArtistsApi from '../API/AddedArtistsApi';
import LikedAlbumsList from '../Pages/Lists/LikedAlbumsList';
import AddedAlbumsApi from '../API/AddedAlbumsApi';
import BlendList from '../Pages/Lists/BlendList';
import GetPlaylistGivenGroup from '../API/GetPlaylistGivenGroup ';
import SpotifyGetToptracks from '../API/SpotifyGetToptracks';
import SpotifyList from '../Pages/Lists/SpotifyList';
import SpotifyRecom from '../API/SpotifyRecom';
import SpotifyRecomPage from '../Pages/Lists/SpotifyRecomPage';

// Mock the modules that are imported in the component
jest.mock('react-icons/lu', () => ({ LuClock3: 'LuClock3' }));
jest.mock('react-icons/fa', () => ({ FaMusic: 'FaMusic' }));

// Mock the API module
jest.mock('../API/AddedSongsApi', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../API/AddedArtistsApi', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

jest.mock('../API/AddedAlbumsApi');

jest.mock('../API/GetPlaylistGivenGroup ');

jest.mock('../API/SpotifyGetToptracks');

jest.mock('../API/SpotifyRecom');

// Mock react-modal to avoid issues with setting app element
jest.mock('react-modal', () => {
    return {
      setAppElement: jest.fn(),
      // add any other methods or properties used by your component
    };
  });

describe('LikedSongsList Component', () => {
  // Mock props
  const props = {
    token: 'your_token',
    userId: 'your_userId',
  };
  
  it('renders without crashing', () => {
    render(<LikedSongsList {...props} />);

    // Check for elements that are expected to be present
    expect(screen.getByText('Song Name')).toBeInTheDocument();
    expect(screen.getByText('Artists')).toBeInTheDocument();
    // Add more assertions for other elements as needed
  });
  
  it('fetches data on mount', async () => {
    // Mock the API response with an array of songs
    const mockApiData = [
      { song: { name: 'Song 1', artistsName: ['Artist1', 'Artist2'], albumName: 'Album1', popularity: 80, duration_ms: 300000 } },
      { song: { name: 'Song 2', artistsName: ['Artist3'], albumName: 'Album2', popularity: 90, duration_ms: 240000 } },
      // Add more mock data as needed
    ];

    AddedSongsApi.mockResolvedValueOnce(mockApiData);

    // Spy on console.error
    const consoleErrorSpy = jest.spyOn(console, 'error');

    // Render the component
    render(<LikedSongsList {...props} />);

    // Wait for the useEffect to complete (use act to ensure useEffect is finished)
    await act(async () => {});


    expect(AddedSongsApi).toHaveBeenCalledWith(props.token, props.userId);

    expect(screen.getByText(mockApiData[0].song.name)).toBeInTheDocument();
    expect(screen.getByText(mockApiData[0].song.artistsName.join(', '))).toBeInTheDocument();

    const mockError = new Error('API call error');
    AddedSongsApi.mockRejectedValueOnce(mockError);

    render(<LikedSongsList {...props} />);

    await act(async () => {});

    // Verify that the error message is logged to the console
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching user profile:', mockError);

    // Restore the original console.error
    consoleErrorSpy.mockRestore();
  });

});


describe('LikedArtistsList Component', () => {
    // Mock props
    const props = {
      token: 'your_token',
      userId: 'your_userId',
    };
  
    it('renders without crashing', () => {
      render(<LikedArtistsList {...props} />);
  
      // Check for elements that are expected to be present
      expect(screen.getByText('Artist Name')).toBeInTheDocument();
      expect(screen.getByText('Genre')).toBeInTheDocument();
      // Add more assertions for other elements as needed
    });
  
    it('fetches data on mount', async () => {
      // Mock the API response with an array of artists
      const mockApiData = [
        { artist: { name: 'Artist 1', genres: ['Genre1', 'Genre2'], followerCount: 100, imageUrl: 'image1.jpg' } },
        { artist: { name: 'Artist 2', genres: ['Genre3'], followerCount: 200, imageUrl: 'image2.jpg' } },
        // Add more mock data as needed
      ];
  
      AddedArtistsApi.mockResolvedValueOnce(mockApiData);
  
      // Spy on console.error
      const consoleErrorSpy = jest.spyOn(console, 'error');
  
      // Render the component
      render(<LikedArtistsList {...props} />);
  
      // Wait for the useEffect to complete (use act to ensure useEffect is finished)
      await act(async () => {});
  
      expect(AddedArtistsApi).toHaveBeenCalledWith(props.token, props.userId);
  
      expect(screen.getByText(mockApiData[0].artist.name)).toBeInTheDocument();
      expect(screen.getByText(mockApiData[0].artist.genres.join(', '))).toBeInTheDocument();
  
      const mockError = new Error('API call error');
      AddedArtistsApi.mockRejectedValueOnce(mockError);
  
      render(<LikedArtistsList {...props} />);
  
      await act(async () => {});
  
      // Verify that the error message is logged to the console
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching user profile:', mockError);
  
      // Restore the original console.error
      consoleErrorSpy.mockRestore();
    });

  });

  
describe('LikedAlbumsList Component', () => {
  // Mock props
  const props = {
    token: 'your_token',
    userId: 'your_userId',
  };

  it('renders without crashing', () => {
    render(<LikedAlbumsList {...props} />);

    // Check for elements that are expected to be present
    expect(screen.getByText('Album Name')).toBeInTheDocument();
    expect(screen.getByText('Artists')).toBeInTheDocument();
    // Add more assertions for other elements as needed
  });

  it('fetches data on mount', async () => {
    // Mock the API response with an array of albums
    const mockApiData = [
      { album: { name: 'Album 1', artistsName: ['Artist1', 'Artist2'], numberOfTracks: 10, releaseDate: '2022-01-01', imageUrl: 'image1.jpg' } },
      { album: { name: 'Album 2', artistsName: ['Artist3'], numberOfTracks: 8, releaseDate: '2021-01-01', imageUrl: 'image2.jpg' } },
      // Add more mock data as needed
    ];

    AddedAlbumsApi.mockResolvedValueOnce(mockApiData);

    // Spy on console.error
    const consoleErrorSpy = jest.spyOn(console, 'error');

    // Render the component
    render(<LikedAlbumsList {...props} />);

    // Wait for the useEffect to complete (use act to ensure useEffect is finished)
    await act(async () => {});

    expect(AddedAlbumsApi).toHaveBeenCalledWith(props.token, props.userId);

    expect(screen.getByText(mockApiData[0].album.name)).toBeInTheDocument();
    expect(screen.getByText(mockApiData[0].album.artistsName.join(', '))).toBeInTheDocument();

    const mockError = new Error('API call error');
    AddedAlbumsApi.mockRejectedValueOnce(mockError);

    render(<LikedAlbumsList {...props} />);

    await act(async () => {});

    // Verify that the error message is logged to the console
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching user profile:', mockError);

    // Restore the original console.error
    consoleErrorSpy.mockRestore();
  });

});

describe('BlendList Component', () => {
    // Mock props
    const props = {
      token: 'your_token',
      userId: 'userId1-userId2',
    };
  
    it('renders without crashing', () => {
      render(<BlendList {...props} />);
  
      // Check for elements that are expected to be present
      expect(screen.getByText('Song Name')).toBeInTheDocument();
      expect(screen.getByText('Artists')).toBeInTheDocument();
      // Add more assertions for other elements as needed
    });
  
    it('fetches data on mount', async () => {
      // Mock the API response with an array of songs
      const mockApiData = [
        { name: 'Song 1', artistsName: ['Artist1', 'Artist2'], albumName: 'Album1', popularity: 80, duration_ms: 300000, albumImageURL: 'image1.jpg' },
        { name: 'Song 2', artistsName: ['Artist3'], albumName: 'Album2', popularity: 90, duration_ms: 240000, albumImageURL: 'image2.jpg' },
        // Add more mock data as needed
      ];
  
      GetPlaylistGivenGroup.mockResolvedValueOnce([{ songList: mockApiData, userSong: { groupSongNames: ['Song 1', 'Song 2'] } }]);
  
      // Spy on console.error
      const consoleErrorSpy = jest.spyOn(console, 'error');
  
      // Render the component
      render(<BlendList {...props} />);
  
      // Wait for the useEffect to complete (use act to ensure useEffect is finished)
      await act(async () => {});
  
      expect(GetPlaylistGivenGroup).toHaveBeenCalledWith(props.token, undefined);
  
      expect(screen.getByText(mockApiData[0].name)).toBeInTheDocument();
      expect(screen.getByText(mockApiData[0].artistsName.join(', '))).toBeInTheDocument();
  
      const mockError = new Error('API call error');
      GetPlaylistGivenGroup.mockRejectedValueOnce(mockError);
  
      render(<BlendList {...props} />);
  
      await act(async () => {});
  
      // Verify that the error message is logged to the console
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching user profile:', mockError);
  
      // Restore the original console.error
      consoleErrorSpy.mockRestore();
    });
      
  
    it('handles analysis button click', () => {
      render(<BlendList {...props} />);
  
      // Simulate a click event on the analysis button
      fireEvent.click(screen.getByText('Blend Analysis'));
  
      // Check if the expected behavior occurred
      // Use screen queries or assertions
      expect(/* some assertion */).toBe(/* expected value */);
    });
  });

  describe('SpotifyList Component', () => {
    // Mock props
    const props = {
      token: 'your_token',
      userId: 'your_userId',
    };
  
    it('renders without crashing', () => {
      render(<SpotifyList {...props} />);
  
      // Check for elements that are expected to be present
      expect(screen.getByText('Song Name')).toBeInTheDocument();
      expect(screen.getByText('Artists')).toBeInTheDocument();
      // Add more assertions for other elements as needed
    });
  
    it('fetches data on mount', async () => {
      // Mock the API response with an array of songs
      const mockApiData = [
        { name: 'Song 1', artistsName: ['Artist1', 'Artist2'], albumName: 'Album1', popularity: 80, duration_ms: 300000, albumImageURL: 'image1.jpg' },
        { name: 'Song 2', artistsName: ['Artist3'], albumName: 'Album2', popularity: 90, duration_ms: 240000, albumImageURL: 'image2.jpg' },
        // Add more mock data as needed
      ];
  
      SpotifyGetToptracks.mockResolvedValueOnce(mockApiData);
  
      // Spy on console.error
      const consoleErrorSpy = jest.spyOn(console, 'error');
  
      // Render the component
      render(<SpotifyList {...props} />);
  
      // Wait for the useEffect to complete (use act to ensure useEffect is finished)
      await act(async () => {});
  
      expect(SpotifyGetToptracks).toHaveBeenCalledWith(props.token, localStorage.getItem("spotifyToken"));
  
      expect(screen.getByText(mockApiData[0].name)).toBeInTheDocument();
      expect(screen.getByText(mockApiData[0].artistsName.join(', '))).toBeInTheDocument();
  
      const mockError = new Error('API call error');
      SpotifyGetToptracks.mockRejectedValueOnce(mockError);
  
      render(<SpotifyList {...props} />);
  
      await act(async () => {});
  
      // Verify that the error message is logged to the console
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching user profile:', mockError);
  
      // Restore the original console.error
      consoleErrorSpy.mockRestore();
    });
  
});

describe('SpotifyRecomPage Component', () => {
    // Mock props
    const props = {
      token: 'your_token',
      userId: 'your_userId',
    };
  
    it('renders without crashing', () => {
      render(<SpotifyRecomPage {...props} />);
  
      // Check for elements that are expected to be present
      expect(screen.getByText('Song Name')).toBeInTheDocument();
      expect(screen.getByText('Artists')).toBeInTheDocument();
      // Add more assertions for other elements as needed
    });
  
    it('fetches data on mount', async () => {
      // Mock the API response with an array of songs
      const mockApiData = [
        { name: 'Song 1', artistsName: ['Artist1', 'Artist2'], albumName: 'Album1', popularity: 80, duration_ms: 300000, albumImageURL: 'image1.jpg' },
        { name: 'Song 2', artistsName: ['Artist3'], albumName: 'Album2', popularity: 90, duration_ms: 240000, albumImageURL: 'image2.jpg' },
        // Add more mock data as needed
      ];
  
      SpotifyRecom.mockResolvedValueOnce(mockApiData);
  
      // Spy on console.error
      const consoleErrorSpy = jest.spyOn(console, 'error');
  
      // Render the component
      render(<SpotifyRecomPage {...props} />);
  
      // Wait for the useEffect to complete (use act to ensure useEffect is finished)
      await act(async () => {});
  
      expect(SpotifyRecom).toHaveBeenCalledWith(props.token, localStorage.getItem("spotifyToken"));
  
      expect(screen.getByText(mockApiData[0].name)).toBeInTheDocument();
      expect(screen.getByText(mockApiData[0].artistsName.join(', '))).toBeInTheDocument();
  
      const mockError = new Error('API call error');
      SpotifyRecom.mockRejectedValueOnce(mockError);
  
      render(<SpotifyRecomPage {...props} />);
  
      await act(async () => {});
  
      // Verify that the error message is logged to the console
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching user profile:', mockError);
  
      // Restore the original console.error
      consoleErrorSpy.mockRestore();
    });

});