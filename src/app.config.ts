const DEPLOY = "debug";

const FETCH = {
  "production": {
    urlPrefix: 'http://192.168.1.102:8080/ionic-shop/index.php',
    imgPrefix: 'http://192.168.1.102:8080/ionic-shop/'
  },
  "debug": {
    urlPrefix: 'http://192.168.1.102:8080/ionic-shop/index.php',
    imgPrefix: 'http://192.168.1.102:8080/ionic-shop/'
  }
}

export const URL = FETCH[DEPLOY];
