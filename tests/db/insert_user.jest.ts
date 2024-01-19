import { saveUser } from '../../src/db/insert_user';
import { db } from '../../src/db'; // Assuming you have a db module to import

// Mock the db.any function
jest.mock('../../src/db', () => ({
  db: {
    one: jest.fn(),
  },
}));

describe('saveUser', () => {
  it('should save user to the database and return the saved user', async () => {
    const mockUser = {
      username: 'testuser',
      name: 'Test User',
      location: 'Lisbon'
    };
    (db.one as jest.Mock).mockResolvedValue(mockUser);
    const savedUser = await saveUser('testuser', 'Test User', 'Lisbon');

    expect(savedUser).toEqual(mockUser);
    expect(db.one).toHaveBeenCalledWith(expect.any(String), mockUser);
  });

  it('should throw an error if the database operation fails', async () => {
    (db.one as jest.Mock).mockRejectedValue(new Error('Database error'));

    await expect(saveUser('testuser', 'Test User', 'Lisbon'))
      .rejects.toThrow('Error saving "Test User": Database error');
  });
});
