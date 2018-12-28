import axios from "axios";
import moment from "moment";

const getEvents = (lat, lon) => {
  return axios.get(
    "https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/search?app_key=RWkdz5Vnd4DH3VfW&keywords=music&date=2018061400-2018080100'&where=" +
      lat +
      "," +
      lon +
      "&within=5"
  );
};

const restaurant = (lat, lon) => {
  return axios.get(
    "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
      lat +
      "," +
      lon +
      "&radius=1500&type=restaurant&key=AIzaSyCHRamGa2MG859CJqoVNeXCJCZ4iKapiZs"
  );
};

const getHotels = (lat, lon) => {
  return axios.get(
    "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
      lat +
      "," +
      lon +
      "&radius=3000&keyword=hotel&types=lodging&key=AIzaSyCHRamGa2MG859CJqoVNeXCJCZ4iKapiZs"
  );
};

const museum = (lat, lon) => {
  return axios.get(
    "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
      lat +
      "," +
      lon +
      "&radius=5000&keyword=museum&types=museum&key=AIzaSyCHRamGa2MG859CJqoVNeXCJCZ4iKapiZs"
  );
};

const landmarks = (lat, lon) => {
  return axios.get(
    "https://reverse.geocoder.cit.api.here.com/6.2/reversegeocode.json?app_id=HCJBHeK2kmFy3ZdA2wv4&app_code=bT9W3jH2FDVF4ZHS3nHaIg&mode=retrieveLandmarks&prox=" +
      lat +
      "," +
      lon +
      ",1000"
  );
};

const active = (lat, lon) => {
  return axios.get(
    "https://cors-anywhere.herokuapp.com/http://api.amp.active.com/v2/search?start_date=" +
      moment().format("YYYY-MM-DD") +
      "&lat_lon=" +
      lat +
      "," +
      lon +
      "&api_key=femervwexgb28gepuw67s3x4"
  );
};

const weather = query => {
  return axios.get(
    "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=" +
      query +
      "&APPID=917e8cb9b59f6fe81806ecd7d1c2a7c3"
  );
};

export { restaurant, getEvents, getHotels, museum, landmarks, active, weather };
