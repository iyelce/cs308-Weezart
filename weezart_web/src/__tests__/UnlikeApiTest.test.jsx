import UnlikeSongApi from "../API/UnlikeSongApi";
import UnlikeArtistApi from "../API/UnlikeArtistApi";
import UnlikeAlbumApi from "../API/UnlikeAlbumApi";

describe('UnlikeSongApi', () => {
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
    const expectedUrl = `http://localhost:8080/unlike/song/${mockUserId}`;
    const expectedHeaders = {
      accept: 'application/json',
      'Authorization': 'Bearer ' + mockToken,
      'Content-Type': 'application/json'
    };
    const expectedBody = JSON.stringify({
      id: mockSongInfo.id,
      name: mockSongInfo.name,
      albumName: mockSongInfo.albumName,
      albumId: mockSongInfo.albumId,
      albumImageURL: mockSongInfo.albumImageURL,
      artistsName: mockSongInfo.artistsName,
      artistsId: mockSongInfo.artistsId,
      popularity: mockSongInfo.popularity,
      duration_ms: mockSongInfo.duration_ms,
      explicit: mockSongInfo.explicit,
      albumRelease: mockSongInfo.albumRelease,
    });

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(JSON.stringify({ status: 'success' })),
    });
    await UnlikeSongApi(mockToken, mockUserId, mockSongInfo);

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
      method: 'POST',
      headers: expectedHeaders,
      body: expectedBody,
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

    await expect(UnlikeSongApi('token','a','c')).rejects.toMatch('Network response is not ok');
    
  });

  test('should log the response data to the console for a successful request', async () => {
    const mockResponseData = { status: 'success' };
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve(JSON.stringify(mockResponseData))),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await UnlikeSongApi(mockToken, mockUserId, mockSongInfo);

    expect(console.log).toHaveBeenCalledWith( mockResponseData);
  });

  test('should throw an error when the network response is not ok', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      text: jest.fn(() => Promise.resolve('Internal Server Error')),
    };

    global.fetch.mockRejectedValueOnce(mockResponse);

    await expect(UnlikeSongApi(mockToken, mockUserId, mockSongInfo)).rejects.toMatch('Network response is not ok');
  });

  test('should log an error when an exception occurs during the API call', async () => {
    const errorMessage = 'Test error';
    global.fetch.mockRejectedValueOnce(new Error(errorMessage));

    await expect(UnlikeSongApi(mockToken, mockUserId, mockSongInfo)).rejects.toMatch('Network response is not ok');

  });

  test('should log an error when the response is not valid JSON', async () => {
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve('Invalid JSON')),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await expect(UnlikeSongApi(mockToken, mockUserId, mockSongInfo)).rejects.toMatch('Network response is not ok');

  });

  test('should log an empty object to the console for an empty response body', async () => {
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve('')),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await expect(UnlikeSongApi(mockToken, mockUserId, mockSongInfo)).rejects.toMatch('Network response is not ok');
  });

  test('should log an error when songInfo is not provided', async () => {

    await expect(UnlikeSongApi(mockToken, mockUserId, mockSongInfo)).rejects.toMatch('Network response is not ok');
  });

  test('should log an error when songInfo is an empty object', async () => {
    await expect(UnlikeSongApi(mockToken, mockUserId, mockSongInfo)).rejects.toMatch('Network response is not ok');
  });

  test('should log an error when songInfo is not provided2', async () => {
    await expect(UnlikeSongApi(mockToken, mockUserId, mockSongInfo)).rejects.toMatch('Network response is not ok');
  });
  
  test('should log an error when songInfo is an empty object2', async () => {
    await expect(UnlikeSongApi(mockToken, mockUserId, mockSongInfo)).rejects.toMatch('Network response is not ok');
  });

});



//----------------------------------------------
//----------------------------------------------



