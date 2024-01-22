import AddingAcceptedSong from "../API/AddingAcceptedSong";
import AddingSongManuallyApi from "../API/AddingSongManuallyApi";
import AddingUniqueSongApi from "../API/AddingUniqueSongApi";

describe('AddingAcceptedSong', () => {
  const mockToken = 'your_mock_token';
  const mockUserId = 'mockUserId';
  const mockSongInfo = {
    id: 'your_song_id',
    name: 'your_song_name',
    albumName: 'your_album_name',
    albumId: 'your_album_id',
    artistsName: ['artist1_name', 'artist2_name'],
    artistsId: ['artist1_id', 'artist2_id'],
    popularity: 80,
    duration_ms: 240000,
    explicit: true,
    albumRelease: '2022-01-01',
    albumImageURL: 'your_album_image_url',
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
    const expectedUrl = `http://localhost:8080/add/manual-song-accepted/${mockUserId}`;
    const expectedHeaders = {
      accept: 'application/json',
      'Authorization': 'Bearer ' + mockToken,
      'Content-Type': 'application/json',
    };

    const mockResponseData = 'SONG_SAVED';
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve(mockResponseData)),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await AddingAcceptedSong(mockSongInfo, mockToken, mockUserId);

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
      method: 'POST',
      headers: expectedHeaders,
      body: JSON.stringify(mockSongInfo),
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

    global.fetch.mockRejectedValueOnce(mockResponse);

    await expect(AddingAcceptedSong('token','a','c')).rejects.toMatch('Network response is not ok');
    
  });

  test('should return "Song is already added" when the response status is 403', async () => {
    const mockResponse = {
      ok: false,
      status: 403,
      text: jest.fn(() => Promise.resolve('Song is already added')),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    const result = await AddingAcceptedSong(mockSongInfo, mockToken, mockUserId);

    expect(result).toBe('Song is already added');
  });

  test('should return "SONG_SAVED" when the response status is ok', async () => {
    const mockResponseData = 'SONG_SAVED';
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve(mockResponseData)),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    const result = await AddingAcceptedSong(mockSongInfo, mockToken, mockUserId);

    expect(result).toBe('SONG_SAVED');
  });

  test('should throw an error when the network response is not ok and not status 403', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      text: jest.fn(() => Promise.resolve('Internal Server Error')),
    };

    global.fetch.mockRejectedValueOnce(mockResponse);

    await expect(AddingAcceptedSong(mockSongInfo, mockToken, mockUserId)).rejects.toMatch('Network response is not ok');
  });

  test('should log an error when an exception occurs during the API call', async () => {
    const errorMessage = 'Test error';
    global.fetch.mockRejectedValueOnce(new Error(errorMessage));

    await expect(AddingAcceptedSong(mockSongInfo, mockToken, mockUserId)).rejects.toMatch('Network response is not ok');

  });
});


//-----------------------------------


