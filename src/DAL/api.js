// Dal


async function getPlatformApi() {
  try {
    const response = await Promise.resolve([
      { platformID: 1, platformName: "Windows" },
      { platformID: 2, platformName: "OSX" },
      { platformID: 3, platformName: "Linux" },
    ]);
    // if (!response.ok) {
    //   throw new Error("HTTP Error status = " + response.status);
    // }
    return response;
  } catch {
    throw new Error("request FAILED!");
  }
}

async function getGenresApi() {
  try {
    const response = await Promise.resolve([
      { genreID: 1, genreName: "Action" },
      { genreID: 2, genreName: "Adventure" },
      { genreID: 3, genreName: "Indie" },
      { genreID: 4, genreName: "RPG" },
      { genreID: 5, genreName: "Shooters" },
      { genreID: 6, genreName: "Simulation" },
      { genreID: 7, genreName: "Sports & Racing" },
      { genreID: 8, genreName: "Strategy" },
    ]);
    // if (!response.ok) {
    //   throw new Error("HTTP Error status = " + response.status);
    // }
    return response;
  } catch {
    throw new Error("request FAILED kobi!");
  }
}

async function getAllGamesApi() {
  try {
    const response = await fetch("http://localhost:3200/games")
    if (!response.ok) {
      throw new Error("HTTP Error status = " + response.status);
    }
    const obj = await response.json();
    return obj;
  } catch {
    throw new Error("request FAILED!");
  }
}

async function getTagsApi() {
  try {
    const response = await Promise.resolve([
      { tagID: 1, tagName: "Fun" },
      { tagID: 2, tagName: "Casual" },
      { tagID: 3, tagName: "HardCore" },
      { tagID: 4, tagName: "Addicting" },
    ]);
    // if (!response.ok) {
    //   throw new Error("HTTP Error status = " + response.status);
    // }
    return response;
  } catch {
    throw new Error("request FAILED!");
  }
}

async function getSystemRequirmentsApi(gameID) {
  try {
    const response = await Promise.resolve([
      {
        gameID: 1,
        system: "Windows 7, 8.1, or 10 (64-Bit versions)",
        processor: "AMD FX-8350/Ryzen 5 1400 or Intel Core i5-3570/i7-3770",
        memory: "16 GB",
        graphics: "Nvidia GTX 1070 4GB/AMD Radeon R9 290 4GB or better",
        directx: "11c",
        storage: "55 GB",
      },
      {
        gameID: 2,
        system: "Windows 7, 8.1, or 10 (64-Bit versions)",
        processor: "AMD FX-8350/Ryzen 5 1400 or Intel Core i5-3570/i7-3770",
        memory: "8 GB",
        graphics: "Nvidia GTX 770 4GB/AMD Radeon R9 290 4GB or better",
        directx: "11c",
        storage: "55 GB",
      },
      {
        gameID: 3,
        system: "Windows 7, 8.1, or 10 (64-Bit versions)",
        processor: "AMD FX-8350/Ryzen 5 1400 or Intel Core i5-3570/i7-3770",
        memory: "16 GB",
        graphics: "Nvidia GTX 770 4GB/AMD Radeon R9 290 4GB or better",
        directx: "11c",
        storage: "55 GB",
      },
      {
        gameID: 4,
        system: "Windows 7, 8.1, or 10 (64-Bit versions)",
        processor: "AMD FX-8350/Ryzen 5 1400 or Intel Core i5-3570/i7-3770",
        memory: "8 GB",
        graphics: "Nvidia GTX 770 4GB/AMD Radeon R9 290 4GB or better",
        directx: "11c",
        storage: "55 GB",
      },
      {
        gameID: 5,
        system: "Windows 7, 8.1, or 10 (64-Bit versions)",
        processor: "AMD FX-8350/Ryzen 5 1400 or Intel Core i5-3570/i7-3770",
        memory: "8 GB",
        graphics: "Nvidia GTX 770 4GB/AMD Radeon R9 290 4GB or better",
        directx: "11c",
        storage: "55 GB",
      },
      {
        gameID: 6,
        system: "Windows 7, 8.1, or 10 (64-Bit versions)",
        processor: "AMD FX-8350/Ryzen 5 1400 or Intel Core i5-3570/i7-3770",
        memory: "8 GB",
        graphics: "Nvidia GTX 770 4GB/AMD Radeon R9 290 4GB or better",
        directx: "11c",
        storage: "55 GB",
      },
      {
        gameID: 7,
        system: "Windows 7, 8.1, or 10 (64-Bit versions)",
        processor: "AMD FX-8350/Ryzen 5 1400 or Intel Core i5-3570/i7-3770",
        memory: "16 GB",
        graphics: "Nvidia GTX 770 4GB/AMD Radeon R9 290 4GB or better",
        directx: "11c",
        storage: "55 GB",
      },
      {
        gameID: 8,
        system: "Windows 7, 8.1, or 10 (64-Bit versions)",
        processor: "AMD FX-8350/Ryzen 5 1400 or Intel Core i5-3570/i7-3770",
        memory: "8 GB",
        graphics: "Nvidia GTX 770 4GB/AMD Radeon R9 290 4GB or better",
        directx: "11c",
        storage: "55 GB",
      },
      {
        gameID: 9,
        system: "Windows 7, 8.1, or 10 (64-Bit versions)",
        processor: "AMD FX-8350/Ryzen 5 1400 or Intel Core i5-3570/i7-3770",
        memory: "8 GB",
        graphics: "Nvidia GTX 770 4GB/AMD Radeon R9 290 4GB or better",
        directx: "11c",
        storage: "55 GB",
      },
      {
        gameID: 10,
        system: "Windows 7, 8.1, or 10 (64-Bit versions)",
        processor: "AMD FX-8350/Ryzen 5 1400 or Intel Core i5-3570/i7-3770",
        memory: "8 GB",
        graphics: "Nvidia GTX 770 4GB/AMD Radeon R9 290 4GB or better",
        directx: "11c",
        storage: "55 GB",
      },
      {
        gameID: 11,
        system: "Windows 7, 8.1, or 10 (64-Bit versions)",
        processor: "AMD FX-8350/Ryzen 5 1400 or Intel Core i5-3570/i7-3770",
        memory: "8 GB",
        graphics: "Nvidia GTX 770 4GB/AMD Radeon R9 290 4GB or better",
        directx: "11c",
        storage: "55 GB",
      },
    ]);
    if (!response.ok) {
      throw new Error("HTTP Error status = " + response.status);
    }
    return response;
  } catch {
    throw new Error("request FAILED!");
  }
}

