import RecommendationFriendApi from "../API/RecommendationFriend";
import RecomReleaseDateApi from "../API/RecomReleaseDateApi";
import RecommendationGenreArtistApi from "../API/RecommendationGenreArtistApi";
import RecommendationHotApi from "../API/RecommendationHotApi";
import RecommendationPopularApi from "../API/RecommendationPopularApi";

describe('RecommendationFriendApi', () => {
  beforeEach(() => {
    global.fetch = jest.fn(); // Mock fetch for each test
    global.console.error = jest.fn(); // Spy on console.error
    global.console.log = jest.fn(); // Spy on console.log
  });

  afterEach(() => {
    global.fetch.mockClear();
    global.console.error.mockClear();
    global.console.log.mockClear();
  });

  it('should fetch recommendations for a friend', async () => {
    // Arrange
    const token = 'mockToken';
    const userId = 'friend123';

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
    const result = await RecommendationFriendApi(token, userId);

    // Assert
    expect(global.fetch).toHaveBeenCalledWith(
      `http://localhost:8080/recommendation/friend/${userId}`,
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
    expect(global.console.log).toHaveBeenCalledWith(
      'friend api içinde --> ',
      expect.any(String),
      ' - ',
      expect.any(String)
    );
  });

  it('should handle errors when response is not ok', async () => {
    // Arrange
    const token = 'mockToken';
    const userId = 'friend123';

    // Mock fetch for a failure response
    global.fetch.mockResolvedValueOnce({
      ok: false,
      text: () => Promise.resolve('Error message'),
    });

    // Act & Assert
    await expect(RecommendationFriendApi(token, userId)).rejects.toThrow(
      'Network response is not ok'
    );
  });

  it('should handle errors and log them', async () => {
    // Arrange
    const token = 'mockToken';
    const userId = 'friend123';

    // Mock fetch for a network error
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    // Act
    await RecommendationFriendApi(token, userId);

    // Assert
    expect(global.fetch).toHaveBeenCalled();
    expect(global.console.error).toHaveBeenCalledWith(
      'error in fetching data:',
      new Error('Network error')
    );
  });

  it('should return "no-song" when the response is an empty string', async () => {
    // Arrange
    const token = 'mockToken';
    const userId = 'friend123';

    // Mock fetch for a successful response with an empty string
    global.fetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(''),
    });

    // Act
    const result = await RecommendationFriendApi(token, userId);

    // Assert
    expect(global.fetch).toHaveBeenCalled();
    expect(result).toBe('no-song');
  });

  it('should handle errors and log them when response parsing fails', async () => {
    // Arrange
    const token = 'mockToken';
    const userId = 'friend123';

    // Mock fetch for a successful response with invalid JSON
    global.fetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve('Invalid JSON'),
    });

    // Act
    await RecommendationFriendApi(token, userId);

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
    const userId = 'friend123';

    // Mock fetch for a successful response with empty JSON
    global.fetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(''),
    });

    // Act
    await RecommendationFriendApi(token, userId);

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
    const userId = 'friend123';

    // Mock fetch for a successful response with invalid JSON
    global.fetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve('Invalid JSON'),
    });

    // Act
    await RecommendationFriendApi(token, userId);

    // Assert
    expect(global.fetch).toHaveBeenCalled();
    expect(global.console.error).toHaveBeenCalledWith(
      'error parsing response JSON:',
      expect.any(SyntaxError)
    );
  });


});

//----------------------------

