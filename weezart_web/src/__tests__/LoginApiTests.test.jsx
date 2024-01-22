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
        global.fetch = jest.fn().mockRejectedValueOnce({
            ok: true,
            text: () => Promise.resolve(JSON.stringify(new Error(errorMessage))),
          });

      


        await expect(LoginApi(username, password)).rejects.toMatch('Network response is not ok');
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1); // Check that console.error was called once



        
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
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            text: () => Promise.resolve(JSON.stringify(mockedResponse)),
          });
          const result = await LoginApi(username, password);

      
        expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
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

        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            text: () => Promise.resolve(JSON.stringify("Error")),
          });

        const result = await LoginApi(username, password);

        expect(result).toBe(-1);
    });

    it('should log an error when an exception occurs during the request and return -1', async () => {
        const username = 'testUser';
        const password = 'testPassword';
    

        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            status: 400,
            text: () => Promise.resolve('Bad request')
          });
        
          const result = LoginApi(username, password);

          await result.catch(error => {
            expect(error).toEqual(-1);
        });
    
    });

    it('should log an error when JSON.parse throws an exception and return -1', async () => {
        const username = 'testUser';
        const password = 'testPassword';
        const consoleErrorSpy = jest.spyOn(console, 'error');
        const errorMessage = 'JSON parse error';
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            status: 400,
            text: () => Promise.resolve('Bad request')
          });
        

          await expect(LoginApi(username, password)).rejects.toMatch('Network response is not ok');
    });

    it('should log an error when the response is not okay and return -1', async () => {
        const username = 'testUser';
        const password = 'testPassword';
        const consoleErrorSpy = jest.spyOn(console, 'error');
        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            status: 400,
            text: () => Promise.resolve('Bad request')
          });
        
          const result = LoginApi(username, password);

          await result.catch(error => {
            expect(error).toEqual(-1);
        });
    });
});


//-------------------------------------

describe('SignUpApi function', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
        console.log = jest.fn();
        console.error = jest.fn();
    });

    it('should make a POST request to the correct URL with the proper headers and return parsed response for successful register', async () => {
        const username = 'testUser';
        const password = 'testPassword';
        const email = 'anil@gmail.com';
        const obj={
            username:username,
            password:password,
            email:email
        }
        const expectedUrl = 'http://localhost:8080/auth/register';
        const expectedHeaders = {
            accept: '*/*',
            'Content-Type': 'application/json',
        };
        const mockedResponse = {
            "iduser": 1,
            "username": "username_value",
            "password": "password_value",
            "email": "email@example.com",
            "authority": "ROLE_USER",
            "followers": ["follower1_username", "follower2_username"],
            "following": ["following1_username", "following2_username"]
        };
        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: true,
            text: () => Promise.resolve(JSON.stringify(mockedResponse)),
            json: () => Promise.resolve(mockedResponse), // Add a json method that resolves with the mocked data

        });
          const result = await SignUpApi(obj);

      
        expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
            method: 'POST',
            headers: expectedHeaders,
            mode: 'cors',
            body: JSON.stringify(obj),
        });

        expect(result).toEqual(mockedResponse);
    });

    it('should log an error when JSON.parse throws an exception and return -1', async () => {
        const username = 'testUser';
    const password = 'testPassword';
    const email = 'anil@gmail.com';
    const consoleErrorSpy = jest.spyOn(console, 'error');
    const errorMessage = 'JSON parse error';
    const err = new Error(errorMessage);

    // Simulate an invalid JSON response
    global.fetch = jest.fn().mockRejectedValueOnce({
        ok: false,
        text: () => Promise.resolve('invalid JSON response'),
    });

    await expect(SignUpApi(username, password, email)).rejects.toMatch('Network response is not ok');
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1); // Check that console.error was called once

    // Clean up the mock
    consoleErrorSpy.mockRestore();



        
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

        expect(result).toBeDefined();
        expect(result).toBe(-1);
    });

    it('should log an error when JSON.parse throws an exception and return undefined', async () => {
        const signUpData = {
            // Your signup data here
        };
        const consoleErrorSpy = jest.spyOn(console, 'error');
        const errorMessage = 'JSON parse error';

        fetchMock.mockResponseOnce('invalid JSON response', { status: 200 });

        const result = await SignUpApi(signUpData);

        expect(result).toBeDefined();
        expect(result).toBe(-1);
    });

    it('should return -1 when the response is not okay and log an error', async () => {
        const signUpData = {
            username: 'testUser',
            password: 'testPassword',
            email: 'anil@gmail.com'
        };
        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            text: () => Promise.resolve(JSON.stringify(mockedResponse)),
          });
        


        const result = await SignUpApi(signUpData);

        expect(result).toBe(-1);
    
    });

    it('should log an error when an exception occurs during the request and return -1', async () => {
        const signUpData = {
            username: 'testUser',
            password: 'testPassword',
            email: 'anil@gmail.com'
            // Your signup data here
        };


        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            text: () => Promise.resolve(JSON.stringify(mockedResponse)),
          });
        

        const result = await SignUpApi(signUpData);

        expect(result).toBe(-1);
    });

});

