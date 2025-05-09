EXEC AddUser
    @Username = 'TestAlien',
    @PasswordHash = 'testhash',
    @Email = 'test@alienmail.com',
    @Species = 'Alien',
    @Gender = 'Non-binary',
    @Age = 222,
    @Bio = 'Test subject from Testonia';

-- Check if user was added
SELECT * FROM Users WHERE Username = 'TestAlien';

EXEC AddMessage
    @SenderID = 1,
    @ReceiverID = 2,
    @MessageText = 'Hello from test procedure!';

-- Check the message exists
SELECT TOP 1 * FROM Messages ORDER BY MessageID DESC;