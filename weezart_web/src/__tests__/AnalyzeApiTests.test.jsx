import AnalyzeApi from "../API/AnalyzeApi";
import AnalyzeChartAddApi from "../API/AnalyzeChartAddApi";
import AnalyzeChartLikeApi from "../API/AnalyzeChartLikeApi";
import AnalyzeChartRateApi from "../API/AnalyzeChartRateApi";
import AnalyzeTableReleaseApi from "../API/AnalyzeTableReleaseApi";
import AnalyzeTableGenreApi from "../API/AnalyzeTableGenreApi";
import AnalyzeTableTop5Api from "../API/AnalyzeTableTop5Api";



describe('AnalyzeApi', () => {
  const mockToken = 'your_mock_token';
  const mockUserId = 'mockUserId';
  const mockFilter = 'your_mock_filter';
  const mockDateFilter = '2023-01-01';

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

  test('should make a GET request with the correct parameters for dateFilter 2023-01-01', async () => {

    
    const expectedUrl = `http://localhost:8080/analysis/${mockFilter}/counts/${mockUserId}`;
    const expectedHeaders = {
      accept: 'application/json',
      'Authorization': 'Bearer ' + mockToken,
      'Content-Type': 'application/json'
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(JSON.stringify({ status: 'success'})),
    });

    await AnalyzeApi(mockToken, mockUserId, mockFilter, mockDateFilter);

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
      method: 'GET',
      headers: expectedHeaders,
      mode: 'cors',
      credentials: 'include',
    });
  });

  test('should make a GET request with the correct parameters for dateFilter other than 2023-01-01', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(JSON.stringify({ /* mock response data */ })),
    });
    const mockCustomDateFilter = '2023-02-02';
    const expectedUrl = `http://localhost:8080/analysis/${mockFilter}/constrained-counts/${mockUserId}/${mockCustomDateFilter}`;
    const expectedHeaders = {
      accept: 'application/json',
      'Authorization': 'Bearer ' + mockToken,
      'Content-Type': 'application/json'
    };

    await AnalyzeApi(mockToken, mockUserId, mockFilter, mockCustomDateFilter);

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
      method: 'GET',
      headers: expectedHeaders,
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

    await expect(AnalyzeApi('token','a','asa','2023-12-01')).rejects.toMatch('Network response is not ok');
    
  });

  test('should log the response data to the console for a successful request', async () => {
    const mockResponseData = { status: 'success' };
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve(JSON.stringify(mockResponseData))),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await AnalyzeApi(mockToken, mockUserId, mockFilter, mockDateFilter);

    expect(console.log).toHaveBeenCalledWith(mockResponseData);
  });

  test('should throw an error when the network response is not ok', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      text: jest.fn(() => Promise.resolve('Internal Server Error')),
    };

    global.fetch.mockRejectedValueOnce(mockResponse);

    await expect(AnalyzeApi(mockToken, mockUserId, mockFilter, mockDateFilter)).rejects.toMatch('Network response is not ok');
  });

  test('should log an error when an exception occurs during the API call', async () => {
    const errorMessage = 'Test error';
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      text: () => Promise.reject(new Error(errorMessage)),
    });
    
    global.fetch.mockRejectedValueOnce(new Error(errorMessage));
    //spy for console error


    await expect(AnalyzeApi(mockToken, mockUserId, mockFilter, mockDateFilter)).rejects.toMatch('Network response is not ok');

  });

  test('should log an error when the response is not valid JSON', async () => {
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve('Invalid JSON')),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await expect(AnalyzeApi(mockToken, mockUserId, mockFilter, mockDateFilter)).rejects.toMatch('Network response is not ok');

  });

  test('should log an error when dateFilter is not provided', async () => {
    await expect(AnalyzeApi(mockToken, mockUserId, mockFilter, mockDateFilter)).rejects.toMatch('Network response is not ok');
  });

  // Additional test cases for edge cases or specific conditions
  test('should handle a case where dateFilter is an empty string', async () => {
    await expect(AnalyzeApi(mockToken, mockUserId, mockFilter, mockDateFilter)).rejects.toMatch('Network response is not ok');
  });

  test('should handle a case where dateFilter is a different type (e.g., number)', async () => {
   

    await expect(AnalyzeApi(mockToken, mockUserId, mockFilter, 123)).rejects.toMatch('Network response is not ok');
  });
});




