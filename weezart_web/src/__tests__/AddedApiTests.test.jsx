import AddedAlbumsApi from "../API/AddedAlbumsApi";
import AddedArtistsApi from "../API/AddedArtistsApi";
import AddedCheckApi from "../API/AddedCheckApi";
import AddedSongsApi from "../API/AddedSongsApi";

describe('AddedAlbumsApi', () => {
    const mockToken = 'your_mock_token';
    const mockUserId = 'mockUserId';
  
    beforeEach(() => {
      global.fetch = jest.fn();
    });
  
    afterEach(() => {
      global.fetch.mockClear();
      delete global.fetch;
    });
  
    test('should make a GET request with the correct parameters', async () => {
      const expectedUrl = `http://localhost:8080/user/added-albums/${mockUserId}`;
      const expectedHeaders = {
        accept: 'application/json',
        'Authorization': 'Bearer ' + mockToken,
        'Content-Type': 'application/json'
      };
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify({ /* mock response data */ })),
      });
    
      await AddedAlbumsApi(mockToken, mockUserId);
  
      expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
        method: 'GET',
        headers: expectedHeaders,
        mode: 'cors',
        credentials: 'include',
      });
    });
  
    test('should return the parsed response data for a successful request', async () => {
      const mockResponseData = [{ albumId: 1, albumName: 'Album 1' }];
      const mockResponse = {
        ok: true,
        text: jest.fn(() => Promise.resolve(JSON.stringify(mockResponseData))),
      };
  
      global.fetch.mockResolvedValueOnce(mockResponse);
  
      const result = await AddedAlbumsApi(mockToken, mockUserId);
  
      expect(result).toEqual(mockResponseData);
    });
    test('should return exception when response is not ok ', async () => {
      const mockResponse = {
        ok: false,
        status: 403,
        text: jest.fn(() => Promise.resolve('Song not found')),
      };
  
      global.fetch.mockResolvedValueOnce(mockResponse);
  
      await expect(AddedAlbumsApi('token','a')).rejects.toMatch('Network response is not ok');
      
    });
  
    test('should handle an empty response body for a successful request', async () => {
      const mockResponse = {
        ok: true,
        text: jest.fn(() => Promise.resolve('')),
      };
  
      global.fetch = jest.fn().mockRejectedValueOnce(mockResponse);
  
  
      await expect(AddedAlbumsApi(mockToken, mockUserId)).rejects.toMatch('Network response is not ok');
    });
  
    test('should throw an error when the network response is not ok', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        text: jest.fn(() => Promise.resolve('Internal Server Error')),
      };
  
      global.fetch.mockRejectedValueOnce(mockResponse);
  
      await expect(AddedAlbumsApi(mockToken, mockUserId)).rejects.toMatch('Network response is not ok');
    });
  
    test('should log an error when an exception occurs during the API call', async () => {
      const errorMessage = 'Test error';
      global.fetch.mockRejectedValueOnce(new Error(errorMessage));
  
      console.error = jest.fn(); // Mock console.error
  
      await expect(AddedAlbumsApi(mockToken, mockUserId)).rejects.toMatch('Network response is not ok');

    });
  
    test('should log an error when the response is not valid JSON', async () => {
      const mockResponse = {
        ok: true,
        text: jest.fn(() => Promise.resolve('Invalid JSON')),
      };
  
      global.fetch.mockResolvedValueOnce(mockResponse);
  
      await expect(AddedAlbumsApi(mockToken, mockUserId)).rejects.toMatch('Network response is not ok');

    });
  });




  //----------------------------------------------------------

