import { IsString, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class StartApplicationRequestDto {
  @ApiProperty({
    description: 'Número de identificación del solicitante',
    example: '1234567890',
  })
  @IsString()
  @IsNotEmpty()
  documentNumber!: string;

  @ApiProperty({
    description: 'Acepta tratamiento de datos personales',
    example: true,
  })
  @IsBoolean()
  acceptsDataTreatment!: boolean;

  @ApiPropertyOptional({
    description: 'ID del producto solicitado',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsOptional()
  productId?: string;
}
