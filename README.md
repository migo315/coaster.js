# coaster-platform.js
This is a javascript library for fetching attraction and themepark data from the
official [coaster-platform.org](https://coaster-platform.org) api.

This library is currently in early development. Contribution is welcome.

## Installation
```
yarn add coaster-platform.js
```

```
npm install coaster-platform.js
```

## Usage
Some short examples for fetching data.

### Fetching parks from germany
```
import capi from 'coaster-platform.js';

let config = {
    filters: [
        'address.country.name:"germany"'
    ]
};

capi.getParks(config).then(function (data) {
    if (data !== null) {
        data.items.forEach(function (park) {
          console.log(park.name);
      });
    }
});
```

### Fetch "movie park germany"
```
import capi from 'coaster-platform.js';

// That's the id of movie park at coaster-platform.org
// Every park and attraction has an unique id
let parkUuid = 'a5fb81f1-cc4e-4a7e-8419-98cc523487e3';

capi.getPark(parkUuid).then(function (park) {
    if (park !== null) {
        console.log(park.name);
    }
});
```

### Fetching attractions from "movie park germany"
```
import capi from 'coaster-platform.js';

// That's the id of movie park at coaster-platform.org
// Every park and attraction has an unique id
let parkUuid = 'a5fb81f1-cc4e-4a7e-8419-98cc523487e3';

let config = {
    filters: [
        `park: "${parkUuid}"`
    ]
};

capi.getAttractions(config).then(function (data) {
    if (data !== null) {
        data.items.forEach(function (attraction) {
          console.log(attraction.name);
      });
    }
});
```