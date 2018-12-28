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
      "182270810559-lcme3get66u8l2rivhh3r6du7j25ome4.apps.googleusercontent.com",
    clientSecret: "yPrInzMQwWRUixvQHO6RGz00",
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  session: {
    //random string used to encrypt cookie key
    cookieKey: "kfhhefjhewfhakhfkah"
  }
};
