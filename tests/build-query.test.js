const stubbedConfig = require('./test-data/stubbed-config');

const { buildQuery } = require('../src/build-query');

describe('Build Query', () => {
  describe('when a valid config is passed into buildQuery', () => {
    const expectedQuery =
      '?page=98&itemsPerPage=99&search=soup&language=Gaelic&sort=Ascending&filter[]=regulation(182%2C26)&facet[]=facets&facet[]=exist&filter[]=filters&filter[]=exist&filter[]=founded.year%3A2010';

    let result;

    beforeEach(() => {
      result = buildQuery(stubbedConfig);
    });

    it('returns the expected query', () => {
      expect(result).toEqual(expectedQuery);
    });
  });

  describe('when an empty config is passed into the buildQuery', () => {
    let result;

    beforeEach(() => {
      result = buildQuery({});
    });

    it('returns no query param', () => {
      expect(result).toEqual('');
    });
  });

  describe('when a config is passed with invalid regulation fields', () => {
    const expectedQueryNoRegulationValues =
      '?page=98&itemsPerPage=99&search=soup&language=Gaelic&sort=Ascending&facet[]=facets&facet[]=exist&filter[]=filters&filter[]=exist&filter[]=founded.year%3A2010';

    let result;

    const invalidRegulationFields = {
      ...stubbedConfig,
      regulation: {
        bad: 'field',
      },
    };

    beforeEach(() => {
      result = buildQuery(invalidRegulationFields);
    });

    it('returns no regulation values', () => {
      expect(result).toEqual(expectedQueryNoRegulationValues);
    });
  });

  describe('when a config is passed with a non-numeric regulation size', () => {
    const expectedQueryRegulationSizeNull =
      '?page=98&itemsPerPage=99&search=soup&language=Gaelic&sort=Ascending&filter[]=regulation(null%2C26)&facet[]=facets&facet[]=exist&filter[]=filters&filter[]=exist&filter[]=founded.year%3A2010';

    let result;

    const invalidRegulationFields = {
      ...stubbedConfig,
      regulation: {
        size: '6ft',
        age: 26
      },
    };

    beforeEach(() => {
      result = buildQuery(invalidRegulationFields);
    });

    it('returns regulation size as null', () => {
      expect(result).toEqual(expectedQueryRegulationSizeNull);
    });
  });

  describe('when a config is passed with a non-numeric regulation age', () => {
    const expectedQueryRegulationAgeNull =
    '?page=98&itemsPerPage=99&search=soup&language=Gaelic&sort=Ascending&filter[]=regulation(182%2Cnull)&facet[]=facets&facet[]=exist&filter[]=filters&filter[]=exist&filter[]=founded.year%3A2010';

    let result;

    const invalidRegulationFields = {
      ...stubbedConfig,
      regulation: {
        size: 182,
        age: 'Twenty Six',
      },
    };

    beforeEach(() => {
      result = buildQuery(invalidRegulationFields);
    });

    it('returns regulation size as null', () => {
      expect(result).toEqual(expectedQueryRegulationAgeNull);
    });
  });

  describe('when a config is passed with a non-numeric founded year', () => {
    const expectedQueryFoundedYearNull =
        '?page=98&itemsPerPage=99&search=soup&language=Gaelic&sort=Ascending&filter[]=regulation(182%2C26)&facet[]=facets&facet[]=exist&filter[]=filters&filter[]=exist';

    let result;

    const invalidRegulationFields = {
      ...stubbedConfig,
      founded: ['founders', 'exist'],
    };

    beforeEach(() => {
      result = buildQuery(invalidRegulationFields);
    });

    it('returns founded year as null', () => {
      expect(result).toEqual(expectedQueryFoundedYearNull);
    });
  });
});
