import SpotifyGetToptracks from "../API/SpotifyGetToptracks";
import SpotifyLogin from "../API/SpotifyLogin";
import fetchMock from 'jest-fetch-mock';
import SpotifyRecom from "../API/SpotifyRecom";
import GetSpotifyToken from "../API/GetSpotifyToken";

describe('SpotifyGetToptracks function', () => {
  it('fetches data successfully and returns parsed response', async () => {
    const mockToken = 'your_mock_token';
    const mockAcsToken = 'your_mock_acs_token';
    const mockResponse = {
      ok: true,
      text: jest.fn().mockResolvedValue(JSON.stringify({ data: 'mocked data' })),
    };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(JSON.stringify(mockResponse)),
    });
  
    const result = await SpotifyGetToptracks(mockToken, mockAcsToken);

    expect(global.fetch).toHaveBeenCalledWith(`http://localhost:8080/api/spotify/get-users-top-tracks?token=${mockAcsToken}`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${mockToken}`,
        'Content-Type': 'application/json',
      },
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    });

    expect(result).toEqual({"ok":true });
  });

  it('handles network error and logs an error', async () => {
    const mockToken = 'your_mock_token';
    const mockAcsToken = 'your_mock_acs_token';
    const mockError = new Error('Network error');

    const mockFetch = jest.fn().mockRejectedValueOnce(mockError);

    
    await expect(SpotifyGetToptracks(mockToken, mockAcsToken, mockFetch)).rejects.toMatch('Network response is not ok');

  });

  it('handles non-ok response and throws an error', async () => {
    const mockToken = 'your_mock_token';
    const mockAcsToken = 'your_mock_acs_token';
    const mockResponse = {
      ok: false,
    };

    const mockFetch = jest.fn().mockResolvedValueOnce(mockResponse);

    await expect(SpotifyGetToptracks(mockToken, mockAcsToken)).rejects.toMatch('Network response is not ok');

    
  });

  it('handles error in JSON parsing and logs an error', async () => {
    const mockToken = 'your_mock_token';
    const mockAcsToken = 'your_mock_acs_token';
    const mockResponse = {
      ok: true,
      text: jest.fn().mockResolvedValue('invalid JSON data'),
    };

    const mockFetch = jest.fn().mockResolvedValueOnce(mockResponse);

    const consoleErrorSpy = jest.spyOn(console, 'error');
    await expect(SpotifyGetToptracks(mockToken, mockAcsToken)).rejects.toMatch('Network response is not ok');


   

  });

  it('handles error when parsing JSON throws an error', async () => {
    const mockToken = 'your_mock_token';
    const mockAcsToken = 'your_mock_acs_token';
    const mockResponse = {
      ok: true,
      text: jest.fn().mockResolvedValue('invalid JSON data'),
    };

    // Mock JSON.parse to throw an error
    jest.spyOn(JSON, 'parse').mockImplementationOnce(() => {
      throw new Error('JSON parsing error');
    });

    await expect(SpotifyGetToptracks(mockToken, mockAcsToken)).rejects.toMatch('Network response is not ok');

  });
});

//--------------------------

describe('SpotifyLogin function', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    console.log = jest.fn();
    console.error = jest.fn();
  });

    it('should make a GET request to the correct URL with the proper headers', async () => {
        const token = 'yourAccessToken';
        const expectedUrl = 'http://localhost:8080/api/spotify/login';
        const expectedHeaders = {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        global.fetch = jest.fn().mockResolvedValue({
          ok: true,
          text: () => Promise.resolve(JSON.stringify("mockedResponse")),
        });
      



        await SpotifyLogin(token);

        expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
            headers: expectedHeaders,
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        });
    });

    it('should return the data when the request is successful', async () => {
        const token = 'yourAccessToken';
        const mockedResponse = 'mocked response';
        global.fetch = jest.fn().mockResolvedValue({
          ok: true,
          text: () => Promise.resolve(mockedResponse),
        });

        fetchMock.mockResponseOnce(mockedResponse, { status: 200 });

        const result = await SpotifyLogin(token);

        expect(result).toBe(mockedResponse);
    });

    it('should throw an error when the request is not successful', async () => {
        const token = 'yourAccessToken';
        const errorMessage = 'Network response is not ok';

        fetchMock.mockResponseOnce('error response', { status: 404 });

        await expect(SpotifyLogin(token)).rejects.toMatch('Network response is not ok');
    });

    it('should log an error when an exception occurs during the request', async () => {
        const token = 'yourAccessToken';
        const consoleErrorSpy = jest.spyOn(console, 'error');
        const errorMessage = 'An error occurred during the fetch';

        fetchMock.mockImplementationOnce(() => {
            throw new Error(errorMessage);
        });

        await SpotifyLogin(token);

        expect(consoleErrorSpy).toHaveBeenCalledWith('error in fetching data:', expect.any(Error));
    });

    it('should log an error when an exception occurs during the request (line 25)', async () => {
        const token = 'yourAccessToken';
        const consoleErrorSpy = jest.spyOn(console, 'error');
        const errorMessage = 'Network response is not ok';

        fetchMock.mockResponseOnce('error response', { status: 404 });

        await SpotifyLogin(token);

        expect(consoleErrorSpy).toHaveBeenCalledWith('error in fetching data:', expect.any(Error));
    });
});

//--------------------------


describe('SpotifyRecom function', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    console.log = jest.fn();
    console.error = jest.fn();
  });

    it('should make a GET request to the correct URL with the proper headers and return the parsed response', async () => {
        const token = 'yourAccessToken';
        const acsToken = 'yourAcsToken';
        const expectedUrl = `http://localhost:8080/api/spotify/top-track-based-recommendations?token=${acsToken}`;
        const expectedHeaders = {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          };
          
                  const mockedResponse = {
                     data:'123'
                  };
        global.fetch = jest.fn().mockResolvedValue({
          ok: true,
          text: () => Promise.resolve(JSON.stringify(mockedResponse)),
        });
      


        const result = await SpotifyRecom(token, acsToken);

        expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
            headers: expectedHeaders,
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        });

        expect(result).toEqual(mockedResponse);
    });

    it('should throw an error when the request is not successful and log the error', async () => {
        const token = 'yourAccessToken';
        const acsToken = 'yourAcsToken';
        const errorMessage = 'Network response is not ok';


        global.fetch.mockRejectedValueOnce(new Error(errorMessage));

        const consoleErrorSpy = jest.spyOn(console, 'error');

        await expect(SpotifyRecom(token, acsToken)).rejects.toMatch('Network response is not ok');

 
    });

    it('should log an error when an exception occurs during the request', async () => {
        const token = 'yourAccessToken';
        const acsToken = 'yourAcsToken';
        const consoleErrorSpy = jest.spyOn(console, 'error');
        const errorMessage = 'An error occurred during the fetch';

        fetchMock.mockImplementationOnce(() => {
            throw new Error(errorMessage);
        });

        await SpotifyRecom(token, acsToken);

        expect(consoleErrorSpy).toHaveBeenCalledWith('error in fetching data:', expect.any(Error));
    });

    it('should log an error when JSON.parse throws an exception', async () => {
        const token = 'yourAccessToken';
        const acsToken = 'yourAcsToken';
        const consoleErrorSpy = jest.spyOn(console, 'error');
        const errorMessage = 'JSON parse error';

        const mockResponse = {
          ok: true,
          text: jest.fn(() => Promise.resolve('Invalid JSON')),
        };
    
        global.fetch.mockResolvedValueOnce(mockResponse);

        await expect(SpotifyRecom(token, acsToken)).rejects.toMatch('Network response is not ok');

    });
});

