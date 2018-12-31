module.exports = {
  facebookAuth: {
    clientID: "217977628816124",
    clientSecret: "d3f5bd326f7fd580b4a5b369c00922f6",
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  twitterAuth: {
    consumerKey: "ANsRYiHDLLDtWWLfy5Ye4W6Ky",
    consumerSecret: "8RBl4PXqkshQMX3XxisbcMDTimprp32HmaVUWHf0lAr1fc4B1y",
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  },
  googleAuth: {
  clientID:
    "877978131575-6j6pei095jd03p666qlbjpa43nis0mc6.apps.googleusercontent.com",
  clientSecret: "68DlCfLzxVO9kC5kGP3Cto3R",
  callbackURL: "https://trevelo.herokuapp.com/auth/google/callback"
},
  session: {
    //random string used to encrypt cookie key
    cookieKey: "kfhhefjhewfhakhfkah"
  }
};


// googleAuth: {
//   clientID:
//     "877978131575-6j6pei095jd03p666qlbjpa43nis0mc6.apps.googleusercontent.com",
//   clientSecret: "68DlCfLzxVO9kC5kGP3Cto3R",
//   callbackURL: "https://trevelo.herokuapp.com/auth/google/callback"
// },