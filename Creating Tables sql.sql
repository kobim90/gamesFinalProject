CREATE DATABASE gamereviews;

CREATE TABLE `users` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `username` varchar(15) NOT NULL,
  `password` varchar(20) NOT NULL,
  `email` varchar(40) NOT NULL,
  `img` varchar(250) NOT NULL,
  PRIMARY KEY (userID)
  );

  Create table `games` (
	gameID int NOT NULL AUTO_INCREMENT,
    gameName varchar(20) NOT NULL,
    publisher varchar(20) NOT NULL,
    releaseDate Date NOT NULL,
    `description` text NOT NULL,
    coverImg varchar(50) NOT NULL,
    primary key (gameID)
  );
  

CREATE TABLE `system_requirements` (
  `gameID` int NOT NULL AUTO_INCREMENT,
  `system` varchar(100) NOT NULL,
  `processor` varchar(100) NOT NULL,
  `memory` varchar(5) NOT NULL,
  `graphics` varchar(150) NOT NULL,
  directx varchar(5) NOT NULL,
  `storage` varchar(10) NOT NULL,
  constraint `gameID` foreign key (`gameID`) references `games` (`gameID`)
  );
  
  
  Create table `favorites` (
	userID int NOT NULL,
    gameID int NOT NULL,
	PRIMARY KEY (`userID`,`gameID`),
	KEY `FK_user_details` (`userID`),
	KEY `FK_games_details` (`gameID`),
	CONSTRAINT `FK_user_details` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
	CONSTRAINT `FK_games_details` FOREIGN KEY (`gameID`) REFERENCES `games` (`gameID`)
  );
  
  CREATE TABLE `platforms` (
  `platformID` int NOT NULL AUTO_INCREMENT,
  `platformName` varchar(15) NOT NULL,
  primary key (`platformID`)
  );
  
  create table `game_platforms` (
	`gameID` int NOT NULL,
    `platformID` int NOT NULL,
    key `FK_gameID` (`gameID`),
    key `FK_platformID` (`platformID`),
    primary key (gameID, platformID),
    CONSTRAINT `FK_gameID` FOREIGN KEY (`gameID`) REFERENCES `games` (`gameID`),
	CONSTRAINT `FK_platformID` FOREIGN KEY (`platformID`) REFERENCES `platforms` (`platformID`)
  );
  
  create table `game_screenshots` (
	`gameID` int NOT NULL,
    `screenshot1` varchar(100),
	`screenshot2` varchar(100),
    `screenshot3` varchar(100),
    `screenshot4` varchar(100),
    `screenshot5` varchar(100),
    CONSTRAINT `FK_screenshots_gameID` FOREIGN KEY (`gameID`) REFERENCES `games` (`gameID`)
  );
  
create table `reviews` (
	reviewID int NOT NULL AUTO_INCREMENT,
    userID int NOT NULL,
    gameID int NOT NULL,
    visability boolean NOT NULL,
    title varchar(100) NOT NULL,
    body text NOT NULL,
    conclusion varchar(400) NOT NULL,
    score smallint NOT NULL,
    primary key (reviewID),
    CONSTRAINT `FK_review_gameID` FOREIGN KEY (`gameID`) REFERENCES `games` (`gameID`),
    CONSTRAINT `FK_review_userID` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`)
    );
    
    
create table review_screenshots (
	reviewID int NOT NULL,
	`screenshot1` varchar(100),
	`screenshot2` varchar(100),
	`screenshot3` varchar(100),
	CONSTRAINT `FK_screenshot_reviewID` FOREIGN KEY (`reviewID`) REFERENCES `reviews` (`reviewID`)
	);
        
create table tags (
	tagID int NOT NULL AUTO_INCREMENT,
	tagName varchar(15) NOT NULL,
	primary key (tagID)
);
    
create table review_tags (
	reviewID int NOT NULL,
    tagID int NOT NULL,
	primary key (reviewID, tagID),
	CONSTRAINT `FK_tags_reviewID` FOREIGN KEY (`reviewID`) REFERENCES `reviews` (`reviewID`),
    CONSTRAINT `FK_tags_tagID` FOREIGN KEY (`tagID`) REFERENCES `tags` (`tagID`)
);
        
create table genres (
	genreID int NOT NULL AUTO_INCREMENT,
	genreName varchar(20) NOT NULL,
	primary key (genreID)
);

create table game_genres (
	gameID int NOT NULL,
    genreID int NOT NULL,
    primary key (gameID, genreID),
	CONSTRAINT `FK_genres_gameID` FOREIGN KEY (`gameID`) REFERENCES `games` (`gameID`),
    CONSTRAINT `FK_genres_genreID` FOREIGN KEY (`genreID`) REFERENCES `genres` (`genreID`)
);



create table user_genres (
	userID int NOT NULL,
    genreID int NOT NULL,
    primary key (userID, genreID),
	CONSTRAINT `FK_Ugenres_userID` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
    CONSTRAINT `FK_Ugenres_genreID` FOREIGN KEY (`genreID`) REFERENCES `genres` (`genreID`)
);

create table favorite_games (
	userID int NOT NULL,
    gameID int NOT NULL,
    owns boolean,
    primary key (userID, gameID),
	CONSTRAINT `FK_favorite_userID` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
	CONSTRAINT `FK_favorite_gameID` FOREIGN KEY (`gameID`) REFERENCES `games` (`gameID`)
);

create table upvotes (
	userID int NOT NULL,
    reviewID int NOT NULL,
    upvote smallint NOT NULL,
    primary key (userID, reviewID),
	CONSTRAINT `FK_upvotes_userID` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
	CONSTRAINT `FK_upvotes_reviewID` FOREIGN KEY (`reviewID`) REFERENCES `reviews` (`reviewID`)
);


create table user_reviews (
	userID int NOT NULL,
    reviewID int NOT NULL,
	CONSTRAINT `FK_Ureviews_userID` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
    CONSTRAINT `FK_Ureviews_reviewID` FOREIGN KEY (`reviewID`) REFERENCES `reviews` (`reviewID`)
);
