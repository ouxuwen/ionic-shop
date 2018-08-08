const DEPLOY = "debug";

const FETCH = {
  "production": {
    urlPrefix: 'http://r7miit.natappfree.cc/ionic-shop/index.php',
    imgPrefix: 'http://r7miit.natappfree.cc/ionic-shop/'
  },
  "debug": {
    urlPrefix: 'http://r7miit.natappfree.cc/ionic-shop/index.php',
    imgPrefix: 'http://r7miit.natappfree.cc/ionic-shop/'
  }
}

export const URL = FETCH[DEPLOY];
