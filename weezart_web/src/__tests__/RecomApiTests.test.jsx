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
    const token = 'mockToken';
    const userId = 'friend123';
  
    // Spy on console.log
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  
    // Mock fetch for a successful response
    const mockResponse = [
      { id: 1, name: 'Song 1' },
      { id: 2, name: 'Song 2' },
    ];
   global.fetch = jest.fn().mockResolvedValue({
      ok: true, 
      text: () => Promise.resolve(JSON.stringify( mockResponse)),
    });
  
    const result = await RecommendationFriendApi(token, userId);
  
    expect(result).toEqual(mockResponse);
    expect(consoleSpy).toHaveBeenCalledWith(
      "friend api içinde --> ", "[{\"id\":1,\"name\":\"Song 1\"},{\"id\":2,\"name\":\"Song 2\"}]", " - ", "string"
    );

  });

  it('should handle errors when response is not ok', async () => {
    // Arrange
    const token = 'mockToken';
    const userId = 'friend123';

    // Mock fetch for a failure response
    global.fetch.mockRejectedValueOnce({
      ok: false,
      text: () => Promise.resolve('Error message'),
    });

    // Act & Assert
    await expect(RecommendationFriendApi(token, userId)).rejects.toMatch(
      'Network response is not ok'
    );
  });
  test('should return exception when response is not ok ', async () => {
    const mockResponse = {
      ok: false,
      status: 403,
      text: jest.fn(() => Promise.resolve('Song not found')),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await expect(RecommendationFriendApi('token','a')).rejects.toMatch('Network response is not ok');
    
  });

  it('should handle errors and log them', async () => {
    // Arrange
    const token = 'mockToken';
    const userId = 'friend123';

    // Mock fetch for a network error
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(RecommendationFriendApi(token, userId)).rejects.toMatch(
      'Network response is not ok'
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

    await expect(RecommendationFriendApi(token,userId)).rejects.toMatch('Network response is not ok');

  });

  it('should handle errors and log them when response parsing fails with empty response', async () => {
    // Arrange
    const token = 'mockToken';
    const userId = 'friend123';

    // Mock fetch for a successful response with empty JSON
    global.fetch.mockRejectedValueOnce({
      ok: true,
      text: () => Promise.resolve(''),
    });

    // Act
    await expect(RecommendationFriendApi(token,userId)).rejects.toMatch('Network response is not ok');

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

    await expect(RecommendationFriendApi(token,userId)).rejects.toMatch('Network response is not ok');

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
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(JSON.stringify(mockResponse)),
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

  test('should return exception when response is not ok ', async () => {
    const mockResponse = {
      ok: false,
      status: 403,
      text: jest.fn(() => Promise.resolve('Song not found')),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await expect(RecomReleaseDateApi('token','a')).rejects.toMatch('Network response is not ok');
    
  });

  it('should handle errors when response is not ok', async () => {
    // Arrange
    const token = 'mockToken';
    const userId = 'user123';

    // Mock fetch for a failure response
    global.fetch.mockRejectedValueOnce({
      ok: false,
      text: () => Promise.resolve('Error message'),
    });

    // Act & Assert
    await expect(RecomReleaseDateApi(token, userId)).rejects.toMatch(
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


    await expect( RecomReleaseDateApi(token, userId)).rejects.toMatch(
      'Network response is not ok'
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
    await expect(RecomReleaseDateApi(token,userId)).rejects.toMatch('Network response is not ok');


    
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
    await expect(RecomReleaseDateApi(token,userId)).rejects.toMatch('Network response is not ok');


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
    global.fetch = jest.fn().mockResolvedValue({
      ok: true, 
      text: () => Promise.resolve(JSON.stringify( mockResponse)),
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

  test('should return exception when response is not ok ', async () => {
    const mockResponse = {
      ok: false,
      status: 403,
      text: jest.fn(() => Promise.resolve('Song not found')),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await expect(RecommendationGenreArtistApi('token','a')).rejects.toMatch('Network response is not ok');
    
  });

  it('should handle errors when response is not ok', async () => {
    // Arrange
    const token = 'mockToken';
    const userId = 'user123';

    // Mock fetch for a failure response
    global.fetch.mockRejectedValueOnce({
      ok: false,
      text: () => Promise.resolve('Error message'),
    });

    // Act & Assert
    await expect(RecommendationGenreArtistApi(token, userId)).rejects.toMatch(
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
    await expect(RecommendationGenreArtistApi(token, userId)).rejects.toMatch(
      'Network response is not ok'
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
    await expect(RecommendationGenreArtistApi(token, userId)).rejects.toMatch(
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

    await expect(RecommendationGenreArtistApi(token, userId)).rejects.toMatch(
      'Network response is not ok'
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
    global.fetch = jest.fn().mockResolvedValue({
      ok: true, 
      text: () => Promise.resolve(JSON.stringify( mockResponse)),
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


  test('should return exception when response is not ok ', async () => {
    const mockResponse = {
      ok: false,
      status: 403,
      text: jest.fn(() => Promise.resolve('Song not found')),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await expect(RecommendationHotApi('token','a')).rejects.toMatch('Network response is not ok');
    
  });
  it('should log the URL and auth information', async () => {
    // Arrange
    const token = 'mockToken';
    const userId = 'user123';

    // Mock fetch for a successful response
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(JSON.stringify({ /* mock response data */ })),
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
    global.fetch.mockRejectedValueOnce({
      ok: false,
      text: () => Promise.resolve('Error message'),
    });

    // Act & Assert
    await expect(RecommendationHotApi(token, userId)).rejects.toMatch(
      'Network response is not ok'
    );
  });

  it('should handle errors and log them', async () => {
    // Arrange
    const token = 'mockToken';
    const userId = 'user123';

    // Mock fetch for a network error
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(RecommendationHotApi(token, userId)).rejects.toMatch(
      'Network response is not ok'
    );
  });

  it('should handle errors and log them when response parsing fails', async () => {
    // Arrange
    const token = 'mockToken';
    const userId = 'user123';

    // Mock fetch for a successful response with invalid JSON
    global.fetch.mockRejectedValueOnce({
      ok: true,
      text: () => Promise.resolve('Invalid JSON'),
    });

    // Act

    // Assert
    await expect(RecommendationHotApi(token, userId)).rejects.toMatch(
      'Network response is not ok'
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
      global.fetch = jest.fn().mockResolvedValue({
        ok: true, 
        text: () => Promise.resolve(JSON.stringify( mockResponse)),
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


    test('should return exception when response is not ok ', async () => {
      const mockResponse = {
        ok: false,
        status: 403,
        text: jest.fn(() => Promise.resolve('Song not found')),
      };
  
      global.fetch.mockResolvedValueOnce(mockResponse);
  
      await expect(RecommendationPopularApi('token')).rejects.toMatch('Network response is not ok');
      
    });
  
    it('should log the URL and auth information', async () => {
      // Arrange
      const token = 'mockToken';
  
      // Mock fetch for a successful response
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify({ /* mock response data */ })),
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
      global.fetch.mockRejectedValueOnce({
        ok: false,
        text: () => Promise.resolve('Error message'),
      });
  
      // Act & Assert
      await expect(RecommendationPopularApi(token)).rejects.toMatch('Network response is not ok');
    });
  
    it('should handle errors and log them', async () => {
      // Arrange
      const token = 'mockToken';
  
      // Mock fetch for a network error
      global.fetch.mockRejectedValueOnce(new Error('Network error'));
  
      await expect(RecommendationPopularApi(token)).rejects.toMatch('Network response is not ok');

    });
  
    it('should handle errors and log them when response parsing fails', async () => {
      // Arrange
      const token = 'mockToken';
  
      // Mock fetch for a successful response with invalid JSON
      global.fetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve('Invalid JSON'),
      });
  
      await expect(RecommendationPopularApi(token)).rejects.toMatch('Network response is not ok');

    });

    
  });
  