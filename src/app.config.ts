const DEPLOY = "debug";

const FETCH = {
  "production": {
    urlPrefix: 'http://mi4thj.natappfree.cc/ionic-shop/index.php',
    imgPrefix: 'http://mi4thj.natappfree.cc/ionic-shop/'
  },
  "debug": {
    urlPrefix: 'http://mi4thj.natappfree.cc/ionic-shop/index.php',
    imgPrefix: 'http://mi4thj.natappfree.cc/ionic-shop/'
  }
}

export const URL = FETCH[DEPLOY];
