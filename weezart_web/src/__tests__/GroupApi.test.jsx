import DeleteBlend from "../API/DeleteBlend";
import GetAllGroupPlaylists from "../API/GetAllGroupPlaylists";
import GetPlaylistGivenGroup from "../API/GetPlaylistGivenGroup ";
import GroupAnalysisApi from "../API/GroupAnalysisApi";
import CreateGroupPlaylist from "../API/CreateGroupPlaylist";
import ConvertNameToId from "../API/ConvertNameToId";

describe('DeleteBlend', () => {
  beforeEach(() => {
    global.fetch = jest.fn(); // Mock fetch for each test
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  it('should delete the playlist for a given user and group', async () => {
    // Arrange
    const token = 'mockToken';
    const userIds = 'user123';
    const deletedId = 'playlist456';

    // Mock fetch for a successful response
    global.fetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve('Deleted successfully'),
    });

    // Act
    const result = await DeleteBlend(token, userIds, deletedId);

    // Assert
    expect(global.fetch).toHaveBeenCalledWith(
      `http://localhost:8080/group/delete-playlist/${userIds}/${deletedId}`,
      {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer mockToken',
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
        mode: 'cors',
        credentials: 'include',
      }
    );

    expect(result).toBe('Deleted successfully');
  });

  it('should handle errors when response is not ok', async () => {
    // Arrange
    const token = 'mockToken';
    const userIds = 'user123';
    const deletedId = 'playlist456';

    // Mock fetch for a failure response
    global.fetch.mockResolvedValueOnce({
      ok: false,
      text: () => Promise.resolve('Error message'),
    });

    // Act & Assert
    await expect(DeleteBlend(token, userIds, deletedId)).rejects.toMatch(
      'Network response is not ok'
    );
  });

  it('should handle errors and log them', async () => {
    // Arrange
    const token = 'mockToken';
    const userIds = 'user123';
    const deletedId = 'playlist456';

    // Mock fetch for a network error
    global.fetch.mockRejectedValueOnce(new Error('Network error'));


    // Assert
    await expect(DeleteBlend(token, userIds, deletedId)).rejects.toMatch(
      'Network response is not ok'
    );
  });
});

//----------------------------------------

describe('GetAllGroupPlaylists', () => {
  beforeEach(() => {
    global.fetch = jest.fn(); // Mock fetch for each test
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  it('should get all playlists for a user', async () => {
    // Arrange
    const token = 'mockToken';
    const userId = 'user123';

    // Mock fetch for a successful response
    const mockResponse = [
      { id: 1, name: 'Playlist 1' },
      { id: 2, name: 'Playlist 2' },
    ];
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse), // Resolve with your mock response
    });
    // Act
    const result = await GetAllGroupPlaylists(token, userId);

    // Assert
    expect(global.fetch).toHaveBeenCalledWith(
      `http://localhost:8080/group/get-all-playlists/${userId}`,
      {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer mockToken',
          'Content-Type': 'application/json',
        },
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      }
    );

    expect(result).toEqual(mockResponse);
  });

  it('should handle errors when response is not ok', async () => {
    // Arrange
    const token = 'mockToken';
    const userId = 'user123';

    // Mock fetch for a failure response
    global.fetch.mockResolvedValueOnce({
      ok: false,
      text: () => Promise.resolve('Error message'),
    });

    // Act & Assert
    await expect(GetAllGroupPlaylists(token, userId)).rejects.toThrow(
      'Network response is not ok'
    );
  });

  it('should handle errors and log them', async () => {
    // Arrange
    const token = 'mockToken';
    const userId = 'user123';

    // Mock fetch for a network error
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    // Act
    const result = await GetAllGroupPlaylists(token, userId);

    // Assert
    expect(global.fetch).toHaveBeenCalled();
    expect(result).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith(
      'error in fetching data:',
      new Error('Network error')
    );
  });

  it('should handle errors and log them when response parsing fails', async () => {
    // Arrange
    const token = 'mockToken';
    const userId = 'user123';

    // Mock fetch for a successful response with invalid JSON
    global.fetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve('Invalid JSON'),
    });

    // Act
    await GetAllGroupPlaylists(token, userId);

    // Assert
    expect(global.fetch).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(
      'error parsing response JSON:',
      expect.any(SyntaxError)
    );
  });

  it('should handle errors and log them when response parsing fails with empty response', async () => {
    // Arrange
    const token = 'mockToken';
    const userId = 'user123';

    // Mock fetch for a successful response with empty JSON
    global.fetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(''),
    });

    // Act
    await GetAllGroupPlaylists(token, userId);

    // Assert
    expect(global.fetch).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(
      'error parsing response JSON:',
      expect.any(SyntaxError)
    );
  });
});

