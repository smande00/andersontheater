export const environment = {
  production: true,
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
    url: 'https://anderson-theater.firebaseio.com/login',
    handleCodeInApp: true,
  }
};
