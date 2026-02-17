import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  accessToken!: string;

  @ApiProperty({ example: 'John Doe' })
  fullName?: string;

  @ApiProperty({ example: 'Id del usuario' })
  userId?: string;

  @ApiProperty({ example: true })
  isRegistered!: boolean;
}