//------------------------------------
//-------------------------------------

describe('AnalyzeChartAddApi', () => {
  const mockToken = 'your_mock_token';
  const mockUserId = 'mockUserId';
  const mockFilter = 'your_mock_filter';

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
    const expectedUrl = `http://localhost:8080/analysis/${mockFilter}/daily-added/${mockUserId}`;
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

    await AnalyzeChartAddApi(mockToken, mockUserId, mockFilter);

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
      method: 'GET',
      headers: expectedHeaders,
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

    await expect(AnalyzeChartAddApi('token','a','asa')).rejects.toMatch('Network response is not ok');
    
  });


  test('should log the response data to the console for a successful request', async () => {
    const mockResponseData = { status: 'success' };
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve(JSON.stringify(mockResponseData))),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await AnalyzeChartAddApi(mockToken, mockUserId, mockFilter);

    expect(console.log).toHaveBeenCalledWith(mockResponseData);
  });

  test('should throw an error when the network response is not ok', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      text: jest.fn(() => Promise.resolve('Internal Server Error')),
    };

    global.fetch.mockRejectedValueOnce(mockResponse);

    await expect(AnalyzeChartAddApi(mockToken, mockUserId, mockFilter)).rejects.toMatch('Network response is not ok');
  });

  test('should log an error when an exception occurs during the API call', async () => {
    const errorMessage = 'Test error';
    global.fetch.mockRejectedValueOnce(new Error(errorMessage));

    await expect(AnalyzeChartAddApi(mockToken, mockUserId, mockFilter)).rejects.toMatch('Network response is not ok');

  });

  test('should log an error when the response is not valid JSON', async () => {
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve('Invalid JSON')),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await expect(AnalyzeChartAddApi(mockToken, mockUserId, mockFilter)).rejects.toMatch('Network response is not ok');

  });
});




//------------------------------------
//---------------------------------------

describe('AnalyzeChartLikeApi', () => {
  const mockToken = 'your_mock_token';
  const mockUserId = 'mockUserId';
  const mockFilter = 'your_mock_filter';

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
    const expectedUrl = `http://localhost:8080/analysis/${mockFilter}/daily-liked/${mockUserId}`;
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

    await AnalyzeChartLikeApi(mockToken, mockUserId, mockFilter);

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
      method: 'GET',
      headers: expectedHeaders,
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

    await expect(AnalyzeChartLikeApi('token','a','asa')).rejects.toMatch('Network response is not ok');
    
  });

  test('should log the response data to the console for a successful request', async () => {
    const mockResponseData = { status: 'success' };
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve(JSON.stringify(mockResponseData))),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await AnalyzeChartLikeApi(mockToken, mockUserId, mockFilter);

    expect(console.log).toHaveBeenCalledWith(mockResponseData);
  });

  test('should throw an error when the network response is not ok', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      text: jest.fn(() => Promise.resolve('Internal Server Error')),
    };

    global.fetch.mockRejectedValueOnce(mockResponse);

    await expect(AnalyzeChartLikeApi(mockToken, mockUserId, mockFilter)).rejects.toMatch('Network response is not ok');
  });

  test('should log an error when an exception occurs during the API call', async () => {
    const errorMessage = 'Test error';
    global.fetch.mockRejectedValueOnce(new Error(errorMessage));

    await expect(AnalyzeChartLikeApi(mockToken, mockUserId, mockFilter)).rejects.toMatch('Network response is not ok');

  });

  test('should log an error when the response is not valid JSON', async () => {
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve('Invalid JSON')),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await expect(AnalyzeChartLikeApi(mockToken, mockUserId, mockFilter)).rejects.toMatch('Network response is not ok');

  });
});




