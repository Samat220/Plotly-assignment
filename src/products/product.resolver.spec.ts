import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { Product } from './entities/product.entity';

describe('ProductResolver', () => {
  let resolver: ProductResolver;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductResolver, ProductService],
    }).compile();

    resolver = module.get<ProductResolver>(ProductResolver);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a product', async () => {
    const product = new Product();
    product.name = 'Test Product';
    product.price = 10.5;

    jest
      .spyOn(service, 'create')
      .mockImplementation(() => Promise.resolve(product));

    const result = await resolver.createProduct({
      name: 'Test Product',
      price: 10.5,
    });

    expect(result).toEqual(product);
  });

  it('should get a product', async () => {
    const product = new Product();
    product.name = 'Test Product';
    product.price = 10.5;

    jest
      .spyOn(service, 'findOne')
      .mockImplementation(() => Promise.resolve(product));

    const result = await resolver.product('1');

    expect(result).toEqual(product);
  });

  it('should delete a product', async () => {
    const product = new Product();
    product.name = 'Test Product';
    product.price = 10.5;

    jest
      .spyOn(service, 'remove')
      .mockImplementation(() => Promise.resolve(product));

    const result = await resolver.deleteProduct('1');

    expect(result).toEqual(product);
  });
});
