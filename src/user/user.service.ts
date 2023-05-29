import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(input: CreateUserInput): Promise<User> {
    const newUser = this.userRepository.create(input);
    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(input: UpdateUserInput | User): Promise<User> {
    const userToUpdate = await this.userRepository.findOne({
      where: { id: input.id },
    });
    if (!userToUpdate) throw new NotFoundException('User not found');
    return await this.userRepository.save({ ...userToUpdate, ...input });
  }

  async remove(id: string): Promise<User> {
    const userToRemove = await this.userRepository.findOne({ where: { id } });
    if (!userToRemove) throw new NotFoundException('User not found');
    await this.userRepository.remove(userToRemove);
    return userToRemove;
  }

  async getUserOrders(userId: string): Promise<Product[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['orders'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user.orders;
  }
}