//----------------------------------------
//--------------------------------------

describe('AnalyzeChartRateApi', () => {
  const mockToken = 'your_mock_token';
  const mockUserId = 'mockUserId';
  const mockFilter = 'your_mock_filter';

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
    const expectedUrl = `http://localhost:8080/analysis/${mockFilter}/daily-rating/${mockUserId}`;
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

    await AnalyzeChartRateApi(mockToken, mockUserId, mockFilter);

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
      method: 'GET',
      headers: expectedHeaders,
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

    await expect(AnalyzeChartRateApi('token','a','asa')).rejects.toMatch('Network response is not ok');
    
  });

  test('should log the response data to the console for a successful request', async () => {
    const mockResponseData = { status: 'success' };
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve(JSON.stringify(mockResponseData))),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await AnalyzeChartRateApi(mockToken, mockUserId, mockFilter);

    expect(console.log).toHaveBeenCalledWith(mockResponseData);
  });

  test('should throw an error when the network response is not ok', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      text: jest.fn(() => Promise.resolve('Internal Server Error')),
    };

    global.fetch.mockRejectedValueOnce(mockResponse);

    await expect(AnalyzeChartRateApi(mockToken, mockUserId, mockFilter)).rejects.toMatch('Network response is not ok');
  });

  test('should log an error when an exception occurs during the API call', async () => {
    const errorMessage = 'Test error';
    global.fetch.mockRejectedValueOnce(new Error(errorMessage));

    await expect(AnalyzeChartRateApi(mockToken, mockUserId, mockFilter)).rejects.toMatch('Network response is not ok');

  });

  test('should log an error when the response is not valid JSON', async () => {
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve('Invalid JSON')),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await expect(AnalyzeChartRateApi(mockToken, mockUserId, mockFilter)).rejects.toMatch('Network response is not ok');

  });
});



//---------------------------------------------------
//---------------------------------------------------

describe('AnalyzeTableReleaseApi', () => {
  const mockToken = 'your_mock_token';
  const mockUserId = 'mockUserId';
  const mockFilter = 'your_mock_filter';

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
    const expectedUrl = `http://localhost:8080/analysis/${mockFilter}/release-date/2010/2020/${mockUserId}`;
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

    await AnalyzeTableReleaseApi(mockToken, mockUserId, mockFilter);

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
      method: 'GET',
      headers: expectedHeaders,
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

    await expect(AnalyzeTableReleaseApi('token','a','asa')).rejects.toMatch('Network response is not ok');
    
  });

  test('should log the response data to the console for a successful request', async () => {
    const mockResponseData = { status: 'success' };
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve(JSON.stringify(mockResponseData))),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await AnalyzeTableReleaseApi(mockToken, mockUserId, mockFilter);

    expect(console.log).toHaveBeenCalledWith(mockResponseData);
  });

  test('should throw an error when the network response is not ok', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      text: jest.fn(() => Promise.resolve('Internal Server Error')),
    };

    global.fetch.mockRejectedValueOnce(mockResponse);

    await expect(AnalyzeTableReleaseApi(mockToken, mockUserId, mockFilter)).rejects.toMatch('Network response is not ok');
  });

  test('should log an error when an exception occurs during the API call', async () => {
    const errorMessage = 'Test error';
    global.fetch.mockRejectedValueOnce(new Error(errorMessage));

    await expect(AnalyzeTableReleaseApi(mockToken, mockUserId, mockFilter)).rejects.toMatch('Network response is not ok');

  });

  test('should log an error when the response is not valid JSON', async () => {
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve('Invalid JSON')),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await expect(AnalyzeTableReleaseApi(mockToken, mockUserId, mockFilter)).rejects.toMatch('Network response is not ok');

  });
});






