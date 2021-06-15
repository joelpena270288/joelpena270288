import axios from "axios";
import Cookies from "js-cookie";

const ENDPOINT_PATH = "api/auth/";

export default {
  setUserLogged(userLogged) {
    Cookies.set("userLogged", userLogged);
  },
  getUserLogged() {
    return Cookies.get("userLogged");
  },
  register(username, password) {
    const user = { username, password };
    return axios.post(ENDPOINT_PATH + "regiser", user);
  },
  login(username, password) {
    const user = { username, password };
    return axios.post(ENDPOINT_PATH + "signin", user);
  },
  deleteUserLogged() {
  Cookies.remove('userLogged');
}
};