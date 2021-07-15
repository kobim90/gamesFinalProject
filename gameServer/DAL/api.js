const mysql = require("mysql2");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "karok12K",
  database: "gamereviews",
});
const promisePool = pool.promise();

function properDate(date) {
  return (
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  );
}
// ucWiv9aSqlP
async function getGames() {
  try {
    const [result] = await promisePool.execute(`
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
    pool.releaseConnection(pool)
    return finalResult;
  } catch (err) {
    console.log("getGames error", err);
  }
}

async function getFilteredGames(filterBy) {
  try {
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

    const [result] =
      await promisePool.execute(`SELECT f.gameID, f.gameName, f.coverImg, f.platformID, f.platformName, f.score, fi.genreID
    from (SELECT g.gameID, gameName, coverImg, p.platformID, platformName, score
    from games g join game_platforms p on g.gameID=p.gameID join platforms pn on p.platformID=pn.platformID left join (select avg(score) score, gameID
    from reviews group by gameID) s on g.gameID=s.gameID order by 1 asc) as f right join (SELECT g.gameID, gameName, coverImg, p.platformID, platformName, score, genreID
    from games g join game_platforms p on g.gameID=p.gameID join platforms pn on p.platformID=pn.platformID join game_genres ge on g.gameID=ge.gameID left join (select avg(score) score, gameID
    from reviews group by gameID) s on g.gameID=s.gameID ${where} order by 1 asc) as fi on f.gameID = fi.gameID order by 1 asc, 4 asc;`);

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
    pool.releaseConnection(pool)
    return finalResult;
  } catch {
    console.log("kobis error");
  }
}

async function getAllGameDetails(gameId) {
  try {
    const [result] = await promisePool.execute(
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
    pool.releaseConnection(pool)
    return final;
  } catch {
    console.log("kobis error");
  }
}

async function getGameReviews(gameId) {
  try {
    const [result] = await promisePool.execute(
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
    pool.releaseConnection(pool)
    return result;
  } catch {
    console.log("kobis error");
  }
}

async function getGamesSorted(sortBy, direction = "desc") {
  try {
    const [result] = await promisePool.execute(`
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
    pool.releaseConnection(pool)
    return finalResult.slice(0, 7);
  } catch (e) {
    console.log("gesortedtGames error", e);
  }
}

async function postLogin(username, password) {
  try {
    const [result] = await promisePool.execute(
      `
    select userID, username
    from users
    where username = ? and password = ?;`,
      [username, password]
    );
    pool.releaseConnection(pool)
    return result[0];
  } catch {
    console.log("kobis error");
  }
}

async function getUsersGames(userId) {
  try {
    const [result] = await promisePool.execute(
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
    pool.releaseConnection(pool)
    return finalResult;
  } catch {
    console.log("kobis error");
  }
}

async function getUserAuth(userId) {
  try {
    const [result] = await promisePool.execute(
      `
    SELECT userID from users where userID = ?; `,
      [userId]
    );
    pool.releaseConnection(pool)
    return result;
  } catch {
    console.log("kobis error");
  }
}

async function getUsersScores(userId) {
  try {
    const [result] = await promisePool.execute(
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
    pool.releaseConnection(pool)
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

    const [result] = await promisePool.execute(
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
    pool.releaseConnection(pool)
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
    const sql = `insert into users (username, password, email, img)
    values("${userData.username}", "${userData.password}", '${userData.email}', ${image});`;
    const [result1] = await promisePool.execute(sql);

    let sql2 = "insert into user_genres values ";
    genres.forEach((id, index) => {
      if (index < genres.length - 1) {
        sql2 += `(${result1.insertId}, ${id}), `;
      } else sql2 += `(${result1.insertId}, ${id});`;
    });

    const [result2] = await promisePool.execute(sql2);

    sql3 = ` insert into favorite_games
            values (${userId}, ${review.gameID});`;

    const [result3] = await promisePool.execute(sql3);
    pool.releaseConnection(pool)
    return result1;
  } catch {
    console.log("kobis register error");
  }
}

async function getUserByUsername(username) {
  try {
    const [result] = await promisePool.execute(
      `
    SELECT userID from users where username = ?; `,
      [username]
    );
    pool.releaseConnection(pool)
    return result;
  } catch {
    console.log("kobis error");
  }
}

async function getUserProfileData(userId) {
  try {

    const userSql = `SELECT userID, username, email, img from users where userID = ?;`;

    const userDetails = await promisePool.execute(userSql, [userId]);

    const userGames = await getUsersGames(userId);

    const genresSql = `select ug.genreID ,genreName from user_genres ug join genres g on ug.genreID=g.genreID  where userID = ${userId}; `;

    const userGenres = await promisePool.execute(genresSql);

    const reviewsSql = `select gameID ,reviewID from reviews where userID=${userId}; `;

    const userReviews = await promisePool.execute(reviewsSql);

    const result = {
      user: userDetails[0],
      genres: userGenres[0],
      reviews: userReviews[0],
      games: userGames,
    };
    pool.releaseConnection(pool)
    return result;
  } catch {
    console.log("kobis error");
  }
}

async function getGamesToReview(userId) {
  try {
    sql = `
    select g.gameID, g.gameName
    from games g left join (select *
    from reviews where userID=${userId}) u on g.gameID=u.gameID
    where reviewID is null;`;

    const [result] = await promisePool.execute(sql);
    pool.releaseConnection(pool)
    return result;
  } catch (err) {
    console.log("getuserGames error", err);
  }
}

async function postReview(userId, review) {
  try {
    sql = `
      INSERT INTO reviews (userID, gameID, visability, title, body, conclusion, score)
      VALUES (${userId}, ${review.gameID}, ${review.visability}, "${review.title}", "${review.body}", "${review.conclusion}", "${review.score}");`;

    const [result1] = await promisePool.execute(sql);

    let sql2 = "insert into review_tags values ";
    review.tagID.forEach((id, index) => {
      if (index < review.tagID.length - 1) {
        sql2 += `(${result1.insertId}, ${id}), `;
      } else sql2 += `(${result1.insertId}, ${id});`;
    });

    const result2 = await promisePool.execute(sql2);

    const sql3 = `insert into favorite_games values (${userId}, ${review.gameID}, 1)`
    const result3 = await promisePool.execute(sql3);
    pool.releaseConnection(pool)
    return { respone: true };
  } catch (err) {
    console.log("getuserGames error", err);
  }
}

async function getGenre() {
  try {
    sql = `select genreName from genres`;

    const [result1] = await promisePool.execute(sql);
    pool.releaseConnection(pool)
    return result1;
  } catch (err) {
    console.log("getuserGames error", err);
  }
}

async function getPlatforms() {
  try {
    sql = `select platformName from platforms`;

    const [result1] = await promisePool.execute(sql);
    pool.releaseConnection(pool)
    return result1;
  } catch (err) {
    console.log("getuserGames error", err);
  }
}

async function getReviewTags() {
  try {
    sql = `select * from tags`;

    const [result1] = await promisePool.execute(sql);
    pool.releaseConnection(pool)
    return result1;
  } catch (err) {
    console.log("getuserGames error", err);
  }
}

async function geReview(reviewId) {
  try {
    sql = `select * from reviews where reviewID=${reviewId}`;
    const [result1] = await promisePool.execute(sql);
    sql2 = `select tagID from review_tags where reviewID=${reviewId}`
    const [result2] = await promisePool.execute(sql2);
    const tags = result2.map(tag => tag.tagID)
    pool.releaseConnection(pool)
    const [review] = [...result1]
    review.tags = tags
    console.log(review);
    return review;
  } catch (err) {
    console.log("getReview error", err);
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
  getGamesToReview,
  postReview,
  getGenre,
  getPlatforms,
  getReviewTags,
  geReview
};
