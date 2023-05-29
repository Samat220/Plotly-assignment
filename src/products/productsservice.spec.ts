import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', async () => {
    const product = new Product();
    product.name = 'Test Product';
    product.price = 10.5;

    jest
      .spyOn(service, 'create')
      .mockImplementation(() => Promise.resolve(product));

    expect(await service.create({ name: 'Test Product', price: 10.5 })).toBe(
      product,
    );
  });

  it('should find a product', async () => {
    const product = new Product();
    product.name = 'Test Product';
    product.price = 10.5;

    jest
      .spyOn(service, 'findOne')
      .mockImplementation(() => Promise.resolve(product));

    expect(await service.findOne('1')).toBe(product);
  });

  it('should remove a product', async () => {
    const product = new Product();
    product.name = 'Test Product';
    product.price = 10.5;

    jest
      .spyOn(service, 'remove')
      .mockImplementation(() => Promise.resolve(product));

    expect(await service.remove('1')).toBe(product);
  });
});