async function getGamePlatformsApi(gameID) {
  try {
    const response = await Promise.resolve([
      { gameID: 1, platformID: 1 },
      { gameID: 2, platformID: 1 },
      { gameID: 3, platformID: 1 },
      { gameID: 4, platformID: 1 },
      { gameID: 4, platformID: 2 },
      { gameID: 4, platformID: 3 },
      { gameID: 4, platformID: 1 },
      { gameID: 4, platformID: 2 },
    ]);
    if (!response.ok) {
      throw new Error("HTTP Error status = " + response.status);
    }
    return response;
  } catch {
    throw new Error("request FAILED!");
  }
}

async function getGameGenresApi() {
  try {
    const response = await Promise.resolve([
      { gameID: 1, genreID: 1 },
      { gameID: 1, genreID: 4 },
      { gameID: 2, genreID: 1 },
      { gameID: 3, genreID: 5 },
      { gameID: 3, genreID: 6 },
      { gameID: 4, genreID: 1 },
      { gameID: 4, genreID: 2 },
      { gameID: 5, genreID: 3 },
      { gameID: 5, genreID: 4 },
    ]);
    // if (!response.ok) {
    //   throw new Error("HTTP Error status = " + response.status);
    // }
    return response;
  } catch {
    throw new Error("request FAILED!");
  }
}

async function getGameApi(gameID) {
  try {
    const response = await Promise.resolve({
      gameID: 1,
      gameName: "Cyberpunk 2077",
      publisher: "CD PROJEKT RED",
      releaseDate: "2020-12-10",
      description: "sadasda",
      coverImg: "./Images/1.jpg",
    });
    if (!response.ok) {
      throw new Error("HTTP Error status = " + response.status);
    }
    return response;
  } catch {
    throw new Error("request FAILED!");
  }
}

