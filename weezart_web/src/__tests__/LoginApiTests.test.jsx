import LoginApi from '../API/LoginApi';
import fetchMock from 'jest-fetch-mock';
import SignUpApi from '../API/SignUpApi';
import UserProfileApi from '../API/UserProfileApi';
import UserPublicDataApi from '../API/UserPublicDataApi';


describe('LoginApi function', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
        console.log = jest.fn();
        console.error = jest.fn();
      });
    it('should log an error when JSON.parse throws an exception and return -1', async () => {
        const username = 'testUser';
        const password = 'testPassword';
        const consoleErrorSpy = jest.spyOn(console, 'error');
        const errorMessage = 'JSON parse error';

        // Simulate an invalid JSON response
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            text: () => Promise.resolve(JSON.stringify('invalid JSON response')),
          });


        await expect(LoginApi(username,password)).rejects.toMatch('Network response is not ok');


        
    });

    it('should make a POST request to the correct URL with the proper headers and return parsed response for successful login', async () => {
        const username = 'testUser';
        const password = 'testPassword';
        const expectedUrl = 'http://localhost:8080/auth/login';
        const expectedHeaders = {
            accept: '*/*',
            'Content-Type': 'application/json',
        };

        const mockedResponse = {
            token: 'testToken',
            userId: 'testUserId',
        };

        fetchMock.mockResponseOnce(JSON.stringify(mockedResponse), { status: 200 });

        const result = await LoginApi(username, password);

        expect(fetchMock).toHaveBeenCalledWith(expectedUrl, {
            method: 'POST',
            headers: expectedHeaders,
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify({ username, password }),
        });

        expect(result).toEqual(mockedResponse);
    });

    it('should return -1 when the login request is not successful', async () => {
        const username = 'testUser';
        const password = 'testPassword';

        fetchMock.mockResponseOnce('error response', { status: 401 });

        const result = await LoginApi(username, password);

        expect(result).toBe(-1);
    });

    it('should log an error when an exception occurs during the request and return -1', async () => {
        const username = 'testUser';
        const password = 'testPassword';
        const consoleErrorSpy = jest.spyOn(console, 'error');
        const errorMessage = 'An error occurred during the fetch';

        fetchMock.mockImplementationOnce(() => {
            throw new Error(errorMessage);
        });

        const result = await LoginApi(username, password);

        expect(result).toBe(-1);
        expect(consoleErrorSpy).toHaveBeenCalledWith('error in fetching data:', errorMessage);
    });

    it('should log an error when JSON.parse throws an exception and return -1', async () => {
        const username = 'testUser';
        const password = 'testPassword';
        const consoleErrorSpy = jest.spyOn(console, 'error');
        const errorMessage = 'JSON parse error';

        fetchMock.mockResponseOnce('invalid JSON response', { status: 200 });

        const result = await LoginApi(username, password);

        expect(result).toBe(-1);
        expect(consoleErrorSpy).toHaveBeenCalledWith('error in parsing JSON data:', expect.any(SyntaxError));
    });

    it('should log an error when the response is not okay and return -1', async () => {
        const username = 'testUser';
        const password = 'testPassword';
        const consoleErrorSpy = jest.spyOn(console, 'error');
        const errorMessage = 'Network response is not ok';

        fetchMock.mockResponseOnce('error response', { status: 500 });

        const result = await LoginApi(username, password);

        expect(result).toBe(-1);
        expect(consoleErrorSpy).toHaveBeenCalledWith('error in fetching data:', 'Network response is not ok');
    });
});


//-------------------------------------

