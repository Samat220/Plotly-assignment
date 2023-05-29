import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Product } from 'src/products/entities/product.entity';

@ObjectType() // The ObjectType decorator is used for creating GraphQL types
@Entity() // The Entity decorator is used for TypeORM entities
export class User {
  @Field((type) => ID)
  @PrimaryGeneratedColumn('uuid') // Generating a UUID for the user's ID
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  age: number;

  @Field((type) => [Product])
  @ManyToMany((type) => Product)
  @JoinTable() // The @JoinTable decorator is used to create the join table in a many-to-many relationship
  orders: Product[];
}
