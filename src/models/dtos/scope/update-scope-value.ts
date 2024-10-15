import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdateScopeValueDto {
  @IsNotEmpty()
  @MinLength(5)
  name = '';

  @IsNotEmpty()
  @MinLength(5)
  description = '';
}