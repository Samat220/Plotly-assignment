import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const user = new User();
      user.name = 'Test User';

      jest
        .spyOn(repository, 'save')
        .mockImplementation(() => Promise.resolve(user));

      const result = await service.create(user);

      expect(result).toEqual(user);
    });
  });
  // ...

  describe('findOne', () => {
    it('should return a user', async () => {
      const user = new User();
      user.name = 'Test User';

      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(() => Promise.resolve(user));

      const result = await service.findOne('1');

      expect(result).toEqual(user);
    });

    it('should throw an error when a user is not found', async () => {
      jest.spyOn(repository, 'findOne').mockImplementation(() => null);

      await expect(service.findOne('2')).rejects.toThrowError('User not found');
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const user = new User();
      user.name = 'Test User';

      const updatedUser = new User();
      updatedUser.name = 'Updated Test User';

      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(() => Promise.resolve(user));
      jest
        .spyOn(repository, 'save')
        .mockImplementation(() => Promise.resolve(updatedUser));

      const result = await service.update(updatedUser);

      expect(result).toEqual(updatedUser);
    });
  });
});
