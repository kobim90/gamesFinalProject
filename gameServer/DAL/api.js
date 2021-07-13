const mysql = require("mysql2/promise");

function properDate(date) {
  return (
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  );
}

async function getGames() {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "ucWiv9aSqlP",
      database: "gamereviews",
    });
    const [result] = await connection.execute(`
    SELECT g.gameID, gameName, coverImg, p.platformID, platformName, score, publisher, releaseDate, gs.screenshot1, gs.screenshot2
    from games g join game_screenshots gs on g.gameID=gs.gameID join game_platforms p on g.gameID=p.gameID join platforms pn on p.platformID=pn.platformID left join (select avg(score) score, gameID
    from reviews group by gameID) s on g.gameID=s.gameID order by 1 asc ;`);

    const finalResult = [];

    result.forEach((game) => {
      if (
        finalResult.length === 0 ||
        finalResult[finalResult.length - 1].gameID !== game.gameID
      ) {
        game.platform = [{ id: game.platformID, name: game.platformName }];
        game.score = game.score === null ? "No reviews" : game.score;
        game.releaseDate = properDate(game.releaseDate);
        delete game.platformID;
        delete game.platformName;
        finalResult.push(game);
      } else {
        finalResult[finalResult.length - 1].platform.push({
          id: game.platformID,
          name: game.platformName,
        });
      }
    });
    return finalResult;
  } catch {
    console.log("kobis error");
  }
}

async function getFilteredGames(filterBy) {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "ucWiv9aSqlP",
      database: "gamereviews",
    });
    let where = filterBy.genreID || filterBy.platformID ? "where" : "";
    const whereGenre = filterBy.genreID
      ? ` genreID in (${filterBy.genreID})`
      : "";
    const wherePlatform = filterBy.platformID
      ? ` p.platformID in (${filterBy.platformID})`
      : "";
    where +=
      whereGenre && wherePlatform
        ? whereGenre + " and" + wherePlatform
        : whereGenre
        ? whereGenre
        : wherePlatform
        ? wherePlatform
        : "";
    // console.log(whereGenre && wherePlatform);
    // console.log(filterBy);
    // console.log(where);
    const [result] =
      await connection.execute(`SELECT f.gameID, f.gameName, f.coverImg, f.platformID, f.platformName, f.score, fi.genreID
    from (SELECT g.gameID, gameName, coverImg, p.platformID, platformName, score
    from games g join game_platforms p on g.gameID=p.gameID join platforms pn on p.platformID=pn.platformID left join (select avg(score) score, gameID
    from reviews group by gameID) s on g.gameID=s.gameID order by 1 asc) as f right join (SELECT g.gameID, gameName, coverImg, p.platformID, platformName, score, genreID
    from games g join game_platforms p on g.gameID=p.gameID join platforms pn on p.platformID=pn.platformID join game_genres ge on g.gameID=ge.gameID left join (select avg(score) score, gameID
    from reviews group by gameID) s on g.gameID=s.gameID ${where} order by 1 asc) as fi on f.gameID = fi.gameID order by 1 asc, 4 asc;`);

    // SELECT g.gameID, gameName, coverImg, p.platformID, platformName, score, genreID
    // from games g join game_platforms p on g.gameID=p.gameID join platforms pn on p.platformID=pn.platformID join game_genres ge on g.gameID=ge.gameID left join (select avg(score) score, gameID
    // from reviews group by gameID) s on g.gameID=s.gameID ${where} order by 1 asc ;
    const finalResult = [];
    result.forEach((game) => {
      if (
        finalResult.length === 0 ||
        finalResult[finalResult.length - 1].gameID !== game.gameID
      ) {
        game.platform = [{ id: game.platformID, name: game.platformName }];
        game.genre = [{ id: game.genreID }];
        game.score = game.score === null ? "No reviews" : game.score;
        delete game.platformID;
        delete game.platformName;
        delete game.genreID;
        finalResult.push(game);
      } else {
        !finalResult[finalResult.length - 1].platform.find(
          (platform) => platform.id === game.platformID
        )
          ? finalResult[finalResult.length - 1].platform.push({
              id: game.platformID,
              name: game.platformName,
            })
          : "";
        !finalResult[finalResult.length - 1].genre.find(
          (genre) => genre.id === game.genreID
        )
          ? finalResult[finalResult.length - 1].genre.push({
              id: game.genreID,
            })
          : "";
      }
    });

    return finalResult;
  } catch {
    console.log("kobis error");
  }
}