describe('AddedArtistsApi', () => {
    const mockToken = 'your_mock_token';
    const mockUserId = 'mockUserId';
  
    beforeEach(() => {
      global.fetch = jest.fn();
    });
  
    afterEach(() => {
      global.fetch.mockClear();
      delete global.fetch;
    });
  
    test('should make a GET request with the correct parameters', async () => {
      const expectedUrl = `http://localhost:8080/user/added-artists/${mockUserId}`;
      const expectedHeaders = {
        accept: 'application/json',
        'Authorization': 'Bearer ' + mockToken,
        'Content-Type': 'application/json'
      };
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify({ /* mock response data */ })),
      });
   
    
  
      await AddedArtistsApi(mockToken, mockUserId);
  
      expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
        method: 'GET',
        headers: expectedHeaders,
        mode: 'cors',
        credentials: 'include',
      });
    });
  
    test('should return the parsed response data for a successful request', async () => {
      const mockResponseData = [{ artistId: 1, artistName: 'Artist 1' }];
      const mockResponse = {
        ok: true,
        text: jest.fn(() => Promise.resolve(JSON.stringify(mockResponseData))),
      };
  
      global.fetch.mockResolvedValueOnce(mockResponse);
  
      const result = await AddedArtistsApi(mockToken, mockUserId);
  
      expect(result).toEqual(mockResponseData);
    });
    test('should return exception when response is not ok ', async () => {
      const mockResponse = {
        ok: false,
        status: 403,
        text: jest.fn(() => Promise.resolve('Song not found')),
      };
  
      global.fetch.mockResolvedValueOnce(mockResponse);
  
      await expect(AddedArtistsApi('token','a')).rejects.toMatch('Network response is not ok');
      
    });
  
    test('should handle an empty response body for a successful request', async () => {
      const mockResponse = {
        ok: true,
        text: jest.fn(() => Promise.resolve('')),
      };
  
      global.fetch.mockRejectedValueOnce(mockResponse);
      await expect(AddedArtistsApi(mockToken, mockUserId)).rejects.toMatch('Network response is not ok');

  
    
    });
  
    test('should throw an error when the network response is not ok', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        text: jest.fn(() => Promise.resolve('Internal Server Error')),
      };
  
      global.fetch.mockRejectedValueOnce(mockResponse);
  
      await expect(AddedArtistsApi(mockToken, mockUserId)).rejects.toMatch('Network response is not ok');
    });
  
    test('should log an error when an exception occurs during the API call', async () => {
      const errorMessage = 'Test error';
      global.fetch.mockRejectedValueOnce(new Error(errorMessage));
  
      console.error = jest.fn(); // Mock console.error
  
      await expect(AddedArtistsApi(mockToken, mockUserId)).rejects.toMatch('Network response is not ok');

    });
  
    test('should log an error when the response is not valid JSON', async () => {
      const mockResponse = {
        ok: true,
        text: jest.fn(() => Promise.resolve('Invalid JSON')),
      };
  
      global.fetch.mockResolvedValueOnce(mockResponse);
  
      console.error = jest.fn(); // Mock console.error
  
      await expect(AddedArtistsApi(mockToken, mockUserId)).rejects.toMatch('Network response is not ok');

    });
  
    test('should handle an unexpected response status', async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        text: jest.fn(() => Promise.resolve('Not Found')),
      };
  
      global.fetch.mockRejectedValueOnce(mockResponse);
  
      await expect(AddedArtistsApi(mockToken, mockUserId)).rejects.toMatch('Network response is not ok');
    });
  
    test('should log an error when the response parsing fails', async () => {
      const mockResponse = {
        ok: true,
        text: jest.fn(() => Promise.resolve('Invalid JSON')),
      };
  
      global.fetch.mockResolvedValueOnce(mockResponse);
  
      console.error = jest.fn(); // Mock console.error
  
      await expect(AddedArtistsApi(mockToken, mockUserId)).rejects.toMatch('Network response is not ok');

    });
  });

  //-------------------------------------------

describe('AddedCheckApi', () => {
  const mockToken = 'your_mock_token';
  const mockUserId = 'mockUserId';
  const mockSongId = 'mockSongId';

  beforeEach(() => {
    global.fetch = jest.fn();
    console.log = jest.fn();
    console.error = jest.fn();
  });

  afterEach(() => {
    global.fetch.mockClear();
    delete global.fetch;
    console.log.mockClear();
    console.error.mockClear();
  });

  test('should make a GET request with the correct parameters', async () => {
    const expectedUrl = `http://localhost:8080/add/get-added-info/${mockSongId}/${mockUserId}`;
    const expectedHeaders = {
      accept: 'application/json',
      'Authorization': 'Bearer ' + mockToken,
      'Content-Type': 'application/json'
    };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(JSON.stringify({ /* mock response data */ })),
    });
  
    await AddedCheckApi(mockToken, mockUserId, mockSongId);

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
      method: 'GET',
      headers: expectedHeaders,
      mode: 'cors',
      credentials: 'include',
    });
  });
  test('should return exception when response is not ok ', async () => {
    const mockResponse = {
      ok: false,
      status: 403,
      text: jest.fn(() => Promise.resolve('Song not found')),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await expect(AddedCheckApi('token','a')).rejects.toMatch('Network response is not ok');
    
  });

  test('should log songId and userId to the console', async () => {
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve('Added')),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await AddedCheckApi(mockToken, mockUserId, mockSongId);

    expect(console.log).toHaveBeenCalledWith('api içinde songId: ', mockSongId);
    expect(console.log).toHaveBeenCalledWith('api içinde user ID: ', mockUserId);
  });

  test('should log the response data to the console for a successful request', async () => {
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve('Added')),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await AddedCheckApi(mockToken, mockUserId, mockSongId);

    expect(console.log).toHaveBeenCalledWith('is added api içinde return: ', 'Added');
  });

  test('should throw an error when the network response is not ok', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      text: jest.fn(() => Promise.resolve('Internal Server Error')),
    };

    global.fetch.mockRejectedValueOnce(mockResponse);

    await expect(AddedCheckApi(mockToken, mockUserId, mockSongId)).rejects.toMatch('Network response is not ok');
  });

  test('should log an error when an exception occurs during the API call', async () => {
    const errorMessage = 'Test error';
    global.fetch.mockRejectedValueOnce(new Error(errorMessage));

    await expect(AddedCheckApi(mockToken, mockUserId, mockSongId)).rejects.toMatch('Network response is not ok');

  });

  test('should log an error when parsing response data fails', async () => {
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve('Invalid JSON')),
    };

    global.fetch.mockRejectedValueOnce(mockResponse);

    await expect(AddedCheckApi(mockToken, mockUserId, mockSongId)).rejects.toMatch('Network response is not ok');


  });

  test('should handle an empty response body for a successful request', async () => {
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve('')),
    };

    global.fetch.mockRejectedValueOnce(mockResponse);
    await expect(AddedCheckApi(mockToken, mockUserId, mockSongId)).rejects.toMatch('Network response is not ok');

  });

  test('should log an error when songId is not provided', async () => {


    await expect(AddedCheckApi(mockToken, mockUserId, undefined)).rejects.toMatch('Network response is not ok');
  });

  test('should log an error when userId is not provided', async () => {

    await expect(AddedCheckApi(mockToken, undefined, mockSongId)).rejects.toMatch('Network response is not ok');

  });

  test('should log an error when network response is not ok', async () => {
    const mockResponse = {
      ok: false,
      status: 404,
      text: jest.fn(() => Promise.resolve('Not Found')),
    };
  
    global.fetch.mockRejectedValueOnce(mockResponse);
  
    await expect(AddedCheckApi(mockToken, mockUserId, mockSongId)).rejects.toMatch('Network response is not ok');
  });
  
  test('should log an error when parsing response data fails2', async () => {
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve('Invalid JSON')),
    };
  
    global.fetch.mockRejectedValueOnce(mockResponse);
  
    await expect(AddedCheckApi(mockToken, mockUserId, mockSongId)).rejects.toMatch('Network response is not ok');
  });

});