describe('RecomReleaseDateApi', () => {
  beforeEach(() => {
    global.fetch = jest.fn(); // Mock fetch for each test
    global.console.error = jest.fn(); // Spy on console.error
  });

  afterEach(() => {
    global.fetch.mockClear();
    global.console.error.mockClear();
  });

  it('should fetch recommendations by release date', async () => {
    // Arrange
    const token = 'mockToken';
    const userId = 'user123';

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
    const result = await RecomReleaseDateApi(token, userId);

    // Assert
    expect(global.fetch).toHaveBeenCalledWith(
      `http://localhost:8080/recommendation/release-date/${userId}`,
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
    await expect(RecomReleaseDateApi(token, userId)).rejects.toThrow(
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
    await RecomReleaseDateApi(token, userId);

    // Assert
    expect(global.fetch).toHaveBeenCalled();
    expect(global.console.error).toHaveBeenCalledWith(
      'error in fetching data:',
      new Error('Network error')
    );
  });

  it('should return "no-song" when the response is an empty array', async () => {
    // Arrange
    const token = 'mockToken';
    const userId = 'user123';

    // Mock fetch for a successful response with an empty array
    global.fetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve('[]'),
    });

    // Act
    const result = await RecomReleaseDateApi(token, userId);

    // Assert
    expect(global.fetch).toHaveBeenCalled();
    expect(result).toBe('no-song');
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
    await RecomReleaseDateApi(token, userId);

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
    const userId = 'user123';

    // Mock fetch for a successful response with empty JSON
    global.fetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(''),
    });

    // Act
    await RecomReleaseDateApi(token, userId);

    // Assert
    expect(global.fetch).toHaveBeenCalled();
    expect(global.console.error).toHaveBeenCalledWith(
      'error parsing response JSON:',
      expect.any(SyntaxError)
    );
  });
});

//-------------------------------------

describe('RecommendationGenreArtistApi', () => {
  beforeEach(() => {
    global.fetch = jest.fn(); // Mock fetch for each test
    global.console.error = jest.fn(); // Spy on console.error
  });

  afterEach(() => {
    global.fetch.mockClear();
    global.console.error.mockClear();
  });

  it('should fetch genre and artist recommendations', async () => {
    // Arrange
    const token = 'mockToken';
    const userId = 'user123';

    // Mock fetch for a successful response
    const mockResponse = [
      { id: 1, genre: 'Rock', artist: 'Artist 1' },
      { id: 2, genre: 'Pop', artist: 'Artist 2' },
    ];
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    // Act
    const result = await RecommendationGenreArtistApi(token, userId);

    // Assert
    expect(global.fetch).toHaveBeenCalledWith(
      `http://localhost:8080/recommendation/genre-artist/${userId}`,
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
    await expect(RecommendationGenreArtistApi(token, userId)).rejects.toThrow(
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
    await RecommendationGenreArtistApi(token, userId);

    // Assert
    expect(global.fetch).toHaveBeenCalled();
    expect(global.console.error).toHaveBeenCalledWith(
      'error in fetching data:',
      new Error('Network error')
    );
  });

  it('should return "no-song" when the response is an empty array', async () => {
    // Arrange
    const token = 'mockToken';
    const userId = 'user123';

    // Mock fetch for a successful response with an empty array
    global.fetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve('[]'),
    });

    // Act
    const result = await RecommendationGenreArtistApi(token, userId);

    // Assert
    expect(global.fetch).toHaveBeenCalled();
    expect(result).toBe('no-song');
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
    await RecommendationGenreArtistApi(token, userId);

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
    const userId = 'user123';

    // Mock fetch for a successful response with empty JSON
    global.fetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(''),
    });

    // Act
    await RecommendationGenreArtistApi(token, userId);

    // Assert
    expect(global.fetch).toHaveBeenCalled();
    expect(global.console.error).toHaveBeenCalledWith(
      'error parsing response JSON:',
      expect.any(SyntaxError)
    );
  });
});

//---------------------------------------