async function getGameReviewsApi(gameID) {
  try {
    const response = await Promise.resolve([
      {
        reviewID: 1,
        gameID: 1,
        userID: 1,
        visability: 1,
        title: "blala title",
        body: "lalalal allalal body",
        conclusion: "amazinf lalala conclusion",
        score: 10,
      },
      {
        reviewID: 5,
        gameID: 1,
        userID: 2,
        visability: 1,
        title: "blala title",
        body: "lalalal allalal body",
        conclusion: "amazinf lalala conclusion",
        score: 8,
      },
      {
        reviewID: 15,
        gameID: 1,
        userID: 5,
        visability: 1,
        title: "blala title",
        body: "lalalal allalal body",
        conclusion: "amazinf lalala conclusion",
        score: 7,
      },
      {
        reviewID: 2,
        gameID: 2,
        userID: 1,
        visability: 1,
        title: "blala title",
        body: "lalalal allalal body",
        conclusion: "amazinf lalala conclusion",
        score: 10,
      },
      {
        reviewID: 16,
        gameID: 2,
        userID: 5,
        visability: 1,
        title: "blala title",
        body: "lalalal allalal body",
        conclusion: "amazinf lalala conclusion",
        score: 3,
      },
      {
        reviewID: 24,
        gameID: 2,
        userID: 8,
        visability: 1,
        title: "blala title",
        body: "lalalal allalal body",
        conclusion: "amazinf lalala conclusion",
        score: 5,
      },
      {
        reviewID: 6,
        gameID: 3,
        userID: 2,
        visability: 1,
        title: "blala title",
        body: "lalalal allalal body",
        conclusion: "amazinf lalala conclusion",
        score: 1,
      },
      {
        reviewID: 17,
        gameID: 3,
        userID: 5,
        visability: 1,
        title: "blala title",
        body: "lalalal allalal body",
        conclusion: "amazinf lalala conclusion",
        score: 9,
      },
      {
        reviewID: 30,
        gameID: 4,
        userID: 10,
        visability: 1,
        title: "blala title",
        body: "lalalal allalal body",
        conclusion: "amazinf lalala conclusion",
        score: 10,
      },
      {
        reviewID: 3,
        gameID: 5,
        userID: 1,
        visability: 1,
        title: "blala title",
        body: "lalalal allalal body",
        conclusion: "amazinf lalala conclusion",
        score: 10,
      },
      {
        reviewID: 7,
        gameID: 5,
        userID: 2,
        visability: 1,
        title: "blala title",
        body: "lalalal allalal body",
        conclusion: "amazinf lalala conclusion",
        score: 10,
      },
    ]);
    if (!response.ok) {
      throw new Error("HTTP Error status = " + response.status);
    }
    return response;
  } catch {
    throw new Error("request FAILED!");
  }
}

async function getUserReviewsApi(userID) {
  try {
    const response = await Promise.resolve([
      {
        reviewID: 1,
        gameID: 1,
        userID: 1,
        visability: 1,
        title: "blala title",
        body: "lalalal allalal body",
        conclusion: "amazinf lalala conclusion",
        score: 10,
      },
      {
        reviewID: 2,
        gameID: 2,
        userID: 1,
        visability: 1,
        title: "blala title",
        body: "lalalal allalal body",
        conclusion: "amazinf lalala conclusion",
        score: 10,
      },
      {
        reviewID: 3,
        gameID: 5,
        userID: 1,
        visability: 1,
        title: "blala title",
        body: "lalalal allalal body",
        conclusion: "amazinf lalala conclusion",
        score: 10,
      },
    ]);
    if (!response.ok) {
      throw new Error("HTTP Error status = " + response.status);
    }
    return response;
  } catch {
    throw new Error("request FAILED!");
  }
}

async function getGamesByGenreApi(genre) {
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
        gameName: "Cyberpunk 2077",
        publisher: "CD PROJEKT RED",
        releaseDate: "2020-12-10",
        description: "sadasda",
        coverImg: "./Images/2.jpg",
      },
      {
        gameID: 3,
        gameName: "Cyberpunk 2077",
        publisher: "CD PROJEKT RED",
        releaseDate: "2020-12-10",
        description: "sadasda",
        coverImg: "./Images/3.jpg",
      },
      {
        gameID: 4,
        gameName: "Cyberpunk 2077",
        publisher: "CD PROJEKT RED",
        releaseDate: "2020-12-10",
        description: "sadasda",
        coverImg: "./Images/4.jpg",
      },
    ]);
    if (!response.ok) {
      throw new Error("HTTP Error status = " + response.status);
    }
    return response;
  } catch {
    throw new Error("request FAILED!");
  }
}

