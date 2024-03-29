import ImportSongFromFileApi from "../API/ImportSongFromFileApi";

describe('import file', () => {
    const mockToken = 'valid_token';
    const userId = 123;
    const mockFile = new File(['{"songs": ["song1", "song2"]}', 'songs.json'], 'songs.json');

    it('should successfully import songs from a file with new songs', async () => {
        // Mock the fetch response to simulate successful import
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            status: 200,
            text: () => Promise.resolve('Import successful')
        });

        const result = await ImportSongFromFileApi(mockToken, userId, mockFile);

        expect(result).toEqual('Import successful');
        expect(fetch).toHaveBeenCalledWith(
            'http://localhost:8080/file/import/123',
            expect.objectContaining({
                method: 'POST',
                headers: expect.objectContaining({
                    Authorization: 'Bearer valid_token',
                    accept: 'application/json'
                }),
                body: expect.any(FormData) // Verify FormData usage
            })
        );
    });
    test('should return exception when response is not ok ', async () => {
      const mockResponse = {
        ok: false,
        status: 403,
        text: jest.fn(() => Promise.resolve('Song not found')),
      };
  
      global.fetch.mockResolvedValueOnce(mockResponse);
  
      await expect(ImportSongFromFileApi('token','a','c')).rejects.toMatch('Network response is not ok');
      
    });

    it('should return "Import successful" even if all songs already exist', async () => {
        // Same setup as above, with a backend that simulates no new songs added
        global.fetch = jest.fn().mockResolvedValue({
          ok: true,
          text: () => Promise.resolve(JSON.stringify({ /* mock response data */ })),
        });
        const result = await ImportSongFromFileApi(mockToken, userId, mockFile);

        expect(result).toEqual("{}");
    });
      it('should handle network errors during fetch', async () => {
        global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));
      
        await expect(ImportSongFromFileApi('token', userId, mockFile)).rejects.toMatch('Network response is not ok');

      });
      it('should throw an error if token is missing', async () => {
        await expect(ImportSongFromFileApi('', userId, mockFile)).rejects.toMatch('Network response is not ok');
      });
      
      it('should throw an error if userId is missing', async () => {
        await expect(ImportSongFromFileApi(mockToken, '', mockFile)).rejects.toMatch('Network response is not ok');
      });
      
      it('should throw an error if selectedFile is missing', async () => {
        await expect(ImportSongFromFileApi(mockToken, userId, undefined)).rejects.toMatch('Network response is not ok');
      });
      it('should handle errors within the catch block', async () => {
        // Simulate an error within the function
        const mockResponse = { ok: true, status: 200, text: () => Promise.reject(new Error('Internal import error')) };
        global.fetch = jest.fn().mockResolvedValue(mockResponse);
      
      
        await expect(ImportSongFromFileApi(mockToken, userId, mockFile)).rejects.toMatch('Network response is not ok');
      });
                                    
});