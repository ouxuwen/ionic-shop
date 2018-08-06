const DEPLOY = "debug";

const FETCH = {
  "production": {
    urlPrefix: 'http://6t73q2.natappfree.cc/ionic-shop/index.php',
    imgPrefix: 'http://6t73q2.natappfree.cc/ionic-shop/'
  },
  "debug": {
    urlPrefix: 'http://6t73q2.natappfree.cc/ionic-shop/index.php',
    imgPrefix: 'http://6t73q2.natappfree.cc/ionic-shop/'
  }
}

export const URL = FETCH[DEPLOY];
