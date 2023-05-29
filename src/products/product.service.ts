import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(input: CreateProductInput): Promise<Product> {
    const newProduct = this.productRepository.create(input);
    return await this.productRepository.save(newProduct);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: string): Promise<Product> {
    return await this.productRepository.findOne({ where: { id } });
  }

  async update(input: UpdateProductInput): Promise<Product> {
    const productToUpdate = await this.productRepository.findOne({
      where: { id: input.id },
    });
    if (!productToUpdate) throw new Error('Product not found');
    return await this.productRepository.save({ ...productToUpdate, ...input });
  }

  async remove(id: string): Promise<Product> {
    const productToRemove = await this.productRepository.findOne({
      where: { id },
    });
    if (!productToRemove) throw new Error('Product not found');
    await this.productRepository.remove(productToRemove);
    return productToRemove;
  }
}
