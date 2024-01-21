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
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockResponseData),
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
        global.fetch.mockResolvedValueOnce({
            ok: false,
            text: () => Promise.resolve('Error message'),
        });

        // Act & Assert
        await expect(SearchAlbumApi(mockToken, mockSongName)).rejects.toThrow('Network response is not ok');

        // Ensure console.error is called for error logging
        expect(global.console.error).toHaveBeenCalled();
    });

    it('should handle errors and log them', async () => {
        // Arrange
        global.fetch.mockRejectedValueOnce(new Error('Network error'));

        // Act
        await SearchAlbumApi(mockToken, mockSongName);

        // Assert
        expect(global.fetch).toHaveBeenCalled();

        // Ensure console.error is called for error logging
        expect(global.console.error).toHaveBeenCalledWith(
            'error in fetching data:',
            new Error('Network error')
        );
    });

    it('should handle errors and log them when response parsing fails', async () => {
        // Arrange
        global.fetch.mockResolvedValueOnce({
            ok: true,
            text: () => Promise.resolve('Invalid JSON'),
        });

        // Act
        await SearchAlbumApi(mockToken, mockSongName);

        // Assert
        expect(global.fetch).toHaveBeenCalled();

        // Ensure console.error is called for error logging
        expect(global.console.error).toHaveBeenCalledWith(
            'error parsing response JSON:',
            expect.any(SyntaxError)
        );
    });

    it('should handle errors and log them in catch block', async () => {
        // Arrange
        global.fetch.mockResolvedValueOnce({
            ok: true,
            text: () => Promise.resolve('Invalid JSON'),
        });

        // Simulate an error within JSON.parse to trigger catch block
        jest.spyOn(global, 'JSON').mockImplementationOnce(() => {
            throw new SyntaxError('Invalid JSON');
        });

        // Act
        await SearchAlbumApi(mockToken, mockSongName);

        // Assert
        expect(global.fetch).toHaveBeenCalled();

        // Ensure console.error is called for error logging in catch block
        expect(global.console.error).toHaveBeenCalledWith(
            'error parsing response JSON:',
            expect.any(SyntaxError)
        );
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
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockResponseData),
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
        global.fetch.mockResolvedValueOnce({
            ok: false,
            text: () => Promise.resolve('Error message'),
        });

        // Act & Assert
        await expect(SearchArtistApi(mockToken, mockSongName)).rejects.toThrow('Network response is not ok');

        // Ensure console.error is called for error logging
        expect(global.console.error).toHaveBeenCalled();
    });

    it('should handle errors and log them', async () => {
        // Arrange
        global.fetch.mockRejectedValueOnce(new Error('Network error'));

        // Act
        await SearchArtistApi(mockToken, mockSongName);

        // Assert
        expect(global.fetch).toHaveBeenCalled();

        // Ensure console.error is called for error logging
        expect(global.console.error).toHaveBeenCalledWith(
            'error in fetching data:',
            new Error('Network error')
        );
    });

    it('should handle errors and log them when response parsing fails', async () => {
        // Arrange
        global.fetch.mockResolvedValueOnce({
            ok: true,
            text: () => Promise.resolve('Invalid JSON'),
        });

        // Act
        await SearchArtistApi(mockToken, mockSongName);

        // Assert
        expect(global.fetch).toHaveBeenCalled();

        // Ensure console.error is called for error logging
        expect(global.console.error).toHaveBeenCalledWith(
            'error parsing response JSON:',
            expect.any(SyntaxError)
        );
    });

    it('should log the artist search return api', async () => {
        // Arrange
        const mockResponseData = [
            { artistId: 1, artistName: 'Artist 1' },
            { artistId: 2, artistName: 'Artist 2' },
        ];
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockResponseData),
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
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockResponseData),
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
        global.fetch.mockResolvedValueOnce({
            ok: false,
            text: () => Promise.resolve('Error message'),
        });

        // Act & Assert
        await expect(SearchSongApi(mockToken, mockSongName)).rejects.toThrow('Network response is not ok');

        // Ensure console.error is called for error logging
        expect(global.console.error).toHaveBeenCalled();
    });

    it('should handle errors and log them', async () => {
        // Arrange
        global.fetch.mockRejectedValueOnce(new Error('Network error'));

        // Act
        await SearchSongApi(mockToken, mockSongName);

        // Assert
        expect(global.fetch).toHaveBeenCalled();

        // Ensure console.error is called for error logging
        expect(global.console.error).toHaveBeenCalledWith(
            'error in fetching data:',
            new Error('Network error')
        );
    });

    it('should handle errors and log them when response parsing fails', async () => {
        // Arrange
        global.fetch.mockResolvedValueOnce({
            ok: true,
            text: () => Promise.resolve('Invalid JSON'),
        });

        // Act
        await SearchSongApi(mockToken, mockSongName);

        // Assert
        expect(global.fetch).toHaveBeenCalled();

        // Ensure console.error is called for error logging
        expect(global.console.error).toHaveBeenCalledWith(
            'error parsing response JSON:',
            expect.any(SyntaxError)
        );
    });

    it('should log the song search return api', async () => {
        // Arrange
        const mockResponseData = [
            { songId: 1, songName: 'Song 1' },
            { songId: 2, songName: 'Song 2' },
        ];
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockResponseData),
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
