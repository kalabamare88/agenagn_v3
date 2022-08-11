import axios from "axios";

const local = "http://localhost:5000";
// const localMobile = 'http://192.168.1.101/:5000';

const backEndApi = axios.create({
  baseURL: local,
});

export default backEndApi;
