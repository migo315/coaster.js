require('dotenv').config();

function parseBoolean(boolToParse) {
  if (boolToParse === 'true') return true;
  if (boolToParse === 'false') return false;
  return undefined;
}

module.exports = {
  baseUrl: process.env.COASTER_BASE_URL,
  withAcl: parseBoolean(process.env.COASTER_ACL),
  language: process.env.COASTER_DEFAULT_LANGUAGE,
};
