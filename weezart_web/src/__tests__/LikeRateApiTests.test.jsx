import LikeAlbumApi from "../API/LikeAlbumApi";
import LikeArtistApi from "../API/LikeArtistApi";
import LikeSongApi from "../API/LikeSongApi";
import RateAlbumApi from "../API/RateAlbumApi";
import RateArtistApi from "../API/RateArtistApi";
import RateSongApi from "../API/RateSongApi";
import RateCheckApi from "../API/RateCheckApi";
import IsLikedApi from "../API/IsLikedApi";

describe('LikeAlbumApi', () => {
  const mockToken = 'your_mock_token';
  const mockUserId = 'mockUserId';
  const mockAlbumInfo = {
    id: 'your_id_value',    
    name: 'your_name_value',
    imageUrl: 'your_image_url_value',
    releaseDate: 'your_release_date_value',
    numberOfTracks: 10,
    artistsName: ['artist1_name', 'artist2_name'],
    artistsId: ['artist1_id', 'artist2_id'],
    songsName: ['song1_name', 'song2_name'],
    songsId: ['song1_id', 'song2_id'],
  };

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
    const expectedUrl = `http://localhost:8080/like/album/${mockUserId}`;
    const expectedHeaders = {
      accept: 'application/json',
      'Authorization': 'Bearer ' + mockToken,
      'Content-Type': 'application/json'
    };

    const mockResponseData = { status: 'success' };
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve(JSON.stringify(mockResponseData))),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await LikeAlbumApi(mockToken, mockUserId, mockAlbumInfo);

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
      method: 'POST',
      headers: expectedHeaders,
      body: JSON.stringify(mockAlbumInfo),
      mode: 'cors',
      credentials: 'include',
    });
  });

  test('should log the response data to the console for a successful request', async () => {
    const mockResponseData = { status: 'success' };
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve(JSON.stringify(mockResponseData))),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await LikeAlbumApi(mockToken, mockUserId, mockAlbumInfo);

    expect(console.log).toHaveBeenCalledWith(mockResponseData);
  });

  test('should throw an error when the network response is not ok', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      text: jest.fn(() => Promise.resolve('Internal Server Error')),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await expect(LikeAlbumApi(mockToken, mockUserId, mockAlbumInfo)).rejects.toThrow('Network response is not ok');
  });

  test('should log an error when an exception occurs during the API call', async () => {
    const errorMessage = 'Test error';
    global.fetch.mockRejectedValueOnce(new Error(errorMessage));

    await LikeAlbumApi(mockToken, mockUserId, mockAlbumInfo);

    expect(console.error).toHaveBeenCalledWith('error in fetching data:', expect.any(Error));
  });

  test('should log an error when the response is not valid JSON', async () => {
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve('Invalid JSON')),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await LikeAlbumApi(mockToken, mockUserId, mockAlbumInfo);

    expect(console.error).toHaveBeenCalledWith('error in fetching data:', expect.any(SyntaxError));
  });
});


//----------------------------------
//-------------------------------------

