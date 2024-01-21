import CreateGroupPlaylist from "../API/CreateGroupPlaylist";
import ConvertNameToId from "../API/ConvertNameToId";

// Mock the ConvertNameToId function
jest.mock('../path/to/ConvertNameToId');

describe('CreateGroupPlaylist', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should create group playlist', async () => {
    // Arrange
    const token = 'mockToken';
    const username = 'mockUsername';
    const userNames = ['user1', 'user2'];

    // Mock ConvertNameToId function to return a group id array
    ConvertNameToId.mockResolvedValueOnce([1, 2, 3]);

    // Mock the fetch function
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ playlistId: 'mockPlaylistId' }),
    });

    // Act
    const result = await CreateGroupPlaylist(token, username, userNames);

    // Assert
    expect(ConvertNameToId).toHaveBeenCalledWith(token, ['user1', 'user2', 'mockUsername']);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:8080/group/post-playlist/1-2-3',
      expect.objectContaining({
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer mockToken',
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
    );

    expect(result).toEqual({ playlistId: 'mockPlaylistId' });
  });

  it('should handle errors during playlist creation', async () => {
    // Arrange
    const token = 'mockToken';
    const username = 'mockUsername';
    const userNames = ['user1', 'user2'];

    // Mock ConvertNameToId function to return a group id array
    ConvertNameToId.mockResolvedValueOnce([1, 2, 3]);

    // Mock the fetch function to simulate a network error
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('Network error'));

    // Act & Assert
    await expect(CreateGroupPlaylist(token, username, userNames)).rejects.toThrow(
      'Network response is not ok'
    );

    // Ensure that the fetch function was called
    expect(global.fetch).toHaveBeenCalled();
  });

  it('should handle JSON parsing errors', async () => {
    // Arrange
    const token = 'mockToken';
    const username = 'mockUsername';
    const userNames = ['user1', 'user2'];

    // Mock ConvertNameToId function to return a group id array
    ConvertNameToId.mockResolvedValueOnce([1, 2, 3]);

    // Mock the fetch function to simulate an invalid JSON response
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve('Invalid JSON'),
    });

    // Act & Assert
    await expect(CreateGroupPlaylist(token, username, userNames)).rejects.toThrow(
      'error parsing response JSON:'
    );

    // Ensure that the fetch function was called
    expect(global.fetch).toHaveBeenCalled();
  });
  
  it('should handle JSON parsing errors in fetch', async () => {
    // Arrange
    const token = 'mockToken';
    const username = 'mockUsername';
    const userNames = ['user1', 'user2'];

    // Mock ConvertNameToId function to return a group id array
    ConvertNameToId.mockResolvedValueOnce([1, 2, 3]);

    // Mock the fetch function to simulate an invalid JSON response
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      text: () => Promise.resolve('Invalid JSON'),
    });

    // Act & Assert
    await expect(CreateGroupPlaylist(token, username, userNames)).rejects.toThrow(
      'error parsing response JSON:'
    );

    // Ensure that the fetch function was called
    expect(global.fetch).toHaveBeenCalled();
  });
});