//------------------------------------
//----------------------------------



describe('AnalyzeTableGenreApi', () => {
  const mockToken = 'your_mock_token';
  const mockUserId = 'mockUserId';
  const mockFilter = 'your_mock_filter';

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
    const expectedUrl = `http://localhost:8080/analysis/${mockFilter}/genre/pop/${mockUserId}`;
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

    await AnalyzeTableGenreApi(mockToken, mockUserId, mockFilter);

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
      method: 'GET',
      headers: expectedHeaders,
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

    await expect(AnalyzeTableGenreApi('token','a','asa')).rejects.toMatch('Network response is not ok');
    
  });

  test('should log the response data to the console for a successful request', async () => {
    const mockResponseData = { status: 'success' };
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve(JSON.stringify(mockResponseData))),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await AnalyzeTableGenreApi(mockToken, mockUserId, mockFilter);

    expect(console.log).toHaveBeenCalledWith(mockResponseData);
  });

  test('should throw an error when the network response is not ok', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      text: jest.fn(() => Promise.resolve('Internal Server Error')),
    };

    global.fetch.mockRejectedValueOnce(mockResponse);

    await expect(AnalyzeTableGenreApi(mockToken, mockUserId, mockFilter)).rejects.toMatch('Network response is not ok');
  });

  test('should log an error when an exception occurs during the API call', async () => {
    const errorMessage = 'Test error';
    global.fetch.mockRejectedValueOnce(new Error(errorMessage));

    await expect(AnalyzeTableGenreApi(mockToken, mockUserId, mockFilter)).rejects.toMatch('Network response is not ok');

  });

  test('should log an error when the response is not valid JSON', async () => {
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve('Invalid JSON')),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await expect(AnalyzeTableGenreApi(mockToken, mockUserId, mockFilter)).rejects.toMatch('Network response is not ok');

  });
});



//------------------------------------------
//-----------------------------------------


describe('AnalyzeTableTop5Api', () => {
  const mockToken = 'your_mock_token';
  const mockUserId = 'mockUserId';
  const mockFilter = 'your_mock_filter';

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
    const expectedUrl = `http://localhost:8080/analysis/${mockFilter}/top-5/${mockUserId}`;
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

    await AnalyzeTableTop5Api(mockToken, mockUserId, mockFilter);

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
      method: 'GET',
      headers: expectedHeaders,
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

    await expect(AnalyzeTableTop5Api('token','a','asa')).rejects.toMatch('Network response is not ok');
    
  });
  test('should log the response data to the console for a successful request', async () => {
    const mockResponseData = { status: 'success' };
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve(JSON.stringify(mockResponseData))),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await AnalyzeTableTop5Api(mockToken, mockUserId, mockFilter);

    expect(console.log).toHaveBeenCalledWith(mockResponseData);
  });

  test('should throw an error when the network response is not ok', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      text: jest.fn(() => Promise.resolve('Internal Server Error')),
    };

    global.fetch.mockRejectedValueOnce(mockResponse);

    await expect(AnalyzeTableTop5Api(mockToken, mockUserId, mockFilter)).rejects.toMatch('Network response is not ok');
  });

  test('should log an error when an exception occurs during the API call', async () => {
    const errorMessage = 'Test error';
    global.fetch.mockRejectedValueOnce(new Error(errorMessage));

    await expect(AnalyzeTableTop5Api(mockToken, mockUserId, mockFilter)).rejects.toMatch('Network response is not ok');

  });

  test('should log an error when the response is not valid JSON', async () => {
    const mockResponse = {
      ok: true,
      text: jest.fn(() => Promise.resolve('Invalid JSON')),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await expect(AnalyzeTableTop5Api(mockToken, mockUserId, mockFilter)).rejects.toMatch('Network response is not ok');

  });
});


