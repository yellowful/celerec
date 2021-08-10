# Celebrity Recognization AI Single Page Application

[這個web app中文的架構和說明](https://www.bdr.rocks/project/ai-%E6%98%8E%E6%98%9F%E8%BE%A8%E8%AD%98-web-app/ "這個web app中文的架構和說明")

This is the front-end open source code of CeleRec SPA, which can recognize celebrities.

[The source code of back end.](https://github.com/yellowful/sbbackend)

## Installation

You can download or clone this project from git hub.

```shell
    git clone https://github.com/yellowful/celerec.git
```

Install it:

```shell
    npm install
```

## Setting

Change the backendURL to your backendURL in the `./src/constants.js`

```js
    export const backendURL = 'https://***.***.***';
```

## Run

Run the app when you are developing:

```shell
  npm run start:dev
```

Generate static files for served in a static site.

```shell
  npm build
```

## License

The code used for generating this web site are licensed as [MIT](./LICENSE "MIT").
