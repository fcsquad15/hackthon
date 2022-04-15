import axios from "axios";

const conection = axios.create({
  baseURL: "https://hackthon-squad15.herokuapp.com",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});


export function Get(url) {
  return conection.get(url);
}


export function Post(url, key, data) {
  return conection.post(url, key, data);
}

export function Put(url, key, data) {
  return conection.put(url, key, data);
}
