import SearchAlbumApi from "../API/SearchAlbumApi";
import SearchArtistApi from "../API/SearchArtistApi";
import SearchSongApi from "../API/SearchSongApi";

describe('SearchAlbumApi', () => {
    const mockToken = 'your_mock_token';
    const mockSongName = 'mockSongName';

    beforeEach(() => {
        global.fetch = jest.fn();
        global.console.error = jest.fn();
    });

    afterEach(() => {
        global.fetch.mockClear();
        global.console.error.mockClear();
    });

    it('should fetch album search results', async () => {
        // Arrange
        const mockResponseData = [
            { albumId: 1, albumName: 'Album 1' },
            { albumId: 2, albumName: 'Album 2' },
        ];
        global.fetch = jest.fn().mockResolvedValue({
            ok: true, 
            text: () => Promise.resolve(JSON.stringify( mockResponseData)),
          });

        // Act
        const result = await SearchAlbumApi(mockToken, mockSongName);

        // Assert
        expect(global.fetch).toHaveBeenCalledWith(
            `http://localhost:8080/api/spotify/search-album?query=${mockSongName}`,
            {
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer ' + mockToken,
                    'Content-Type': 'application/json',
                },
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
            }
        );

        expect(result).toEqual(mockResponseData);
    });

    it('should handle errors when response is not ok', async () => {
        // Arrange
        global.fetch.mockRejectedValueOnce({
            ok: false,
            text: () => Promise.resolve('Error message'),
        });

        // Act & Assert
        await expect(SearchAlbumApi(mockToken, mockSongName)).rejects.toMatch('Network response is not ok');

        // Ensure console.error is called for error logging
        expect(global.console.error).toHaveBeenCalled();
    });

    it('should handle errors and log them', async () => {
        // Arrange
        global.fetch.mockRejectedValueOnce(new Error('Network error'));

        await expect(SearchAlbumApi(mockToken, mockSongName)).rejects.toMatch('Network response is not ok');

    });

    it('should handle errors and log them when response parsing fails', async () => {
        // Arrange
        global.fetch.mockResolvedValueOnce({
            ok: true,
            text: () => Promise.resolve('Invalid JSON'),
        });

        // Act
        await expect(SearchAlbumApi(mockToken, mockSongName)).rejects.toMatch('Network response is not ok');

    });

    it('should handle errors and log them in catch block', async () => {
        // Arrange
        global.fetch.mockResolvedValueOnce({
            ok: true,
            text: () => Promise.resolve('Invalid JSON'),
        });


        await expect(SearchAlbumApi(mockToken, mockSongName)).rejects.toMatch('Network response is not ok');

    });
});

//-----------------------------

describe('SearchArtistApi', () => {
    const mockToken = 'your_mock_token';
    const mockSongName = 'mockSongName';

    beforeEach(() => {
        global.fetch = jest.fn();
        global.console.error = jest.fn();
    });

    afterEach(() => {
        global.fetch.mockClear();
        global.console.error.mockClear();
    });

    it('should fetch artist search results', async () => {
        // Arrange
        const mockResponseData = [
            { artistId: 1, artistName: 'Artist 1' },
            { artistId: 2, artistName: 'Artist 2' },
        ];
        global.fetch = jest.fn().mockResolvedValue({
            ok: true, 
            text: () => Promise.resolve(JSON.stringify( mockResponseData)),
          });

        // Act
        const result = await SearchArtistApi(mockToken, mockSongName);

        // Assert
        expect(global.fetch).toHaveBeenCalledWith(
            `http://localhost:8080/api/spotify/search-artist?query=${mockSongName}`,
            {
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer ' + mockToken,
                    'Content-Type': 'application/json',
                },
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
            }
        );

        expect(result).toEqual(mockResponseData);
    });

    it('should handle errors when response is not ok', async () => {
        // Arrange
        global.fetch.mockRejectedValueOnce({
            ok: false,
            text: () => Promise.resolve('Error message'),
        });

        // Act & Assert
        await expect(SearchArtistApi(mockToken, mockSongName)).rejects.toMatch('Network response is not ok');

        // Ensure console.error is called for error logging
        expect(global.console.error).toHaveBeenCalled();
    });

    it('should handle errors and log them', async () => {
        // Arrange
        global.fetch.mockRejectedValueOnce(new Error('Network error'));

        // Act
        await expect(SearchArtistApi(mockToken, mockSongName)).rejects.toMatch('Network response is not ok');

    });

    it('should handle errors and log them when response parsing fails', async () => {
        // Arrange
        global.fetch.mockResolvedValueOnce({
            ok: true,
            text: () => Promise.resolve('Invalid JSON'),
        });

        // Act
        await expect(SearchArtistApi(mockToken, mockSongName)).rejects.toMatch('Network response is not ok');

    });

    it('should log the artist search return api', async () => {
        // Arrange
        const mockResponseData = [
            { artistId: 1, artistName: 'Artist 1' },
            { artistId: 2, artistName: 'Artist 2' },
        ];
        global.fetch = jest.fn().mockResolvedValue({
            ok: true, 
            text: () => Promise.resolve(JSON.stringify( mockResponseData)),
          });

        // Spy on console.log
        global.console.log = jest.fn();

        // Act
        await SearchArtistApi(mockToken, mockSongName);

        // Assert
        // Ensure console.log is called with the correct message
        expect(global.console.log).toHaveBeenCalledWith('song search return api:  ', mockResponseData);
    });
});

