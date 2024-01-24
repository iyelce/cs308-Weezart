import { render, screen, fireEvent, act , waitFor } from "@testing-library/react";
import ConnectSpotify from "../Pages/Spotify/ConnectSpotify";
import { Router } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { MemoryRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
  }));

  console.log(require('react-router-dom').useNavigate);

describe("ConnectSpotify Component", () => {

  // Test rendering of the component
  test("renders ConnectSpotify component", () => {
    render(   
        <MemoryRouter>   
                <ConnectSpotify />
        </MemoryRouter> );
    //expect(screen.getByText(/Connect your Spotify/i)).toBeInTheDocument();
  });


  test("useEffect sets initial state with no spotifyToken", () => {
    const localStorageMock = jest.spyOn(window.localStorage.__proto__, "getItem");
    localStorageMock.mockReturnValue(null);
  
    render(<ConnectSpotify />);
    expect(localStorageMock).toHaveBeenCalledWith("spotifyToken");
    expect(screen.getByText(/Connect Spotify/i)).toBeInTheDocument();
  
    localStorageMock.mockRestore();
  });

  test("useEffect sets initial state with defined spotifyToken", () => {
    const localStorageMock = jest.spyOn(window.localStorage.__proto__, "getItem");
    localStorageMock.mockReturnValue("fakeToken");
  
    render(<ConnectSpotify />);
    expect(localStorageMock).toHaveBeenCalledWith("spotifyToken");
  
    localStorageMock.mockRestore();
  });

 
  // Test connectSpotifyClicked functionality
  test("connectSpotifyClicked function", async () => {
    // Mock SpotifyLogin function
    const mockSpotifyLogin = jest.fn();
    jest.mock("../API/SpotifyLogin", () => ({ __esModule: true, default: mockSpotifyLogin }));

    render(<ConnectSpotify />);
    const connectButton = screen.getByText(/Connect Spotify/i);

    // Simulate a click on the Connect Spotify button
    fireEvent.click(connectButton);

    // Simulate a successful response from SpotifyLogin
    const mockResponse = "https://example.com/auth";
    mockSpotifyLogin.mockResolvedValueOnce(mockResponse);

    // Wait for the asynchronous actions to complete
    await act(async () => {
      // Continue with the rest of the test logic here
      jest.advanceTimersByTime(1100);
    });
  });



  // Custom matcher to check multiple conditions
expect.extend({
    toHaveBeenCalledWithPaths(mockFunction, paths) {
      const pass = paths.every((path) =>
        mockFunction.mock.calls.some((call) => call[0] === path)
      );
      if (pass) {
        return {
          message: () =>
            `expected ${mockFunction} not to have been called with paths ${paths.join(', ')}`,
          pass: true,
        };
      } else {
        return {
          message: () =>
            `expected ${mockFunction} to have been called with paths ${paths.join(', ')}`,
          pass: false,
        };
      }
    },
  });
  
  test("getSongs and getRecom functions", async () => {
    // Mock the useNavigate hook
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
  
    // Render the component
    render(<ConnectSpotify />);
    const songsButton = screen.getByText(/Spotify Top Tracks/i);
    const recomButton = screen.getByText(/Spotify Recommendations/i);
  
    // Simulate clicks on the Spotify Top Tracks and Spotify Recommendations buttons
    fireEvent.click(songsButton);
    fireEvent.click(recomButton);
  
    // Wait for asynchronous operations to complete
    await waitFor(() => {
      // Check if navigate function is called with the correct paths
      expect(mockNavigate).toHaveBeenCalledWithPaths([
        "/spotify-top-tracks",
        "/spotify-recom-tracks",
      ]);
    });
  });
  
  // Custom matcher to check multiple conditions
expect.extend({
    toHaveBeenCalledWithPaths(mockFunction, paths) {
      const pass = paths.every((path) =>
        mockFunction.mock.calls.some((call) => call[0] === path)
      );
      if (pass) {
        return {
          message: () =>
            `expected ${mockFunction} not to have been called with paths ${paths.join(', ')}`,
          pass: true,
        };
      } else {
        return {
          message: () =>
            `expected ${mockFunction} to have been called with paths ${paths.join(', ')}`,
          pass: false,
        };
      }
    },
  });
  
  test("getRecom function navigates to /spotify-recom-tracks", async () => {
    // Mock the useNavigate hook
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
  
    // Render the component
    render(<ConnectSpotify />);
  
    // Trigger the function that uses navigate
    fireEvent.click(screen.getByText(/Spotify Recommendations/i));
  
    // Wait for asynchronous operations to complete
    await waitFor(() => {
      // Check if navigate is called with the correct path
      expect(mockNavigate).toHaveBeenCalledWith("/spotify-recom-tracks");
    });
  });



    
    
      // Test error handling in connectSpotifyClicked
      test("connectSpotifyClicked function with error", async () => {
        const mockSpotifyLogin = jest.fn();
        jest.mock("../API/SpotifyLogin", () => ({ __esModule: true, default: mockSpotifyLogin }));
    
        render(<ConnectSpotify />);
        const connectButton = screen.queryByText(/Connect Spotify/i);
    
        fireEvent.click(connectButton);
    
        // Simulate an error response from SpotifyLogin
        mockSpotifyLogin.mockRejectedValueOnce(new Error("Fake error"));
    
        await act(async () => {
          // Continue with the rest of the test logic here
          jest.advanceTimersByTime(1100);
        });
    
        // Ensure the component handles the error state correctly
        expect(screen.getByText(/Connect Spotify/i)).toBeInTheDocument();
      });
    
      // Test interval logic in connectSpotifyClicked
      test("interval logic in connectSpotifyClicked", async () => {
        const mockSpotifyLogin = jest.fn();
        jest.mock("../API/SpotifyLogin", () => ({ __esModule: true, default: mockSpotifyLogin }));
    
        render(<ConnectSpotify />);
        const connectButton = screen.getByText(/Connect Spotify/i);
    
        fireEvent.click(connectButton);
    
        // Simulate a successful response from SpotifyLogin
        const mockResponse = "https://example.com/auth";
        mockSpotifyLogin.mockResolvedValueOnce(mockResponse);
    
        // Wait for the asynchronous actions to complete
        await act(async () => {
          // Continue with the rest of the test logic here
          jest.advanceTimersByTime(1100);
        });
    
        // Ensure the interval logic is covered
        // ... add assertions for the interval logic
      });

});
