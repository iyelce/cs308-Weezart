import DeleteBlend from "../API/DeleteBlend";
import GetAllGroupPlaylists from "../API/GetAllGroupPlaylists";
import GetPlaylistGivenGroup from "../API/GetPlaylistGivenGroup ";
import GroupAnalysisApi from "../API/GroupAnalysisApi";


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
    await expect(DeleteBlend(token, userIds, deletedId)).rejects.toThrow(
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

    // Act
    const result = await DeleteBlend(token, userIds, deletedId);

    // Assert
    expect(global.fetch).toHaveBeenCalled();
    expect(result).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith(
      'error in fetching data:',
      new Error('Network error')
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
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
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