async function getAllGameDetails(gameId) {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "ucWiv9aSqlP",
      database: "gamereviews",
    });
    const [result] = await connection.execute(
      "select g.gameID, gameName, publisher, releaseDate, description, coverImg, `system`, processor, memory, graphics, directx, storage, platformName, genreName, screenshot1, screenshot2, screenshot3, screenshot4, screenshot5, score from games g join system_requirements s on g.gameID=s.gameID join game_platforms p on g.gameID=p.gameID join game_genres ge on g.gameID=ge.gameID join platforms pp on p.platformID=pp.platformID join genres gn on ge.genreID=gn.genreID left join (select avg(score) score, gameID from reviews where gameID = ?) as score on g.gameID=score.gameID join game_screenshots gs on g.gameID=gs.gameID where g.gameID = ? ",
      [gameId, gameId]
    );
    const finalResult = [];
    result.forEach((game) => {
      if (
        finalResult.length === 0 ||
        finalResult[finalResult.length - 1].gameID !== game.gameID
      ) {
        game.platform = [{ name: game.platformName }];
        game.genre = [{ name: game.genreName }];
        game.score = game.score === null ? "No reviews" : game.score;
        game.releaseDate = properDate(game.releaseDate);
        delete game.platformID;
        delete game.platformName;
        delete game.genreID;
        finalResult.push(game);
      } else {
        if (
          !finalResult[finalResult.length - 1].platform.find(
            (platform) => platform.name === game.platformName
          )
        ) {
          finalResult[finalResult.length - 1].platform.push({
            name: game.platformName,
          });
        }
        if (
          !finalResult[finalResult.length - 1].genre.find(
            (genre) => genre.name === game.genreName
          )
        ) {
          finalResult[finalResult.length - 1].genre.push({
            name: game.genreName,
          });
        }
      }
    });

    const [final] = [...finalResult];
    return final;
  } catch {
    console.log("kobis error");
  }
}

async function getGameReviews(gameId) {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "ucWiv9aSqlP",
      database: "gamereviews",
    });
    const [result] = await connection.execute(
      `
    select r.userID, ur.reviews, fg.games, username, img, reviewID, gameID, title, body, conclusion, score
    from reviews r join users u on r.userID= u.userID join (select userID, count(reviewID) reviews
    from reviews 
    group by userID) ur on r.userID= ur.userID join (
    select  userID, count(userID) games
    from favorite_games
    group by userID) fg on r.userID-fg.userID
    where r.gameID = ? and r.visability = true group by r.reviewID limit 5;`,
      [gameId]
    );

    return result;
  } catch {
    console.log("kobis error");
  }
}

async function getGamesSorted(sortBy, direction = "desc") {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "ucWiv9aSqlP",
      database: "gamereviews",
    });
    const [result] = await connection.execute(`
    SELECT g.gameID, gameName, coverImg, p.platformID, platformName, score, g.releaseDate, publisher
    from games g join game_platforms p on g.gameID=p.gameID join platforms pn on p.platformID=pn.platformID left join (select avg(score) score, gameID
    from reviews group by gameID) s on g.gameID=s.gameID where score is not null order by ${sortBy} ${direction}, 1 ${direction};`);

    const finalResult = [];

    result.forEach((game) => {
      if (
        finalResult.length === 0 ||
        finalResult[finalResult.length - 1].gameID !== game.gameID
      ) {
        game.platform = [{ id: game.platformID, name: game.platformName }];
        game.score = game.score === null ? "No reviews" : game.score;
        game.releaseDate = properDate(game.releaseDate);
        delete game.platformID;
        delete game.platformName;
        finalResult.push(game);
      } else {
        finalResult[finalResult.length - 1].platform.push({
          id: game.platformID,
          name: game.platformName,
        });
      }
    });
    return finalResult.slice(0, 7);
  } catch {
    console.log("kobis error");
  }
}

async function postLogin(username, password) {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "ucWiv9aSqlP",
      database: "gamereviews",
    });
    const [result] = await connection.execute(
      `
    select userID, username
    from users
    where username = ? and password = ?;`,
      [username, password]
    );
    return result[0];
  } catch {
    console.log("kobis error");
  }
}

async function getUsersGames(userId) {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "ucWiv9aSqlP",
      database: "gamereviews",
    });
    const [result] = await connection.execute(
      `
    SELECT g.gameID, gameName, coverImg, p.platformID, platformName, score, publisher, releaseDate
    from  favorite_games f join games g on f.gameID=g.gameID join game_platforms p on g.gameID=p.gameID join platforms pn on p.platformID=pn.platformID left join (select avg(score) score, gameID
    from reviews group by gameID) s on g.gameID=s.gameID where f.userID= ? and owns=1 order by 1 asc; `,
      [userId]
    );

    const finalResult = [];

    result.forEach((game) => {
      if (
        finalResult.length === 0 ||
        finalResult[finalResult.length - 1].gameID !== game.gameID
      ) {
        game.platform = [{ id: game.platformID, name: game.platformName }];
        game.score = game.score === null ? "No reviews" : game.score;
        game.releaseDate = properDate(game.releaseDate);
        delete game.platformID;
        delete game.platformName;
        finalResult.push(game);
      } else {
        finalResult[finalResult.length - 1].platform.push({
          id: game.platformID,
          name: game.platformName,
        });
      }
    });
    return finalResult;
  } catch {
    console.log("kobis error");
  }
}

async function getUserAuth(userId) {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "ucWiv9aSqlP",
      database: "gamereviews",
    });
    const [result] = await connection.execute(
      `
    SELECT userID from users where userID = ?; `,
      [userId]
    );

    return result;
  } catch {
    console.log("kobis error");
  }
}

