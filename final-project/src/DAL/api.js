// Dal

import axios2 from "./fetcher";

function decode_flask_cookie(val) {
  if (typeof val === "string") {
    if (val.indexOf('\\') === -1) {
      return val;  // not encoded
  }
  val = val.slice(1, -1).replace(/\\"/g, '"');
  val = val.replace(/\\(\d{3})/g, function(match, octal) { 
      return String.fromCharCode(parseInt(octal, 8));
  });
  return JSON.parse(val.replace(/\\\\/g, '\\'));
  }else{
    return val
  }
  
}

async function getGamesByPagesApi(
  pageNumber = 1,
  size = 9,
  orderBy = "gameID",
  orderDirection = "asc"
) {
  try {
    const response = await Promise.resolve([
      {
        gameID: 1,
        gameName: "Cyberpunk 2077",
        publisher: "CD PROJEKT RED",
        releaseDate: "2020-12-10",
        description: "sadasda",
        coverImg: "./Images/1.jpg",
      },
      {
        gameID: 2,
        gameName: "Witcher 3",
        publisher: "CD PROJEKT RED",
        releaseDate: "2020-12-10",
        description: "sadasda",
        coverImg: "./Images/2.jpg",
      },
      {
        gameID: 3,
        gameName: "Metro Exodus",
        publisher: "CD PROJEKT RED",
        releaseDate: "2020-12-10",
        description: "sadasda",
        coverImg: "./Images/3.jpg",
      },
      {
        gameID: 4,
        gameName: "Hollow Knight",
        publisher: "CD PROJEKT RED",
        releaseDate: "2020-12-10",
        description: "sadasda",
        coverImg: "./Images/4.jpg",
      },
      {
        gameID: 5,
        gameName: "Baldur's Gate 3",
        publisher: "CD PROJEKT RED",
        releaseDate: "2020-12-10",
        description: "sadasda",
        coverImg: "./Images/5.jpg",
      },
      {
        gameID: 6,
        gameName: "Sleeping Dogs",
        publisher: "CD PROJEKT RED",
        releaseDate: "2020-12-10",
        description: "sadasda",
        coverImg: "./Images/6.jpg",
      },
      {
        gameID: 7,
        gameName: "METAL GEAR SOLID",
        publisher: "CD PROJEKT RED",
        releaseDate: "2020-12-10",
        description: "sadasda",
        coverImg: "./Images/7.jpg",
      },
      {
        gameID: 8,
        gameName: "Carmageddon",
        publisher: "CD PROJEKT RED",
        releaseDate: "2020-12-10",
        description: "sadasda",
        coverImg: "./Images/8.jpg",
      },
      {
        gameID: 9,
        gameName: "Heroes 3",
        publisher: "CD PROJEKT RED",
        releaseDate: "2020-12-10",
        description: "sadasda",
        coverImg: "./Images/9.jpg",
      },
    ]);
    // if (!response.ok) {
    //   throw new Error("HTTP Error status = " + response.status);
    // }
    return response;
  } catch {
    throw new Error("request FAILED!");
  }
}

async function getAllGamesApi() {
  try {
    const response = await fetch("http://localhost:3200/games");
    if (!response.ok) {
      throw new Error("HTTP Error status = " + response.status);
    }
    const obj = await response.json();
    return obj;
  } catch (e) {
    console.log("get games", e);
    throw e;
  }
}

async function getFilteredGenrePlatform(filter) {
  try {
    let url = "http://localhost:3200/games/filteredGames?";
    for (const genre in filter.genres) {
      url += `genreID=${genre}&`;
    }
    for (const platform in filter.platforms) {
      url += `platformID=${platform}&`;
    }
    url = url.slice(0, url.length - 1);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("HTTP Error status = " + response.status);
    }
    const obj = await response.json();
    return obj;
  } catch {
    throw new Error("request FAILED!");
  }
}

async function getAllGameDetailes(gameId) {
  try {
    const response = await fetch(`http://localhost:3200/games/${gameId}`);
    if (!response.ok) {
      throw new Error("HTTP Error status = " + response.status);
    }
    const obj = await response.json();
    return obj;
  } catch {
    throw new Error("request FAILED!");
  }
}

async function getReviewsData(gameId) {
  try {
    const response = await fetch(
      `http://localhost:3200/games/reviews/${gameId}`
    );
    if (!response.ok) {
      throw new Error("HTTP Error status = " + response.status);
    }
    const obj = await response.json();
    return obj;
  } catch {
    throw new Error("request FAILED!");
  }
}

async function getSortedScoreDate(sort, direction) {
  try {
    const response = await fetch(
      `http://localhost:3200/games/sortedGamesScoreDate?sort=${sort}&direction=${direction}`
    );
    if (!response.ok) {
      throw new Error("HTTP Error status = " + response.status);
    }
    const obj = await response.json();
    return obj;
  } catch (e) {
    console.log(e);
    throw new Error("request FAILED!");
  }
}

