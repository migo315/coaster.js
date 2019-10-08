const _ = require('lodash');
const { language } = require('../config');

const buildQuery = (config, withAcl) => {
  let query = [];

  if (config.hasOwnProperty('page') && config.page) {
      query.push('page=' + encodeURIComponent(config.page));
  }

  if (config.hasOwnProperty('itemsPerPage') && config.itemsPerPage) {
      query.push('itemsPerPage=' + encodeURIComponent(config.itemsPerPage));
  }

  if (config.hasOwnProperty('searchTerm') && config.searchTerm) {
      query.push('search=' + encodeURIComponent(config.searchTerm));
  }

  if (config.hasOwnProperty('language') && config.language) {
      query.push('language=' + encodeURIComponent(config.language));
  } else {
      query.push('language=' + encodeURIComponent(language));
  }

  if (config.hasOwnProperty('sort') && config.sort) {
      query.push('sort=' + encodeURIComponent(config.sort));
  }

  if (config.hasOwnProperty('regulation')) {
      let regulation = _.merge(
          {
              size: null,
              age: null
          },
          config.regulation
      );

      if (regulation.size !== null || regulation.age !== null) {
          let size = (/^\d+$/.test(regulation.size)) ? regulation.size : 'null';
          let age = (/^\d+$/.test(regulation.age)) ? regulation.age : 'null';

          query.push('filter[]=' + encodeURIComponent(`regulation(${size},${age})`));
      }
  }

  if (config.hasOwnProperty('facets')) {
      config.facets.forEach(function (facet) {
          query.push('facet[]=' + encodeURIComponent(facet));
      });
  }

  if (config.hasOwnProperty('filters')) {
      config.filters.forEach(function (filter) {
          query.push('filter[]=' + encodeURIComponent(filter));
      });
  }

  if (config.hasOwnProperty('founded') && config.founded !== null && (/^\d{4}$/.test(config.founded))) {
      let year = config.founded;
      query.push('filter[]=' + encodeURIComponent(`founded.year:${year}`));
  }

  if (withAcl === true) {
      query.push('acl=true');
  }

  return query.length > 0 ? '?' + query.join('&') : '';
};

module.exports = { buildQuery };