//----------------------------------------

describe('GetPlaylistGivenGroup', () => {
  beforeEach(() => {
    global.fetch = jest.fn(); // Mock fetch for each test
    global.console.error = jest.fn(); // Spy on console.error
  });

  afterEach(() => {
    global.fetch.mockClear();
    global.console.error.mockClear();
  });

  it('should get playlist for a given group', async () => {
    // Arrange
    const token = 'mockToken';
    const groupId = 'group123';

    // Mock fetch for a successful response
    const mockResponse = [
      { id: 1, name: 'Song 1' },
      { id: 2, name: 'Song 2' },
    ];
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    // Act
    const result = await GetPlaylistGivenGroup(token, groupId);

    // Assert
    expect(global.fetch).toHaveBeenCalledWith(
      `http://localhost:8080/group/get-all-playlists/${groupId}`,
      {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer mockToken',
          'Content-Type': 'application/json',
        },
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      }
    );

    expect(result).toEqual(mockResponse);
  });

  it('should handle errors when response is not ok', async () => {
    // Arrange
    const token = 'mockToken';
    const groupId = 'group123';

    // Mock fetch for a failure response
    global.fetch.mockResolvedValueOnce({
      ok: false,
      text: () => Promise.resolve('Error message'),
    });

    // Act & Assert
    await expect(GetPlaylistGivenGroup(token, groupId)).rejects.toThrow(
      'Network response is not ok'
    );
  });

  it('should handle errors and log them', async () => {
    // Arrange
    const token = 'mockToken';
    const groupId = 'group123';

    // Mock fetch for a network error
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    // Act
    await GetPlaylistGivenGroup(token, groupId);

    // Assert
    expect(global.fetch).toHaveBeenCalled();
    expect(global.console.error).toHaveBeenCalledWith(
      'error in fetching data:',
      new Error('Network error')
    );
  });

  it('should handle errors and log them when response parsing fails', async () => {
    // Arrange
    const token = 'mockToken';
    const groupId = 'group123';

    // Mock fetch for a successful response with invalid JSON
    global.fetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve('Invalid JSON'),
    });

    // Act
    await GetPlaylistGivenGroup(token, groupId);

    // Assert
    expect(global.fetch).toHaveBeenCalled();
    expect(global.console.error).toHaveBeenCalledWith(
      'error parsing response JSON:',
      expect.any(SyntaxError)
    );
  });

  it('should handle errors and log them when response parsing fails with empty response', async () => {
    // Arrange
    const token = 'mockToken';
    const groupId = 'group123';

    // Mock fetch for a successful response with empty JSON
    global.fetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(''),
    });

    // Act
    await GetPlaylistGivenGroup(token, groupId);

    // Assert
    expect(global.fetch).toHaveBeenCalled();
    expect(global.console.error).toHaveBeenCalledWith(
      'error parsing response JSON:',
      expect.any(SyntaxError)
    );
  });

  it('should handle errors and log them when response parsing fails with invalid JSON', async () => {
    // Arrange
    const token = 'mockToken';
    const groupId = 'group123';

    // Mock fetch for a successful response with invalid JSON
    global.fetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve('{ invalid: json }'),
    });

    // Act
    await GetPlaylistGivenGroup(token, groupId);

    // Assert
    expect(global.fetch).toHaveBeenCalled();
    expect(global.console.error).toHaveBeenCalledWith(
      'error parsing response JSON:',
      expect.any(SyntaxError)
    );
  });
});

