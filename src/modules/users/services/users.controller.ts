import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegisterUserUseCase } from '../core/use-cases';
import { RegisterRequestDto, UserResponseDto } from '../dto';

@ApiTags('Usuarios')
@Controller('users')
export class UsersController {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registrar nuevo usuario' })
  @ApiResponse({
    status: 201,
    description: 'Usuario registrado exitosamente',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 409, description: 'Usuario ya existe' })
  async register(
    @Body() registerDto: RegisterRequestDto,
  ): Promise<UserResponseDto> {
    return this.registerUserUseCase.execute(registerDto);
  }
}
