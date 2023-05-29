import { Field, InputType, Float } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => Float)
  age: number;

  @Field(() => [OrderInput])
  orders?: OrderInput[];
}

@InputType()
class OrderInput {
  @Field()
  name: string;

  @Field(() => Float)
  price: number;
}