//---------------------------------

describe('GroupAnalysisApi', () => {
    const mockToken = 'your_mock_token';
    const mockGroupId = 'mockGroupId';
  
    beforeEach(() => {
      global.fetch = jest.fn();
    });
  
    afterEach(() => {
      global.fetch.mockClear();
      delete global.fetch;
    });
  
    test('should return the parsed response data for a successful request', async () => {
      const mockResponseData = [{ songId: 1, songName: 'Song 1' }];
      const mockResponse = {
        ok: true,
        text: jest.fn(() => Promise.resolve(JSON.stringify(mockResponseData))),
      };
  
      global.fetch.mockResolvedValueOnce(mockResponse);
  
      const result = await GroupAnalysisApi(mockToken, mockGroupId);
  
      expect(result).toEqual(mockResponseData);
    });

  it('should fetch playlist analysis for a group', async () => {
    // Arrange
    const token = 'mockToken';
    const groupId = 'group123';

    // Mock fetch for a successful response
    const mockResponse = [
      { id: 1, name: 'Song 1' },
      { id: 2, name: 'Song 2' },
    ];
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    // Act
    const result = await GroupAnalysisApi(token, groupId);

    // Assert
    expect(global.fetch).toHaveBeenCalledWith(
      `http://localhost:8080/group/analysis-playlist/${groupId}`,
      {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer mockToken',
          'Content-Type': 'application/json',
        },
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      }
    );

    expect(result).toEqual(mockResponse);
  });

  it('should log the URL and auth information', async () => {
    // Arrange
    const token = 'mockToken';
    const groupId = 'group123';

    // Mock fetch for a successful response
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });

    // Act
    await GroupAnalysisApi(token, groupId);

    // Assert
    expect(global.console.log).toHaveBeenCalledWith('url: ', expect.any(String));
    expect(global.console.log).toHaveBeenCalledWith('auth: ', expect.any(String));
  });

  it('should handle errors when response is not ok', async () => {
    // Arrange
    const token = 'mockToken';
    const groupId = 'group123';

    // Mock fetch for a failure response
    global.fetch.mockResolvedValueOnce({
      ok: false,
      text: () => Promise.resolve('Error message'),
    });

    // Act & Assert
    await expect(GroupAnalysisApi(token, groupId)).rejects.toThrow('Network response is not ok');
  });

  it('should handle errors and log them', async () => {
    // Arrange
    const token = 'mockToken';
    const groupId = 'group123';

    // Mock fetch for a network error
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    // Act
    await GroupAnalysisApi(token, groupId);

    // Assert
    expect(global.fetch).toHaveBeenCalled();
    expect(global.console.error).toHaveBeenCalledWith(
      'error in fetching data:',
      new Error('Network error')
    );
  });

  it('should handle errors and log them when response parsing fails', async () => {
    // Arrange
    const token = 'mockToken';
    const groupId = 'group123';

    // Mock fetch for a successful response with invalid JSON
    global.fetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve('Invalid JSON'),
    });

    // Act
    await GroupAnalysisApi(token, groupId);

    // Assert
    expect(global.fetch).toHaveBeenCalled();
    expect(global.console.error).toHaveBeenCalledWith(
      'error parsing response JSON:',
      expect.any(SyntaxError)
    );
  });
});

//---------------------------------

