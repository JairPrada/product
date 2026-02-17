import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 'uuid-1234-5678' })
  id!: string;

  @ApiProperty({ example: '1234567890' })
  documentNumber!: string;

  @ApiProperty({ example: 'Juan Pérez García' })
  fullName!: string;

  @ApiPropertyOptional({ example: 'juan.perez@email.com' })
  email?: string;

  @ApiProperty({ example: 'Bogotá' })
  city!: string;

  @ApiProperty({ example: 3500000 })
  monthlyIncome!: number;

  @ApiProperty({ example: true })
  isActive!: boolean;

  @ApiProperty({ example: '2024-01-15T10:30:00Z' })
  createdAt!: Date;
}
