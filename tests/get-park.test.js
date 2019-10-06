const mockAxiosGet = jest.fn();
jest.mock('axios', () => {
  return { get: mockAxiosGet };
});

jest.mock('../config', () => {
  return { baseUrl: 'https://test' };
});

global.console = {
  error: jest.fn(),
}

const Client = require('../src/client');

describe('Get Park', () => {
  const stubbedData = {
    data: {
      name: 'Phantasialand'
    }
  };

  beforeEach(() => {
    mockAxiosGet.mockImplementation(() => {
      return stubbedData;
    });
  });

  describe('when a successful request is made with an empty config', () => {
    const expectedUrl = 'https://test/parks/foo';

    let response;

    beforeEach(async () => {
      jest.spyOn(Client, 'buildQuery').mockImplementation(() => '');

      response = await Client.getPark('foo');
    });

    it('calls axios once', () => {
      expect(mockAxiosGet.mock.calls.length).toBe(1);
    });

    it('calls axios with the expected url', () => {
      expect(mockAxiosGet.mock.calls[0][0]).toEqual(expectedUrl);
    });

    it('returns the expected data', () => {
      expect(response).toEqual(stubbedData.data);
    });
  });

  describe('when a successful request is made with a config', () => {
    const expectedUrl = 'https://test/parks/foo?expected';

    beforeEach(async () => {
      jest.spyOn(Client, 'buildQuery').mockImplementation(() => '?expected');

      await Client.getPark('foo', { stubbed: 'config' });
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

      response = await Client.getPark('foo', { stubbed: 'config' });
    });

    it('calls axios with the query appended to the url', () => {
      expect(console.error.mock.calls[0][0]).toEqual(stubbedError);
    });

    it('returns null', () => {
      expect(response).toEqual(null);
    });
  });
});