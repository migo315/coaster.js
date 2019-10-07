const stubbedConfig = require('./test-data/stubbed-config');

jest.mock('../config', () => {
  return {
    language: 'en',
  };
});

const { buildQuery } = require('../src/build-query');

describe('Build Query', () => {
  describe('when acl is false', () => {
    const stubbedAcl = false;

    describe('when a valid config is passed into buildQuery', () => {
      const expectedQuery =
        '?page=98&itemsPerPage=99&search=soup&language=Gaelic&sort=Ascending&filter[]=regulation(182%2C26)&facet[]=facets&facet[]=exist&filter[]=filters&filter[]=exist';

      let result;

      beforeEach(() => {
        result = buildQuery(stubbedConfig, stubbedAcl);
      });

      it('returns the expected query', () => {
        expect(result).toEqual(expectedQuery);
      });
    });

    describe('when an empty config is passed into the buildQuery', () => {
      let result;

      beforeEach(() => {
        result = buildQuery({}, stubbedAcl);
      });

      it('returns only the default language', () => {
        expect(result).toEqual('?language=en');
      });
    });

    describe('when a config is passed with invalid regulation fields', () => {
      const expectedQueryNoRegulationValues =
        '?page=98&itemsPerPage=99&search=soup&language=Gaelic&sort=Ascending&facet[]=facets&facet[]=exist&filter[]=filters&filter[]=exist';

      let result;

      const invalidRegulationFields = {
        ...stubbedConfig,
        regulation: {
          bad: 'field',
        },
      };

      beforeEach(() => {
        result = buildQuery(invalidRegulationFields, stubbedAcl);
      });

      it('returns no regulation values', () => {
        expect(result).toEqual(expectedQueryNoRegulationValues);
      });
    });

    describe('when a config is passed with a non-numeric regulation size', () => {
      const expectedQueryRegulationSizeNull =
        '?page=98&itemsPerPage=99&search=soup&language=Gaelic&sort=Ascending&filter[]=regulation(null%2C26)&facet[]=facets&facet[]=exist&filter[]=filters&filter[]=exist';

      let result;

      const invalidRegulationFields = {
        ...stubbedConfig,
        regulation: {
          size: '6ft',
          age: 26
        },
      };

      beforeEach(() => {
        result = buildQuery(invalidRegulationFields, stubbedAcl);
      });

      it('returns regulation size as null', () => {
        expect(result).toEqual(expectedQueryRegulationSizeNull);
      });
    });

    describe('when a config is passed with a non-numeric regulation age', () => {
      const expectedQueryRegulationAgeNull =
      '?page=98&itemsPerPage=99&search=soup&language=Gaelic&sort=Ascending&filter[]=regulation(182%2Cnull)&facet[]=facets&facet[]=exist&filter[]=filters&filter[]=exist';

      let result;

      const invalidRegulationFields = {
        ...stubbedConfig,
        regulation: {
          size: 182,
          age: 'Twenty Six',
        },
      };

      beforeEach(() => {
        result = buildQuery(invalidRegulationFields, stubbedAcl);
      });

      it('returns regulation size as null', () => {
        expect(result).toEqual(expectedQueryRegulationAgeNull);
      });
    });
  });


  describe('when withAcl is true', () => {
    const stubbedAcl = true;

    const expectedQuery =
      '?page=98&itemsPerPage=99&search=soup&language=Gaelic&sort=Ascending&filter[]=regulation(182%2C26)&facet[]=facets&facet[]=exist&filter[]=filters&filter[]=exist';

    let result;


    beforeEach(() => {
      result = buildQuery(stubbedConfig, stubbedAcl);
    });

    it('returns the expected query', () => {
      expect(result).toEqual(expectedQuery+'&acl=true');
    });
  });
});
