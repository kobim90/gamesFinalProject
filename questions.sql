insert into users (username, password, email, img)
values("kobear", "karok12KL", 'kobim727@gmail.com', "http://localhost:3200/Images/1626102768093--2279193.jpg");

insert into user_genres values (21, 4), (21, 1), (21, 7);

SELECT userID, username, email, img from users where userID = 1; 

select gameID,reviewID from reviews where userID=1;

SELECT g.gameID, gameName, coverImg, p.platformID, platformName, score, publisher, releaseDate
    from  favorite_games f join games g on f.gameID=g.gameID join game_platforms p on g.gameID=p.gameID join platforms pn on p.platformID=pn.platformID left join (select avg(score) score, gameID
    from reviews group by gameID) s on g.gameID=s.gameID where f.userID= 1 and owns=1 order by 1 asc; SELECT userID, username, email, img from users where userID = 1; select genreName from user_genres ug join genres g on ug.genreID=g.genreID  where userID = 1; select reviewID from reviews where userID=1;
    
    select ug.genreID ,genreName from user_genres ug join genres g on ug.genreID=g.genreID  where userID = 1;