const DEPLOY = "debug";

const FETCH = {
  "production": {
    urlPrefix: 'https://119.23.43.134/ionic-shop/index.php',
    imgPrefix: 'https://119.23.43.134/ionic-shop/'
  },
  "debug": {
    urlPrefix: 'https://119.23.43.134/ionic-shop/index.php',
    imgPrefix: 'https://119.23.43.134/ionic-shop/'
  }
}

export const URL = FETCH[DEPLOY];
