import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateSpectaclesInput } from './create-spectacles.input';

@InputType()
export class UpdateSpectaclesInput extends PartialType(CreateSpectaclesInput) {
  @Field({
    description: 'ID of spectacles to update',
    nullable: false,
  })
  id: string;
}
