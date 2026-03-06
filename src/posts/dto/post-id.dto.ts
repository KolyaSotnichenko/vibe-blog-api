import { IsInt, Min } from 'class-validator';

export class PostIdDto {
  @IsInt()
  @Min(1)
  id!: number;
}