//---------------------------------



describe('AddedSongsApi', () => {
    const mockToken = 'your_mock_token';
    const mockUserId = 'mockUserId';
  
    beforeEach(() => {
      global.fetch = jest.fn();
      console.log = jest.fn();
      console.error = jest.fn();
    });
  
    afterEach(() => {
      global.fetch.mockClear();
      delete global.fetch;
      console.log.mockClear();
      console.error.mockClear();
    });
  
    test('should make a GET request with the correct parameters', async () => {
      const expectedUrl = `http://localhost:8080/user/added-songs/${mockUserId}`;
      const expectedHeaders = {
        accept: 'application/json',
        'Authorization': 'Bearer ' + mockToken,
        'Content-Type': 'application/json'
      };
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify({ /* mock response data */ })),
      });
      await AddedSongsApi(mockToken, mockUserId);
  
      expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
        method: 'GET',
        headers: expectedHeaders,
        mode: 'cors',
        credentials: 'include',
      });
    });
    test('should return exception when response is not ok ', async () => {
      const mockResponse = {
        ok: false,
        status: 403,
        text: jest.fn(() => Promise.resolve('Song not found')),
      };
  
      global.fetch.mockResolvedValueOnce(mockResponse);
  
      await expect(AddedSongsApi('token','a')).rejects.toMatch('Network response is not ok');
      
    });

    test('should return exception when response is not ok ', async () => {
      const mockResponse = {
        ok: false,
        status: 403,
        text: jest.fn(() => Promise.resolve('Song not found')),
      };
  
      global.fetch.mockRejectedValueOnce(mockResponse);
  
      await expect(AddedSongsApi('token','a')).rejects.toMatch('Network response is not ok');
      
    });
  
    test('should log the response data to the console for a successful request', async () => {
      const mockResponseData = [{ songId: 1, songName: 'Song 1' }];
      const mockResponse = {
        ok: true,
        text: jest.fn(() => Promise.resolve(JSON.stringify(mockResponseData))),
      };
  
      global.fetch.mockResolvedValueOnce(mockResponse);
  
      await AddedSongsApi(mockToken, mockUserId);
  
      expect(console.log).toHaveBeenCalledWith('song orj response: ', mockResponseData);
    });
  
    test('should throw an error when the network response is not ok', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        text: jest.fn(() => Promise.resolve('Internal Server Error')),
      };
  
      global.fetch = jest.fn().mockRejectedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockResponse)),
      });
      
      await expect(AddedSongsApi(mockToken, mockUserId)).rejects.toMatch('Network response is not ok');

      
    });
  
    test('should log an error when an exception occurs during the API call', async () => {
      const errorMessage = 'Test error';
      global.fetch.mockRejectedValueOnce(new Error(errorMessage));
  
      await expect(AddedSongsApi(mockToken, mockUserId)).rejects.toMatch('Network response is not ok');

    });
  
    test('should log an error when the response is not valid JSON', async () => {
      const mockResponse = {
        ok: true,
        text: jest.fn(() => Promise.resolve('Invalid JSON')),
      };
  
      global.fetch.mockResolvedValueOnce(mockResponse);
  
      await expect(AddedSongsApi(mockToken, mockUserId)).rejects.toMatch('Network response is not ok');

    });
  
    test('should log an empty array to the console for an empty response body', async () => {
      const mockResponse = {
        ok: true,
        text: jest.fn(() => Promise.resolve('')),
      };
  
      global.fetch.mockRejectedValueOnce(mockResponse);
  
      await expect(AddedSongsApi(mockToken, mockUserId)).rejects.toMatch('Network response is not ok');

    });
  });