describe('SignUpApi function', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('should make a POST request to the correct URL with the proper headers and return data for successful signup', async () => {
        const signUpData = {
            // Your signup data here
        };
        const expectedUrl = 'http://localhost:8080/auth/register';
        const expectedHeaders = {
            accept: '*/*',
            'Content-Type': 'application/json',
        };

        const mockedResponse = {
            // Your mocked response data here
        };

        fetchMock.mockResponseOnce(JSON.stringify(mockedResponse), { status: 200 });

        const result = await SignUpApi(signUpData);

        expect(fetchMock).toHaveBeenCalledWith(expectedUrl, {
            method: 'POST',
            headers: expectedHeaders,
            mode: 'cors',
            body: JSON.stringify(signUpData),
        });

        expect(result).toEqual(mockedResponse);
    });

    it('should return -1 when the signup request is not successful', async () => {
        const signUpData = {
            // Your signup data here
        };

        fetchMock.mockResponseOnce('error response', { status: 400 });

        const result = await SignUpApi(signUpData);

        expect(result).toBe(-1);
    });

    it('should log an error when an exception occurs during the request and return undefined', async () => {
        const signUpData = {
            // Your signup data here
        };
        const consoleErrorSpy = jest.spyOn(console, 'error');
        const errorMessage = 'An error occurred during the fetch';

        fetchMock.mockImplementationOnce(() => {
            throw new Error(errorMessage);
        });

        const result = await SignUpApi(signUpData);

        expect(result).toBeUndefined();
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error in fetching data:', errorMessage);
    });

    it('should log an error when JSON.parse throws an exception and return undefined', async () => {
        const signUpData = {
            // Your signup data here
        };
        const consoleErrorSpy = jest.spyOn(console, 'error');
        const errorMessage = 'JSON parse error';

        fetchMock.mockResponseOnce('invalid JSON response', { status: 200 });

        const result = await SignUpApi(signUpData);

        expect(result).toBeUndefined();
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error in parsing JSON data:', expect.any(SyntaxError));
    });

    it('should return -1 when the response is not okay and log an error', async () => {
        const signUpData = {
            // Your signup data here
        };
        const consoleErrorSpy = jest.spyOn(console, 'error');
        const errorMessage = 'Network response is not ok';

        fetchMock.mockResponseOnce('error response', { status: 500 });

        const result = await SignUpApi(signUpData);

        expect(result).toBe(-1);
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error in fetching data:', errorMessage);
    });

    it('should log an error when an exception occurs during the request and return -1', async () => {
        const signUpData = {
            // Your signup data here
        };
        const consoleErrorSpy = jest.spyOn(console, 'error');
        const errorMessage = 'An error occurred during the fetch';

        fetchMock.mockImplementationOnce(() => {
            throw new Error(errorMessage);
        });

        const result = await SignUpApi(signUpData);

        expect(result).toBe(-1);
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error in fetching data:', errorMessage);
    });

});

//-----------------------------------

describe('UserProfileApi function', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
        console.log = jest.fn();  // Mock console.log
    });

    afterAll(() => {
        jest.restoreAllMocks();  // Restore console.log after all tests are done
    });


    it('should make a GET request to the correct URL with the proper headers and return user profile data for successful request', async () => {
        const token = 'testToken';
        const username = 'testUser';
        const expectedUrl = `http://localhost:8080/user/profile/${username}`;
        const expectedHeaders = {
            accept: 'application/json',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        const mockedResponse = {
            // Your mocked user profile data here
        };

        fetchMock.mockResponseOnce(JSON.stringify(mockedResponse), { status: 200 });

        const result = await UserProfileApi(token, username);

        expect(fetchMock).toHaveBeenCalledWith(expectedUrl, {
            method: 'GET',
            headers: expectedHeaders,
            mode: 'cors',
            credentials: 'include',
        });

        expect(result).toEqual(mockedResponse);
    });

    it('should throw an error when the network response is not ok', async () => {
        const token = 'testToken';
        const username = 'testUser';

        fetchMock.mockResponseOnce('error response', { status: 404 });

        await expect(UserProfileApi(token, username)).rejects.toThrow('Network response is not ok');
    });

    it('should log an error when an exception occurs during the request and return undefined', async () => {
        const token = 'testToken';
        const username = 'testUser';
        const consoleErrorSpy = jest.spyOn(console, 'error');
        const errorMessage = 'An error occurred during the fetch';

        fetchMock.mockImplementationOnce(() => {
            throw new Error(errorMessage);
        });

        const result = await UserProfileApi(token, username);

        expect(result).toBeUndefined();
        expect(consoleErrorSpy).toHaveBeenCalledWith('error in fetching data:', errorMessage);
    });

    it('should log an error when JSON.parse throws an exception and return undefined', async () => {
        const token = 'testToken';
        const username = 'testUser';
        const consoleErrorSpy = jest.spyOn(console, 'error');
        const errorMessage = 'JSON parse error';

        fetchMock.mockResponseOnce('invalid JSON response', { status: 200 });

        const result = await UserProfileApi(token, username);

        expect(result).toBeUndefined();
        expect(consoleErrorSpy).toHaveBeenCalledWith('error in parsing JSON data:', expect.any(SyntaxError));
    });

    it('should log an error when JSON.parse fails even for a successful request and return undefined', async () => {
        const token = 'testToken';
        const username = 'testUser';
        const consoleErrorSpy = jest.spyOn(console, 'error');
        const errorMessage = 'JSON parse error';
        const invalidJSONResponse = 'invalid JSON response';

        fetchMock.mockResponseOnce(invalidJSONResponse, { status: 200 });

        const result = await UserProfileApi(token, username);

        expect(result).toBeUndefined();
        expect(consoleErrorSpy).toHaveBeenCalledWith('error in parsing JSON data:', expect.any(SyntaxError));
        expect(console.log).toHaveBeenCalledWith("--> user in api : ", expect.anything());
    });

    it('should log an error when JSON.parse fails even for a successful request and return undefined2', async () => {
        const token = 'testToken';
        const username = 'testUser';
        const consoleErrorSpy = jest.spyOn(console, 'error');
        const errorMessage = 'JSON parse error';
        const invalidJSONResponse = 'invalid JSON response';

        fetchMock.mockResponseOnce(invalidJSONResponse, { status: 200 });

        const result = await UserProfileApi(token, username);

        expect(result).toBeUndefined();
        expect(consoleErrorSpy).toHaveBeenCalledWith('error in parsing JSON data:', expect.any(SyntaxError));

        // Check if console.log was called with the expected message
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining("--> user in api : "), expect.anything());
    });
});

