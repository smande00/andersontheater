// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  tmdbAPI: {
    key:"20fe90a1b4787816a94068260ef62217",
    url:"https://api.themoviedb.org/3/"
  },
  firebaseConfig: {
    apiKey: "AIzaSyD61GxZib_VwAqKm_S3yc-Q0cRKRhNlJ0g",
    authDomain:
      "anderson-theater.firebaseapp.com",
    databaseURL:
      "https://anderson-theater.firebaseio.com",
    projectId:
      "anderson-theater",
    storageBucket:
      "anderson-theater.appspot.com",
    messagingSenderId:
      "632440475657"
  },
    authorizationEmailSettings:{
    url: 'http://localhost:4200/login',
    handleCodeInApp: true,
  }
};

