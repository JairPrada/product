import { Injectable, Logger } from '@nestjs/common';
import { StartApplicationUseCase } from './start-application.use-case';
import { ApplicationsRepository } from '../../repository/applications.repository';
import { StartApplicationRequestDto, ApplicationResponseDto } from '../../dto';

@Injectable()
export class StartApplicationUseCaseImpl implements StartApplicationUseCase {
  private readonly logger = new Logger(StartApplicationUseCaseImpl.name);

  constructor(
    private readonly applicationsRepository: ApplicationsRepository,
  ) {}

  async execute(dto: StartApplicationRequestDto): Promise<ApplicationResponseDto> {
    this.logger.log(`Starting application for ID: ${dto?.documentNumber}`);
    return this.applicationsRepository.startApplication(dto);
  }
}