describe('LikeArtistApi', () => {
  const mockToken = 'your_mock_token';
  const mockUserId = 'mockUserId';
  const mockArtistInfo = {
    id: 'your_id_value',
    name: 'your_name_value',
    genres: ['genre1', 'genre2', 'genre3'],
    imageUrl: 'your_image_url_value',
    followerCount: 1000,
  };

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
    const expectedUrl = `http://localhost:8080/like/artist/${mockUserId}`;
    const expectedHeaders = {
      accept: 'application/json',
      'Authorization': 'Bearer ' + mockToken,
      'Content-Type': 'application/json',
    };

    const mockResponseData = { status: 'success' };
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve(JSON.stringify(mockResponseData))),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await LikeArtistApi(mockToken, mockUserId, mockArtistInfo);

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
      method: 'POST',
      headers: expectedHeaders,
      body: JSON.stringify(mockArtistInfo),
      mode: 'cors',
      credentials: 'include',
    });
  });

  test('should log the response data to the console for a successful request', async () => {
    const mockResponseData = { status: 'success' };
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve(JSON.stringify(mockResponseData))),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await LikeArtistApi(mockToken, mockUserId, mockArtistInfo);

    expect(console.log).toHaveBeenCalledWith(mockResponseData);
  });

  test('should throw an error when the network response is not ok', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      text: jest.fn(() => Promise.resolve('Internal Server Error')),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await expect(LikeArtistApi(mockToken, mockUserId, mockArtistInfo)).rejects.toThrow('Network response is not ok');
  });

  test('should log an error when an exception occurs during the API call', async () => {
    const errorMessage = 'Test error';
    global.fetch.mockRejectedValueOnce(new Error(errorMessage));

    await LikeArtistApi(mockToken, mockUserId, mockArtistInfo);

    expect(console.error).toHaveBeenCalledWith('error in fetching data:', expect.any(Error));
  });

  test('should log an error when the response is not valid JSON', async () => {
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve('Invalid JSON')),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await LikeArtistApi(mockToken, mockUserId, mockArtistInfo);

    expect(console.error).toHaveBeenCalledWith('error in fetching data:', expect.any(SyntaxError));
  });
});




//-----------------------------
//------------------------------


describe('LikeSongApi', () => {
  const mockToken = 'your_mock_token';
  const mockUserId = 'mockUserId';
  const mockSongInfo = {
    id: 'your_id_value',
    name: 'your_name_value',
    albumName: 'your_album_name_value',
    albumId: 'your_album_id_value',
    albumImageURL: 'your_album_image_url_value',
    artistsName: ['artist1_name_value', 'artist2_name_value'],
    artistsId: ['artist1_id_value', 'artist2_id_value'],
    popularity: 80,
    duration_ms: 240000,
    explicit: true,
    albumRelease: '2022-01-01',
  };

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
    const expectedUrl = `http://localhost:8080/like/song/${mockUserId}`;
    const expectedHeaders = {
      accept: 'application/json',
      'Authorization': 'Bearer ' + mockToken,
      'Content-Type': 'application/json',
    };

    const mockResponseData = { status: 'success' };
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve(JSON.stringify(mockResponseData))),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await LikeSongApi(mockToken, mockUserId, mockSongInfo);

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
      method: 'POST',
      headers: expectedHeaders,
      body: JSON.stringify(mockSongInfo),
      mode: 'cors',
      credentials: 'include',
    });
  });

  test('should log the response data to the console for a successful request', async () => {
    const mockResponseData = { status: 'success' };
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve(JSON.stringify(mockResponseData))),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await LikeSongApi(mockToken, mockUserId, mockSongInfo);

    expect(console.log).toHaveBeenCalledWith(mockResponseData);
  });

  test('should throw an error when the network response is not ok', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      text: jest.fn(() => Promise.resolve('Internal Server Error')),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await expect(LikeSongApi(mockToken, mockUserId, mockSongInfo)).rejects.toThrow('Network response is not ok');
  });

  test('should log an error when an exception occurs during the API call', async () => {
    const errorMessage = 'Test error';
    global.fetch.mockRejectedValueOnce(new Error(errorMessage));

    await LikeSongApi(mockToken, mockUserId, mockSongInfo);

    expect(console.error).toHaveBeenCalledWith('error in fetching data:', expect.any(Error));
  });

  test('should log an error when the response is not valid JSON', async () => {
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve('Invalid JSON')),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await LikeSongApi(mockToken, mockUserId, mockSongInfo);

    expect(console.error).toHaveBeenCalledWith('error in fetching data:', expect.any(SyntaxError));
  });
});

//---------------------------------------
//------------------------------


