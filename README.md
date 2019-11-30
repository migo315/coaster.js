# Coaster.Cloud Javascript SDK (Legacy / Unsupported)

**UNSUPPORTED**: This library is not used anymore. The legacy REST API is removed for the new and more flexible **Open Coaster Interface**.
This library is only for historical reasons public but don't work anymore.

Please use [Open Coaster Interface](https://github.com/migo315/open-coaster-interface) for fetching parks and attractions data.

~~This is a javascript library for fetching attraction and themepark data from the
official [coaster.cloud](https://coaster.cloud) api.~~

[![npm version](https://badge.fury.io/js/coaster.js.svg)](https://badge.fury.io/js/coaster.js)
[![Coverage Status](https://coveralls.io/repos/github/migo315/coaster.js/badge.svg?branch=master)](https://coveralls.io/github/migo315/coaster.js?branch=master)

## Installation
```
yarn add coaster.js
```

```
npm install coaster.js
```

## Usage
Some short examples for fetching data.

### Fetching parks from germany
```
const capi = require("coaster.js");

let config = {
    filters: [
        'address.country.name:"germany"'
    ]
};

capi.getParks(config).then(function (response) {
    if (response !== null) {
        response.data.forEach(function (park) {
          console.log(park.name);
      });
    }
});
```

### Fetch "Movie Park Germany" for german language
You can use the "language" param for every GET request for fetching results in given language.
Look at https://api.coaster.cloud which languages are supported.

```
const capi = require("coaster.js");

// That's the id of movie park at coaster.cloud
// Every park and attraction has an unique id
let parkUuid = 'a5fb81f1-cc4e-4a7e-8419-98cc523487e3';

let config = {
    language: 'de'
};

capi.getPark(parkUuid, config).then(function (response) {
    if (response !== null) {
        console.log(response.data.name);
    }
});
```

Instead of setting the language for each request, you can change the default language property:

```
const capi = require("coaster.js");
capi.language = 'de';

// That's the id of movie park at coaster.cloud
// Every park and attraction has an unique id
let parkUuid = 'a5fb81f1-cc4e-4a7e-8419-98cc523487e3';

capi.getPark(parkUuid).then(function (response) {
    if (response !== null) {
        console.log(response.data.name);
    }
});
```

### Fetching attractions from "Movie Park Germany"
```
const capi = require("coaster.js");

// That's the id of movie park at coaster.cloud
// Every park and attraction has an unique id
let parkUuid = 'a5fb81f1-cc4e-4a7e-8419-98cc523487e3';

let config = {
    park: parkUuid
};

capi.getAttractions(config).then(function (response) {
    if (response !== null) {
        response.data.forEach(function (attraction) {
          console.log(attraction.name);
      });
    }
});
```

### Fetching waiting times from "Efteling"
```
const capi = require("coaster.js");

// That's the id of efteling at coaster.cloud
// Every park and attraction has an unique id
let parkUuid = '49f00560-9b8d-4c11-a3ed-f548192ef5d9';

capi.getWaitingTimes(parkUuid).then(function (response) {
    if (response !== null) {
        response.data.forEach(function (attraction) {
          console.log(attraction.name);
      });
    }
});
```
