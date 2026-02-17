import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export type ProductType = 'savings' | 'credit' | 'loan';
export type ProductStatus = 'active' | 'pending' | 'inactive';

export class ProductResponseDto {
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  id!: string;

  @ApiProperty({ example: 'Cuenta Digital' })
  name!: string;

  @ApiProperty({
    example: 'savings',
    enum: ['savings', 'credit', 'loan'],
    description: 'Tipo de producto',
  })
  type!: ProductType;

  @ApiPropertyOptional({ example: 'Sin comisiones de manejo, 100% digital.' })
  description?: string;

  @ApiPropertyOptional({ example: '****7821' })
  accountNumber?: string;

  @ApiProperty({ example: '$8,320,000' })
  balance!: string;

  @ApiPropertyOptional({
    example: '$8,000,000',
    description: 'Límite de crédito (solo para tarjetas)',
  })
  limit?: string;

  @ApiProperty({ example: 'active', enum: ['active', 'pending', 'inactive'] })
  status!: ProductStatus;

  @ApiPropertyOptional({
    example: '4.0% EA',
    description: 'Tasa de interés',
  })
  rate?: string;

  @ApiPropertyOptional({ example: 'Hoy, 9:15 AM' })
  lastMovement?: string;

  @ApiPropertyOptional({
    example: '507f1f77bcf86cd799439011',
    description: 'ID del usuario dueño del producto',
  })
  userId?: string;

  @ApiPropertyOptional({ example: '2024-01-15T10:30:00Z' })
  createdAt?: Date;
}
