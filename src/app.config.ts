const DEPLOY = "debug";

const FETCH = {
  "production": {
    urlPrefix: 'http://120.79.209.150/ionic/index.php',
    imgPrefix: 'http://120.79.209.150/ionic/'
  },
  "debug": {
    urlPrefix: 'http://120.79.209.150/ionic/index.php',
    imgPrefix: 'http://120.79.209.150/ionic/'
  }
}

export const URL = FETCH[DEPLOY];
