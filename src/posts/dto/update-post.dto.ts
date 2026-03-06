import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, MinLength, IsOptional } from 'class-validator';

export class UpdatePostDto {
  @ApiPropertyOptional({ minLength: 1 })
  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string;

  @ApiPropertyOptional({ minLength: 1 })
  @IsOptional()
  @IsString()
  @MinLength(1)
  content?: string;
}
