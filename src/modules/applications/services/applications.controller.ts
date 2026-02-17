import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StartApplicationUseCase } from '../core/use-cases';
import { StartApplicationRequestDto, ApplicationResponseDto } from '../dto';

@ApiTags('Solicitudes')
@Controller('applications')
export class ApplicationsController {
  constructor(
    private readonly startApplicationUseCase: StartApplicationUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Iniciar una nueva solicitud' })
  @ApiResponse({
    status: 201,
    description: 'Solicitud iniciada, OTP enviado',
    type: ApplicationResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async startApplication(
    @Body() dto: StartApplicationRequestDto,
  ): Promise<ApplicationResponseDto> {
    return this.startApplicationUseCase.execute(dto);
  }
}
