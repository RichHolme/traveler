import axios from "axios";

const cityPicURL = "https://api.teleport.org/api/urban_areas/slug:";
const images = "/images/";

export default {
  cityPic: function(city) {
    return axios.get(cityPicURL + city + images);
  }
};
