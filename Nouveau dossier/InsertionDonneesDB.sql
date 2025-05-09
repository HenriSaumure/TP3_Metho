USE AlienHumanDatingDB;
GO

-- Sample Users
INSERT INTO Users (Username, PasswordHash, Email, Species, Gender, Age, Bio)
VALUES
('ZorgonX', 'hash1', 'zorgon@galaxy.org', 'Alien', 'Other', 213, 'Ambassador from Xentar Prime.'),
('LunaLove', 'hash2', 'luna@earthmail.com', 'Human', 'Female', 29, 'Stargazer and cosmic dreamer.'),
('Tharnok', 'hash3', 'tharnok@andromeda.net', 'Alien', 'Male', 134, 'Warlord seeking peace through connection.'),
('EliRivers', 'hash4', 'eli@humanhub.com', 'Human', 'Male', 33, 'Sci-fi writer looking for real-life inspiration.'),
('Nirell', 'hash5', 'nirell@orbitmail.com', 'Alien', 'Female', 89, 'Bioluminescent healer.'),
('SophieSky', 'hash6', 'sophie@earthmail.com', 'Human', 'Female', 26, 'Open to interstellar possibilities.'),
('Glarn', 'hash7', 'glarn@nebula.io', 'Alien', 'Non-binary', 154, 'Collector of human art and memes.'),
('JakeMars', 'hash8', 'jake@planetmail.com', 'Human', 'Male', 31, 'Earthling ready to beam up love.');

-- Alien Profiles
INSERT INTO AlienProfiles (UserID, PlanetOfOrigin, NumberOfTentacles, PreferredAtmosphere, CommunicationStyle)
VALUES
(1, 'Xentar Prime', 6, 'Methane-Rich', 'Telepathy'),
(3, 'Andromeda IX', 8, 'Oxygen', 'Growl-Chirp Matrix'),
(5, 'Nebulon-7', 12, 'Nitrogen-Silica', 'Color Pulses'),
(7, 'Artaxis-12', 0, 'Helium Light', 'Holographic Song');

-- Human Profiles
INSERT INTO HumanProfiles (UserID, Nationality, Hobbies, FavoriteSciFiMovie)
VALUES
(2, 'American', 'Astronomy, Hiking', 'Interstellar'),
(4, 'Canadian', 'Writing, Star Trek fan clubs', 'Star Trek: First Contact'),
(6, 'British', 'Yoga, Planetariums', 'The Fifth Element'),
(8, 'Australian', 'Gaming, Astronomy', 'Guardians of the Galaxy');

-- Preferences
INSERT INTO Preferences (UserID, PreferredSpecies, MinAge, MaxAge, GenderPreference)
VALUES
(1, 'Human', 20, 40, 'Female'),
(2, 'Alien', 50, 300, 'Male'),
(3, 'Human', 25, 35, 'Female'),
(4, 'Alien', 60, 250, 'Any'),
(5, 'Human', 27, 35, 'Male'),
(6, 'Both', 18, 150, 'Any'),
(7, 'Human', 20, 40, 'Female'),
(8, 'Alien', 60, 200, 'Female');

-- Matches
INSERT INTO Matches (User1ID, User2ID, IsMutual)
VALUES
(1, 2, 1),
(3, 6, 1),
(5, 4, 0),
(7, 2, 1),
(8, 5, 1);

-- Messages
INSERT INTO Messages (SenderID, ReceiverID, MessageText)
VALUES
(1, 2, 'Greetings, Luna. Do you enjoy stargazing with six eyes?'),
(2, 1, 'Haha, only two eyes here, but always looking up!'),
(3, 6, 'Peace and affection from Andromeda.'),
(6, 3, 'Wow, didn’t expect that, but I’m intrigued.'),
(5, 4, 'Can you handle my glow?'),
(4, 5, 'Only one way to find out.'),
(7, 2, 'Would you model for my intergalactic gallery?'),
(8, 5, 'Your aura caught my signal.');

-- Photos
INSERT INTO Photos (UserID, PhotoURL, IsProfilePhoto)
VALUES
(1, 'https://spacepics.com/zorgon.jpg', 1),
(2, 'https://earthfaces.com/luna.jpg', 1),
(3, 'https://spacepics.com/tharnok.jpg', 1),
(4, 'https://earthfaces.com/eli.jpg', 1),
(5, 'https://spacepics.com/nirell.jpg', 1),
(6, 'https://earthfaces.com/sophie.jpg', 1),
(7, 'https://spacepics.com/glarn.jpg', 1),
(8, 'https://earthfaces.com/jake.jpg', 1);
