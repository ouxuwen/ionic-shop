const DEPLOY = "debug";

const FETCH = {
  "production": {
    urlPrefix: 'http://j3b8fj.natappfree.cc/ionic-shop/index.php',
    imgPrefix: 'http://j3b8fj.natappfree.cc/ionic-shop/'
  },
  "debug": {
    urlPrefix: 'http://j3b8fj.natappfree.cc/ionic-shop/index.php',
    imgPrefix: 'http://j3b8fj.natappfree.cc/ionic-shop/'
  }
}

export const URL = FETCH[DEPLOY];
