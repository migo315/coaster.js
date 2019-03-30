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
```
import capi from 'coaster-platform.js';

// Get parks from germany
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