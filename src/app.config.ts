const DEPLOY = "debug";

const FETCH = {
  "production": {
    urlPrefix: 'http://ueei65.natappfree.cc/ionic-shop/index.php',
    imgPrefix: 'http://ueei65.natappfree.cc/ionic-shop/'
  },
  "debug": {
    urlPrefix: 'http://ueei65.natappfree.cc/ionic-shop/index.php',
    imgPrefix: 'http://ueei65.natappfree.cc/ionic-shop/'
  }
}

export const URL = FETCH[DEPLOY];
