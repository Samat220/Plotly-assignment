import {
  ResolveField,
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Product } from 'src/products/entities/product.entity';
import { ProductService } from 'src/products/product.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private productService: ProductService,
  ) {}

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    const { orders, ...userData } = input;

    // Create the user
    const user = await this.userService.create(userData);

    if (orders && orders.length > 0) {
      // Create the products
      const createdProducts = await Promise.all(
        orders.map(async (productInput) => {
          const product = new Product();
          product.name = productInput.name;
          product.price = productInput.price;
          return await this.productService.create(product);
        }),
      );

      // Update the user with the created products
      user.orders = createdProducts;

      // Save the changes to the database
      await this.userService.update(user);
    }

    return user;
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Query(() => User)
  async user(@Args('id') id: string): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Mutation(() => User)
  async updateUser(@Args('input') input: UpdateUserInput): Promise<User> {
    return await this.userService.update(input);
  }

  @Mutation(() => User)
  async deleteUser(@Args('id') id: string): Promise<User> {
    const userToDelete = await this.userService.remove(id);
    return userToDelete;
  }

  @ResolveField(() => [Product])
  async orders(@Parent() user: User) {
    // assuming you have a method in your service to get user's orders
    // replace with your actual implementation
    return this.userService.getUserOrders(user.id);
  }
}
