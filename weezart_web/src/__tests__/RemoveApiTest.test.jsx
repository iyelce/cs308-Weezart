import ArtistRemoveApi from "../API/ArtistRemoveApi";
import AlbumRemoveaApi from "../API/AlbumRemoveaApi";
import SongRemoveApi from "../API/SongRemoveApi";


describe('Artist Remove Api', () => {
    it('should successfully remove an artist with valid input', async () => {
        const mockToken = 'valid_token';
        const userId = 'valid_user_id';
        const artistInfo = {
          id: 'artist_id',
          name: 'artist_name',
          genres: ['genre1', 'genre2'],
          imageUrl: 'artist_image_url',
          followerCount: 1000
        };
      
        // Mock the fetch response to simulate successful removal
        global.fetch = jest.fn().mockResolvedValue({
          ok: true,
          status: 200,
          text: () => Promise.resolve('Artist removed successfully')
        });
      
        const result = await ArtistRemoveApi(mockToken, userId, artistInfo);
      
        expect(result).toBe('Artist removed successfully');
        expect(fetch).toHaveBeenCalledWith(
          'http://localhost:8080/remove/artist/valid_user_id',
          expect.objectContaining({
            method: 'DELETE',
            headers: expect.objectContaining({
              Authorization: 'Bearer valid_token',
              'Content-Type': 'application/json'
            }),
            body: JSON.stringify(artistInfo)
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
      
        await expect(ArtistRemoveApi('token', 'userId', {})).rejects.toThrow('Network response is not ok');
      });

      it('should handle network errors during fetch', async () => {
        // Mock the fetch function to throw a network error
        global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));
      
        await expect(ArtistRemoveApi('token', 'userId', {})).rejects.toThrow('error in fetching data:');
      });
      it('should throw an error if token is missing', async () => {
        await expect(ArtistRemoveApi('', 'userId', {})).rejects.toThrow('Token is required');
      });
      
      it('should throw an error if userId is missing', async () => {
        await expect(ArtistRemoveApi('token', '', {})).rejects.toThrow('UserId is required');
      });
      
      it('should throw an error if artistInfo is missing', async () => {
        await expect(ArtistRemoveApi('token', 'userId', undefined)).rejects.toThrow('ArtistInfo is required');
      });
      
      it('should throw an error if id property is missing in artistInfo', async () => {
        await expect(ArtistRemoveApi('token', 'userId', {})).rejects.toThrow('ArtistInfo.id is required');
      });
            
  });
  
  describe('Album Remove Api', () => {
    it('should successfully remove an album with valid input', async () => {
        const mockToken = 'valid_token';
        const userId = 'valid_user_id';
        const albumInfo = {
          id: 'album_id',
          name: 'album_name',
          imageUrl: 'album_image_url',
          releaseDate: '2023-11-21',
          numberOfTracks: 10,
          artistsName: ['artist1', 'artist2'],
          artistsId: ['artist1_id', 'artist2_id'],
          songsName: ['song1', 'song2'],
          songsId: ['song1_id', 'song2_id']
        };
      
        // Mock the fetch response to simulate successful removal
        global.fetch = jest.fn().mockResolvedValue({
          ok: true,
          status: 200,
          text: () => Promise.resolve('Album removed successfully')
        });
      
        const result = await AlbumRemoveaApi(mockToken, userId, albumInfo);
      
        expect(result).toBe('Album removed successfully');
        expect(fetch).toHaveBeenCalledWith(
          'http://localhost:8080/remove/album/valid_user_id',
          expect.objectContaining({
            method: 'DELETE',
            headers: expect.objectContaining({
              Authorization: 'Bearer valid_token',
              'Content-Type': 'application/json'
            }),
            body: JSON.stringify(albumInfo)
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
      
        await expect(AlbumRemoveaApi('token', 'userId', {})).rejects.toThrow('Network response is not ok');
      });
      it('should handle network errors during fetch', async () => {
        // Mock the fetch function to throw a network error
        global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));
      
        await expect(AlbumRemoveaApi('token', 'userId', {})).rejects.toThrow('error in fetching data:');
      });
      it('should throw an error if token is missing', async () => {
        await expect(AlbumRemoveaApi('', 'userId', {})).rejects.toThrow('Token is required');
      });
      
      it('should throw an error if userId is missing', async () => {
        await expect(AlbumRemoveaApi('token', '', {})).rejects.toThrow('UserId is required');
      });
      
      it('should throw an error if albumInfo is missing', async () => {
        await expect(AlbumRemoveaApi('token', 'userId', undefined)).rejects.toThrow('AlbumInfo is required');
      });
      
      it('should throw an error if id property is missing in albumInfo', async () => {
        await expect(AlbumRemoveaApi('token', 'userId', {})).rejects.toThrow('AlbumInfo.id is required');
      });

      it('should throw an error if response status code is 400', async () => {
        global.fetch = jest.fn().mockResolvedValue({
          ok: false,
          status: 400,
          text: () => Promise.resolve('Bad request')
        });
      
        await expect(AlbumRemoveaApi('token', 'userId', {})).rejects.toThrow('Network response is not ok');
      });
      
      it('should throw an error if response status code is 401', async () => {
        global.fetch = jest.fn().mockResolvedValue({
          ok: false,
          status: 401,
          text: () => Promise.resolve('Unauthorized')
        });
      
        await expect(AlbumRemoveaApi('token', 'userId', {})).rejects.toThrow('Network response is not ok');
      });
      
      it('should log an error if an unexpected error occurs', async () => {
        const mockError = new Error('Unexpected error');
        global.fetch = jest.fn().mockRejectedValue(mockError);
      
        try {
          await AlbumRemoveaApi('token', 'userId', {});
        } catch (error) {
          expect(error).toBe(mockError);
          expect(console.error).toHaveBeenCalledWith('error in fetching data:', mockError);
        }
      });                        
  });

  describe('Song Remove Api', () => {

    it('should successfully remove a song with valid input', async () => {
        const mockToken = 'valid_token';
        const userId = 'valid_user_id';
        const songInfo = {
          id: 'song_id',
          name: 'song_name',
          albumName: 'album_name',
          albumId: 'album_id',
          albumImageURL: 'album_image_url',
          artistsName: ['artist1', 'artist2'],
          artistsId: ['artist1_id', 'artist2_id'],
          popularity: 80,
          duration_ms: 240000,
          explicit: true,
          albumRelease: '2023-11-21'
        };
      
        // Mock the fetch response to simulate successful removal
        global.fetch = jest.fn().mockResolvedValue({
          ok: true,
          status: 200,
          text: () => Promise.resolve('Song removed successfully')
        });
      
        const result = await SongRemoveApi(mockToken, userId, songInfo);
      
        expect(result).toBe('Song removed successfully');
        expect(fetch).toHaveBeenCalledWith(
          'http://localhost:8080/remove/song/valid_user_id',
          expect.objectContaining({
            method: 'DELETE',
            headers: expect.objectContaining({
              Authorization: 'Bearer valid_token',
              'Content-Type': 'application/json'
            }),
            body: JSON.stringify(songInfo)
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
      
        await expect(SongRemoveApi('token', 'userId', {})).rejects.toThrow('Network response is not ok');
      });

      it('should handle network errors during fetch', async () => {
        // Mock the fetch function to throw a network error
        global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));
      
        await expect(SongRemoveApi('token', 'userId', {})).rejects.toThrow('error in fetching data:');
      });

      it('should throw an error if token is missing', async () => {
        await expect(SongRemoveApi('', 'userId', {})).rejects.toThrow('Token is required');
      });
      
      it('should throw an error if userId is missing', async () => {
        await expect(SongRemoveApi('token', '', {})).rejects.toThrow('UserId is required');
      });
      
      it('should throw an error if songInfo is missing', async () => {
        await expect(SongRemoveApi('token', 'userId', undefined)).rejects.toThrow('SongInfo is required');
      });
      
      it('should throw an error if id property is missing in songInfo', async () => {
        await expect(SongRemoveApi('token', 'userId', {})).rejects.toThrow('SongInfo.id is required');
      });

      it('should throw an error if response status code is 400', async () => {
        global.fetch = jest.fn().mockResolvedValue({
          ok: false,
          status: 400,
          text: () => Promise.resolve('Bad request')
        });
      
        await expect(SongRemoveApi('token', 'userId', {})).rejects.toThrow('Network response is not ok');
      });

      
});