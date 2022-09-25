import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateSpectaclesInput } from './create-spectacles.input';

@InputType()
export class UpdateSpectaclesInput extends PartialType(CreateSpectaclesInput) {
  @Field({
    description: 'ID of spectacle to update',
    nullable: false,
  })
  id: string;
}