async function postLogin(username, password) {
  try {
    const response = await axios2.post("/login", {
      username: username,
      password: password,
    });

    if (response.status !== 200) {
      throw new Error("HTTP Error status = " + response.status);
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

async function getUsersGamesApi() {
  try {
    const response = await axios2.get(`users/games`, {});
    if (response.status !== 200) {
      throw new Error("HTTP Error status = " + response.status);
    }
    return response.data;
  } catch {
    throw new Error("request LOGIN FAILED!");
  }
}

async function getUsersGamesScores() {
  try {
    const response = await axios2.get(`/users/scores`, {});
    if (response.status !== 200) {
      throw new Error("HTTP Error status = " + response.status);
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

async function getUsersSearchedGames(word, searchBy) {
  try {
    const response = await axios2.get(
      `users/search?searchParam=${word}&searchBy=${searchBy}`,
      {}
    );
    if (response.status !== 200) {
      throw new Error("HTTP Error status = " + response.status);
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

async function getSearchedGames(word, searchBy) {
  try {
    const response = await axios2.get(
      `/games/search?searchParam=${word}&searchBy=${searchBy}`
    );
    if (response.status !== 200) {
      throw new Error("HTTP Error status = " + response.status);
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

async function postRegister(userData) {
  try {
    const response = await fetch("http://localhost:3200/register", {
      method: "POST",
      body: userData,
    });

    if (!response.ok) {
      throw new Error("HTTP Error status = " + response.status);
    }
    const obj = await response.json();
    return obj;
  } catch (error) {
    throw new Error("kobis error");
  }
}

async function getUserByUsername(username) {
  try {
    const response = await axios2.get(`/users/username?username=${username}`);
    if (response.status !== 200) {
      throw new Error("HTTP Error status = " + response.status);
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

async function getUserProfileData() {
  try {
    const response = await axios2.get(`/users/profile`);
    if (response.status !== 200) {
      throw new Error("HTTP Error status = " + response.status);
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

async function getGamesToReview() {
  try {
    const response = await axios2.get(
      "http://localhost:3200/users/gamesToReview"
    );
    if (response.status !== 200) {
      throw new Error("HTTP Error status = " + response.status);
    }
    return response.data;
  } catch (e) {
    console.log("get games", e);
    throw e;
  }
}

async function postReview(review) {
  try {
    const data = {
      gameID: review.gameID.value,
      title: review.title.value,
      body: review.body.value,
      conclusion: review.conclusion.value,
      score: review.score.value,
      visability: review.visability.value,
      tagID: review.tags.value,
    };

    const response = await axios2.post(
      "http://localhost:3200/users/addReview",
      { data }
    );
    if (response.status !== 200) {
      throw new Error("HTTP Error status = " + response.status);
    }
    return response.data;
  } catch (e) {
    console.log("post review", e);
    throw e;
  }
}

async function getGenresApi() {
  try {
    const response = await axios2.get("http://localhost:3200/genres");
    if (response.status !== 200) {
      throw new Error("HTTP Error status = " + response.status);
    }
    return response.data;
  } catch (e) {
    console.log("post review", e);
    throw e;
  }
}

async function getPlatform() {
  try {
    const response = await axios2.get("http://localhost:3200/genres/platforms");
    if (response.status !== 200) {
      throw new Error("HTTP Error status = " + response.status);
    }
    return response.data;
  } catch (e) {
    console.log("post review", e);
    throw e;
  }
}

async function getTagsApi() {
  try {
    const response = await axios2.get("http://localhost:3200/genres/tags");
    if (response.status !== 200) {
      throw new Error("HTTP Error status = " + response.status);
    }
    return response.data;
  } catch (e) {
    console.log("post review", e);
    throw e;
  }
}

async function getReview(reviewId) {
  try {
    const response = await axios2.get(
      `http://localhost:3200/users/review/${reviewId}`
      );
      if (response.status !== 200) {
        throw new Error("HTTP Error status = " + response.status);
      }
      console.log(reviewId, response.data);
    return response.data;
  } catch (e) {
    console.log("get review", e);
    throw e;
  }
}

async function putReview(review, reviewId) {
  try {
    const data = {
      gameID: review.gameID.value,
      title: review.title.value,
      body: review.body.value,
      conclusion: review.conclusion.value,
      score: review.score.value,
      visability: review.visability.value,
      tagID: review.tags.value,
    }

    const response = await axios2.put(
      `http://localhost:3200/users/review/${reviewId}`,
      { data }
    );
    if (response.status !== 200) {
      throw new Error("HTTP Error status = " + response.status);
    }
    return response.data;
  } catch (e) {
    console.log("put review", e);
    throw e;
  }
}

async function postUserGame(gameId) {
  try {
    const response = await axios2.post(
      `http://localhost:3200/users/addGame/${gameId}`
    );
    if (response.status !== 200) {
      throw new Error("HTTP Error status = " + response.status);
    }
    return response.data;
  } catch (e) {
    console.log("post review", e);
    throw e;
  }
}

async function getUserGameList() {
  try {
    const response = await axios2.get(
      `http://localhost:3200/users/favorite`);
    if (response.status !== 200) {
      throw new Error("HTTP Error status = " + response.status);
    }
    return response.data;
  } catch (e) {
    console.log("post review", e);
    throw e;
  }
}

async function deleteGameFavorite(gameId) {
  try {
    const response = await axios2.delete(
      `http://localhost:3200/users/addGame/${gameId}`);
    if (response.status !== 200) {
      throw new Error("HTTP Error status = " + response.status);
    }
    return response.data;
  } catch (e) {
    console.log("post review", e);
    throw e;
  }
}

async function putRegister(userData) {
  try {
    const response = await fetch("http://localhost:3200/register", {
      method: "PUT",
      body: userData,
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error("HTTP Error status = " + response.status);
    }
    const obj = await response.json();
    return obj;
  } catch (error) {
    throw new Error("kobis putRegister error");
  }
}

export {
  getAllGamesApi,
  getUsersGamesApi,
  getGamesByPagesApi,
  getFilteredGenrePlatform,
  getAllGameDetailes,
  getReviewsData,
  getSortedScoreDate,
  postLogin,
  getUsersGamesScores,
  getSearchedGames,
  getUsersSearchedGames,
  postRegister,
  getUserByUsername,
  getUserProfileData,
  getGamesToReview,
  postReview,
  getGenresApi,
  getPlatform,
  getTagsApi,
  getReview,
  putReview,
  postUserGame,
  getUserGameList,
  deleteGameFavorite,
  putRegister,
  decode_flask_cookie
};
