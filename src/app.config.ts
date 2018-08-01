const DEPLOY = "debug";

const FETCH = {
  "production": {
    urlPrefix: 'http://9xbxje.natappfree.cc/ionic-shop/index.php',
    imgPrefix: 'http://9xbxje.natappfree.cc/ionic-shop/'
  },
  "debug": {
    urlPrefix: 'http://9xbxje.natappfree.cc/ionic-shop/index.php',
    imgPrefix: 'http://9xbxje.natappfree.cc/ionic-shop/'
  }
}

export const URL = FETCH[DEPLOY];
