CREATE PROCEDURE AddUser
    @Username VARCHAR(50),
    @PasswordHash VARCHAR(255),
    @Email VARCHAR(100),
    @Species VARCHAR(10),
    @Gender VARCHAR(20),
    @Age INT,
    @Bio TEXT
AS
BEGIN
    INSERT INTO Users (Username, PasswordHash, Email, Species, Gender, Age, Bio)
    VALUES (@Username, @PasswordHash, @Email, @Species, @Gender, @Age, @Bio);
END;
GO

CREATE PROCEDURE AddMessage
    @SenderID INT,
    @ReceiverID INT,
    @MessageText TEXT
AS
BEGIN
    INSERT INTO Messages (SenderID, ReceiverID, MessageText)
    VALUES (@SenderID, @ReceiverID, @MessageText);
END;
GO