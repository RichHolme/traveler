module.exports = {
  mongodb: {
    //online database
    // dbURI: "mongodb://brandon:brandon1@ds159840.mlab.com:59840/travelerapp"
    dataURI: process.env.MONGODB_URI
    // dbURI: "]]
    //local database testing
    // dbURI:"mongodb://localhost:27017/trav"
  }
};
