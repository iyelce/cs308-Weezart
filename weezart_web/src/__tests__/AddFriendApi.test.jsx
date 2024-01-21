import AddFriendApi from "../API/AddFriendApi";

describe('AddFriendApi', () => {
    const mockToken = 'your_mock_token';
    const mockUsername = 'mockUsername';
    const mockAddingUsername = 'mockAddingUsername';
  
    beforeEach(() => {
      global.fetch = jest.fn();
    });
  
    afterEach(() => {
      global.fetch.mockClear();
      delete global.fetch;
    });
  
    test('should make a POST request with the correct parameters', async () => {
      const expectedUrl = `http://localhost:8080/add/friend/${mockUsername}/${mockAddingUsername}`;
      const expectedHeaders = {
        accept: 'application/json',
        'Authorization': 'Bearer ' + mockToken,
        'Content-Type': 'application/json'
      };
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify({ /* mock response data */ })),
      });
      await AddFriendApi(mockToken, mockUsername, mockAddingUsername);
  
      expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
        method: 'POST',
        headers: expectedHeaders,
        mode: 'cors',
        credentials: 'include',
      });
    });
  
    test('should return "USER_ALREADY_FRIEND" when response status is 403', async () => {
      const mockResponse = {
        ok: false,
        status: 403,
        text: jest.fn(() => Promise.resolve('Forbidden')),
      };
  
      global.fetch.mockResolvedValueOnce(mockResponse);
  
      const result = await AddFriendApi(mockToken, mockUsername, mockAddingUsername);
  
      expect(result).toBe('USER_ALREADY_FRIEND');
    });
  
    test('should throw an error when the network response is not ok', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        text: jest.fn(() => Promise.resolve('Internal Server Error')),
      };
  
      global.fetch.mockRejectedValueOnce(mockResponse);
  
      await expect(AddFriendApi(mockToken, mockUsername, mockAddingUsername)).rejects.toMatch('Network response is not ok');
    });
  
    test('should log the response data when the response is ok', async () => {
      const mockResponse = {
        ok: true,
        text: jest.fn(() => Promise.resolve('Friend added successfully')),
      };
  
      global.fetch.mockResolvedValueOnce(mockResponse);
  
      console.log = jest.fn(); // Mock console.log
  
      await AddFriendApi(mockToken, mockUsername, mockAddingUsername);
  
      expect(console.log).toHaveBeenCalledWith('add friend response: ', 'Friend added successfully');
    });
  
    test('should log an error when an exception occurs during the API call', async () => {
      const errorMessage = 'Test error';
      global.fetch.mockRejectedValueOnce(new Error(errorMessage));
  
      console.error = jest.fn(); // Mock console.error
  
      await expect(AddFriendApi(mockToken, mockUsername, mockAddingUsername)).rejects.toMatch('Network response is not ok');

    });
  
    test('should handle unexpected response status', async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        text: jest.fn(() => Promise.resolve('Not Found')),
      };
  
      global.fetch.mockRejectedValueOnce(mockResponse);
  
      await expect(AddFriendApi(mockToken, mockUsername, mockAddingUsername)).rejects.toMatch('Network response is not ok');
    });
  
    test('should handle a successful response with empty data', async () => {
      const mockResponse = {
        ok: true,
        text: jest.fn(() => Promise.resolve('')),
      };
  
      global.fetch.mockResolvedValueOnce(mockResponse);
  
      const result = await AddFriendApi(mockToken, mockUsername, mockAddingUsername);
  
      expect(result).toBe('');
    });
  });