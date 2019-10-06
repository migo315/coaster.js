require('dotenv').config();

function parseBoolean(boolToParse) {
  if (boolToParse === 'true') return true;
  if (boolToParse === 'false') return false;
  return undefined;
}

module.exports = {
  baseUrl: process.env.BASE_URL,
  withAcl: parseBoolean(process.env.ACL),
  language: process.env.DEFAULT_LANGUAGE,
};
