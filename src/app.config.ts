const DEPLOY = "debug";

const FETCH = {
  "production": {
    urlPrefix: 'http://a6gzud.natappfree.cc/ionic-shop/index.php',
    imgPrefix: 'http://a6gzud.natappfree.cc/ionic-shop/'
  },
  "debug": {
    urlPrefix: 'http://a6gzud.natappfree.cc/ionic-shop/index.php',
    imgPrefix: 'http://a6gzud.natappfree.cc/ionic-shop/'
  }
}

export const URL = FETCH[DEPLOY];