describe('Get token Spotify', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    console.log = jest.fn();
    console.error = jest.fn();
  });

    it('should successfully retrieve Spotify token with valid input', async () => {
        const mockToken = 'valid_token';
        const code = 'valid_code';
        const state = 'valid_state';
        const mockSpotifyToken = 'spotify_token';
      
        // Mock the fetch response to simulate successful token retrieval
        global.fetch = jest.fn().mockResolvedValue({
          ok: true,
          status: 200,
          text: () => Promise.resolve(mockSpotifyToken)
        });
      
        const result = await GetSpotifyToken(mockToken, code, state);
      
        expect(result).toBe(mockSpotifyToken);
        expect(fetch).toHaveBeenCalledWith(
          `http://localhost:8080/api/spotify/callback?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}`,
          expect.objectContaining({
            method: 'POST',
            headers: expect.objectContaining({
              Authorization: 'Bearer valid_token',
              'Content-Type': 'application/json'
            })
          })
        );
      });

      it('should throw an error if server response is not ok', async () => {
        // Mock the fetch response with a non-200 status code
        global.fetch = jest.fn().mockResolvedValue({
          ok: false,
          status: 500,
          text: () => Promise.resolve('Internal server error')
        });
      
        await expect(GetSpotifyToken('token', 'code', 'state')).rejects.toMatch('Network response is not ok');
      });

      it('should handle network errors during fetch', async () => {
        // Mock the fetch function to throw a network error
        global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));
      
        await expect(GetSpotifyToken('token', 'code', 'state')).rejects.toMatch('Network response is not ok');
      });

      it('should throw an error if token is missing', async () => {
        await expect(GetSpotifyToken('', 'code', 'state')).rejects.toMatch('Network response is not ok');
      });
      
      it('should throw an error if code is missing', async () => {
        await expect(GetSpotifyToken('token', '', 'state')).rejects.toMatch('Network response is not ok');
      });
      
      it('should throw an error if state is missing', async () => {
        await expect(GetSpotifyToken('token', 'code', '')).rejects.toMatch('Network response is not ok');
      });

      it('should throw an error if response status code is 400', async () => {
        global.fetch = jest.fn().mockResolvedValue({
          ok: false,
          status: 400,
          text: () => Promise.resolve('Bad request')
        });
      
        await expect(GetSpotifyToken('token', 'code', 'state')).rejects.toMatch('Network response is not ok');
      });
      

});