import { IsString, IsOptional, IsIn } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductRequestDto {
  @ApiPropertyOptional({
    description: 'Nombre del producto',
    example: 'Tarjeta de Crédito Gold',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'Descripción del producto',
    example: 'Tarjeta con beneficios exclusivos',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Estado del producto',
    enum: ['active', 'pending'],
    example: 'active',
  })
  @IsString()
  @IsOptional()
  @IsIn(['active', 'pending'])
  status?: 'active' | 'pending';
}
