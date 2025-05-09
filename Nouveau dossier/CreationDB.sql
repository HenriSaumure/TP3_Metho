-- Create the database
CREATE DATABASE AlienHumanDatingDB;
GO

USE AlienHumanDatingDB;
GO

-- 1. Users Table
CREATE TABLE Users (
    UserID INT PRIMARY KEY IDENTITY(1,1),
    Username VARCHAR(50) UNIQUE NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    Email VARCHAR(100) UNIQUE,
    Species VARCHAR(10) NOT NULL CHECK (Species IN ('Human', 'Alien')),
    Gender VARCHAR(20),
    Age INT,
    Bio TEXT,
    CreatedAt DATETIME DEFAULT GETDATE()
);
GO

-- 2. AlienProfiles Table
CREATE TABLE AlienProfiles (
    UserID INT PRIMARY KEY,
    PlanetOfOrigin VARCHAR(100),
    NumberOfTentacles INT,
    PreferredAtmosphere VARCHAR(100),
    CommunicationStyle VARCHAR(100),
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
);
GO

-- 3. HumanProfiles Table
CREATE TABLE HumanProfiles (
    UserID INT PRIMARY KEY,
    Nationality VARCHAR(100),
    Hobbies TEXT,
    FavoriteSciFiMovie VARCHAR(100),
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
);
GO

-- 4. Preferences Table
CREATE TABLE Preferences (
    PreferenceID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT,
    PreferredSpecies VARCHAR(10) CHECK (PreferredSpecies IN ('Human', 'Alien', 'Both')),
    MinAge INT,
    MaxAge INT,
    GenderPreference VARCHAR(20),
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
);
GO

-- 5. Messages Table
CREATE TABLE Messages (
    MessageID INT PRIMARY KEY IDENTITY(1,1),
    SenderID INT,
    ReceiverID INT,
    MessageText TEXT,
    SentAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (SenderID) REFERENCES Users(UserID),
    FOREIGN KEY (ReceiverID) REFERENCES Users(UserID)
);
GO

-- 6. Matches Table
CREATE TABLE Matches (
    MatchID INT PRIMARY KEY IDENTITY(1,1),
    User1ID INT,
    User2ID INT,
    MatchedAt DATETIME DEFAULT GETDATE(),
    IsMutual BIT DEFAULT 0,
    FOREIGN KEY (User1ID) REFERENCES Users(UserID),
    FOREIGN KEY (User2ID) REFERENCES Users(UserID)
);
GO

-- 7. Photos Table
CREATE TABLE Photos (
    PhotoID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT,
    PhotoURL VARCHAR(255),
    IsProfilePhoto BIT DEFAULT 0,
    UploadedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
);
GO
