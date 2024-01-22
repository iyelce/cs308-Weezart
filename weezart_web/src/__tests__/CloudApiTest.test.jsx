import CloudApi from '../api/CloudApi';


  describe('Cloud Api', () => {
  
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
  
    test('should make a POST request with the correct parameters', async () => {
      const expectedUrl = `http://localhost:8080/add-from-db/db/mockUserId`;
      const expectedHeaders = {
        accept: 'application/json',
        'Authorization': 'Bearer ' + 'mockToken',
        'Content-Type': 'application/json'
      };
   
  
      const mockResponseData = { status: 'success' };
      const mockResponse = {
        ok: true,
        text: jest.fn(() => Promise.resolve(JSON.stringify(mockResponseData))),
      };
  
      global.fetch.mockResolvedValueOnce(mockResponse);
  
      await CloudApi('mockToken', 'mockUserId', 'url','username','password','table');
  
      expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
        method: 'POST',
        headers: expectedHeaders,
        body: JSON.stringify({url: 'url', username: 'username', password: 'password', table: 'table'}),
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
  
      await expect(CloudApi('token','a','c','d','e')).rejects.toMatch('Network response is not ok');
      
    });
  
  
    test('should throw an error when the network response is not ok', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        text: jest.fn(() => Promise.resolve('Internal Server Error')),
      };
  
      global.fetch.mockRejectedValueOnce(mockResponse);
  
      await expect(CloudApi('mockToken', 'mockUserId', 'mockAlbumInfo','url','password','table')).rejects.toMatch('Network response is not ok');
    });
  
    test('should log an error when an exception occurs during the API call', async () => {
      const errorMessage = 'Test error';
      global.fetch.mockRejectedValueOnce(new Error(errorMessage));
  
  
      await expect(CloudApi('mockToken', 'mockUserId', 'mockAlbumInfo','url','password','table')).rejects.toMatch('Network response is not ok');
    });
  
  });
  
  
            
