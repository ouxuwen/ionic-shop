const DEPLOY = "debug";

const FETCH = {
  "production": {
    urlPrefix: 'http://mp2etp.natappfree.cc/ionic-shop/index.php',
    imgPrefix: 'http://mp2etp.natappfree.cc/ionic-shop/'
  },
  "debug": {
    urlPrefix: 'http://mp2etp.natappfree.cc/ionic-shop/index.php',
    imgPrefix: 'http://mp2etp.natappfree.cc/ionic-shop/'
  }
}

export const URL = FETCH[DEPLOY];