describe('RateAlbumApi', () => {
  const mockToken = 'your_mock_token';
  const mockUserId = 'mockUserId';
  const mockAlbumInfo = {
    id: 'your_id_value',
    name: 'your_name_value',
    imageUrl: 'your_image_url_value',
    releaseDate: 'your_release_date_value',
    numberOfTracks: 10,
    artistsName: ['artist1_name', 'artist2_name'],
    artistsId: ['artist1_id', 'artist2_id'],
    songsName: ['song1_name', 'song2_name'],
    songsId: ['song1_id', 'song2_id'],
  };
  const mockRating = 5;

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
    const expectedUrl = `http://localhost:8080/rate/album/${mockUserId}/${mockRating}`;
    const expectedHeaders = {
      accept: 'application/json',
      'Authorization': 'Bearer ' + mockToken,
      'Content-Type': 'application/json',
    };

    const mockResponseData = { status: 'success' };
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve(JSON.stringify(mockResponseData))),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await RateAlbumApi(mockToken, mockUserId, mockAlbumInfo, mockRating);

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
      method: 'POST',
      headers: expectedHeaders,
      body: JSON.stringify(mockAlbumInfo),
      mode: 'cors',
      credentials: 'include',
    });
  });

  test('should log the response data to the console for a successful request', async () => {
    const mockResponseData = { status: 'success' };
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve(JSON.stringify(mockResponseData))),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await RateAlbumApi(mockToken, mockUserId, mockAlbumInfo, mockRating);

    expect(console.log).toHaveBeenCalledWith(mockResponseData);
  });

  test('should throw an error when the network response is not ok', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      text: jest.fn(() => Promise.resolve('Internal Server Error')),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await expect(RateAlbumApi(mockToken, mockUserId, mockAlbumInfo, mockRating)).rejects.toThrow('Network response is not ok');
  });

  test('should log an error when an exception occurs during the API call', async () => {
    const errorMessage = 'Test error';
    global.fetch.mockRejectedValueOnce(new Error(errorMessage));

    await RateAlbumApi(mockToken, mockUserId, mockAlbumInfo, mockRating);

    expect(console.error).toHaveBeenCalledWith('error in fetching data:', expect.any(Error));
  });

  test('should log an error when the response is not valid JSON', async () => {
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve('Invalid JSON')),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await RateAlbumApi(mockToken, mockUserId, mockAlbumInfo, mockRating);

    expect(console.error).toHaveBeenCalledWith('error in fetching data:', expect.any(SyntaxError));
  });
});


//--------------------------------------
//------------------------------------


describe('RateArtistApi', () => {
    const mockToken = 'your_mock_token';
    const mockUserId = 'mockUserId';
    const mockArtistInfo = {
      id: 'your_id_value',
      name: 'your_name_value',
      genres: ['genre1', 'genre2', 'genre3'],
      imageUrl: 'your_image_url_value',
      followerCount: 1000,
    };
    const mockRating = 5;
  
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
      const expectedUrl = `http://localhost:8080/rate/artist/${mockUserId}/${mockRating}`;
      const expectedHeaders = {
        accept: 'application/json',
        'Authorization': 'Bearer ' + mockToken,
        'Content-Type': 'application/json',
      };
  
      const mockResponseData = { status: 'success' };
      const mockResponse = {
        ok: true,
        text: jest.fn(() => Promise.resolve(JSON.stringify(mockResponseData))),
      };
  
      global.fetch.mockResolvedValueOnce(mockResponse);
  
      await RateArtistApi(mockToken, mockUserId, mockArtistInfo, mockRating);
  
      expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
        method: 'POST',
        headers: expectedHeaders,
        body: JSON.stringify(mockArtistInfo),
        mode: 'cors',
        credentials: 'include',
      });
    });
  
    test('should log the response data to the console for a successful request', async () => {
      const mockResponseData = { status: 'success' };
      const mockResponse = {
        ok: true,
        text: jest.fn(() => Promise.resolve(JSON.stringify(mockResponseData))),
      };
  
      global.fetch.mockResolvedValueOnce(mockResponse);
  
      await RateArtistApi(mockToken, mockUserId, mockArtistInfo, mockRating);
  
      expect(console.log).toHaveBeenCalledWith(mockResponseData);
    });
  
    test('should throw an error when the network response is not ok', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        text: jest.fn(() => Promise.resolve('Internal Server Error')),
      };
  
      global.fetch.mockResolvedValueOnce(mockResponse);
  
      await expect(RateArtistApi(mockToken, mockUserId, mockArtistInfo, mockRating)).rejects.toThrow('Network response is not ok');
    });
  
    test('should log an error when an exception occurs during the API call', async () => {
      const errorMessage = 'Test error';
      global.fetch.mockRejectedValueOnce(new Error(errorMessage));
  
      await RateArtistApi(mockToken, mockUserId, mockArtistInfo, mockRating);
  
      expect(console.error).toHaveBeenCalledWith('error in fetching data:', expect.any(Error));
    });
  
    test('should log an error when the response is not valid JSON', async () => {
      const mockResponse = {
        ok: true,
        text: jest.fn(() => Promise.resolve('Invalid JSON')),
      };
  
      global.fetch.mockResolvedValueOnce(mockResponse);
  
      await RateArtistApi(mockToken, mockUserId, mockArtistInfo, mockRating);
  
      expect(console.error).toHaveBeenCalledWith('error in fetching data:', expect.any(SyntaxError));
    });
  });

  //---------------------------------
  //----------------------------------


