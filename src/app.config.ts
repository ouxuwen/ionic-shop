const DEPLOY = "debug";

const FETCH = {
  "production": {
    urlPrefix: 'http://mh3xpu.natappfree.cc/ionic-shop/index.php',
    imgPrefix: 'http://mh3xpu.natappfree.cc/ionic-shop/'
  },
  "debug": {
    urlPrefix: 'http://mh3xpu.natappfree.cc/ionic-shop/index.php',
    imgPrefix: 'http://mh3xpu.natappfree.cc/ionic-shop/'
  }
}

export const URL = FETCH[DEPLOY];
