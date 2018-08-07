const DEPLOY = "debug";

const FETCH = {
  "production": {
    urlPrefix: 'http://fe2xp4.natappfree.cc/ionic-shop/index.php',
    imgPrefix: 'http://fe2xp4.natappfree.cc/ionic-shop/'
  },
  "debug": {
    urlPrefix: 'http://fe2xp4.natappfree.cc/ionic-shop/index.php',
    imgPrefix: 'http://fe2xp4.natappfree.cc/ionic-shop/'
  }
}

export const URL = FETCH[DEPLOY];
