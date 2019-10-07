const mockAxiosGet = jest.fn();
jest.mock('axios', () => {
  return { get: mockAxiosGet };
});

jest.mock('../config', () => {
  return {
    baseUrl: 'https://test',
  };
});

const mockBuildQuery = jest.fn()
jest.mock('../src/build-query', () => {
  return {
    buildQuery: mockBuildQuery,
  };
});

global.console = {
  error: jest.fn(),
}

const Client = require('../src/client');

describe('Get Waiting Times', () => {
  const stubbedData = {
    data: {
      Rides: [
        {
          name: 'Big Dipper',
          wait: 30,
        },
        {
          name: 'Little Dipper',
          wait: 11,
        },
      ],
    },
  };

  beforeEach(() => {
    mockAxiosGet.mockImplementation(() => {
      return stubbedData;
    });
  });

  describe('when a successful request is made with an empty config', () => {
    const expectedUrl = 'https://test/parks/foo/waiting-times';

    let response;

    beforeEach(async () => {
      mockBuildQuery.mockReturnValueOnce('');
      response = await Client.getWaitingTimes('foo');
    });

    it('calls axios once', () => {
      expect(mockAxiosGet.mock.calls.length).toBe(1);
    });

    it('calls axios with the expected url and returns the expected data', () => {
      expect(mockAxiosGet.mock.calls[0][0]).toEqual(expectedUrl);
      expect(response).toEqual(stubbedData.data);
    });
  });

  describe('when a successful request is made with a config', () => {
    const expectedUrl = 'https://test/parks/foo/waiting-times?expected';

    beforeEach(async () => {
      mockBuildQuery.mockReturnValueOnce('?expected');
      await Client.getWaitingTimes('foo', { stubbed: 'config' });
    });

    it('calls axios with the build query appended to the url', () => {
      expect(mockAxiosGet.mock.calls[0][0]).toEqual(expectedUrl);
    });
  });

  describe('when an unsuccessful request is made', () => {
    const stubbedError = new Error('some error');
    let response;

    beforeEach(async () => {
      jest.spyOn(global.console, 'error');

      mockAxiosGet.mockImplementation(() => {
        throw new Error('some error');
      });

      response = await Client.getWaitingTimes('foo', { park: 'config' });
    });

    it('console logs the error and returns null', () => {
      expect(console.error.mock.calls[0][0]).toEqual(stubbedError);
      expect(response).toEqual(null);
    });
  });
});