async function getGamesByDateApi(date) {
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
        gameName: "Cyberpunk 2077",
        publisher: "CD PROJEKT RED",
        releaseDate: "2020-12-10",
        description: "sadasda",
        coverImg: "./Images/2.jpg",
      },
      {
        gameID: 3,
        gameName: "Cyberpunk 2077",
        publisher: "CD PROJEKT RED",
        releaseDate: "2020-12-10",
        description: "sadasda",
        coverImg: "./Images/3.jpg",
      },
      {
        gameID: 4,
        gameName: "Cyberpunk 2077",
        publisher: "CD PROJEKT RED",
        releaseDate: "2020-12-10",
        description: "sadasda",
        coverImg: "./Images/4.jpg",
      },
    ]);
    if (!response.ok) {
      throw new Error("HTTP Error status = " + response.status);
    }
    return response;
  } catch {
    throw new Error("request FAILED!");
  }
}

async function getGamesBySearchWordApi(serachWord) {
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
        gameName: "Cyberpunk 2077",
        publisher: "CD PROJEKT RED",
        releaseDate: "2020-12-10",
        description: "sadasda",
        coverImg: "./Images/2.jpg",
      },
      {
        gameID: 3,
        gameName: "Cyberpunk 2077",
        publisher: "CD PROJEKT RED",
        releaseDate: "2020-12-10",
        description: "sadasda",
        coverImg: "./Images/3.jpg",
      },
      {
        gameID: 4,
        gameName: "Cyberpunk 2077",
        publisher: "CD PROJEKT RED",
        releaseDate: "2020-12-10",
        description: "sadasda",
        coverImg: "./Images/4.jpg",
      },
    ]);
    if (!response.ok) {
      throw new Error("HTTP Error status = " + response.status);
    }
    return response;
  } catch {
    throw new Error("request FAILED!");
  }
}

async function getUserGamesByGenreApi(genre, userID) {
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
        gameName: "Cyberpunk 2077",
        publisher: "CD PROJEKT RED",
        releaseDate: "2020-12-10",
        description: "sadasda",
        coverImg: "./Images/2.jpg",
      },
      {
        gameID: 3,
        gameName: "Cyberpunk 2077",
        publisher: "CD PROJEKT RED",
        releaseDate: "2020-12-10",
        description: "sadasda",
        coverImg: "./Images/3.jpg",
      },
      {
        gameID: 4,
        gameName: "Cyberpunk 2077",
        publisher: "CD PROJEKT RED",
        releaseDate: "2020-12-10",
        description: "sadasda",
        coverImg: "./Images/4.jpg",
      },
    ]);
    if (!response.ok) {
      throw new Error("HTTP Error status = " + response.status);
    }
    return response;
  } catch {
    throw new Error("request FAILED!");
  }
}

async function getUserRegisterApi(username, password) {
  try {
    const response = await Promise.resolve({
      userID: 1,
      username: "kobim1",
      email: "kobim1@gmail.com",
      img: "./Images/avatar.png",
    });
    if (!response.ok) {
      throw new Error("HTTP Error status = " + response.status);
    }
    return response;
  } catch {
    throw new Error("request FAILED!");
  }
}

async function getUserApi() {
  try {
    const response = await Promise.resolve({
      userID: 1,
      username: "kobim1",
      email: "kobim1@gmail.com",
      img: "./Images/avatar.png",
    });
    // if (!response.ok) {
    //   throw new Error("HTTP Error status = " + response.status);
    // }
    return response;
  } catch {
    throw new Error("request FAILED!");
  }
}

async function getReviewTagsApi(reviewID) {
  try {
    const response = await Promise.resolve([
      { reviewID: 1, tagID: 1 },
      { reviewID: 1, tagID: 2 },
      { reviewID: 1, tagID: 3 },
      { reviewID: 2, tagID: 1 },
      { reviewID: 4, tagID: 3 },
      { reviewID: 5, tagID: 1 },
      { reviewID: 6, tagID: 2 },
      { reviewID: 7, tagID: 2 },
      { reviewID: 7, tagID: 4 },
    ]);
    if (!response.ok) {
      throw new Error("HTTP Error status = " + response.status);
    }
    return response;
  } catch {
    throw new Error("request FAILED!");
  }
}

