import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ minLength: 1 })
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty({ minLength: 1 })
  @IsString()
  @MinLength(1)
  content: string;
}
