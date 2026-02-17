import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export type ProductType = 'savings' | 'credit' | 'loan';

export class CreateProductRequestDto {
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Cuenta de Ahorros Premium',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: 'Tipo de producto',
    enum: ['savings', 'credit', 'loan'],
    example: 'savings',
  })
  @IsString()
  @IsIn(['savings', 'credit', 'loan'])
  type!: ProductType;

  @ApiPropertyOptional({
    description: 'Descripción del producto',
    example: 'Cuenta con los mejores beneficios',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Ruta de la imagen',
    example: '/cards/saving-icon.png',
  })
  @ApiPropertyOptional({
    description: 'Balance inicial',
    example: '$0',
  })
  @IsString()
  @IsOptional()
  balance?: string;

  @ApiPropertyOptional({
    description: 'Límite de crédito',
    example: '$10,000,000',
  })
  @IsString()
  @IsOptional()
  limit?: string;

  @ApiPropertyOptional({
    description: 'Tasa de interés',
    example: '4.5% EA',
  })
  @IsString()
  @IsOptional()
  rate?: string;

  @ApiPropertyOptional({
    description: 'ID del usuario dueño del producto',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsOptional()
  userId?: string;
}
