import axios from "axios";

const conection = axios.create({
  baseURL: "localhost:8000",
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
