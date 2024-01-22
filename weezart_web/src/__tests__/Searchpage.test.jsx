import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Search from '../Pages/Search/Search';
import { fireEvent } from '@testing-library/react';
import SearchSongApi from '../API/SearchSongApi';
import SearchAlbumApi from '../API/SearchAlbumApi';
import SearchArtistApi from '../API/SearchArtistApi';


jest.mock('../API/SearchSongApi', () => ({
    __esModule: true,
    default: jest.fn(),
  }));
  
  jest.mock('../API/SearchAlbumApi', () => ({
    __esModule: true,
    default: jest.fn(),
  }));
  
  jest.mock('../API/SearchArtistApi', () => ({
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



describe('Search Component', () => {

  it('renders without crashing', () => {
    // Mock props
    const mockProps = {
      token: 'your-mock-token',
      userId: 'your-mock-userId',
    };

    // Render the component with mock props
    render(<Search {...mockProps} />);

    // Check for elements that are expected to be present
    expect(screen.getByPlaceholderText('search')).toBeInTheDocument();
    expect(screen.getByText('Songs')).toBeInTheDocument();
    expect(screen.getByText('Albums')).toBeInTheDocument();
    expect(screen.getByText('Artists')).toBeInTheDocument();
  });

  it('updates search bar value correctly', () => {
    render(<Search token="your-token" userId="your-user-id" />);
    
    const searchInput = screen.getByPlaceholderText('search');

    fireEvent.change(searchInput, { target: { value: 'test' } });

    expect(searchInput.value).toBe('test');
  });


//   it('triggers search functionality on "Enter"', async () => {
//     // Render the component
//     render(<Search token="your-token" userId="your-user-id" />);
  
//     // Clear mock calls before triggering the search
//     SearchSongApi.default.mockClear();
//     SearchAlbumApi.default.mockClear();
//     SearchArtistApi.default.mockClear();
  
//     SearchSongApi.default.mockResolvedValue([]);
//     SearchAlbumApi.default.mockResolvedValue([]);
//     SearchArtistApi.default.mockResolvedValue([]);
  
//     // Type into the search input
//     const searchInput = screen.getByPlaceholderText('search');
//     fireEvent.change(searchInput, { target: { value: 'test' } });
  
//     // Press "Enter" key
//     fireEvent.keyPress(searchInput, { key: 'Enter', code: 13 });
  
//     // Wait for API calls to resolve
//     await screen.findByText('rendering search items');
  
//     // Assert that the API functions are called with the correct arguments
//     expect(SearchSongApi.default).toHaveBeenCalledWith('your-token', 'test');
//     expect(SearchAlbumApi.default).toHaveBeenCalledWith('your-token', 'test');
//     expect(SearchArtistApi.default).toHaveBeenCalledWith('your-token', 'test');
//   });
  

});
