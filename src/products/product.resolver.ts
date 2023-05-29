import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Mutation(() => Product)
  async createProduct(
    @Args('input') input: CreateProductInput,
  ): Promise<Product> {
    return await this.productService.create(input);
  }

  @Query(() => [Product])
  async products(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Query(() => Product)
  async product(@Args('id') id: string): Promise<Product> {
    return await this.productService.findOne(id);
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('input') input: UpdateProductInput,
  ): Promise<Product> {
    return await this.productService.update(input);
  }

  @Mutation(() => Product)
  async deleteProduct(@Args('id') id: string): Promise<Product> {
    return await this.productService.remove(id);
  }
}