describe('AddingSongManuallyApi', () => {
  const mockToken = 'your_mock_token';
  const mockUserId = 'mockUserId';
  const mockSongQuery = 'mockSongQuery';
  const mockArtistQuery = 'mockArtistQuery';

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
    const expectedUrl = `http://localhost:8080/add/manual-song-assisted/${mockSongQuery}/${mockArtistQuery}/${mockUserId}`;
    const expectedHeaders = {
      accept: 'application/json',
      'Authorization': 'Bearer ' + mockToken,
      'Content-Type': 'application/json',
    };

    const mockResponseData = '{"id":"your_id_value","name":"your_name_value","albumName":"your_album_name_value","albumId":"your_album_id_value","albumRelease":"2023-05-15","artistsName":["Recep Tayyip Erdoğan","Kemal Kılıçdaroğlu","Sinan Oğan"],"artistsId":["","",""],"popularity":-1,"duration_ms":221306,"explicit":true}';
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve(mockResponseData)),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await AddingSongManuallyApi(mockSongQuery, mockArtistQuery, mockToken, mockUserId);

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
      method: 'GET',
      headers: expectedHeaders,
      mode: 'cors',
    });
  });



  test('should return "Song not found" when the response status is 403', async () => {
    const mockResponse = {
      ok: false,
      status: 403,
      text: jest.fn(() => Promise.resolve('Song not found')),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    const result = await AddingSongManuallyApi(mockSongQuery, mockArtistQuery, mockToken, mockUserId);

    expect(result).toBe('Song not found');
  });

  test('should return the parsed response when the response status is ok', async () => {
    const mockResponseData = '{"id":"your_id_value","name":"your_name_value","albumName":"your_album_name_value","albumId":"your_album_id_value","albumRelease":"2023-05-15","artistsName":["Recep Tayyip Erdoğan","Kemal Kılıçdaroğlu","Sinan Oğan"],"artistsId":["","",""],"popularity":-1,"duration_ms":221306,"explicit":true}';
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve(mockResponseData)),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    const result = await AddingSongManuallyApi(mockSongQuery, mockArtistQuery, mockToken, mockUserId);

    expect(result).toEqual(JSON.parse(mockResponseData));
  });

  test('should throw an error when the network response is not ok and not status 403', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      text: jest.fn(() => Promise.resolve('Internal Server Error')),
    };

    global.fetch.mockRejectedValueOnce(mockResponse);

    await expect(AddingSongManuallyApi(mockSongQuery, mockArtistQuery, mockToken, mockUserId)).rejects.toMatch('Network response is not ok');
  });

  test('should log an error when an exception occurs during the API call', async () => {
    const errorMessage = 'Test error';
    global.fetch.mockRejectedValueOnce(new Error(errorMessage));
    await expect(AddingSongManuallyApi(mockSongQuery, mockArtistQuery, mockToken, mockUserId)).rejects.toMatch('Network response is not ok');

  });
});



//-------------------------------------------

describe('AddingUniqueSongApi', () => {
  const mockToken = 'your_mock_token';
  const mockUserId = 'mockUserId';
  const mockProps = {
    name: 'Mock Song',
    albumName: 'Mock Album',
    artistsName: ['Artist1', 'Artist2'],
    minutes: 3,
    seconds: 30,
    explicit: true,
    albumRelease: '2022-01-01',
    userId: mockUserId,
    token: mockToken,
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
    const expectedUrl = `http://localhost:8080/add/manual-song-unique/${mockUserId}`;
    const expectedHeaders = {
      accept: 'application/json',
      'Authorization': 'Bearer ' + mockToken,
      'Content-Type': 'application/json',
    };

    const expectedBody = {
      id: '',
      name: 'Mock Song',
      albumName: 'Mock Album',
      albumId: '',
      artistsName: ['Artist1', 'Artist2'],
      artistsId: [],
      popularity: -1,
      duration_ms: 210000, // (3 minutes * 60000) + (30 seconds * 1000)
      explicit: true,
      albumRelease: '2022-01-01',
    };

    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve('Success')),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await AddingUniqueSongApi(mockProps);

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
      method: 'POST',
      headers: expectedHeaders,
      body: JSON.stringify(expectedBody),
      mode: 'cors',
      credentials: 'include',
    });
  });



  test('should return 1 when the response is ok', async () => {
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve('Success')),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    const result = await AddingUniqueSongApi(mockProps);

    expect(result).toBe(1);
  });

  test('should return -1 when the response is not ok', async () => {
    const mockResponse = {
      ok: false,
      text: jest.fn(() => Promise.resolve('Failure')),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    const result = await AddingUniqueSongApi(mockProps);

    expect(result).toBe(-1);
  });

  test('should log an error when an exception occurs during the API call', async () => {
    const errorMessage = 'Test error';
    global.fetch.mockRejectedValueOnce(new Error(errorMessage));

    await AddingUniqueSongApi(mockProps);

    expect(console.error).toHaveBeenCalledWith('error in fetching data:', expect.any(Error));
  });
});