//-----------------------------------

describe('UserProfileApi function', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
        console.log = jest.fn();
        console.error = jest.fn(); // Mock console.log
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
            'data':'123'
            // Your mocked user profile data here
        };
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            text: () => Promise.resolve(JSON.stringify(mockedResponse)),
          });

        const result = await UserProfileApi(token, username);

        expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
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


        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            text: () => Promise.resolve(JSON.stringify(mockResponseData)),
          });
        await expect(UserProfileApi(token, username)).rejects.toMatch('Network response is not ok');
    });

    it('should log an error when an exception occurs during the request and return undefined', async () => {
        const token = 'testToken';
        const username = 'testUser';
        const consoleErrorSpy = jest.spyOn(console, 'error');
        const errorMessage = 'An error occurred during the fetch';

        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            text: () => Promise.resolve(JSON.stringify(mockResponseData)),
          });


        await expect(UserProfileApi(token, username)).rejects.toMatch('Network response is not ok');

    });

    it('should log an error when JSON.parse throws an exception and return undefined', async () => {
        const token = 'testToken';
        const username = 'testUser';
        const consoleErrorSpy = jest.spyOn(console, 'error');
        const errorMessage = 'JSON parse error';
        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            text: () => Promise.resolve('a'),
          });
       

        await expect(UserProfileApi(token, username)).rejects.toMatch('Network response is not ok');

    });

    it('should log an error when JSON.parse fails even for a successful request and return undefined', async () => {
        const token = 'testToken';
        const username = 'testUser';
        const consoleErrorSpy = jest.spyOn(console, 'error');
        const errorMessage = 'JSON parse error';
        const invalidJSONResponse = 'invalid JSON response';

        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            text: () => Promise.resolve(new Error(invalidJSONResponse)),
          });
          await expect(UserProfileApi(token, username)).rejects.toMatch('Network response is not ok');

    });

   
});

//--------------------------------

describe('UserPublicDataApi function', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
        console.log = jest.fn();
        console.error = jest.fn();
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
            'data':'123'
        };
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            text: () => Promise.resolve(JSON.stringify(mockedResponse)),
          });

        const result = await UserPublicDataApi(token, userId, filter);

        expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
            method: 'POST',
            headers: expectedHeaders,
            mode: 'cors',
            credentials: 'include',
        });

        expect(result).toEqual(mockedResponse);
    });

    test('should return exception when response is not ok ', async () => {
        const mockResponse = {
          ok: false,
          status: 403,
          text: jest.fn(() => Promise.resolve('Song not found')),
        };
    
        global.fetch.mockResolvedValueOnce(mockResponse);
    
        await expect(UserPublicDataApi('token','a','c')).rejects.toMatch('Network response is not ok');
        
      });

    it('should throw an error when the network response is not ok', async () => {
        const token = 'testToken';
        const userId = 'testUserId';
        const filter = 'testFilter';
        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            text: () => Promise.resolve(JSON.stringify(mockedResponse)),
          });


        await expect(UserPublicDataApi(token, userId, filter)).rejects.toMatch('Network response is not ok');
    });

    it('should log an error when an exception occurs during the request and return undefined', async () => {
        const token = 'testToken';
        const userId = 'testUserId';
        const filter = 'testFilter';
        const consoleErrorSpy = jest.spyOn(console, 'error');
        const errorMessage = 'An error occurred during the fetch';

        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            text: () => Promise.resolve(new Error(errorMessage)),
          });


          await expect(UserPublicDataApi(token, userId, filter)).rejects.toMatch('Network response is not ok');

    });

    it('should log an error when JSON.parse throws an exception and return undefined', async () => {
        const token = 'testToken';
        const userId = 'testUserId';
        const filter = 'testFilter';
        const consoleErrorSpy = jest.spyOn(console, 'error');
        const errorMessage = 'JSON parse error';

        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            text: () => Promise.resolve([]),
          });




        await expect(UserPublicDataApi(token, userId, filter)).rejects.toMatch('Network response is not ok');

    });
});