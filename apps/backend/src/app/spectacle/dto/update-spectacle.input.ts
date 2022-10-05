import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateSpectacleInput } from './create-spectacle.input';

@InputType()
export class UpdateSpectacleInput extends PartialType(CreateSpectacleInput) {
  @Field({
    description: 'ID of spectacle to update',
    nullable: false,
  })
  id: string;
}
