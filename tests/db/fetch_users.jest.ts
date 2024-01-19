import { fetchUsers } from '../../src/db/fetch_users';
import { db } from '../../src/db';

// Mock the db.any function
jest.mock('../../src/db', () => ({
  db: {
    any: jest.fn(),
  },
}));

describe('fetchUsers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch users based on location', async () => {
    const mockUsers = [
      { id: 1, username: 'testuser', name: 'Test User', location: 'Lisbon' }
    ];
    (db.any as jest.Mock).mockResolvedValue(mockUsers);

    const users = await fetchUsers('Lisbon', null);

    expect(users).toEqual(mockUsers);
    expect(db.any).toHaveBeenCalledWith(
      expect.any(String),
      { location: '%Lisbon%' }
    );
  });

  it('should fetch users based on programing languages', async () => {
    const mockUsers = [
      {
        id: 1,
        username: 'testuser',
        name: 'Test User',
        location: 'Lisbon',
        programmingLanguages: ['JavaScript', 'Python']
      }
    ];
    (db.any as jest.Mock).mockResolvedValue(mockUsers);

    const users = await fetchUsers(null, 'JavaScript');

    expect(users).toEqual(mockUsers);
    expect(db.any).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        language: expect.arrayContaining(['JavaScript'])
      })
    );
  });

  it('should fetch users based on location and languages', async () => {
    const mockUsers = [
      {
        id: 1,
        username: 'testuser',
        name: 'Test User',
        location: 'Lisbon',
        programmingLanguages: ['JavaScript', 'Python']
      },
      {
        id: 1,
        username: 'testuser2',
        name: 'Test User',
        location: 'Portugal, Lisbon',
        programmingLanguages: ['JavaScript', 'Python']
      }
    ];
    (db.any as jest.Mock).mockResolvedValue(mockUsers);

    const users = await fetchUsers('tuga', 'JavaScript');

    expect(users).toEqual(mockUsers);
    expect(db.any).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        location: '%tuga%',
        language: expect.arrayContaining(['JavaScript'])
      })
    );
  });

  it('should return empty array if users not found', async () => {
    (db.any as jest.Mock).mockResolvedValue([]);

    const users = await fetchUsers('Spain', 'Rust');

    expect(users).toEqual([]);
    expect(db.any).toHaveBeenCalledWith(expect.any(String), expect.any(Object))
  });

  it('should throw an error if the database query fails', async () => {
    const errorMessage = 'Database query failed';
    (db.any as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(fetchUsers(null, null))
      .rejects.toThrow(`Error fetching users: ${errorMessage}`);
  });
});
