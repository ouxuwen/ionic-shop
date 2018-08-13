const DEPLOY = "debug";

const FETCH = {
  "production": {
    urlPrefix: 'http://120.79.209.150/ionic-shop/index.php',
    imgPrefix: 'http://120.79.209.150/ionic-shop/'
  },
  "debug": {
    urlPrefix: 'http://120.79.209.150/ionic-shop/index.php',
    imgPrefix: 'http://120.79.209.150/ionic-shop/'
  }
}

export const URL = FETCH[DEPLOY];