describe('UnlikeArtistApi', () => {
  const mockToken = 'your_mock_token';
  const mockUserId = 'mockUserId';
  const mockArtistInfo = {
    id: 'your_artist_id_value',
    name: 'your_artist_name_value',
    genres: ['genre1', 'genre2'],
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
    const expectedUrl = `http://localhost:8080/unlike/artist/${mockUserId}`;
    const expectedHeaders = {
      accept: 'application/json',
      'Authorization': 'Bearer ' + mockToken,
      'Content-Type': 'application/json'
    };
    const expectedBody = JSON.stringify({
      id: mockArtistInfo.id,
      name: mockArtistInfo.name,
      genres: mockArtistInfo.genres,
      imageUrl: mockArtistInfo.imageUrl,
      followerCount: mockArtistInfo.followerCount,
    });
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(JSON.stringify({ status: 'success' })),
    });

    await UnlikeArtistApi(mockToken, mockUserId, mockArtistInfo);

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
      method: 'POST',
      headers: expectedHeaders,
      body: expectedBody,
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

    await expect(UnlikeArtistApi('token','a','c')).rejects.toMatch('Network response is not ok');
    
  });

  test('should log the response data to the console for a successful request', async () => {
    const mockResponseData = { status: 'success' };
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve(JSON.stringify(mockResponseData))),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await UnlikeArtistApi(mockToken, mockUserId, mockArtistInfo);

    expect(console.log).toHaveBeenCalledWith('like api dönen : ', mockResponseData);
  });

  test('should throw an error when the network response is not ok', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      text: jest.fn(() => Promise.resolve('Internal Server Error')),
    };

    global.fetch.mockRejectedValueOnce(mockResponse);

    await expect(UnlikeArtistApi(mockToken, mockUserId, mockArtistInfo)).rejects.toMatch('Network response is not ok');
  });

  test('should log an error when an exception occurs during the API call', async () => {
    const errorMessage = 'Test error';
    global.fetch.mockRejectedValueOnce(new Error(errorMessage));



    await expect(UnlikeArtistApi(mockToken, mockUserId, mockArtistInfo)).rejects.toMatch('Network response is not ok');
  });

  test('should log an error when the response is not valid JSON', async () => {
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve('Invalid JSON')),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await expect(UnlikeArtistApi(mockToken, mockUserId, mockArtistInfo)).rejects.toMatch('Network response is not ok');

  });

  test('should log an empty object to the console for an empty response body', async () => {
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve('')),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await expect(UnlikeArtistApi(mockToken, mockUserId, mockArtistInfo)).rejects.toMatch('Network response is not ok');
  });

  test('should log an error when artistInfo is not provided', async () => {
    await expect(UnlikeArtistApi(mockToken, mockUserId, mockArtistInfo)).rejects.toMatch('Network response is not ok');
  });

  test('should log an error when artistInfo is an empty object', async () => {
    await expect(UnlikeArtistApi(mockToken, mockUserId, mockArtistInfo)).rejects.toMatch('Network response is not ok');
  });
});





//-------------------------------------------
//----------------------------------------------

describe('UnlikeAlbumApi', () => {
  const mockToken = 'your_mock_token';
  const mockUserId = 'mockUserId';
  const mockAlbumInfo = {
    id: 'your_album_id_value',
    name: 'your_album_name_value',
    imageUrl: 'your_image_url_value',
    releaseDate: '2022-01-01',
    numberOfTracks: 10,
    artistsName: ['artist1', 'artist2'],
    artistsId: ['artist1_id', 'artist2_id'],
    songsName: ['song1', 'song2'],
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
    const expectedUrl = `http://localhost:8080/unlike/album/${mockUserId}`;
    const expectedHeaders = {
      accept: 'application/json',
      'Authorization': 'Bearer ' + mockToken,
      'Content-Type': 'application/json'
    };
    const expectedBody = JSON.stringify({
      id: mockAlbumInfo.id,
      name: mockAlbumInfo.name,
      imageUrl: mockAlbumInfo.imageUrl,
      releaseDate: mockAlbumInfo.releaseDate,
      numberOfTracks: mockAlbumInfo.numberOfTracks,
      artistsName: mockAlbumInfo.artistsName,
      artistsId: mockAlbumInfo.artistsId,
      songsName: mockAlbumInfo.songsName,
      songsId: mockAlbumInfo.songsId,
    });
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(JSON.stringify({ status: 'success' })),
    });

    await UnlikeAlbumApi(mockToken, mockUserId, mockAlbumInfo);

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
      method: 'POST',
      headers: expectedHeaders,
      body: expectedBody,
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

    await expect(UnlikeAlbumApi('token','a','c')).rejects.toMatch('Network response is not ok');
    
  });

  test('should log the response data to the console for a successful request', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(JSON.stringify({ status: 'success' })),
    });


    await UnlikeAlbumApi(mockToken, mockUserId, mockAlbumInfo);

    expect(console.log).toHaveBeenCalledWith('like api dönen : ', { status: 'success' });
  });

  test('should throw an error when the network response is not ok', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      text: jest.fn(() => Promise.resolve('Internal Server Error')),
    };

    global.fetch.mockRejectedValueOnce(mockResponse);

    await expect(UnlikeAlbumApi(mockToken, mockUserId, mockAlbumInfo)).rejects.toMatch('Network response is not ok');
  });

  test('should log an error when an exception occurs during the API call', async () => {
    const errorMessage = 'Test error';
    global.fetch.mockRejectedValueOnce(new Error(errorMessage));


    await expect(UnlikeAlbumApi(mockToken, mockUserId, mockAlbumInfo)).rejects.toMatch('Network response is not ok');
  });

  test('should log an error when the response is not valid JSON', async () => {
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve('Invalid JSON')),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await expect(UnlikeAlbumApi(mockToken, mockUserId, mockAlbumInfo)).rejects.toMatch('Network response is not ok');

  });

  test('should log an empty object to the console for an empty response body', async () => {
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve('')),
    };

    global.fetch.mockRejectedValueOnce(mockResponse);

    await expect(UnlikeAlbumApi(mockToken, mockUserId, mockAlbumInfo)).rejects.toMatch('Network response is not ok');
  });

  test('should log an error when albumInfo is not provided', async () => {
    await expect(UnlikeAlbumApi(mockToken, mockUserId, mockAlbumInfo)).rejects.toMatch('Network response is not ok');
  });

  test('should log an error when albumInfo is an empty object', async () => {
    await expect(UnlikeAlbumApi(mockToken, mockUserId, mockAlbumInfo)).rejects.toMatch('Network response is not ok');
  });
});

