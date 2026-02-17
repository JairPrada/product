import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export type ApplicationStatus = 'pending_otp' | 'approved' | 'rejected' | 'in_review';

export class ApplicationResponseDto {
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  applicationId!: string;

  @ApiProperty({ example: '1234567890' })
  documentNumber!: string;

  @ApiProperty({ 
    example: 'pending_otp',
    enum: ['pending_otp', 'approved', 'rejected', 'in_review'],
  })
  status!: ApplicationStatus;

  @ApiProperty({ example: 'OTP enviado al correo registrado' })
  message!: string;

  @ApiPropertyOptional({ example: '507f1f77bcf86cd799439011' })
  userId?: string;

  @ApiPropertyOptional({ example: '507f1f77bcf86cd799439011' })
  productId?: string;

  @ApiPropertyOptional({ example: '2024-01-15T10:30:00Z' })
  createdAt?: Date;
}
