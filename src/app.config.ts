const DEPLOY = "debug";

const FETCH = {
  "production": {
    urlPrefix: 'http://dyrx2i.natappfree.cc/ionic-shop/index.php',
    imgPrefix: 'http://dyrx2i.natappfree.cc/ionic-shop/'
  },
  "debug": {
    urlPrefix: 'http://dyrx2i.natappfree.cc/ionic-shop/index.php',
    imgPrefix: 'http://dyrx2i.natappfree.cc/ionic-shop/'
  }
}

export const URL = FETCH[DEPLOY];
