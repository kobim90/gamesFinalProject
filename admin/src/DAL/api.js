import axios from "axios";

async function postLogin(username, password) {
  try {
    const response = await axios.post("http://localhost:3200/login/admin", {
      username: username,
      password: password,
    }, {withCredentials: true});

    if (response.status !== 200) {
      throw new Error("HTTP Error status = " + response.status);
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

async function getGenrePlatforms() {
  try {
    const response = await axios.get("http://localhost:3200/admin/checkboxData", {withCredentials: true});

    if (response.status !== 200) {
      throw new Error("HTTP Error status = " + response.status);
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

async function postGame(data) {
  try {
    const response = await axios.post("http://localhost:3200/admin/", data, {withCredentials: true, headers: {'Content-Type': 'multipart/form-data'}});

    if (response.status !== 200) {
      throw new Error("HTTP Error status = " + response.status);
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

export { postLogin, getGenrePlatforms, postGame };