describe('RateSongApi', () => {
  const mockToken = 'your_mock_token';
  const mockUserId = 'mockUserId';
  const mockSongInfo = {
    id: 'your_id_value',
    name: 'your_name_value',
    albumName: 'your_album_name_value',
    albumId: 'your_album_id_value',
    albumImageURL: 'your_album_image_url_value',
    artistsName: ['artist1_name_value', 'artist2_name_value'],
    artistsId: ['artist1_id_value', 'artist2_id_value'],
    popularity: 80,
    duration_ms: 240000,
    explicit: true,
    albumRelease: '2022-01-01',
  };
  const mockRating = 5;

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
    const expectedUrl = `http://localhost:8080/rate/song/${mockUserId}/${mockRating}`;
    const expectedHeaders = {
      accept: 'application/json',
      'Authorization': 'Bearer ' + mockToken,
      'Content-Type': 'application/json',
    };

    const mockResponseData = { status: 'success' };
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve(JSON.stringify(mockResponseData))),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await RateSongApi(mockToken, mockUserId, mockSongInfo, mockRating);

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
      method: 'POST',
      headers: expectedHeaders,
      body: JSON.stringify(mockSongInfo),
      mode: 'cors',
      credentials: 'include',
    });
  });

  test('should log the response data to the console for a successful request', async () => {
    const mockResponseData = { status: 'success' };
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve(JSON.stringify(mockResponseData))),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await RateSongApi(mockToken, mockUserId, mockSongInfo, mockRating);

    expect(console.log).toHaveBeenCalledWith(mockResponseData);
  });

  test('should throw an error when the network response is not ok', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      text: jest.fn(() => Promise.resolve('Internal Server Error')),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await expect(RateSongApi(mockToken, mockUserId, mockSongInfo, mockRating)).rejects.toThrow('Network response is not ok');
  });

  test('should log an error when an exception occurs during the API call', async () => {
    const errorMessage = 'Test error';
    global.fetch.mockRejectedValueOnce(new Error(errorMessage));

    await RateSongApi(mockToken, mockUserId, mockSongInfo, mockRating);

    expect(console.error).toHaveBeenCalledWith('error in fetching data:', expect.any(Error));
  });

  test('should log an error when the response is not valid JSON', async () => {
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve('Invalid JSON')),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await RateSongApi(mockToken, mockUserId, mockSongInfo, mockRating);

    expect(console.error).toHaveBeenCalledWith('error in fetching data:', expect.any(SyntaxError));
  });
});



//--------------------------------
//--------------------

