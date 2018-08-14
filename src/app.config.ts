const DEPLOY = "debug";

const FETCH = {
  "production": {
    urlPrefix: ' http://ywqkv4.natappfree.cc/ionic-shop/index.php',
    imgPrefix: ' http://ywqkv4.natappfree.cc/ionic-shop/'
  },
  "debug": {
    urlPrefix: ' http://ywqkv4.natappfree.cc/ionic-shop/index.php',
    imgPrefix: ' http://ywqkv4.natappfree.cc/ionic-shop/'
  }
}

export const URL = FETCH[DEPLOY];
