import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { ProductService } from '../products/product.service';
import { Product } from '../products/entities/product.entity';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let userService: UserService;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            // Define other methods here...
          },
        },
        {
          provide: ProductService,
          useValue: {
            create: jest.fn(),
            // Define other methods here...
          },
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    userService = module.get<UserService>(UserService);
    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const user = new User();
      user.name = 'Test User';
      user.email = 'test@example.com';
      user.age = 25;

      const product = new Product();
      product.name = 'Test Product';

      const input = {
        name: 'Test User',
        email: 'test@example.com',
        age: 25,
        orders: [{ name: 'Test Product', price: 10 }],
      };

      jest
        .spyOn(userService, 'create')
        .mockImplementation(() => Promise.resolve(user));
      jest
        .spyOn(productService, 'create')
        .mockImplementation(() => Promise.resolve(product));

      const result = await resolver.createUser(input);

      expect(result).toEqual(user);
    });
  });
});