describe('RecommendationHotApi', () => {
  beforeEach(() => {
    global.fetch = jest.fn(); // Mock fetch for each test
    global.console.error = jest.fn(); // Spy on console.error
    global.console.log = jest.fn(); // Spy on console.log
  });

  afterEach(() => {
    global.fetch.mockClear();
    global.console.error.mockClear();
    global.console.log.mockClear();
  });

  it('should fetch hot recommendations', async () => {
    // Arrange
    const token = 'mockToken';
    const userId = 'user123';

    // Mock fetch for a successful response
    const mockResponse = [
      { id: 1, name: 'Hot Song 1' },
      { id: 2, name: 'Hot Song 2' },
    ];
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    // Act
    const result = await RecommendationHotApi(token, userId);

    // Assert
    expect(global.fetch).toHaveBeenCalledWith(
      `http://localhost:8080/recommendation/hot/${userId}`,
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
    const userId = 'user123';

    // Mock fetch for a successful response
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });

    // Act
    await RecommendationHotApi(token, userId);

    // Assert
    expect(global.console.log).toHaveBeenCalledWith('url RECOMMENDATION', expect.any(String));
    expect(global.console.log).toHaveBeenCalledWith('auth', expect.any(String));
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
    await expect(RecommendationHotApi(token, userId)).rejects.toThrow(
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
    await RecommendationHotApi(token, userId);

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
    const userId = 'user123';

    // Mock fetch for a successful response with invalid JSON
    global.fetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve('Invalid JSON'),
    });

    // Act
    await RecommendationHotApi(token, userId);

    // Assert
    expect(global.fetch).toHaveBeenCalled();
    expect(global.console.error).toHaveBeenCalledWith(
      'error parsing response JSON:',
      expect.any(SyntaxError)
    );
  });
});

//--------------------------------------------

describe('RecommendationPopularApi', () => {
    beforeEach(() => {
      global.fetch = jest.fn(); // Mock fetch for each test
      global.console.error = jest.fn(); // Spy on console.error
      global.console.log = jest.fn(); // Spy on console.log
    });
  
    afterEach(() => {
      global.fetch.mockClear();
      global.console.error.mockClear();
      global.console.log.mockClear();
    });
  
    it('should fetch popular recommendations', async () => {
      // Arrange
      const token = 'mockToken';
  
      // Mock fetch for a successful response
      const mockResponse = [
        { id: 1, name: 'Popular Song 1' },
        { id: 2, name: 'Popular Song 2' },
      ];
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });
  
      // Act
      const result = await RecommendationPopularApi(token);
  
      // Assert
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/recommendation/popular',
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
  
      // Ensure that JSON.stringify is applied to the mockResponse
      const fetchOptions = global.fetch.mock.calls[0][1];
      expect(fetchOptions.body).toBeUndefined(); // Make sure body is undefined
  
      // Check that the result matches the mockResponse
      expect(result).toEqual(mockResponse);
    });
  
    it('should log the URL and auth information', async () => {
      // Arrange
      const token = 'mockToken';
  
      // Mock fetch for a successful response
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([]),
      });
  
      // Act
      await RecommendationPopularApi(token);
  
      // Assert
      expect(global.console.log).toHaveBeenCalledWith('url RECOMMENDATION', expect.any(String));
      expect(global.console.log).toHaveBeenCalledWith('auth', expect.any(String));
    });
  
    it('should handle errors when response is not ok', async () => {
      // Arrange
      const token = 'mockToken';
  
      // Mock fetch for a failure response
      global.fetch.mockResolvedValueOnce({
        ok: false,
        text: () => Promise.resolve('Error message'),
      });
  
      // Act & Assert
      await expect(RecommendationPopularApi(token)).rejects.toThrow('Network response is not ok');
    });
  
    it('should handle errors and log them', async () => {
      // Arrange
      const token = 'mockToken';
  
      // Mock fetch for a network error
      global.fetch.mockRejectedValueOnce(new Error('Network error'));
  
      // Act
      await RecommendationPopularApi(token);
  
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
  
      // Mock fetch for a successful response with invalid JSON
      global.fetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve('Invalid JSON'),
      });
  
      // Act
      await RecommendationPopularApi(token);
  
      // Assert
      expect(global.fetch).toHaveBeenCalled();
      expect(global.console.error).toHaveBeenCalledWith(
        'error parsing response JSON:',
        expect.any(SyntaxError)
      );
    });

    
  });
  