describe('RateCheckApi', () => {
  const mockToken = 'your_mock_token';
  const mockUserId = 'mockUserId';
  const mockSongId = 'your_song_id';

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

  test('should make a GET request with the correct parameters', async () => {
    const expectedUrl = `http://localhost:8080/rate/song/get-rate-info/${mockSongId}/${mockUserId}`;
    const expectedHeaders = {
      accept: 'application/json',
      'Authorization': 'Bearer ' + mockToken,
      'Content-Type': 'application/json',
    };

    const mockResponseData = { status: 'success' };
    const mockResponse = {
      ok: true,
      json: jest.fn(() => Promise.resolve(mockResponseData)),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await RateCheckApi(mockToken, mockUserId, mockSongId);

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
      method: 'GET',
      headers: expectedHeaders,
      mode: 'cors',
      credentials: 'include',
    });
  });

  test('should return the response data for a successful request', async () => {
    const mockResponseData = { status: 'success' };
    const mockResponse = {
      ok: true,
      json: jest.fn(() => Promise.resolve(mockResponseData)),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    const result = await RateCheckApi(mockToken, mockUserId, mockSongId);

    expect(result).toEqual(mockResponseData);
  });

  test('should throw an error when the network response is not ok', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      json: jest.fn(() => Promise.resolve({ error: 'Internal Server Error' })),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await expect(RateCheckApi(mockToken, mockUserId, mockSongId)).rejects.toThrow('Network response is not ok');
  });

  test('should log an error when an exception occurs during the API call', async () => {
    const errorMessage = 'Test error';
    global.fetch.mockRejectedValueOnce(new Error(errorMessage));

    await RateCheckApi(mockToken, mockUserId, mockSongId);

    expect(console.error).toHaveBeenCalledWith('error in fetching data:', expect.any(Error));
  });

  test('should log an error when the response is not valid JSON', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn(() => Promise.resolve('Invalid JSON')),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await RateCheckApi(mockToken, mockUserId, mockSongId);

    expect(console.error).toHaveBeenCalledWith('error in fetching data:', expect.any(SyntaxError));
  });
});


//-----------------------------------------------------
//--------------------------------------------

describe('IsLikedApi', () => {
  const mockToken = 'your_mock_token';
  const mockUserId = 'mockUserId';
  const mockSongId = 'your_song_id';

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

  test('should make a GET request with the correct parameters', async () => {
    const expectedUrl = `http://localhost:8080/like/song/get-like-info/${mockSongId}/${mockUserId}`;
    const expectedHeaders = {
      accept: 'application/json',
      'Authorization': 'Bearer ' + mockToken,
      'Content-Type': 'application/json',
    };

    const mockResponseData = 'true'; // or 'false' or any other string value
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve(mockResponseData)),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await IsLikedApi(mockToken, mockUserId, mockSongId);

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
      method: 'GET',
      headers: expectedHeaders,
      mode: 'cors',
      credentials: 'include',
    });
  });

  test('should return true when the response is "true"', async () => {
    const mockResponseData = 'true';
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve(mockResponseData)),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    const result = await IsLikedApi(mockToken, mockUserId, mockSongId);

    expect(result).toBe(true);
  });

  test('should return false when the response is "false"', async () => {
    const mockResponseData = 'false';
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve(mockResponseData)),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    const result = await IsLikedApi(mockToken, mockUserId, mockSongId);

    expect(result).toBe(false);
  });

  test('should return the raw data when the response is neither "true" nor "false"', async () => {
    const mockResponseData = 'other_value';
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve(mockResponseData)),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    const result = await IsLikedApi(mockToken, mockUserId, mockSongId);

    expect(result).toBe(mockResponseData);
  });

  test('should throw an error when the network response is not ok', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      text: jest.fn(() => Promise.resolve('Internal Server Error')),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await expect(IsLikedApi(mockToken, mockUserId, mockSongId)).rejects.toThrow('Network response is not ok');
  });

  test('should log an error when an exception occurs during the API call', async () => {
    const errorMessage = 'Test error';
    global.fetch.mockRejectedValueOnce(new Error(errorMessage));

    await IsLikedApi(mockToken, mockUserId, mockSongId);

    expect(console.error).toHaveBeenCalledWith('error in fetching data:', expect.any(Error));
  });
});
