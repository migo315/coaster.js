# Coaster.Cloud Javascript SDK
This is a javascript library for fetching attraction and themepark data from the
official [coaster.cloud](https://coaster.cloud) api.

This library is currently in early development. Contribution is welcome.

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

### Fetch "Movie Park Germany"
```
const capi = require("coaster.js");

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