//--------------------------------

describe('UserPublicDataApi function', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('should make a POST request to the correct URL with the proper headers and return user public data for successful request', async () => {
        const token = 'testToken';
        const userId = 'testUserId';
        const filter = 'testFilter';
        const expectedUrl = `http://localhost:8080/user/${filter}/${userId}`;
        const expectedHeaders = {
            accept: 'application/json',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        const mockedResponse = {
            // Your mocked user public data here
        };

        fetchMock.mockResponseOnce(JSON.stringify(mockedResponse), { status: 200 });

        const result = await UserPublicDataApi(token, userId, filter);

        expect(fetchMock).toHaveBeenCalledWith(expectedUrl, {
            method: 'POST',
            headers: expectedHeaders,
            mode: 'cors',
            credentials: 'include',
        });

        expect(result).toEqual(mockedResponse);
    });

    it('should throw an error when the network response is not ok', async () => {
        const token = 'testToken';
        const userId = 'testUserId';
        const filter = 'testFilter';

        fetchMock.mockResponseOnce('error response', { status: 404 });

        await expect(UserPublicDataApi(token, userId, filter)).rejects.toThrow('Network response is not ok');
    });

    it('should log an error when an exception occurs during the request and return undefined', async () => {
        const token = 'testToken';
        const userId = 'testUserId';
        const filter = 'testFilter';
        const consoleErrorSpy = jest.spyOn(console, 'error');
        const errorMessage = 'An error occurred during the fetch';

        fetchMock.mockImplementationOnce(() => {
            throw new Error(errorMessage);
        });

        const result = await UserPublicDataApi(token, userId, filter);

        expect(result).toBeUndefined();
        expect(consoleErrorSpy).toHaveBeenCalledWith('error in fetching data:', errorMessage);
    });

    it('should log an error when JSON.parse throws an exception and return undefined', async () => {
        const token = 'testToken';
        const userId = 'testUserId';
        const filter = 'testFilter';
        const consoleErrorSpy = jest.spyOn(console, 'error');
        const errorMessage = 'JSON parse error';

        fetchMock.mockResponseOnce('invalid JSON response', { status: 200 });

        const result = await UserPublicDataApi(token, userId, filter);

        expect(result).toBeUndefined();
        expect(consoleErrorSpy).toHaveBeenCalledWith('error in parsing JSON data:', expect.any(SyntaxError));
    });
});