describe('Create group playlist', () => {

    it('should successfully create a playlist with valid input', async () => {
        const mockToken = 'valid_token';
        const username = 'user1';
        const userNames = ['user2', 'user3'];
        const mockPlaylistId = 'playlist_id';
      
        // Mock ConvertNameToId to return userIds
        ConvertNameToId.mockResolvedValue(['1', '2', '3']);
      
        // Mock the fetch response to simulate successful playlist creation
        global.fetch = jest.fn().mockResolvedValue({
          ok: true,
          status: 201,
          text: () => Promise.resolve(JSON.stringify({ playlistId: mockPlaylistId }))
        });
      
        const result = await CreateGroupPlaylist(mockToken, username, userNames);
      
        expect(result).toEqual({ playlistId: mockPlaylistId });
        expect(ConvertNameToId).toHaveBeenCalledWith(mockToken, ['user1', 'user2', 'user3']);
        expect(fetch).toHaveBeenCalledWith(
          'http://localhost:8080/group/post-playlist/1-2-3',
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
      
        await expect(CreateGroupPlaylist('token', 'username', [])).rejects.toThrow('Network response is not ok');
      });
      it('should handle network errors during fetch', async () => {
        // Mock the fetch function to throw a network error
        global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));
      
        await expect(CreateGroupPlaylist('token', 'username', [])).rejects.toThrow('error in fetching data:');
      });
      it('should throw an error if token is missing', async () => {
        await expect(CreateGroupPlaylist('', 'username', [])).rejects.toThrow('Token is required');
      });
      
      it('should throw an error if username is missing', async () => {
        await expect(CreateGroupPlaylist('token', '', [])).rejects.toThrow('Username is required');
      });
      
      it('should throw an error if userNames is missing', async () => {
        await expect(CreateGroupPlaylist('token', 'username', undefined)).rejects.toThrow('UserNames is required');
      });
      
      it('should throw an error if userNames is empty', async () => {
        await expect(CreateGroupPlaylist('token', 'username', [])).rejects.toThrow('At least one other userName is required');
      });
      it('should throw an error if response status code is 400', async () => {
        global.fetch = jest.fn().mockResolvedValue({
          ok: false,
          status: 400,
          text: () => Promise.resolve('Bad request')
        });
      
        await expect(CreateGroupPlaylist('token', 'username', [])).rejects.toThrow('Network response is not ok');
      });

      it('should correctly format groupIdsString', () => {
        const groupIds = ['3', '1', '2'];
        const sortedGroupIds = groupIds.sort((a, b) => a - b);
        const expectedGroupIdsString = '1-2-3';
      
        const actualGroupIdsString = sortedGroupIds.join('-');
      
        expect(actualGroupIdsString).toBe(expectedGroupIdsString);
      });
      it('should create the correct URL with groupIdsString', () => {
        const groupIdsString = '1-2-3';
        const expectedUrl = 'http://localhost:8080/group/post-playlist/1-2-3';
      
        const actualUrl = `http://localhost:8080/group/post-playlist/${groupIdsString}`;
      
        expect(actualUrl).toBe(expectedUrl);
      });
      it('should make a fetch request with correct headers and method', async () => {
        const mockResponse = { ok: true, status: 201, text: () => Promise.resolve('{"playlistId": "123"}') };
        global.fetch = jest.fn().mockResolvedValue(mockResponse);
      
        await CreateGroupPlaylist('token', 'username', []); // Pass any valid inputs for token and username
      
        expect(fetch).toHaveBeenCalledWith(
          'http://localhost:8080/group/post-playlist/1-2-3', // Assuming ConvertNameToId returns ['1', '2', '3']
          expect.objectContaining({
            method: 'POST',
            headers: expect.objectContaining({
              Authorization: 'Bearer token',
              'Content-Type': 'application/json',
              accept: 'application/json'
            })
          })
        );
      });
      it('should parse the response as JSON', async () => {
        const mockResponse = { ok: true, status: 201, text: () => Promise.resolve('{"playlistId": "123"}') };
        global.fetch = jest.fn().mockResolvedValue(mockResponse);
      
        const result = await CreateGroupPlaylist('token', 'username', []);
      
        expect(result).toEqual({ playlistId: '123' });
      });
      it('should throw an error if response status code is not 200', async () => {
        global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 400, text: () => Promise.resolve('Bad request') });
      
        await expect(CreateGroupPlaylist('token', 'username', [])).rejects.toThrow('Network response is not ok');
      });
      it('should log the response data', async () => {
        const mockResponse = { ok: true, status: 201, text: () => Promise.resolve('{"playlistId": "123"}') };
        global.fetch = jest.fn().mockResolvedValue(mockResponse);
      
        await CreateGroupPlaylist('token', 'username', []);
      
        expect(console.log).toHaveBeenCalledWith('create api dönen : ', { playlistId: '123' });
      });    
                              
});

