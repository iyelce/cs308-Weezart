import React from 'react';
import { render, screen, fireEvent, waitFor ,act } from '@testing-library/react';
import LikedSongsList from '../Pages/Lists/LikedSongsList';
import AddedSongsApi from '../API/AddedSongsApi';

// Mock the modules that are imported in the component
jest.mock('react-icons/lu', () => ({ LuClock3: 'LuClock3' }));
jest.mock('react-icons/fa', () => ({ FaMusic: 'FaMusic' }));

// Mock the API module
jest.mock('../API/AddedSongsApi', () => ({
  __esModule: true,
  default: jest.fn(),
}));

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

    // Assertions
    expect(AddedSongsApi).toHaveBeenCalledWith(props.token, props.userId);

    // Assuming AddedSongsApi returns an array of songs
    expect(screen.getByText(mockApiData[0].song.name)).toBeInTheDocument();
    expect(screen.getByText(mockApiData[0].song.artistsName.join(', '))).toBeInTheDocument();

    // Assuming the state variables are updated correctly
    // Check the state variables as needed

    // Mock an error in the API call
    const mockError = new Error('API call error');
    AddedSongsApi.mockRejectedValueOnce(mockError);

    // Rerender the component to trigger the useEffect again
    render(<LikedSongsList {...props} />);

    // Wait for the useEffect to complete
    await act(async () => {});

    // Verify that the error message is logged to the console
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching user profile:', mockError);

    // Restore the original console.error
    consoleErrorSpy.mockRestore();
  });


  it('opens popup and maps the information when song button is clicked', async () => {
    render(<LikedSongsList {...props} />);
    
    // Mock initial state
    expect(screen.queryByTestId('popup-content')).not.toBeInTheDocument();

    // Simulate a click event on the first row to trigger handleSongButtonClick
    fireEvent.click(screen.getByRole('row', { name: /Song Name Artists Album Popularity/ }));

    // Wait for the component to update asynchronously
    await waitFor(async () => {
      // Additional wait for the asynchronous operation to complete
      // Check for the presence of the popup content
      expect(screen.queryByTestId('popup-content')).toBeInTheDocument();
    });

    // Add more assertions or checks as needed
  });
 
});
