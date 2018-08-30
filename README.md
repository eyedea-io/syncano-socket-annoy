# Syncano Socket for Annoy (Approximate Nearest Neighbors Oh Yeah)

[![Syncano Socket](https://img.shields.io/badge/syncano-socket-blue.svg)](https://syncano.io)
[![CircleCI branch](https://img.shields.io/circleci/project/github/eyedea-io/syncano-socket-annoy/master.svg)](https://circleci.com/gh/eyedea-io/syncano-socket-annoy/tree/master)
![Codecov branch](https://img.shields.io/codecov/c/github/eyedea-io/syncano-socket-annoy/master.svg)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![npm](https://img.shields.io/npm/dw/@eyedea-sockets/annoy.svg)](https://www.npmjs.com/package/@eyedea-sockets/annoy)
![license](https://img.shields.io/github/license/eyedea-io/syncano-socket-annoy.svg)

Main Socket features:

* **annoy/match** — find nearest neighbours

## Getting Started

Install package in your project:

```sh
cd my_project
npm install @syncano/cli --save-dev
npm install @eyedea-sockets/annoy --save
npx s deploy
```

Use it:

```js
import Syncano from '@syncano/client'

const s = new Syncano(<instaneName>)

// Search for a user
const params = {
  model: 'profiles', // name of the data class
  query: ['react', 'js'],
  matchWith: [10,3]
}
const suggestions = await s.get('annoy/match', params)

// {
//   distances: [ 1, 5, 8.062257766723633, 9.219544410705566 ],
//   objects: [
//     { username: 'qk', react: 10, js: 2, css: 3 },
//     { username: 'gustavo', react: 5, js: 3, css: 7 },
//     { username: 'pedro', react: 2, js: 2, css: 4 },
//     { username: 'nik', react: 1, js: 1, css: 3 }
//   ]
// }
```
