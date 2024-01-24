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
      text: () => Promise.resolve(JSON.stringify(mockResponse)),
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

    expect(mockResponse).toEqual(result);
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
    await expect(GetAllGroupPlaylists(token, userId)).rejects.toMatch(
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
    await expect(GetAllGroupPlaylists(token, userId)).rejects.toMatch(
      'Network response is not ok'
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


    // Assert
    await expect(GetAllGroupPlaylists(token, userId)).rejects.toMatch(
      'Network response is not ok'
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

    // Assert
    await expect(GetAllGroupPlaylists(token, userId)).rejects.toMatch(
      'Network response is not ok'
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
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(JSON.stringify(mockResponse)),
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
  test('should return exception when response is not ok ', async () => {
    const mockResponse = {
      ok: false,
      status: 403,
      text: jest.fn(() => Promise.resolve('Song not found')),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await expect(GetPlaylistGivenGroup('token','a')).rejects.toMatch('Network response is not ok');
    
  });

  it('should handle errors when response is not ok', async () => {
    // Arrange
    const token = 'mockToken';
    const groupId = 'group123';

    // Mock fetch for a failure response
    global.fetch.mockRejectedValueOnce({
      ok: false,
      text: () => Promise.resolve(new Error('Error message')),
    });

    // Act & Assert
    await expect(GetPlaylistGivenGroup(token, groupId)).rejects.toMatch(
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
    await 

    await expect(GetPlaylistGivenGroup(token, groupId)).rejects.toMatch('Network response is not ok');

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
    await expect(GetPlaylistGivenGroup(token, groupId)).rejects.toMatch(
      'Network response is not ok'
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
    await expect(GetPlaylistGivenGroup(token, groupId)).rejects.toMatch(
      'Network response is not ok'
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
    await expect(GetPlaylistGivenGroup(token, groupId)).rejects.toMatch(
      'Network response is not ok'
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
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(JSON.stringify(mockResponse)),
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
    await expect(GroupAnalysisApi(token, groupId)).rejects.toMatch('Network response is not ok');
  });

  it('should handle errors and log them', async () => {
    // Arrange
    const token = 'mockToken';
    const groupId = 'group123';

    // Mock fetch for a network error
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    // Act


    await expect(GroupAnalysisApi(token, groupId)).rejects.toMatch('Network response is not ok');

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
    await expect(GroupAnalysisApi(token, groupId)).rejects.toMatch('Network response is not ok');

  });
});

//---------------------------------

describe('Create group playlist', () => {

  
      it('should throw an error if server response is not ok', async () => {
        // Mock the fetch response with a non-200 status code
        global.fetch = jest.fn().mockRejectedValueOnce({
          ok: false,
          status: 500,
          text: () => Promise.resolve('Internal server error')
        });
      
        await expect(CreateGroupPlaylist('token', 'username', [])).rejects.toMatch('Network response is not ok');
      });
      it('should handle network errors during fetch', async () => {
        // Mock the fetch function to throw a network error
        global.fetch = jest.fn().mockRejectedValueOnce({
          ok: false,
          status: 500,
          text: () => Promise.resolve('Network error')
        });
      
        await expect(CreateGroupPlaylist('token', 'username', [])).rejects.toMatch('Network response is not ok');
      });
      it('should throw an error if token is missing', async () => {
        await expect(CreateGroupPlaylist('', 'username', [])).rejects.toMatch('Network response is not ok');
      });
      
      it('should throw an error if username is missing', async () => {
        await expect(CreateGroupPlaylist('token', '', [])).rejects.toMatch('Network response is not ok');
      });
      
      it('should throw an error if userNames is missing', async () => {
        await expect(CreateGroupPlaylist('token', 'username', undefined)).rejects.toMatch('Network response is not ok');
      });
      
      it('should throw an error if userNames is empty', async () => {
        await expect(CreateGroupPlaylist('token', 'username', [])).rejects.toMatch('Network response is not ok');
      });
      it('should throw an error if response status code is 400', async () => {
        global.fetch = jest.fn().mockResolvedValue({
          ok: false,
          status: 400,
          text: () => Promise.resolve('Bad request')
        });
      
        await expect(CreateGroupPlaylist('token', 'username', [])).rejects.toMatch('Network response is not ok');
      });


      it('should parse the response as JSON', async () => {
     
        const mockResponse = { playlistId:123 }
     
      
        global.fetch = jest.fn().mockResolvedValue({
          ok: true,
          text: () => Promise.resolve(JSON.stringify(mockResponse)),
        });

      
        await expect(CreateGroupPlaylist('token', 'username', [])).rejects.toMatch('Network response is not ok');
      });
      it('should throw an error if response status code is not 200', async () => {
        global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 400, text: () => Promise.resolve('Bad request') });
      
        await expect(CreateGroupPlaylist('token', 'username', [])).rejects.toMatch('Network response is not ok');
      });
      it('should log the response data', async () => {
        const mockResponse = { ok: true, status: 201, text: () => Promise.resolve('{"playlistId": "123"}') };
        global.fetch = jest.fn().mockResolvedValue(mockResponse);
    
      
        await expect(CreateGroupPlaylist('token', 'username', [])).rejects.toMatch('Network response is not ok');
      });    
                              
});