async function getUsersGamesApi(user) {
  try {
    const response = await Promise.resolve([
      {
        gameID: 1,
        gameName: "Cyberpunk 2077",
        publisher: "CD PROJEKT RED",
        releaseDate: "2020-12-10",
        description: "sadasda",
        coverImg: "/Images/1.jpg",
      },
      {
        gameID: 2,
        gameName: "Witcher 3",
        publisher: "CD PROJEKT RED",
        releaseDate: "2020-12-10",
        description: "sadasda",
        coverImg: "/Images/2.jpg",
      },
      {
        gameID: 3,
        gameName: "Metro Exodus",
        publisher: "CD PROJEKT RED",
        releaseDate: "2020-12-10",
        description: "sadasda",
        coverImg: "/Images/3.jpg",
      },
      {
        gameID: 4,
        gameName: 'Hollow Knight',
        publisher: "CD PROJEKT RED",
        releaseDate: "2020-12-10",
        description: "sadasda",
        coverImg: "/Images/4.jpg",
      },
      {
        gameID: 5,
        gameName: "Baldur's Gate 3",
        publisher: "CD PROJEKT RED",
        releaseDate: "2020-12-10",
        description: "sadasda",
        coverImg: "/Images/5.jpg",
      },
      {
        gameID: 6,
        gameName: 'Sleeping Dogs',
        publisher: "CD PROJEKT RED",
        releaseDate: "2020-12-10",
        description: "sadasda",
        coverImg: "/Images/6.jpg",
      },
      {
        gameID: 7,
        gameName: 'METAL GEAR SOLID',
        publisher: "CD PROJEKT RED",
        releaseDate: "2020-12-10",
        description: "sadasda",
        coverImg: "/Images/7.jpg",
      },
      {
        gameID: 8,
        gameName: 'Carmageddon',
        publisher: "CD PROJEKT RED",
        releaseDate: "2020-12-10",
        description: "sadasda",
        coverImg: "/Images/8.jpg",
      },
      {
        gameID: 9,
        gameName: 'Heroes 3',
        publisher: "CD PROJEKT RED",
        releaseDate: "2020-12-10",
        description: "sadasda",
        coverImg: "/Images/9.jpg",
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

async function getGamesByPagesApi(pageNumber = 1, size = 9, orderBy = "gameID", orderDirection = "asc") {
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
        gameName: 'Hollow Knight',
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
        gameName: 'Sleeping Dogs',
        publisher: "CD PROJEKT RED",
        releaseDate: "2020-12-10",
        description: "sadasda",
        coverImg: "./Images/6.jpg",
      },
      {
        gameID: 7,
        gameName: 'METAL GEAR SOLID',
        publisher: "CD PROJEKT RED",
        releaseDate: "2020-12-10",
        description: "sadasda",
        coverImg: "./Images/7.jpg",
      },
      {
        gameID: 8,
        gameName: 'Carmageddon',
        publisher: "CD PROJEKT RED",
        releaseDate: "2020-12-10",
        description: "sadasda",
        coverImg: "./Images/8.jpg",
      },
      {
        gameID: 9,
        gameName: 'Heroes 3',
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


async function getFilteredGenrePlatform(filter) {
  try {
    let url = "http://localhost:3200/games/sortedGames?";
    for (const genre in filter.genres) {
      url += `genreID=${genre}&`
    }
    for (const platform in filter.platforms) {
      url += `platformID=${platform}&`
    }
    url = url.slice(0,url.length-1)
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error("HTTP Error status = " + response.status);
    }
    const obj = await response.json();
    return obj;
  } catch {
    throw new Error("request FAILED!");
  }
}

// // component
// async function getPlatfrom() {
//   const system = await getPlatformApi();
//   // setPlatform(system)
//   console.log(system);
// }

// async function getGenres() {
//   const genres = await getGenresApi();
//   console.log(genres);
//   // setGenres(genres)

// }

// getPlatfrom()

export {
  getPlatformApi,
  getGenresApi,
  getAllGamesApi,
  getTagsApi,
  getSystemRequirmentsApi,
  getGamePlatformsApi,
  getGameGenresApi,
  getGameApi,
  getGameReviewsApi,
  getUserReviewsApi,
  getGamesByGenreApi,
  getGamesByDateApi,
  getGamesBySearchWordApi,
  getUserGamesByGenreApi,
  getUserApi,
  getReviewTagsApi,
  getUserRegisterApi,
  getUsersGamesApi,
  getGamesByPagesApi,
  getFilteredGenrePlatform,
};