//------------------------

describe('SearchSongApi', () => {
    const mockToken = 'your_mock_token';
    const mockSongName = 'mockSongName';

    beforeEach(() => {
        global.fetch = jest.fn();
        global.console.error = jest.fn();
    });

    afterEach(() => {
        global.fetch.mockClear();
        global.console.error.mockClear();
    });

    it('should fetch song search results', async () => {
        // Arrange
        const mockResponseData = [
            { songId: 1, songName: 'Song 1' },
            { songId: 2, songName: 'Song 2' },
        ];
        global.fetch = jest.fn().mockResolvedValue({
            ok: true, 
            text: () => Promise.resolve(JSON.stringify( mockResponseData)),
          });

        // Act
        const result = await SearchSongApi(mockToken, mockSongName);

        // Assert
        expect(global.fetch).toHaveBeenCalledWith(
            `http://localhost:8080/api/spotify/search-song?query=${mockSongName}`,
            {
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer ' + mockToken,
                    'Content-Type': 'application/json',
                },
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
            }
        );

        expect(result).toEqual(mockResponseData);
    });

    it('should handle errors when response is not ok', async () => {
        // Arrange
        global.fetch.mockRejectedValueOnce({
            ok: false,
            text: () => Promise.resolve('Error message'),
        });

        // Act & Assert
        await expect(SearchSongApi(mockToken, mockSongName)).rejects.toMatch('Network response is not ok');

        // Ensure console.error is called for error logging
        expect(global.console.error).toHaveBeenCalled();
    });

    it('should handle errors and log them', async () => {
        // Arrange
        global.fetch.mockRejectedValueOnce(new Error('Network error'));

        await expect(SearchSongApi(mockToken, mockSongName)).rejects.toMatch('Network response is not ok');

    });

    it('should handle errors and log them when response parsing fails', async () => {
        // Arrange
        global.fetch.mockResolvedValueOnce({
            ok: true,
            text: () => Promise.resolve('Invalid JSON'),
        });

        await expect(SearchSongApi(mockToken, mockSongName)).rejects.toMatch('Network response is not ok');

    });

    it('should log the song search return api', async () => {
        // Arrange
        const mockResponseData = [
            { songId: 1, songName: 'Song 1' },
            { songId: 2, songName: 'Song 2' },
        ];
        global.fetch = jest.fn().mockResolvedValue({
            ok: true, 
            text: () => Promise.resolve(JSON.stringify( mockResponseData)),
          });
        // Spy on console.log
        global.console.log = jest.fn();

        // Act
        await SearchSongApi(mockToken, mockSongName);

        // Assert
        // Ensure console.log is called with the correct message
        expect(global.console.log).toHaveBeenCalledWith('song search return api:  ', mockResponseData);
    });
});
