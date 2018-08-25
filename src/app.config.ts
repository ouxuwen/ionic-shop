const DEPLOY = "debug";

const FETCH = {
  "production": {
    urlPrefix: 'http://4hhyv2.natappfree.cc/ionic-shop/index.php',
    imgPrefix: 'http://4hhyv2.natappfree.cc/ionic-shop/'
  },
  "debug": {
    urlPrefix: 'http://4hhyv2.natappfree.cc/ionic-shop/index.php',
    imgPrefix: 'http://4hhyv2.natappfree.cc/ionic-shop/'
  }
}

export const URL = FETCH[DEPLOY];
