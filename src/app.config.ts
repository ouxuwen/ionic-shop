const DEPLOY = "debug";

const FETCH = {
  "production": {
    urlPrefix: 'http://mzy266.natappfree.cc/ionic-shop/index.php',
    imgPrefix: 'http://mzy266.natappfree.cc/ionic-shop/'
  },
  "debug": {
    urlPrefix: 'http://mzy266.natappfree.cc/ionic-shop/index.php',
    imgPrefix: 'http://mzy266.natappfree.cc/ionic-shop/'
  }
}

export const URL = FETCH[DEPLOY];