async function getUsersScores(userId) {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "ucWiv9aSqlP",
      database: "gamereviews",
    });
    const [result] = await connection.execute(
      `
    select r.gameID, score, avgScore, gameName
    from reviews r join (select avg(score) avgScore, gameID
    from reviews group by gameID) s on r.gameID=s.gameID join games g on r.gameID=g.gameID
    where userID=?
    order by score desc;`,
      [userId]
    );

    const lables = [];
    const userScores = [];
    const avgScores = [];
    result.forEach((game) => {
      lables.push(game.gameName);
      userScores.push(Math.round(game.score * 10) / 10);
      avgScores.push(Math.round(game.avgScore * 10) / 10);
    });
    return {
      lables,
      userScores,
      avgScores,
    };
  } catch {
    console.log("kobis error");
  }
}

async function getGameSearch(param, searchBy, userId) {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "ucWiv9aSqlP",
      database: "gamereviews",
    });

    let from = "";
    let where = "";
    let search = "";

    if (userId) {
      where = `f.userID= ${userId} and owns=1 and`;
      from = `favorite_games f join games g on f.gameID=g.gameID`;
    } else from = `games g `;

    if (searchBy === "releaseDate") {
      search = `year(releaseDate) = ${param}`;
    } else search = `${searchBy} like '%${param}%'`;

    const [result] = await connection.execute(
      `SELECT g.gameID, gameName, coverImg, p.genreID, genreName, score, publisher, releaseDate, platformName, gp.platformID
      from ${from} join game_genres p on g.gameID=p.gameID join genres gn on p.genreID=gn.genreID join game_platforms gp on g.gameID=gp.gameID join platforms pn on gp.platformID=pn.platformID  left join (select avg(score) score, gameID
      from reviews group by gameID) s on g.gameID=s.gameID where ${where} ${search} order by 1 asc;`
    );

    const finalResult = [];
    result.forEach((game) => {
      if (
        finalResult.length === 0 ||
        finalResult[finalResult.length - 1].gameID !== game.gameID
      ) {
        game.platform = [{ id: game.platformID, name: game.platformName }];
        game.genre = [{ name: game.genreName }];
        game.score = game.score === null ? "No reviews" : game.score;
        game.releaseDate = properDate(game.releaseDate);
        delete game.platformID;
        delete game.platformName;
        delete game.genreID;
        finalResult.push(game);
      } else {
        if (
          !finalResult[finalResult.length - 1].platform.find(
            (platform) => platform.name === game.platformName
          )
        ) {
          finalResult[finalResult.length - 1].platform.push({
            id: game.platformID,
            name: game.platformName,
          });
        }
        if (
          !finalResult[finalResult.length - 1].genre.find(
            (genre) => genre.name === game.genreName
          )
        ) {
          finalResult[finalResult.length - 1].genre.push({
            name: game.genreName,
          });
        }
      }
    });
    return finalResult;
  } catch {
    console.log("kobis error");
  }
}

async function addUser(userData, img) {
  const genres = userData.genres.split(",");
  const image = img
    ? `"http://localhost:3200/Images/${img.filename}"`
    : `"http://localhost:3200/images/avatar.png"`;
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "ucWiv9aSqlP",
      database: "gamereviews",
    });
    const sql = `insert into users (username, password, email, img)
    values("${userData.username}", "${userData.password}", '${userData.email}', ${image});`;
    const [result1] = await connection.execute(sql);

    let sql2 = "insert into user_genres values ";
    genres.forEach((id, index) => {
      if (index < genres.length - 1) {
        sql2 += `(${result1.insertId}, ${id}), `;
      } else sql2 += `(${result1.insertId}, ${id});`;
    });

    const [result2] = await connection.execute(sql2);

    return result1;
  } catch {
    console.log("kobis register error");
  }
}

async function getUserByUsername(username) {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "ucWiv9aSqlP",
      database: "gamereviews",
    });
    const [result] = await connection.execute(
      `
    SELECT userID from users where username = ?; `,
      [username]
    );

    return result;
  } catch {
    console.log("kobis error");
  }
}

async function getUserProfileData(userId) {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "ucWiv9aSqlP",
      database: "gamereviews",
    });
    
    const userSql = `SELECT userID, username, email, img from users where userID = ?;`;

    const userDetails = await connection.execute(userSql, [userId]);

    const userGames = await getUsersGames(userId);

    const genresSql = `select ug.genreID ,genreName from user_genres ug join genres g on ug.genreID=g.genreID  where userID = ${userId}; `;

    const userGenres = await connection.execute(genresSql);

    const reviewsSql = `select gameID ,reviewID from reviews where userID=${userId}; `;

    const userReviews = await connection.execute(reviewsSql);

    const result = {
      user: userDetails[0],
      genres: userGenres[0],
      reviews: userReviews[0],
      games: userGames,
    };
    return result
  } catch {
    console.log("kobis error");
  }
}

module.exports = {
  getGames,
  getFilteredGames,
  getAllGameDetails,
  getGameReviews,
  getGamesSorted,
  postLogin,
  getUsersGames,
  getUserAuth,
  getUsersScores,
  getGameSearch,
  addUser,
  getUserByUsername,
  getUserProfileData,
};
